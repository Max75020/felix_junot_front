import React, { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import produitApi from "../pages/Product/services/Product.api";
import cartApi from "../pages/Cart/services/Cart.api";
import { extractIdFromUrl } from "../utils/tools";
import { showSuccess } from "../services/popupService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(UserContext);
	const [totalPanier, setTotalPanier] = useState(0);

	const fetchCart = async (cartId) => {
		setLoading(true);
		try {
			const response = await cartApi.getCartById(cartId);

			if (!response || !response.panierProduits) {
				return;
			}

			const panierProduits = response.panierProduits || [];

			const items = await Promise.all(
				panierProduits.map(async (panierProduit) => {
					const produitId = extractIdFromUrl(
						panierProduit.produit["@id"]
					);

					const produitDetails = await produitApi.getProduitById(
						produitId
					);

					return {
						id: panierProduit.id_panier_produit,
						produit: produitDetails,
						quantite: panierProduit.quantite,
						prix_total_produit: parseFloat(
							panierProduit.prix_total_produit
						),
					};
				})
			);

			setCartItems(items);
			setTotalPanier(parseFloat(response.prix_total_panier));
		} catch (error) {
			console.error("Erreur lors de la récupération du panier:", error);
		} finally {
			setLoading(false);
		}
	};

	const addToCart = async (productIri, quantity) => {
		setLoading(true);
		try {
			await cartApi.addProductToCart(productIri, quantity);
			showSuccess("Oeuvre ajoutée au panier !");
			if (user && user.paniers.length > 0) {
				const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
				await fetchCart(userCartId);
			}
		} catch (error) {
			console.error("Erreur lors de l'ajout au panier:", error);
		} finally {
			setLoading(false);
		}
	};

	const removeFromCart = async (productId) => {
		try {
			await cartApi.removeProductFromCart(productId);
			showSuccess("Oeuvre retirée du panier !");
			if (user && user.paniers.length > 0) {
				const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
				await fetchCart(userCartId);
			}
		} catch (error) {
			console.error(
				"Erreur lors de la suppression du produit du panier:",
				error
			);
		}
	};

	const incrementQuantity = async (cartLineId) => {
		setLoading(true);
		try {
			// id du panier 
			const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
			console.log("userCartId", userCartId);
			await cartApi.addQuantityToCart(cartLineId, userCartId);
			showSuccess("Quantité augmentée !");
			if (user && user.paniers.length > 0) {
				await fetchCart(userCartId);
			}
		}
		catch (error) {
			console.error(
				"Erreur lors de l'augmentation de la quantité :",
				error
			);
		} finally {
			setLoading(false);
		}
	}

	const decrementQuantity = async (cartLineId) => {
		setLoading(true);
		try {
			// id du panier 
			const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
			console.log("userCartId", userCartId);
			await cartApi.removeQuantityFromCart(cartLineId, userCartId);
			showSuccess("Quantité diminuée !");
			if (user && user.paniers.length > 0) {
				await fetchCart(userCartId);
			}
		}
		catch (error) {
			console.error(
				"Erreur lors de la diminution de la quantité :",
				error
			);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (user && user.paniers.length > 0) {
			const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
			fetchCart(userCartId);
		}
	}, [user]);

	const contextValue = {
		cartItems,
		loading,
		addToCart,
		removeFromCart,
		incrementQuantity,
		decrementQuantity,
		fetchCart,
		totalPanier,
	};

	return (
		<CartContext.Provider value={contextValue}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart doit être utilisé dans un CartProvider");
	}
	return context;
};

export default CartContext;
