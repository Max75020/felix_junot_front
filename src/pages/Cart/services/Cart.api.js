import apiService from "../../../services/apiService"; // Importation du service d'API pour effectuer des requêtes HTTP
import { loadStripe } from "@stripe/stripe-js"; // Importation de la bibliothèque Stripe pour intégrer le paiement

// Définitions des endpoints pour l'entité Paniers et Produits dans le panier
const CART_ENDPOINT = "paniers"; // Endpoint pour les opérations sur les paniers
const CART_LINES_ENDPOINT = "panier_produits"; // Endpoint pour les lignes de produits dans un panier

// Objet contenant les méthodes d'API pour les opérations sur les paniers et le paiement
const cartApi = {
	// Récupérer un panier spécifique par son ID
	getCartById: async (cartId) => {
		return await apiService.get(`${CART_ENDPOINT}/${cartId}`);
	},

	// Récupérer ou créer un panier ouvert (le panier actuel de l'utilisateur)
	getOpenCart: async () => {
		// Appelle l'endpoint dédié pour obtenir un panier "ouvert" ou en créer un si aucun n'existe
		return await apiService.get(`${CART_ENDPOINT}/ouvert`);
	},

	// Ajouter un produit au panier
	addProductToCart: async (productIri, quantity) => {
		// Envoi d'une requête POST pour ajouter un produit au panier
		return await apiService.post(`${CART_ENDPOINT}/add-product`, {
			produit: productIri, // L'API attend "produit" avec l'IRI du produit
			quantity: quantity, // Quantité de produit à ajouter
		});
	},

	// Supprimer un produit du panier par l'ID de la ligne de produit
	removeProductFromCart: async (cartLineId) => {
		// Envoi d'une requête DELETE pour supprimer une ligne de produit dans le panier
		return await apiService.delete(`${CART_LINES_ENDPOINT}/${cartLineId}`);
	},

	// Ajouter une unité d'un produit spécifique dans le panier (incrémenter la quantité)
	addQuantityToCart: async (cartLineId, cartId) => {
		// Envoi d'une requête PATCH pour incrémenter la quantité du produit dans le panier
		return await apiService.patch(
			`${CART_ENDPOINT}/${cartId}/increment-product`,
			{
				produit: cartLineId, // L'API attend "produit" avec l'IRI du produit
			}
		);
	},

	// Réduire une unité d'un produit spécifique dans le panier (décrémenter la quantité)
	removeQuantityFromCart: async (cartLineId, cartId) => {
		// Envoi d'une requête PATCH pour décrémenter la quantité du produit dans le panier
		return await apiService.patch(
			`${CART_ENDPOINT}/${cartId}/decrement-product`,
			{
				produit: cartLineId, // L'API attend "produit" avec l'IRI du produit
			}
		);
	},

	// Effectuer un paiement avec Stripe
	makePaymentWithStripe: async (cartData) => {
		// Charger la bibliothèque Stripe avec la clé publique depuis les variables d'environnement
		const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

		// Préparation des données des articles du panier pour la session de paiement Stripe
		const items = cartData.cartItems.map((item) => {
			// Récupérer l'image de couverture du produit, sinon utiliser une image par défaut
			const coverImage = item.produit.images.find((img) => img.cover);
			const imageUrl = coverImage
				? `${process.env.REACT_APP_URL_SERVER}/${coverImage.Chemin}`
				: "https://placehold.co/400"; // Image de remplacement si aucune image de couverture n'est trouvée

			// Retourne les informations nécessaires pour chaque article du panier
			return {
				prix_total_produit: item.prix_total_produit, // Prix total pour cet article
				nom: item.produit.nom, // Nom du produit
				quantite: item.quantite, // Quantité de ce produit
				prix_ttc: item.produit.prix_ttc, // Prix unitaire TTC du produit
				produitId: item.produit.id_produit, // ID du produit
				imageUrl: imageUrl, // URL de l'image du produit
			};
		});

		// Préparation des données du corps de la requête pour créer une session de paiement
		const body = {
			id_panier: cartData.id_panier, // ID du panier
			items, // Articles du panier
			totalPanier: cartData.totalPanier, // Total du panier
			fraisLivraison: cartData.selectedCarrier?.methode.prix || 0, // Frais de livraison (si sélectionné)
			totalCommande: cartData.totalCommande, // Total de la commande
		};

		try {
			// Envoi de la requête POST pour créer une session de paiement sur le backend
			const response = await apiService.post(
				`${CART_ENDPOINT}/payment`,
				body
			);

			// Redirection de l'utilisateur vers la page de paiement Stripe avec l'ID de session
			await stripe.redirectToCheckout({ sessionId: response.id });
		} catch (error) {
			// Gestion des erreurs lors de l'appel au backend pour la session de paiement
			console.error(
				"Erreur lors de l'appel au backend pour la session de paiement:",
				error
			);
		}
	},
};

export default cartApi; // Exportation de l'objet cartApi pour l'utiliser dans d'autres parties de l'application
