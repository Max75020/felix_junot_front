import apiService from "../../../services/apiService";
import { loadStripe } from "@stripe/stripe-js";

// Définitions des endpoints pour l'entité Category
const CART_ENDPOINT = "paniers";
const CART_LINES_ENDPOINT = "panier_produits";
const cartApi = {
	getCartById: async (cartId) => {
		return await apiService.get(`${CART_ENDPOINT}/${cartId}`);
	},

	// Récupérer ou créer un panier ouvert
	getOpenCart: async () => {
		// Appelle l'endpoint dédié pour obtenir un panier "ouvert" ou en créer un si aucun n'existe
		return await apiService.get(`${CART_ENDPOINT}/ouvert`);
	},

	addProductToCart: async (productIri, quantity) => {
		// Envoyer un objet avec la clé "produit" et non "productId"
		return await apiService.post(`${CART_ENDPOINT}/add-product`, {
			produit: productIri, // L'API attend "produit" avec l'IRI du produit
			quantity: quantity, // Quantité
		});
	},

	removeProductFromCart: async (cartLineId) => {
		return await apiService.delete(`${CART_LINES_ENDPOINT}/${cartLineId}`);
	},

	addQuantityToCart: async (cartLineId, cartId) => {
		return await apiService.patch(
			`${CART_ENDPOINT}/${cartId}/increment-product`,
			{
				produit: cartLineId, // L'API attend "produit" avec l'IRI du produit
			}
		);
	},

	removeQuantityFromCart: async (cartLineId, cartId) => {
		return await apiService.patch(
			`${CART_ENDPOINT}/${cartId}/decrement-product`,
			{
				produit: cartLineId, // L'API attend "produit" avec l'IRI du produit
			}
		);
	},

	makePaymentWithStripe: async (cartData) => {
		const stripe = await loadStripe(
			process.env.REACT_APP_STRIPE_PUBLIC_KEY
		);

		const items = cartData.cartItems.map((item) => ({
			// Assurez-vous que ces propriétés existent
			prix_total_produit: item.prix_total_produit,
			nom: item.produit.nom,
			quantite: item.quantite,
			prix_ttc: item.produit.prix_ttc,
			produitId: item.produit.id_produit,
		}));

		// Itérer sur items pour accéder aux propriétés de chaque produit
		items.forEach((item, index) => {
			console.log(`Informations pour le produit ${index + 1}:`);
			console.log("  prix_total_produit : ", item.prix_total_produit);
			console.log("  nom : ", item.nom);
			console.log("  quantité : ", item.quantite);
			console.log("  prix TTC : ", item.prix_ttc);
			console.log("  id produit : ", item.produitId);
		});

		console.log("Informations pour le panier : ", cartData);

		const body = {
			id_panier: cartData.id_panier,
			items,
			totalPanier: cartData.totalPanier,
			fraisLivraison: cartData.selectedCarrier?.methode.prix || 0,
			totalCommande: cartData.totalCommande,
		};

		console.log("Toutes les informations envoyées au back", body);

		try {
			const response = await apiService.post(
				`${CART_ENDPOINT}/payment`,
				body
			);
			console.log("Réponse du backend pour la session de paiement", response);
			await stripe.redirectToCheckout({ sessionId: response.id });
		} catch (error) {
			console.error(
				"Erreur lors de l'appel au backend pour la session de paiement:",
				error
			);
		}
	},
};

export default cartApi;
