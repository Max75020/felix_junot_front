import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import '../../assets/styles/Commandes/CarrierChoice.css';

const CarrierChoice = () => {
	const [carriers, setCarriers] = useState([]);
	const [selectedCarrier, setSelectedCarrier] = useState(null);

	// Simuler la récupération des transporteurs (à remplacer par un appel API réel si nécessaire)
	useEffect(() => {
		const mockCarriers = [
			{
				id: 1,
				nom: 'Transporteur 1',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam aliquam sapien.',
				prix: '7,95€',
				image: 'https://via.placeholder.com/300',
			},
			{
				id: 2,
				nom: 'Transporteur 2',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam aliquam sapien.',
				prix: 'Gratuit',
				image: 'https://via.placeholder.com/300',
			},
		];
		setCarriers(mockCarriers);
	}, []);

	// Gestionnaire de sélection d'un transporteur
	const handleSelectCarrier = (id) => {
		setSelectedCarrier(id);
	};

	return (
		<Container fluid className="carrier-choice-container my-5">
			<Row className="mb-5">
				<Col>
					<h1 className="text-center">MÉTHODE DE LIVRAISON</h1>
				</Col>
			</Row>

			{/* Liste des transporteurs */}
			<Row className="d-flex flex-column flex-md-row gap-4 align-items-center justify-content-center align-content-center">
				{carriers.map((carrier) => (
					<Card
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
									src={carrier.image}
									className="carrier-image img-fluid rounded"
									style={{ objectFit: 'cover' }}
								/>
							</Col>
							<Col xs={12} xl={7} className="d-flex flex-column align-items-center align-items-md-start my-3 text-center text-xl-start">
								<Card.Body>
									<Card.Title className="mb-3 text-align-center" style={{ fontSize: '1.5em' }}>
										{carrier.nom.toUpperCase()}
									</Card.Title>
									<Card.Text>{carrier.description}</Card.Text>
								</Card.Body>
							</Col>
							<Col xs={12} xl={2} className="d-flex flex-column flex-xl-row align-items-center justify-content-center mb-3 gap-4">
								<span className="carrier-price fw-bold" style={{ fontSize: '1.2em' }}>
									{carrier.prix}
								</span>
								<Form.Check
									type="radio"
									id={`carrier-${carrier.id}`}
									name="carrier"
									value={carrier.id}
									checked={selectedCarrier === carrier.id}
									onChange={() => handleSelectCarrier(carrier.id)}
									className="carrier-input"
								/>
							</Col>
						</Row>
					</Card>
				))}
			</Row>

			{/* Bouton Étape suivante */}
			<Row className="mt-5">
				<Col className="d-flex align-items-center justify-content-center">
					<Button
						className="d-flex align-items-center justify-content-center gap-2"
						variant="dark"
						size="lg"
						disabled={selectedCarrier === null} // Désactive le bouton tant qu'aucun transporteur n'est sélectionné
					>
						Étape Suivante
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default CarrierChoice;
