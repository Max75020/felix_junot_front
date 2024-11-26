// Importation des librairies de base React
import React, { useContext } from 'react';
// Importation des composants de Bootstrap pour la mise en page
import { Container, Row, Col } from 'react-bootstrap';
// Importation du contexte utilisateur pour accéder aux informations de l'utilisateur connecté
import { UserContext } from '../../context/UserContext';
// Importation de la fonction pour naviguer entre les routes avec React Router
import { useNavigate } from 'react-router-dom';
// Importation des routes définies dans le routeur principal
import { routes } from '../../routes/AppRouter';

const OrdersList = () => {
	// Récupération du contexte utilisateur pour obtenir les commandes de l'utilisateur
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	// Vérifier si l'utilisateur n'a pas de commandes
	if (!user || !user.commandes || user.commandes.length === 0) {
		return <div className="text-center mt-4">Aucune commande trouvée.</div>;
	}

	// Fonction pour formater les prix en euros
	const formatPrice = (price) => {
		// Utilise l'API Intl pour formater les prix selon les conventions françaises
		return new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
		}).format(price);
	};

	// Fonction pour formater la date en format lisible
	const formatDate = (dateString) => {
		// Convertit la chaîne de date en objet Date
		const date = new Date(dateString);
		// Retourne la date formatée en utilisant les conventions françaises (jour/mois/année)
		return date.toLocaleDateString('fr-FR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	};

	// Fonction de gestion du clic sur une commande pour la redirection
	const handleOrderClick = (orderId) => {
		// Remplace l'ID dynamique dans l'URL de la route de détail de commande et navigue vers cette route
		navigate(`${routes.COMMANDS.ORDER_DETAIL.replace(':id', orderId)}`);
	};

	return (
		<Container fluid className="p-4">
			{/* Titre de la section des commandes */}
			<Row className="mb-4">
				<Col>
					<h1 className="text-center">Mes Commandes</h1>
				</Col>
			</Row>

			{/* Liste des commandes de l'utilisateur */}
			<Row className="d-flex justify-content-center gap-4">
				{user.commandes.map((order, index) => (
					<div
						key={index} // Utilisation de l'index comme clé pour chaque commande (mieux vaut utiliser un ID unique si disponible)
						className="border border-dark rounded p-3"
						style={{ maxWidth: "250px", cursor: "pointer" }}
						onClick={() => handleOrderClick(order.id_commande)} // Appel de la fonction lors du clic sur une commande
					>
						{/* Affichage de la référence de la commande */}
						<h4 className="text-center mt-2 text-dark">Référence Commande</h4>
						<p className="text-center text-muted p-card">{order.reference}</p>

						{/* Affichage de la date de la commande */}
						<h4 className="text-center text-dark">Date</h4>
						<p className="text-center text-muted p-card">{formatDate(order.date_commande)}</p>

						{/* Affichage du prix total de la commande */}
						<h4 className="text-center text-dark">Prix Total</h4>
						<p className="text-center text-muted p-card">{formatPrice(order.prix_total_commande)}</p>

						{/* Affichage de l'état de la commande */}
						<h4 className="text-center text-dark">État</h4>
						<p className="text-center text-muted p-card">{order.etat_commande.libelle}</p>
					</div>
				))}
			</Row>
		</Container>
	);
};

export default OrdersList;
