// OrderContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; // Assurez-vous que le CartContext est bien importé

const OrderContext = createContext();

export const useOrder = () => {
	return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
	const { cartItems, totalPanier } = useCart();
	const [orderData, setOrderData] = useState(() => {
		const savedOrderData = localStorage.getItem('orderData');
		return savedOrderData
			? JSON.parse(savedOrderData)
			: { cartItems: [], totalPanier: 0.00, selectedLivraison: null, selectedFacturation: null, selectedCarrier: null};
	});

	useEffect(() => {
		setOrderData((prevOrderData) => ({
			...prevOrderData,
			cartItems,
			totalPanier,
		}));
	}, [cartItems, totalPanier]);

	useEffect(() => {
		localStorage.setItem('orderData', JSON.stringify(orderData));
	}, [orderData]);

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

	return (
		<OrderContext.Provider value={{ orderData, updateSelectedLivraison, updateSelectedFacturation, updateSelectedCarrier, updateSelectedMethodeLivraison }}>
			{children}
		</OrderContext.Provider>
	);
};
