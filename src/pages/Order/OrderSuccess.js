import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useOrder } from '../../context/OrderContext';
import apiService from '../../services/apiService';

const OrderSuccess = () => {
	const { orderData } = useOrder(); // Utilise useOrder pour récupérer les données de la commande
	const [orderReference, setorderReference] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const [isOrderCreated, setIsOrderCreated] = useState(false); // Drapeau pour vérifier si la commande est créée

	console.log("orderData", orderData);

	useEffect(() => {
		if (orderData && !isOrderCreated) { // Vérifie que la commande n'a pas encore été créée
			// Récupération de l'email de l'utilisateur depuis orderData
			const emailApi = orderData.selectedLivraison.utilisateur.email;
			setUserEmail(emailApi);

			// Appel API pour créer la commande
			apiService.post('commandes', {
				utilisateur: orderData.selectedLivraison.utilisateur["@id"], // ID de l'utilisateur
				prix_total_commande: orderData.totalCommande.toString(), // Total de la commande calculé
				transporteur: orderData.selectedCarrier.carrier["@id"], // ID du transporteur
				methodeLivraison: orderData.selectedCarrier.methode["@id"], // ID de la méthode de livraison
				frais_livraison: orderData.selectedCarrier.methode.prix.toString(), // Prix de la livraison
				panier: `/api/paniers/${orderData.id_panier}`, // ID du panier
				adresseFacturation: orderData.selectedFacturation["@id"], // ID de l'adresse de facturation
				adresseLivraison: orderData.selectedLivraison["@id"], // ID de l'adresse de livraison
				total_produits_commande: orderData.totalPanier.toString(), // Total des produits dans le panier
			})
				.then(response => {
					console.log("Réponse de la création de la commande : ", response);
					// Récupérer l'ID de la commande et le mettre à jour pour affichage
					setorderReference(response.reference);
					setIsOrderCreated(true); // Marque la commande comme créée
				})
				.catch(error => {
					console.error("Erreur lors de la création de la commande : ", error);
				});
		}
	}, [orderData, isOrderCreated]); // Ajoute isOrderCreated comme dépendance

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
