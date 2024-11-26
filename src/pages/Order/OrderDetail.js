// Importation des librairies de base React et des hooks nécessaires
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Importation du service API pour récupérer les informations de commande
import orderApi from './services/Order.api';

// Importation des composants Bootstrap pour la mise en page et le rendu visuel
import { Container, Row, Col, Card, ListGroup, Spinner, Alert, Image } from 'react-bootstrap';

// Importation des styles CSS spécifiques à la page de détails de commande
import '../../assets/styles/Order/OrderDetail.css';

const OrderDetail = () => {
	// Utilisation de useParams pour récupérer l'ID de la commande depuis l'URL
	const { id } = useParams();

	// États pour stocker la commande, le statut de chargement, et les erreurs éventuelles
	const [order, setOrder] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Effet de chargement pour récupérer les détails de la commande lors du montage du composant
	useEffect(() => {
		const fetchOrderDetail = async () => {
			try {
				const data = await orderApi.getOrderById(id); // Appel à l'API pour obtenir les détails de la commande
				setOrder(data); // Mise à jour de l'état avec les données récupérées
			} catch (error) {
				// Mise à jour de l'état d'erreur si la récupération échoue
				setError("Erreur lors de la récupération de la commande.");
				console.error("Erreur lors de la récupération de la commande:", error);
			} finally {
				// Fin du chargement une fois que les données ont été récupérées ou en cas d'erreur
				setIsLoading(false);
			}
		};

		fetchOrderDetail();
	}, [id]); // Dépendance sur l'ID pour relancer l'effet si l'ID change

	// Affichage d'un spinner si les données sont en cours de chargement
	if (isLoading) {
		return (
			<div className="text-center mt-5">
				<Spinner animation="border" variant="dark" />
				<p>Chargement des détails de la commande...</p>
			</div>
		);
	}

	// Affichage d'une alerte en cas d'erreur
	if (error) {
		return (
			<Alert variant="danger" className="text-center">
				Erreur : {error}
			</Alert>
		);
	}

	return (
		<Container fluid className="order-detail-container p-4">
			{order ? (
				<>
					{/* Titre de la page de détails de commande */}
					<Row className="mb-4">
						<Col>
							<h1 className="text-center">Détails de la commande</h1>
						</Col>
					</Row>

					{/* Section de résumé de la commande */}
					<Row className="justify-content-center">
						<Col md={8}>
							<Card className="mb-4 shadow-sm">
								<Card.Header className="bg-dark text-white text-center">
									<h5>Commande {order.reference}</h5>
								</Card.Header>
								<Card.Body>
									<ListGroup variant="flush">
										<ListGroup.Item>
											<strong>Date de commande : </strong>
											{new Date(order.date_commande).toLocaleDateString('fr-FR')}
										</ListGroup.Item>
										<ListGroup.Item>
											<strong>État de la commande : </strong>
											<span>{order.etat_commande.libelle}</span>
										</ListGroup.Item>
										<ListGroup.Item>
											<strong>Total de la commande : </strong>
											{order.prix_total_commande}€
										</ListGroup.Item>
									</ListGroup>
								</Card.Body>
							</Card>
						</Col>
					</Row>

					{/* Section des produits de la commande */}
					<Row className="justify-content-center">
						<Col md={8}>
							<Card className="mb-4 shadow-sm">
								<Card.Header className="bg-secondary text-white text-center">
									<h5>Produits de la commande</h5>
								</Card.Header>
								<Card.Body>
									{order.commandeProduits && order.commandeProduits.length > 0 ? (
										order.commandeProduits.map((item, index) => (
											<Card key={index} className="mb-3 product-card-detail">
												<Card.Body>
													<Row className="align-items-center">
														{/* Image du produit */}
														<Col xs={12} sm={6} md={8} lg={6} className="order-detail-text-align-image mb-3 mb-md-0">
															<Image
																src={`${process.env.REACT_APP_URL_SERVER}/${item.produit.urlCoverProduit}`}
																alt={item.produit.nom}
																className="image-mobile"
															/>
														</Col>
														{/* Détails du produit */}
														<Col xs={12} sm={6} md={4} lg={6}>
															<h5 className="text-center text-md-center">{item.produit.nom}</h5>
															<p className="text-center text-md-center"><strong>Référence :</strong> {item.produit.reference}</p>
															<p className="text-center text-md-center"><strong>Quantité :</strong> {item.quantite}</p>
															<p className="text-center text-md-center"><strong>Prix unitaire :</strong> {item.produit.prix_ttc}€</p>
															<p className="text-center text-md-center"><strong>Prix total :</strong> {item.prix_total_produit}€</p>
														</Col>
													</Row>
												</Card.Body>
											</Card>
										))
									) : (
										<p className="text-center">Aucun produit dans cette commande.</p>
									)}
								</Card.Body>
							</Card>
						</Col>
					</Row>

					{/* Section des informations de livraison */}
					<Row className="justify-content-center">
						<Col md={8}>
							<Card className="shadow-sm">
								<Card.Header className="bg-info text-white text-center">
									<h5>Informations de Livraison</h5>
								</Card.Header>
								<Card.Body>
									<p><strong>Transporteur :</strong> {order.transporteur.nom}</p>
									<p><strong>Méthode de livraison :</strong> {order.methodeLivraison.nom}</p>
									<p><strong>Description :</strong> {order.methodeLivraison.description}</p>
									<p><strong>Frais de livraison :</strong> {order.frais_livraison}€</p>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</>
			) : (
				<p>Aucune information de commande trouvée.</p>
			)}
		</Container>
	);
};

export default OrderDetail;
