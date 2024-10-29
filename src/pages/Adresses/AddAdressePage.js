import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom'; // Importer useNavigate pour gérer la redirection
import AdresseApi from '../../pages/Adresses/services/Adresses.api'; // Mettez à jour le chemin selon votre structure de projet
import { showSuccess, showError } from '../../services/popupService'; // Importer les fonctions de notification

const AddAdressePage = () => {
	// Gestion des états du formulaire
	const [adresseData, setAdresseData] = useState({
		nom_adresse: '',
		type: 'Livraison',
		prenom: '',
		nom: '',
		rue: '',
		batiment: '',
		appartement: '',
		code_postal: '',
		ville: '',
		pays: '',
		telephone: '',
		similaire: false,
	});

	const navigate = useNavigate(); // Hook pour gérer la navigation
	const location = useLocation(); // Hook pour récupérer les données de l'URL
	const fromAddressChoice = location.state?.fromAddressChoice; // Récupérer la valeur de fromAddressChoice depuis l'état de l'emplacement

	// Fonction de gestion des changements dans le formulaire
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setAdresseData((prevData) => ({
			...prevData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	// Fonction de gestion de la soumission du formulaire
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await AdresseApi.createAdresse(adresseData);
			showSuccess('Adresse créée avec succès !'); // Afficher une notification de succès
			// Redirection après la sauvegarde de l'adresse
			if (fromAddressChoice) {
				// Rediriger vers la page de choix de l'adresse si l'utilisateur venait de la page de choix de l'adresse
				navigate("/address-choice");
			} else {
				// Rediriger vers la liste des adresses si l'utilisateur venait de la liste des adresses
				navigate("/adresses");
			}
		} catch (error) {
			showError("Erreur lors de la création de l'adresse. Veuillez réessayer."); // Afficher une notification d'erreur
			console.error("Erreur lors de la création de l'adresse :", error);
		}
	};

	return (
		<Container className="my-5">
			<h1 className="text-center mb-4">Ajouter une adresse</h1>
			<Form onSubmit={handleSubmit}>
				<Row>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="nomAdresse">
							<Form.Label>Nom de l'adresse <span className="text-danger">*</span> :</Form.Label>
							<Form.Control
								type="text"
								name="nom_adresse"
								placeholder="Nom de l'adresse"
								value={adresseData.nom_adresse}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="typeAdresse">
							<Form.Label>Type d'Adresse <span className="text-danger">*</span> :</Form.Label>
							<Form.Select
								name="type"
								value={adresseData.type}
								onChange={handleChange}
								required
							>
								<option value="">Sélectionner le type d'adresse</option>
								<option value="Facturation">Facturation</option>
								<option value="Livraison">Livraison</option>
							</Form.Select>
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="prenom">
							<Form.Label>Prénom <span className="text-danger">*</span> :</Form.Label>
							<Form.Control
								type="text"
								name="prenom"
								placeholder="Prénom"
								value={adresseData.prenom}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="nom">
							<Form.Label>Nom <span className="text-danger">*</span> :</Form.Label>
							<Form.Control
								type="text"
								name="nom"
								placeholder="Nom"
								value={adresseData.nom}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="rue">
							<Form.Label>Rue/Avenue/Bd <span className="text-danger">*</span> :</Form.Label>
							<Form.Control
								type="text"
								name="rue"
								placeholder="Rue/Avenue/Bd"
								value={adresseData.rue}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="batiment">
							<Form.Label>Bâtiment :</Form.Label>
							<Form.Control
								type="text"
								name="batiment"
								placeholder="Bâtiment"
								value={adresseData.batiment}
								onChange={handleChange}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="appartement">
							<Form.Label>Appartement :</Form.Label>
							<Form.Control
								type="text"
								name="appartement"
								placeholder="Appartement"
								value={adresseData.appartement}
								onChange={handleChange}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="codePostal">
							<Form.Label>Code Postal <span className="text-danger">*</span> :</Form.Label>
							<Form.Control
								type="text"
								name="code_postal"
								placeholder="Code Postal"
								value={adresseData.code_postal}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="ville">
							<Form.Label>Ville <span className="text-danger">*</span> :</Form.Label>
							<Form.Control
								type="text"
								name="ville"
								placeholder="Ville"
								value={adresseData.ville}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="pays">
							<Form.Label>Pays <span className="text-danger">*</span> :</Form.Label>
							<Form.Control
								type="text"
								name="pays"
								placeholder="Pays"
								value={adresseData.pays}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
					<Col xs={12} className="mb-3">
						<Form.Group controlId="telephone">
							<Form.Label>Tel <span className="text-danger">*</span> :</Form.Label>
							<Form.Control
								type="text"
								name="telephone"
								placeholder="Numéro de téléphone"
								value={adresseData.telephone}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
					<Col xs={12} className="mb-3">
						<Form.Group controlId="similaire">
							<Form.Check
								type="checkbox"
								label="Créer l'autre adresse automatiquement"
								name="similaire"
								checked={adresseData.similaire}
								onChange={handleChange}
							/>
						</Form.Group>
					</Col>
				</Row>
				<div className="text-center mt-4">
					<Button variant="dark" type="submit">
						Valider
					</Button>
				</div>
			</Form>
		</Container>
	);
};

export default AddAdressePage;
