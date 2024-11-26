import React, { useState, useEffect } from 'react'; // Importer React et les hooks useState et useEffect pour la gestion de l'état et les effets secondaires
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; // Importer les composants Bootstrap pour la mise en page et le formulaire
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Importer useParams, useNavigate et useLocation pour la gestion de la navigation et des paramètres d'URL
import AdresseApi from './services/Adresses.api'; // Importer le service AdresseApi pour gérer les requêtes relatives aux adresses
import { showSuccess, showError } from '../../services/popupService'; // Importer les fonctions de notification pour afficher des messages de succès ou d'erreur

const EditAdressePage = () => {
	// Récupérer l'ID de l'adresse à partir de l'URL
	const { id } = useParams(); // Extraire l'ID de l'adresse de l'URL pour déterminer quelle adresse doit être modifiée
	const navigate = useNavigate(); // Utiliser pour rediriger l'utilisateur vers une autre page
	const location = useLocation(); // Récupérer les informations de l'URL ou de l'état précédent
	const fromAddressChoice = location.state?.fromAddressChoice; // Savoir si l'utilisateur vient de la page de choix d'adresse pour la redirection après la mise à jour

	// État local pour stocker les informations de l'adresse
	const [adresseData, setAdresseData] = useState({
		nom_adresse: '', // Nom de l'adresse (par exemple, "Maison" ou "Travail")
		type: 'Livraison', // Type d'adresse par défaut est "Livraison"
		prenom: '', // Prénom de la personne associée à l'adresse
		nom: '', // Nom de la personne associée à l'adresse
		rue: '', // Rue, avenue, boulevard, etc.
		batiment: '', // Informations de bâtiment (optionnel)
		appartement: '', // Informations d'appartement (optionnel)
		code_postal: '', // Code postal de l'adresse
		ville: '', // Ville de l'adresse
		pays: '', // Pays de l'adresse
		telephone: '', // Numéro de téléphone de contact
	});

	// Charger les données de l'adresse à modifier lors du montage du composant
	useEffect(() => {
		const fetchAdresse = async () => {
			try {
				const response = await AdresseApi.getAdresseById(id); // Appeler l'API pour récupérer les informations de l'adresse par ID

				// Mettre à jour les données de l'adresse avec la réponse de l'API
				setAdresseData((prevData) => ({
					...prevData, // Conserver les valeurs actuelles
					nom_adresse: response.nom_adresse || '', // Mettre à jour les champs avec les valeurs de la réponse de l'API
					type: response.type || 'Livraison', // Mettre à jour le type d'adresse avec la valeur de la réponse de l'API
					prenom: response.prenom || '', // Mettre à jour le prénom avec la valeur de la réponse de l'API
					nom: response.nom || '', // Mettre à jour le nom avec la valeur de la réponse de l'API
					rue: response.rue || '', // Mettre à jour la rue avec la valeur de la réponse de l'API
					batiment: response.batiment || '', // Mettre à jour le bâtiment avec la valeur de la réponse de l'API
					appartement: response.appartement || '', // Mettre à jour l'appartement avec la valeur de la réponse de l'API
					code_postal: response.code_postal || '', // Mettre à jour le code postal avec la valeur de la réponse
					ville: response.ville || '', // Mettre à jour la ville avec la valeur de la réponse de l'API
					pays: response.pays || '', // Mettre à jour le pays avec la valeur de la réponse de l'API
					telephone: response.telephone || '', // Mettre à jour le téléphone avec la valeur de la réponse de l'API
				}));
			} catch (error) {
				showError("Erreur lors du chargement de l'adresse."); // Afficher une notification d'erreur si les données ne peuvent être chargées
				console.error('Erreur:', error); // Afficher l'erreur dans la console pour le débogage
			}
		};

		fetchAdresse(); // Appeler la fonction pour récupérer les données de l'adresse
	}, [id]); // Exécuter cet effet à chaque changement d'ID dans l'URL

	// Fonction de gestion des changements dans le formulaire
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target; // Extraire les informations nécessaires de l'élément ciblé
		setAdresseData((prevData) => ({
			...prevData, // Conserver les valeurs actuelles
			[name]: type === 'checkbox' ? checked : value, // Mettre à jour la valeur du champ (coché ou non pour les checkbox)
		}));
	};

	// Fonction de gestion de la soumission du formulaire pour la mise à jour
	const handleSubmit = async (e) => {
		e.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire
		try {
			await AdresseApi.updateAdresse(id, adresseData); // Appeler l'API pour mettre à jour les informations de l'adresse
			showSuccess('Adresse mise à jour avec succès !'); // Afficher une notification de succès si la mise à jour réussit

			// Redirection après la sauvegarde de l'adresse mise à jour
			if (fromAddressChoice) {
				// Rediriger vers la page de choix de l'adresse si l'utilisateur venait de la page de choix de l'adresse
				navigate("/address-choice");
			} else {
				// Rediriger vers la liste des adresses si l'utilisateur venait de la liste des adresses
				navigate("/adresses");
			}
		} catch (error) {
			showError("Erreur lors de la mise à jour de l'adresse."); // Afficher une notification d'erreur en cas de problème lors de la mise à jour
			console.error('Erreur lors de la mise à jour:', error); // Afficher l'erreur dans la console pour le débogage
		}
	};

	// Affichage du formulaire de modification de l'adresse
	return (
		<Container className="my-5">
			<h1 className="text-center mb-4">Modifier l'adresse</h1> {/* Titre de la page */}
			<Form onSubmit={handleSubmit}> {/* Formulaire de modification de l'adresse */}
				<Row>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="nomAdresse">
							<Form.Label>Nom de l'adresse <span className="text-danger">*</span> :</Form.Label> {/* Champ pour le nom de l'adresse */}
							<Form.Control
								type="text"
								name="nom_adresse" // Nom du champ dans l'état local
								placeholder="Nom de l'adresse" // Placeholder pour le champ
								value={adresseData.nom_adresse || ''} // Valeur actuelle de l'état pour ce champ
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Champ pour le type d'adresse (Livraison ou Facturation) */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="typeAdresse">
							<Form.Label>Type d'Adresse <span className="text-danger">*</span> :</Form.Label> {/* Type de l'adresse (choix entre Livraison et Facturation) */}
							<Form.Select
								name="type"
								value={adresseData.type || 'Facturation'} // Valeur actuelle de l'état pour ce champ
								onChange={handleChange} // Mettre à jour l'état lorsqu'une sélection est effectuée
								required // Champ requis pour la soumission du formulaire
							>
								<option value="Facturation">Facturation</option> {/* Option pour une adresse de facturation */}
								<option value="Livraison">Livraison</option> {/* Option pour une adresse de livraison */}
							</Form.Select>
						</Form.Group>
					</Col>
					{/* Champs pour les autres informations de l'adresse (prénom, nom, rue, etc.) */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="prenom">
							<Form.Label>Prénom <span className="text-danger">*</span> :</Form.Label> {/* Prénom de la personne */}
							<Form.Control
								type="text"
								name="prenom" // Nom du champ dans l'état local
								placeholder="Prénom" // Placeholder pour le champ
								value={adresseData.prenom || ''} // Valeur actuelle de l'état pour ce champ
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Continuer avec les champs pour le nom, rue, bâtiment, appartement, code postal, ville, pays, et téléphone */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="nom">
							<Form.Label>Nom <span className="text-danger">*</span> :</Form.Label> {/* Nom de la personne */}
							<Form.Control
								type="text"
								name="nom" // Nom du champ dans l'état local
								placeholder="Nom" // Placeholder pour le champ
								value={adresseData.nom || ''} // Valeur actuelle de l'état pour ce champ
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Champ pour la rue */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="rue">
							<Form.Label>Rue/Avenue/Bd <span className="text-danger">*</span> :</Form.Label> {/* Rue de l'adresse */}
							<Form.Control
								type="text"
								name="rue" // Nom du champ dans l'état local
								placeholder="Rue/Avenue/Bd" // Placeholder pour le champ
								value={adresseData.rue || ''} // Valeur actuelle de l'état pour ce champ
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Champ pour le bâtiment (optionnel) */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="batiment">
							<Form.Label>Bâtiment :</Form.Label> {/* Bâtiment (optionnel) */}
							<Form.Control
								type="text"
								name="batiment" // Nom du champ dans l'état local
								placeholder="Bâtiment" // Placeholder pour le champ
								value={adresseData.batiment || ''} // Valeur actuelle de l'état pour ce champ
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
							/>
						</Form.Group>
					</Col>
					{/* Champs restants pour l'appartement, code postal, ville, pays, et téléphone */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="appartement">
							<Form.Label>Appartement :</Form.Label> {/* Appartement (optionnel) */}
							<Form.Control
								type="text"
								name="appartement" // Nom du champ dans l'état local
								placeholder="Appartement" // Placeholder pour le champ
								value={adresseData.appartement || ''} // Valeur actuelle de l'état pour ce champ
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
							/>
						</Form.Group>
					</Col>
					{/* Code Postal */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="codePostal">
							<Form.Label>Code Postal <span className="text-danger">*</span> :</Form.Label> {/* Code postal de l'adresse */}
							<Form.Control
								type="text"
								name="code_postal" // Nom du champ dans l'état local
								placeholder="Code Postal" // Placeholder pour le champ
								value={adresseData.code_postal || ''} // Valeur actuelle de l'état pour ce champ
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Ville */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="ville">
							<Form.Label>Ville <span className="text-danger">*</span> :</Form.Label> {/* Ville de l'adresse */}
							<Form.Control
								type="text"
								name="ville" // Nom du champ dans l'état local
								placeholder="Ville" // Placeholder pour le champ
								value={adresseData.ville || ''} // Valeur actuelle de l'état pour ce champ
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Pays */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="pays">
							<Form.Label>Pays <span className="text-danger">*</span> :</Form.Label> {/* Pays de l'adresse */}
							<Form.Control
								type="text"
								name="pays" // Nom du champ dans l'état local
								placeholder="Pays" // Placeholder pour le champ
								value={adresseData.pays || ''} // Valeur actuelle de l'état pour ce champ
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Numéro de téléphone */}
					<Col xs={12} className="mb-3">
						<Form.Group controlId="telephone">
							<Form.Label>Tel <span className="text-danger">*</span> :</Form.Label> {/* Numéro de téléphone de contact */}
							<Form.Control
								type="text"
								name="telephone" // Nom du champ dans l'état local
								placeholder="Numéro de téléphone" // Placeholder pour le champ
								value={adresseData.telephone || ''} // Valeur actuelle de l'état pour ce champ
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
				</Row>
				{/* Bouton pour soumettre le formulaire et mettre à jour l'adresse */}
				<div className="text-center mt-4">
					<Button variant="dark" type="submit">
						Mettre à jour
					</Button>
				</div>
			</Form>
		</Container>
	);
};

export default EditAdressePage; // Exporter le composant par défaut