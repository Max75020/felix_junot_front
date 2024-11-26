import React, { createContext, useState, useEffect, useContext } from "react"; // Importation de createContext, useState, useEffect et useContext depuis la bibliothèque react
import { UserContext } from "./UserContext"; // Importation de UserContext depuis le fichier UserContext pour accéder aux informations utilisateur
import produitApi from "../pages/Product/services/Product.api"; // Importation de produitApi pour gérer les appels API liés aux produits
import cartApi from "../pages/Cart/services/Cart.api"; // Importation de cartApi pour gérer les appels API liés au panier
import { extractIdFromUrl } from "../utils/tools"; // Importation de extractIdFromUrl pour extraire l'ID depuis une URL
import { showSuccess } from "../services/popupService"; // Importation de showSuccess pour afficher des notifications de succès

// Création de la constante CartContext qui permet de créer un contexte pour le panier
const CartContext = createContext();

export const CartProvider = ({ children }) => {
	// Création de l'état pour stocker les éléments du panier et leur état de chargement
	const [cartItems, setCartItems] = useState([]); // Liste des articles du panier
	const [loading, setLoading] = useState(false); // État de chargement pour les actions asynchrones
	const { user } = useContext(UserContext); // Accès aux informations utilisateur depuis le contexte UserContext
	const [totalPanier, setTotalPanier] = useState(0); // État pour stocker le total du panier
	const [cartId, setCartId] = useState(null); // Identifiant du panier en cours
	const [cartEtat, setCartEtat] = useState(null); // État du panier (ouvert/fermé)

	// Fonction pour récupérer le panier ouvert d'un utilisateur
	const fetchCart = async () => {
		setLoading(true); // Démarrage du chargement
		try {
			const response = await cartApi.getOpenCart(); // Appel API pour récupérer le panier ouvert

			if (!response || !response.panierProduits) {
				return; // Si la réponse est invalide, quitter la fonction
			}

			// Récupération des produits du panier
			const panierProduits = response.panierProduits || [];

			// Parcours des produits du panier et récupération des détails de chaque produit
			const items = await Promise.all(
				panierProduits.map(async (panierProduit) => {
					const produitId = extractIdFromUrl(panierProduit.produit["@id"]); // Extraction de l'ID du produit depuis l'URL
					const produitDetails = await produitApi.getProduitById(produitId); // Appel API pour obtenir les détails du produit

					// Retourne un objet contenant les détails du produit dans le panier
					return {
						id: panierProduit.id_panier_produit, // Identifiant unique du produit dans le panier
						produit: produitDetails, // Détails du produit (nom, prix, etc.)
						quantite: panierProduit.quantite, // Quantité du produit dans le panier
						prix_total_produit: parseFloat(panierProduit.prix_total_produit), // Prix total pour la quantité de ce produit
					};
				})
			);

			setCartItems(items); // Mise à jour de l'état avec les éléments du panier
			setTotalPanier(parseFloat(response.prix_total_panier)); // Mise à jour du total du panier
			setCartId(response.id_panier); // Mise à jour du cartId
			setCartEtat(response.etat); // Mise à jour de l'état du panier (ouvert/fermé)
		} catch (error) {
			console.error("Erreur lors de la récupération du panier:", error); // Gestion des erreurs
		} finally {
			setLoading(false); // Fin du chargement
		}
	};

	// Fonction pour ajouter un produit au panier
	const addToCart = async (productIri, quantity) => {
		setLoading(true); // Début du chargement lors de l'ajout d'un produit
		try {
			await cartApi.addProductToCart(productIri, quantity); // Appel API pour ajouter le produit au panier
			showSuccess("Oeuvre ajoutée au panier !"); // Notification de succès
			if (user && user.panierOuvert) {
				await fetchCart(); // Mise à jour du panier après ajout
			}
		} catch (error) {
			console.error("Erreur lors de l'ajout au panier:", error); // Gestion des erreurs
		} finally {
			setLoading(false); // Fin du chargement
		}
	};

	// Fonction pour supprimer un produit du panier
	const removeFromCart = async (productId) => {
		try {
			await cartApi.removeProductFromCart(productId); // Appel API pour supprimer le produit du panier
			showSuccess("Oeuvre retirée du panier !"); // Notification de succès
			if (user && user.panierOuvert) {
				await fetchCart(); // Mise à jour du panier après suppression
			}
		} catch (error) {
			console.error("Erreur lors de la suppression du produit du panier:", error); // Gestion des erreurs
		}
	};

	// Fonction pour augmenter la quantité d'un produit dans le panier
	const incrementQuantity = async (cartLineId) => {
		setLoading(true); // Début du chargement lors de l'incrémentation
		try {
			await cartApi.addQuantityToCart(cartLineId, cartEtat); // Appel API pour augmenter la quantité du produit
			showSuccess("Quantité augmentée !"); // Notification de succès
			if (user && user.panierOuvert) {
				await fetchCart(); // Mise à jour du panier après l'incrémentation
			}
		} catch (error) {
			console.error("Erreur lors de l'augmentation de la quantité :", error); // Gestion des erreurs
		} finally {
			setLoading(false); // Fin du chargement
		}
	};

	// Fonction pour diminuer la quantité d'un produit dans le panier
	const decrementQuantity = async (cartLineId) => {
		setLoading(true); // Début du chargement lors de la décrémentation
		try {
			await cartApi.removeQuantityFromCart(cartLineId, cartEtat); // Appel API pour diminuer la quantité du produit
			showSuccess("Quantité diminuée !"); // Notification de succès
			if (user && user.panierOuvert) {
				await fetchCart(); // Mise à jour du panier après la décrémentation
			}
		} catch (error) {
			console.error("Erreur lors de la diminution de la quantité :", error); // Gestion des erreurs
		} finally {
			setLoading(false); // Fin du chargement
		}
	};

	// Effet pour récupérer le panier de l'utilisateur lorsque les données utilisateur changent
	useEffect(() => {
		if (user && user.panierOuvert) {
			fetchCart(); // Récupérer le panier dès que l'utilisateur est chargé
		}
	}, [user]);

	// Valeurs et fonctions fournies par le contexte
	const contextValue = {
		cartItems, // Liste des articles présents dans le panier
		loading, // État de chargement pour les actions du panier
		addToCart, // Fonction pour ajouter un article au panier
		removeFromCart, // Fonction pour supprimer un article du panier
		incrementQuantity, // Fonction pour augmenter la quantité d'un article
		decrementQuantity, // Fonction pour diminuer la quantité d'un article
		fetchCart, // Fonction pour récupérer le panier actuel
		totalPanier, // Prix total actuel du panier
		cartId, // Identifiant unique du panier
	};

	// Retourne le contexte avec les données et les fonctions liées au panier
	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte du panier
export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart doit être utilisé dans un CartProvider"); // Vérification que le hook est utilisé dans le bon contexte
	}
	return context; // Retourne le contexte du panier
};

export default CartContext;
