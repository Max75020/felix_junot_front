// Importation des bibliothèques React et des hooks nécessaires
import React, { useEffect, useState } from 'react';

// Importation des composants de React-Bootstrap
import { Container } from 'react-bootstrap';

// Importation des contextes pour accéder aux données de commande et de panier
import { useOrder } from '../../context/OrderContext';
import { useCart } from '../../context/CartContext';

// Importation du service pour les appels API
import apiService from '../../services/apiService';

const OrderSuccess = () => {
	// Accès aux données de commande via le contexte OrderContext
	const { orderData, isOrderCreated, setIsOrderCreated } = useOrder();

	// Accès à la fonction pour récupérer le panier via le contexte CartContext
	const { fetchCart } = useCart();

	// États pour gérer la référence de commande et l'email de l'utilisateur
	const [orderReference, setOrderReference] = useState(null);
	const [userEmail, setUserEmail] = useState(null);

	// Effet pour créer la commande après le paiement
	useEffect(() => {
		const createOrder = async () => {
			// Vérification que toutes les informations nécessaires sont disponibles
			const areOrderDetailsReady = orderData &&
				orderData.selectedLivraison &&
				orderData.selectedFacturation &&
				orderData.selectedCarrier &&
				orderData.totalPanier > 0 &&
				orderData.totalCommande > 0;

			// Si les détails sont valides et que la commande n'a pas encore été créée
			if (areOrderDetailsReady && !isOrderCreated) {
				try {
					// Récupération de l'email de l'utilisateur depuis les données de commande
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

					// Mise à jour de la référence de commande et du statut
					setOrderReference(response.reference);
					setIsOrderCreated(true);

					// Suppression des données de commande du localStorage
					localStorage.removeItem('orderData');

					// Rafraîchissement du panier pour afficher un panier vide
					await fetchCart('ouvert');
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
