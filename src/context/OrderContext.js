import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'; // Importation des hooks nécessaires de React
import { useCart } from '../context/CartContext'; // Importation du contexte CartContext pour accéder aux données du panier
import cartApi from '../pages/Cart/services/Cart.api'; // Importation des services de l'API du panier

// Création d'un contexte OrderContext pour gérer les données de commande
const OrderContext = createContext();

// Hook personnalisé pour accéder au contexte OrderContext
export const useOrder = () => useContext(OrderContext);

// Provider pour le contexte de commande
export const OrderProvider = ({ children }) => {
	// Récupération des articles du panier, du total du panier et de l'identifiant du panier depuis le contexte CartContext
	const { cartItems, totalPanier, cartId } = useCart();

	// État pour stocker les données de commande, initialisé à partir du localStorage s'il existe
	const [orderData, setOrderData] = useState(() => {
		const savedOrderData = localStorage.getItem('orderData'); // Vérifie si des données de commande sont enregistrées
		return savedOrderData
			? JSON.parse(savedOrderData) // Si oui, les parse et les utilise
			: { cartItems: [], totalPanier: 0.00, selectedLivraison: null, selectedFacturation: null, selectedCarrier: null, totalCommande: 0.00 }; // Sinon, initialise par défaut
	});

	// État pour indiquer si une commande a été créée avec succès
	const [isOrderCreated, setIsOrderCreated] = useState(false);

	// useEffect pour mettre à jour les données de commande avec les informations actuelles du panier
	useEffect(() => {
		setOrderData((prevOrderData) => ({
			...prevOrderData,
			cartItems, // Mise à jour des articles du panier
			totalPanier, // Mise à jour du total du panier
			id_panier: cartId, // Mise à jour de l'identifiant du panier
		}));
	}, [cartItems, totalPanier, cartId]);

	// useEffect pour enregistrer les données de commande dans le localStorage à chaque modification
	useEffect(() => {
		localStorage.setItem('orderData', JSON.stringify(orderData)); // Sauvegarde les données de commande
	}, [orderData]);

	// Fonction pour calculer le total de la commande, incluant le prix de la livraison
	const calculateTotalCommande = useCallback(() => {
		const prixLivraison = orderData.selectedCarrier?.methode?.prix || 0; // Obtient le prix de la méthode de livraison sélectionnée
		const totalCommande = parseFloat(orderData.totalPanier) + parseFloat(prixLivraison); // Additionne le total du panier et le prix de livraison

		setOrderData((prevOrderData) => ({
			...prevOrderData,
			totalCommande // Mise à jour du total de la commande
		}));
	}, [orderData.totalPanier, orderData.selectedCarrier]);

	// useEffect pour recalculer le total de la commande chaque fois que les informations pertinentes changent
	useEffect(() => {
		calculateTotalCommande();
	}, [calculateTotalCommande]);

	// Fonction pour mettre à jour l'adresse de livraison sélectionnée
	const updateSelectedLivraison = (adresse) => {
		setOrderData((prevOrderData) => ({
			...prevOrderData,
			selectedLivraison: adresse, // Met à jour l'adresse de livraison
		}));
	};

	// Fonction pour mettre à jour l'adresse de facturation sélectionnée
	const updateSelectedFacturation = (adresse) => {
		setOrderData((prevOrderData) => ({
			...prevOrderData,
			selectedFacturation: adresse, // Met à jour l'adresse de facturation
		}));
	};

	// Fonction pour mettre à jour le transporteur sélectionné
	const updateSelectedCarrier = (carrier) => {
		setOrderData((prevOrderData) => ({
			...prevOrderData,
			selectedCarrier: carrier, // Met à jour le transporteur
		}));
	};

	// Fonction pour mettre à jour la méthode de livraison sélectionnée
	const updateSelectedMethodeLivraison = (methode) => {
		setOrderData((prevOrderData) => ({
			...prevOrderData,
			selectedMethodeLivraison: methode, // Met à jour la méthode de livraison
		}));
	};

	// Fonction pour effectuer le paiement via l'API Stripe
	const makePayment = async () => {
		const cartData = {
			...orderData,
			id_panier: cartId, // Utilise l'identifiant actuel du panier
		};
		await cartApi.makePaymentWithStripe(cartData); // Appel API pour faire le paiement avec Stripe
	};

	// Fournir les valeurs du contexte pour être utilisées dans l'application
	return (
		<OrderContext.Provider
			value={{
				orderData, // Données actuelles de la commande
				updateSelectedLivraison, // Fonction pour mettre à jour l'adresse de livraison
				updateSelectedFacturation, // Fonction pour mettre à jour l'adresse de facturation
				updateSelectedCarrier, // Fonction pour mettre à jour le transporteur
				updateSelectedMethodeLivraison, // Fonction pour mettre à jour la méthode de livraison
				makePayment, // Fonction pour effectuer le paiement
				isOrderCreated, // Indicateur de création de commande
				setIsOrderCreated, // Fonction pour définir si une commande est créée
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};

export default OrderContext;
