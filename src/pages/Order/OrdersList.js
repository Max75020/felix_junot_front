import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes/AppRouter';

const OrdersList = () => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	// Vérifier si l'utilisateur n'a pas de commandes
	if (!user || !user.commandes || user.commandes.length === 0) {
		return <div className="text-center mt-4">Aucune commande trouvée.</div>;
	}

	// Fonction pour formater les prix en euros
	const formatPrice = (price) => {
		return new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
		}).format(price);
	};

	// Fonction pour formater la date en format lisible
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('fr-FR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	};

	// Fonction de gestion du clic sur une commande pour la redirection
	const handleOrderClick = (orderId) => {
		navigate(`${routes.COMMANDS.ORDER_DETAIL.replace(':id', orderId)}`);
	};

	return (
		<Container fluid className="p-4">
			<Row className="mb-4">
				<Col>
					<h1 className="text-center">Mes Commandes</h1>
				</Col>
			</Row>

			<Row className="d-flex justify-content-center gap-4">
				{user.commandes.map((order, index) => (
					<div
						key={index}
						className="border border-dark rounded p-3"
						style={{ maxWidth: "250px", cursor: "pointer" }}
						onClick={() => handleOrderClick(order.id_commande)} // Appel de la fonction lors du clic
					>
						<h4 className="text-center mt-2 text-dark">Référence Commande</h4>
						<p className="text-center text-muted p-card">{order.reference}</p>

						<h4 className="text-center text-dark">Date</h4>
						<p className="text-center text-muted p-card">{formatDate(order.date_commande)}</p>

						<h4 className="text-center text-dark">Prix Total</h4>
						<p className="text-center text-muted p-card">{formatPrice(order.prix_total_commande)}</p>

						<h4 className="text-center text-dark">État</h4>
						<p className="text-center text-muted p-card">{order.etat_commande.libelle}</p>
					</div>
				))}
			</Row>
		</Container>
	);
};

export default OrdersList;
