import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import cartApi from '../pages/Cart/services/Cart.api';

const OrderContext = createContext();

export const useOrder = () => {
	return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
	const { cartItems, totalPanier, cartId } = useCart();
	const [orderData, setOrderData] = useState(() => {
		const savedOrderData = localStorage.getItem('orderData');
		return savedOrderData
			? JSON.parse(savedOrderData)
			: { cartItems: [], totalPanier: 0.00, selectedLivraison: null, selectedFacturation: null, selectedCarrier: null, totalCommande: 0.00 };
	});

	useEffect(() => {
		setOrderData((prevOrderData) => ({
			...prevOrderData,
			cartItems,
			totalPanier,
			id_panier: cartId
		}));
	}, [cartItems, totalPanier, cartId]);

	useEffect(() => {
		localStorage.setItem('orderData', JSON.stringify(orderData));
	}, [orderData]);

	// Mémorisation de la fonction pour éviter l'avertissement
	const calculateTotalCommande = useCallback(() => {
		const prixLivraison = orderData.selectedCarrier?.methode?.prix || 0;
		const totalCommande = parseFloat(orderData.totalPanier) + parseFloat(prixLivraison);

		setOrderData((prevOrderData) => ({
			...prevOrderData,
			totalCommande
		}));
	}, [orderData.totalPanier, orderData.selectedCarrier]);

	useEffect(() => {
		calculateTotalCommande();
	}, [calculateTotalCommande]);

	const updateSelectedLivraison = (adresse) => {
		setOrderData((prevOrderData) => ({
			...prevOrderData,
			selectedLivraison: adresse,
		}));
	};

	const updateSelectedFacturation = (adresse) => {
		setOrderData((prevOrderData) => ({
			...prevOrderData,
			selectedFacturation: adresse,
		}));
	};

	const updateSelectedCarrier = (carrier) => {
		setOrderData((prevOrderData) => ({
			...prevOrderData,
			selectedCarrier: carrier,
		}));
	};

	const updateSelectedMethodeLivraison = (methode) => {
		setOrderData((prevOrderData) => ({
			...prevOrderData,
			selectedMethodeLivraison: methode,
		}));
	};

	const makePayment = async (cartData) => {
		await cartApi.makePaymentWithStripe(cartData);
	}

	return (
		<OrderContext.Provider value={{ orderData, updateSelectedLivraison, updateSelectedFacturation, updateSelectedCarrier, updateSelectedMethodeLivraison, makePayment }}>
			{children}
		</OrderContext.Provider>
	);
};
