import React, { useState, useEffect } from 'react'; // Importation des hooks useState et useEffect depuis la bibliothèque react
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap'; // Importation des composants depuis la bibliothèque react-bootstrap
import '../../assets/styles/Order/CarrierChoice.css'; // Importation du fichier de styles pour la page
import CarrierApi from '../Carrier/services/Carrier.api'; // Importation du service API pour récupérer les transporteurs
import { useNavigate } from 'react-router-dom'; // Importation de useNavigate pour gérer la navigation
import { useOrder } from '../../context/OrderContext'; // Importation du contexte OrderContext pour partager les données de commande

const CarrierChoice = () => {
	// Déclaration des états pour gérer les transporteurs et la méthode de livraison sélectionnée
	const [carriers, setCarriers] = useState([]);
	const [selectedMethode, setSelectedMethode] = useState(null); // Stocke la méthode de livraison sélectionnée
	const navigate = useNavigate();

	// Utilisation du contexte pour sauvegarder la méthode de livraison sélectionnée
	const { updateSelectedCarrier } = useOrder();

	// Récupération des transporteurs depuis l'API lors du montage du composant
	useEffect(() => {
		const fetchCarriers = async () => {
			try {
				// Appel à l'API pour récupérer tous les transporteurs
				const response = await CarrierApi.getAllCarriers();
				setCarriers(response['hydra:member'] || []); // Stocke les transporteurs dans l'état
			} catch (error) {
				console.error('Erreur lors de la récupération des transporteurs :', error);
			}
		};
		fetchCarriers();
	}, []);

	// Fonction pour sélectionner une méthode de livraison
	const handleSelectMethode = (carrier, methode) => {
		// Met à jour l'état avec la méthode de livraison sélectionnée
		setSelectedMethode({ carrier, methode });
		updateSelectedCarrier({ carrier, methode }); // Met à jour le contexte OrderContext
	};

	// Fonction pour passer à l'étape du récapitulatif de commande
	const handleOrderSummary = () => {
		if (selectedMethode) {
			navigate("/order-summary"); // Navigation vers l'étape suivante du tunnel de commande
		}
	};

	return (
		<Container fluid className="carrier-choice-container my-5">
			{/* Titre de la page */}
			<Row className="mb-5">
				<Col>
					<h1 className="text-center">MÉTHODE DE LIVRAISON</h1>
				</Col>
			</Row>

			{/* Liste des transporteurs et de leurs méthodes de livraison */}
			{carriers.map((carrier) => (
				<div key={carrier['@id']} className="carrier-section mb-5">
					{/* Nom du transporteur */}
					<h2 className="text-center mb-4">{carrier.nom}</h2>

					<Row className="d-flex flex-column flex-md-row gap-4 align-items-center justify-content-center align-content-center">
						{carrier.methodeLivraison && carrier.methodeLivraison.length > 0 ? (
							// Affichage des différentes méthodes de livraison pour chaque transporteur
							carrier.methodeLivraison.map((methode) => (
								<Card
									key={methode.id_methode_livraison}
									className={`carrier-card d-flex justify-content-center col-xs-10 col-sm-6 col-md-5 col-lg-4 col-xl-10 ${selectedMethode?.methode.id_methode_livraison === methode.id_methode_livraison ? 'border-dark shadow-lg' : ''}`}
									onClick={() => handleSelectMethode(carrier, methode)}
									style={{
										cursor: 'pointer',
										transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
									}}
								>
									{/* Affichage du contenu de la méthode de livraison */}
									<Row className="align-items-center flex-column flex-xl-row">
										<Col xs={12} xl={10} className="d-flex flex-column align-items-center align-items-md-start my-3 text-center text-xl-start">
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
											{/* Bouton radio pour sélectionner la méthode de livraison */}
											<Form.Check
												type="radio"
												id={`carrier-${methode.id_methode_livraison}`}
												name="carrier"
												value={methode.id_methode_livraison}
												checked={selectedMethode?.methode.id_methode_livraison === methode.id_methode_livraison}
												onChange={() => handleSelectMethode(carrier, methode)}
												className="carrier-input"
											/>
										</Col>
									</Row>
								</Card>
							))
						) : (
							// Message s'il n'y a aucune méthode de livraison disponible
							<Col className="text-center">
								<p>Aucune méthode de livraison disponible.</p>
							</Col>
						)}
					</Row>
				</div>
			))}

			{/* Bouton pour passer à l'étape suivante */}
			<Row className="mt-5">
				<Col className="d-flex align-items-center justify-content-center">
					<Button
						className="d-flex align-items-center justify-content-center gap-2"
						variant="dark"
						size="lg"
						disabled={!selectedMethode} // Le bouton est désactivé tant qu'aucune méthode n'est sélectionnée
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
