import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useOrder } from '../../context/OrderContext';
import apiService from '../../services/apiService';

const OrderSuccess = () => {
	const { orderData, isOrderCreated, setIsOrderCreated } = useOrder();
	const [orderReference, setOrderReference] = useState(null);
	const [userEmail, setUserEmail] = useState(null);

	console.log("Valeur initiale de orderCreated dans localStorage:", localStorage.getItem('orderCreated'));

	useEffect(() => {
		const createOrder = async () => {
			// Vérification que toutes les informations sont disponibles
			const areOrderDetailsReady = orderData &&
				orderData.selectedLivraison &&
				orderData.selectedFacturation &&
				orderData.selectedCarrier &&
				orderData.totalPanier > 0 &&
				orderData.totalCommande > 0;

			if (areOrderDetailsReady && !isOrderCreated && !localStorage.getItem('orderCreated')) {
				try {
					console.log("Création de la commande en cours...");

					// Récupération de l'email de l'utilisateur depuis orderData
					const emailApi = orderData.selectedLivraison.utilisateur.email;
					setUserEmail(emailApi);

				
					// Appel API pour créer la commande
					const response = await apiService.post('commandes', {
						utilisateur: orderData.selectedLivraison.utilisateur["@id"],
						prix_total_commande: orderData.totalCommande.toString(),
						transporteur: orderData.selectedCarrier.carrier["@id"],
						methodeLivraison: orderData.selectedCarrier.methode["@id"],
						frais_livraison: orderData.selectedCarrier.methode.prix.toString(),
						panier: `/api/paniers/${orderData.id_panier}`,
						adresseFacturation: orderData.selectedFacturation["@id"],
						adresseLivraison: orderData.selectedLivraison["@id"],
						total_produits_commande: orderData.totalPanier.toString(),
					});

					// Si la commande est créée avec succès, mise à jour de l'état et du localStorage
					console.log("Réponse de la création de la commande :", response);
					setOrderReference(response.reference);
					setIsOrderCreated(true);
					localStorage.setItem('orderCreated', 'true');
					console.log("Commande créée avec succès, orderCreated mis à jour dans localStorage");
				} catch (error) {
					console.error("Erreur lors de la création de la commande :", error);
				}
			} else {
				console.log("Commande déjà créée ou données insuffisantes pour la création.");
			}
		};

		createOrder();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container className="text-center py-4">
			<div className="my-4">
				<h2>COMMANDE {orderReference}</h2>
				<div style={{ fontSize: "4rem", color: "green" }}>✓</div>
				<h3 className="mt-3">Merci de votre commande</h3>
				<p>Un mail récapitulatif a été envoyé à l'adresse suivante :</p>
				<p><strong>{userEmail}</strong></p>
			</div>
		</Container>
	);
};

export default OrderSuccess;
