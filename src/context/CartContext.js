import React, { createContext, useState, useEffect, useContext } from "react"; // Importation de createContext, useState, useEffect et useContext depuis la bibliothèque react
import { UserContext } from "./UserContext"; // Importation de UserContext depuis le fichier UserContext
import produitApi from "../pages/Product/services/Product.api"; // Importation de produitApi depuis le fichier Product.api
import cartApi from "../pages/Cart/services/Cart.api"; // Importation de cartApi depuis le fichier Cart.api
import { extractIdFromUrl } from "../utils/tools"; // Importation de extractIdFromUrl depuis le fichier tools
import { showSuccess } from "../services/popupService"; // Importation de showSuccess depuis le fichier popupService

// Création de la constante CartContext qui permet de créer un contexte pour le panier
const CartContext = createContext();

// Création de la constante CartProvider qui prend en paramètre children
export const CartProvider = ({ children }) => {
	// Création de l'état pour stocker les éléments du panier et leur état de chargement
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(UserContext); // Accès aux informations utilisateur depuis le contexte UserContext
	const [totalPanier, setTotalPanier] = useState(0); // État pour stocker le total du panier

	// Fonction pour récupérer le panier d'un utilisateur en fonction de l'ID du panier
	const fetchCart = async (cartId) => {
		setLoading(true); // Début du chargement
		try {
			const response = await cartApi.getCartById(cartId); // Appel à l'API pour récupérer les informations du panier

			// Vérifie si la réponse contient des produits du panier
			if (!response || !response.panierProduits) {
				return;
			}

			// Récupération des produits du panier
			const panierProduits = response.panierProduits || [];

			// Parcours des produits du panier et récupération des détails de chaque produit
			const items = await Promise.all(
				panierProduits.map(async (panierProduit) => {
					const produitId = extractIdFromUrl(panierProduit.produit["@id"]);
					const produitDetails = await produitApi.getProduitById(produitId);

					// Retourne un objet contenant les détails du produit dans le panier
					return {
						id: panierProduit.id_panier_produit,
						produit: produitDetails,
						quantite: panierProduit.quantite,
						prix_total_produit: parseFloat(panierProduit.prix_total_produit),
					};
				})
			);

			setCartItems(items); // Mise à jour de l'état avec les éléments du panier
			setTotalPanier(parseFloat(response.prix_total_panier)); // Mise à jour du total du panier
		} catch (error) {
			console.error("Erreur lors de la récupération du panier:", error);
		} finally {
			setLoading(false); // Fin du chargement
		}
	};

	// Fonction pour ajouter un produit au panier
	const addToCart = async (productIri, quantity) => {
		setLoading(true);
		try {
			await cartApi.addProductToCart(productIri, quantity);
			showSuccess("Oeuvre ajoutée au panier !"); // Notification de succès
			if (user && user.paniers.length > 0) {
				const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
				await fetchCart(userCartId); // Mise à jour du panier après ajout
			}
		} catch (error) {
			console.error("Erreur lors de l'ajout au panier:", error);
		} finally {
			setLoading(false);
		}
	};

	// Fonction pour supprimer un produit du panier
	const removeFromCart = async (productId) => {
		try {
			await cartApi.removeProductFromCart(productId);
			showSuccess("Oeuvre retirée du panier !"); // Notification de succès
			if (user && user.paniers.length > 0) {
				const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
				await fetchCart(userCartId); // Mise à jour du panier après suppression
			}
		} catch (error) {
			console.error("Erreur lors de la suppression du produit du panier:", error);
		}
	};

	// Fonction pour augmenter la quantité d'un produit dans le panier
	const incrementQuantity = async (cartLineId) => {
		setLoading(true);
		try {
			const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
			await cartApi.addQuantityToCart(cartLineId, userCartId);
			showSuccess("Quantité augmentée !"); // Notification de succès
			if (user && user.paniers.length > 0) {
				await fetchCart(userCartId); // Mise à jour du panier après l'incrémentation
			}
		} catch (error) {
			console.error("Erreur lors de l'augmentation de la quantité :", error);
		} finally {
			setLoading(false);
		}
	};

	// Fonction pour diminuer la quantité d'un produit dans le panier
	const decrementQuantity = async (cartLineId) => {
		setLoading(true);
		try {
			const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
			await cartApi.removeQuantityFromCart(cartLineId, userCartId);
			showSuccess("Quantité diminuée !"); // Notification de succès
			if (user && user.paniers.length > 0) {
				await fetchCart(userCartId); // Mise à jour du panier après la décrémentation
			}
		} catch (error) {
			console.error("Erreur lors de la diminution de la quantité :", error);
		} finally {
			setLoading(false);
		}
	};

	// Effet pour récupérer le panier de l'utilisateur lorsque les données utilisateur changent
	useEffect(() => {
		if (user && user.paniers.length > 0) {
			const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
			fetchCart(userCartId); // Récupérer le panier dès que l'utilisateur est chargé
		}
	}, [user]);

	// Valeurs et fonctions fournies par le contexte
	const contextValue = {
		cartItems,
		loading,
		addToCart,
		removeFromCart,
		incrementQuantity,
		decrementQuantity,
		fetchCart,
		totalPanier,
		cartId: user && user.paniers.length > 0 ? extractIdFromUrl(user.paniers[0]["@id"]) : null,
	};

	// Retourne le contexte avec les données et les fonctions liées au panier
	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte du panier
export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart doit être utilisé dans un CartProvider");
	}
	return context;
};

export default CartContext;
