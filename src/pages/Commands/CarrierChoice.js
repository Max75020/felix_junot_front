import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import '../../assets/styles/Commandes/CarrierChoice.css';
import CarrierApi from '../Carrier/services/Carrier.api'; // Importation du service API
import { useNavigate } from 'react-router-dom'; // Import de useNavigate pour la navigation programmatique

const CarrierChoice = () => {
	const [carriers, setCarriers] = useState([]);
	const [selectedCarrier, setSelectedCarrier] = useState(null);
	const navigate = useNavigate(); // Hook pour naviguer programmatique

	// Récupération des transporteurs depuis l'API
	useEffect(() => {
		const fetchCarriers = async () => {
			try {
				const response = await CarrierApi.getAllCarriers();
				setCarriers(response['hydra:member'] || []); // Utilise les données correctement issues de l'API Hydra
			} catch (error) {
				console.error('Erreur lors de la récupération des transporteurs :', error);
			}
		};
		fetchCarriers();
	}, []);

	// Gestionnaire de sélection d'un transporteur
	const handleSelectCarrier = (id) => {
		setSelectedCarrier(id);
	};

	const handleOrderSummary = () => {
		if (carriers.length > 0) {
			navigate("/order-summary"); // Navigation conditionnelle
		}
	};

	return (
		<Container fluid className="carrier-choice-container my-5">
			<Row className="mb-5">
				<Col>
					<h1 className="text-center">MÉTHODE DE LIVRAISON</h1>
				</Col>
			</Row>

			{/* Liste des transporteurs */}
			{carriers.map((carrier) => (
				<div key={carrier['@id']} className="carrier-section mb-5">
					<h2 className="text-center mb-4">{carrier.nom}</h2>

					<Row className="d-flex flex-column flex-md-row gap-4 align-items-center justify-content-center align-content-center">
						{carrier.methodeLivraison && carrier.methodeLivraison.length > 0 ? (
							carrier.methodeLivraison.map((methode) => (
								<Card
									key={methode.id_methode_livraison}
									className={`carrier-card d-flex justify-content-center col-xs-10 col-sm-6 col-md-5 col-lg-4 col-xl-10 ${selectedCarrier === carrier.id ? 'border-dark shadow-lg' : ''}`}
									onClick={() => handleSelectCarrier(carrier.id)}
									style={{
										cursor: 'pointer',
										transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
									}}
								>
									<Row className="align-items-center flex-column flex-xl-row">
										<Col xs={12} xl={3} className="d-flex justify-content-center mb-3 mt-3">
											<Card.Img
												variant="left"
												src="https://via.placeholder.com/300" // Image par défaut (remplacer si nécessaire)
												className="carrier-image img-fluid rounded"
												style={{ objectFit: 'cover' }}
											/>
										</Col>
										<Col xs={12} xl={7} className="d-flex flex-column align-items-center align-items-md-start my-3 text-center text-xl-start">
											<Card.Body>
												<Card.Title className="mb-3 text-align-center" style={{ fontSize: '1.5em' }}>
													{methode.nom.toUpperCase()}
												</Card.Title>
												<Card.Text>{methode.description}</Card.Text>
											</Card.Body>
										</Col>
										<Col xs={12} xl={2} className="d-flex flex-column flex-xl-row align-items-center justify-content-center mb-3 gap-4">
											<span className="carrier-price fw-bold" style={{ fontSize: '1.2em' }}>
												{methode.prix} €
											</span>
											<Form.Check
												type="radio"
												id={`carrier-${methode.id_methode_livraison}`}
												name="carrier"
												value={methode.id_methode_livraison}
												checked={selectedCarrier === carrier.id}
												onChange={() => handleSelectCarrier(carrier.id)}
												className="carrier-input"
											/>
										</Col>
									</Row>
								</Card>
							))
						) : (
							<Col className="text-center">
								<p>Aucune méthode de livraison disponible.</p>
							</Col>
						)}
					</Row>
				</div>
			))}

			{/* Bouton Étape suivante */}
			<Row className="mt-5">
				<Col className="d-flex align-items-center justify-content-center">
					<Button
						className="d-flex align-items-center justify-content-center gap-2"
						variant="dark"
						size="lg"
						disabled={selectedCarrier === null} // Désactive le bouton tant qu'aucun transporteur n'est sélectionné
						onClick={handleOrderSummary}
					>
						Étape Suivante
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default CarrierChoice;
