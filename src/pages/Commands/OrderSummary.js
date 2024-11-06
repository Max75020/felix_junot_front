import React from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { useOrder } from '../../context/OrderContext';
import '../../assets/styles/Commandes/OrderSummary.css';

const OrderSummary = () => {
	const { orderData } = useOrder();

	// Fonction pour formater les prix en euros
	const formatPrice = (price) => {
		return new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
		}).format(price);
	};

	return (
		<Container fluid className="order-summary-container my-5">
			<Row className="mb-5">
				<Col>
					<h1 className="text-center">Récapitulatif de Commande</h1>
				</Col>
			</Row>

			{/* Section Adresses et Méthode de Livraison */}
			<Row className="mb-4 d-flex flex-lg-row flex-column align-items-stretch">
				<Col lg={4} className="mb-4 d-flex align-items-stretch">
					<Accordion className="w-100">
						<Accordion.Item className="border-0 h-100" eventKey="0">
							<Accordion.Header>
								<h4 className="text-center mb-0 border-0">Adresse de Livraison</h4>
							</Accordion.Header>
							<Accordion.Body className="h-100 d-flex align-items-stretch">
								<Card className="text-center border-dark rounded w-100 h-100">
									<Card.Body className="d-flex flex-column justify-content-center">
										<h5>{orderData.selectedLivraison?.prenom} {orderData.selectedLivraison?.nom}</h5>
										<h5>{orderData.selectedLivraison?.rue}</h5>
										<h5>{orderData.selectedLivraison?.code_postal} {orderData.selectedLivraison?.ville}</h5>
										<h5>{orderData.selectedLivraison?.pays}</h5>
										<h5>{orderData.selectedLivraison?.telephone}</h5>
									</Card.Body>
								</Card>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
				<Col lg={4} className="mb-4 d-flex align-items-stretch">
					<Accordion className="w-100">
						<Accordion.Item className="border-0 h-100" eventKey="1">
							<Accordion.Header>
								<h4 className="text-center mb-0 border-0">Adresse de Facturation</h4>
							</Accordion.Header>
							<Accordion.Body className="h-100 d-flex align-items-stretch">
								<Card className="text-center border-dark rounded w-100 h-100">
									<Card.Body className="d-flex flex-column justify-content-center">
										<h5>{orderData.selectedFacturation?.prenom} {orderData.selectedFacturation?.nom}</h5>
										<h5>{orderData.selectedFacturation?.rue}</h5>
										<h5>{orderData.selectedFacturation?.code_postal} {orderData.selectedFacturation?.ville}</h5>
										<h5>{orderData.selectedFacturation?.pays}</h5>
										<h5>{orderData.selectedFacturation?.telephone}</h5>
									</Card.Body>
								</Card>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
				<Col lg={4} className="mb-4 d-flex align-items-stretch">
					<Accordion className="w-100">
						<Accordion.Item className="border-0 h-100" eventKey="2">
							<Accordion.Header>
								<h4 className="text-center mb-0 border-0">Méthode de Livraison</h4>
							</Accordion.Header>
							<Accordion.Body className="h-100 d-flex align-items-stretch">
								<Card className="text-center border-dark rounded w-100 h-100">
									<Card.Body className="d-flex flex-column justify-content-center">
										<h5>{orderData.selectedCarrier?.carrier.nom}</h5>
										<p>{orderData.selectedCarrier?.methode.description}</p>
										<p>Prix : {formatPrice(orderData.selectedCarrier?.methode.prix)}</p>
									</Card.Body>
								</Card>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
			</Row>

			{/* Section Produits */}
			<Row className="mb-4">
				<Col>
					<h4 className="text-center">Produits</h4>
					<Row className="d-flex justify-content-center">
						{orderData.cartItems.map((item, index) => (
							<Col md={3} key={index} className="mb-3">
								<Card className="text-center border-dark rounded p-3 h-100">
									<img
										src="https://placehold.co/300"
										alt={item.produit.nom}
										className="img-fluid rounded mb-3"
										style={{ maxWidth: "100%", maxHeight: "300px" }}
									/>
									<h5>{item.produit.nom}</h5>
									<p>Référence : {item.produit.reference}</p>
									<p>Quantité : {item.quantite}</p>
									<p>Prix Unitaire : {formatPrice(item.produit.prix_ttc)}</p>
									<p>Prix Total : {formatPrice(item.prix_total_produit)}</p>
								</Card>
							</Col>
						))}
					</Row>
				</Col>
			</Row>

			{/* Section Totaux */}
			<Row className="mb-4 text-center">
				<Col>
					<h5>Total Produits : {formatPrice(orderData.totalPanier)}</h5>
				</Col>
				<Col>
					<h5>Prix de la Livraison : {formatPrice(orderData.selectedCarrier?.methode.prix || 0)}</h5>
				</Col>
				<Col>
					<h4>Total : {formatPrice(parseFloat(orderData.totalPanier) + parseFloat(orderData.selectedCarrier?.methode.prix || 0))}</h4>
				</Col>
			</Row>

			{/* Boutons de Paiement */}
			<Row className="mb-5 text-center">
				<Col>
					<Button variant="dark" size="lg" className="me-2">Payer par Carte Bancaire</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default OrderSummary;
