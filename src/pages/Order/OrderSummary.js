// Importation des bibliothèques React et des hooks nécessaires
import React from 'react';
// Importation des composants React-Bootstrap pour la mise en page
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
// Importation du contexte OrderContext pour accéder aux données de commande
import { useOrder } from '../../context/OrderContext';
// Importation des styles spécifiques à cette page
import '../../assets/styles/Order/OrderSummary.css';

const OrderSummary = () => {
	// Récupération des données de commande et de la méthode de paiement depuis le contexte
	const { orderData, makePayment } = useOrder();

	// Fonction utilitaire pour formater les prix en euros
	const formatPrice = (price) => {
		return new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
		}).format(price);
	};

	// Fonction pour obtenir l'URL de l'image de couverture d'un produit
	const getCoverImageUrl = (produit) => {
		const coverImage = produit.images?.find((image) => image.cover);
		return coverImage ? `${process.env.REACT_APP_URL_SERVER}/${coverImage.Chemin}` : "https://placehold.co/400";
	};

	return (
		<Container fluid className="order-summary-container my-5">
			{/* Titre de la page */}
			<Row className="mb-5">
				<Col>
					<h1 className="text-center">Récapitulatif de Commande</h1>
				</Col>
			</Row>

			{/* Section des adresses et de la méthode de livraison */}
			<Row className="mb-4 d-flex flex-lg-row flex-column align-items-stretch">
				{/* Adresse de livraison */}
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

				{/* Adresse de facturation */}
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

				{/* Méthode de livraison */}
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

			{/* Section des produits */}
			<Row className="mb-4">
				<Col>
					<h4 className="text-center mb-4">Produits</h4>
					<Row className="d-flex justify-content-center gap-4">
						{orderData.cartItems.map((item, index) => (
							<div key={index} className="border border-dark rounded p-3 position-relative" style={{ maxWidth: "300px" }}>
								<h4 className="text-center mt-4 text-dark">{item.produit.nom}</h4>
								<img
									src={getCoverImageUrl(item.produit)}
									alt={item.produit.nom}
									className="mx-auto d-block img-fluid my-3 rounded"
									style={{ width: "100%", height: "250px", objectFit: "cover" }}
								/>
								<div className="d-flex flex-column align-items-center">
									<h4 className="text-dark">RÉFÉRENCE</h4>
									<p className="text-muted p-card">{item.produit.reference}</p>

									<h4 className="text-dark">QUANTITÉ</h4>
									<p className="text-muted p-card">{item.quantite}</p>

									<h4 className="text-dark">PRIX UNITAIRE</h4>
									<p className="text-muted p-card">{formatPrice(item.produit.prix_ttc)}</p>

									<h4 className="text-dark">PRIX TOTAL</h4>
									<p className="fw-bold">{formatPrice(item.prix_total_produit)}</p>
								</div>
							</div>
						))}
					</Row>
				</Col>
			</Row>

			{/* Section des totaux */}
			<Row className="mb-4 text-center align-items-center justify-content-center">
				<Col xs={12} sm={4} className="d-flex flex-column mb-3 mb-sm-0">
					<h4 className="mb-1 text-secondary">Total Produits</h4>
					<h4 className="fw-bold text-secondary">{formatPrice(orderData.totalPanier)}</h4>
				</Col>
				<Col xs={12} sm={4} className="d-flex flex-column mb-3 mb-sm-0">
					<h4 className="mb-1 text-secondary">Prix de la Livraison</h4>
					<h4 className="fw-bold text-secondary">{formatPrice(orderData.selectedCarrier?.methode.prix || 0)}</h4>
				</Col>
				<Col xs={12} sm={4} className="d-flex flex-column">
					<h4 className="mb-1 text-dark">Total</h4>
					<h4 className="fw-bold text-dark">{formatPrice(orderData.totalCommande)}</h4>
				</Col>
			</Row>

			{/* Bouton pour effectuer le paiement */}
			<Row className="mb-5 text-center">
				<Col>
					<Button onClick={() => makePayment(orderData)} variant="dark" size="lg" className="me-2">Payer par Carte Bancaire</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default OrderSummary;
