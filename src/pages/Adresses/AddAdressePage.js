import React, { useState } from 'react'; // Importer React et le hook useState pour gérer l'état local du formulaire
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; // Importer des composants Bootstrap pour la mise en page et le formulaire
import { useNavigate, useLocation } from 'react-router-dom'; // Importer useNavigate et useLocation pour gérer la redirection et récupérer l'état de la page précédente
import AdresseApi from '../../pages/Adresses/services/Adresses.api'; // Importer le service AdresseApi pour gérer les requêtes relatives aux adresses
import { showSuccess, showError } from '../../services/popupService'; // Importer les fonctions de notification pour afficher des messages de succès ou d'erreur

const AddAdressePage = () => {
	// Gestion des états du formulaire pour stocker les valeurs des champs
	const [adresseData, setAdresseData] = useState({
		nom_adresse: '', // Nom de l'adresse (par exemple, "Maison" ou "Travail")
		type: 'Livraison', // Type d'adresse par défaut est "Livraison"
		prenom: '', // Prénom de la personne
		nom: '', // Nom de la personne
		rue: '', // Adresse de la rue, avenue, boulevard, etc.
		batiment: '', // Informations de bâtiment (optionnel)
		appartement: '', // Informations d'appartement (optionnel)
		code_postal: '', // Code postal de l'adresse
		ville: '', // Ville de l'adresse
		pays: '', // Pays de l'adresse
		telephone: '', // Numéro de téléphone de contact
		similaire: false, // Indique si une autre adresse doit être créée automatiquement
	});

	const navigate = useNavigate(); // Hook pour gérer la navigation entre les pages
	const location = useLocation(); // Hook pour récupérer les informations de l'URL ou de l'état précédent
	const fromAddressChoice = location.state?.fromAddressChoice; // Récupérer la valeur de fromAddressChoice depuis l'état pour savoir d'où vient l'utilisateur

	// Fonction de gestion des changements dans le formulaire
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target; // Extraire le nom, la valeur, le type, et l'état de la case à cocher de l'élément cible
		setAdresseData((prevData) => ({
			...prevData, // Conserver les valeurs actuelles
			[name]: type === 'checkbox' ? checked : value, // Mettre à jour la valeur du champ correspondant
		}));
	};

	// Fonction de gestion de la soumission du formulaire
	const handleSubmit = async (e) => {
		e.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire
		try {
			const response = await AdresseApi.createAdresse(adresseData); // Appeler l'API pour créer une nouvelle adresse avec les données du formulaire
			showSuccess('Adresse créée avec succès !'); // Afficher une notification de succès si l'adresse a été créée
			// Redirection après la sauvegarde de l'adresse
			if (fromAddressChoice) {
				// Rediriger vers la page de choix de l'adresse si l'utilisateur venait de la page de choix de l'adresse
				navigate("/address-choice");
			} else {
				// Rediriger vers la liste des adresses si l'utilisateur venait de la liste des adresses
				navigate("/adresses");
			}
		} catch (error) {
			showError("Erreur lors de la création de l'adresse. Veuillez réessayer."); // Afficher une notification d'erreur en cas de problème
			console.error("Erreur lors de la création de l'adresse :", error); // Afficher l'erreur dans la console pour le débogage
		}
	};

	return (
		<Container className="my-5">
			<h1 className="text-center mb-4">Ajouter une adresse</h1> {/* Titre de la page pour indiquer l'objectif de l'utilisateur */}
			<Form onSubmit={handleSubmit}> {/* Formulaire pour ajouter une nouvelle adresse */}
				<Row>
					{/* Champ pour le nom de l'adresse */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="nomAdresse">
							<Form.Label>Nom de l'adresse <span className="text-danger">*</span> :</Form.Label> {/* Nom de l'adresse avec une indication de champ obligatoire */}
							<Form.Control
								type="text"
								name="nom_adresse"
								placeholder="Nom de l'adresse" // Placeholder pour guider l'utilisateur sur la valeur à saisir
								value={adresseData.nom_adresse} // Valeur actuelle de l'état pour ce champ
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
								value={adresseData.type} // Valeur actuelle de l'état pour le type d'adresse
								onChange={handleChange} // Mettre à jour l'état lorsqu'une sélection est effectuée
								required // Champ requis pour la soumission du formulaire
							>
								<option value="">Sélectionner le type d'adresse</option> {/* Option par défaut */}
								<option value="Facturation">Facturation</option> {/* Option pour une adresse de facturation */}
								<option value="Livraison">Livraison</option> {/* Option pour une adresse de livraison */}
							</Form.Select>
						</Form.Group>
					</Col>
					{/* Champ pour le prénom */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="prenom">
							<Form.Label>Prénom <span className="text-danger">*</span> :</Form.Label> {/* Prénom de la personne */}
							<Form.Control
								type="text"
								name="prenom"
								placeholder="Prénom" // Placeholder pour indiquer la saisie à l'utilisateur
								value={adresseData.prenom} // Valeur actuelle de l'état pour le prénom
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Champ pour le nom */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="nom">
							<Form.Label>Nom <span className="text-danger">*</span> :</Form.Label> {/* Nom de la personne */}
							<Form.Control
								type="text"
								name="nom"
								placeholder="Nom" // Placeholder pour indiquer la saisie à l'utilisateur
								value={adresseData.nom} // Valeur actuelle de l'état pour le nom
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Champ pour la rue/avenue/boulevard */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="rue">
							<Form.Label>Rue/Avenue/Bd <span className="text-danger">*</span> :</Form.Label> {/* Adresse de la rue */}
							<Form.Control
								type="text"
								name="rue"
								placeholder="Rue/Avenue/Bd" // Placeholder pour indiquer la saisie à l'utilisateur
								value={adresseData.rue} // Valeur actuelle de l'état pour la rue
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Champ pour le bâtiment (optionnel) */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="batiment">
							<Form.Label>Bâtiment :</Form.Label> {/* Information sur le bâtiment, optionnelle */}
							<Form.Control
								type="text"
								name="batiment"
								placeholder="Bâtiment" // Placeholder pour indiquer la saisie à l'utilisateur
								value={adresseData.batiment} // Valeur actuelle de l'état pour le bâtiment (optionnel)
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
							/>
						</Form.Group>
					</Col>
					{/* Champ pour l'appartement (optionnel) */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="appartement">
							<Form.Label>Appartement :</Form.Label> {/* Information sur l'appartement, optionnelle */}
							<Form.Control
								type="text"
								name="appartement"
								placeholder="Appartement" // Placeholder pour indiquer la saisie à l'utilisateur
								value={adresseData.appartement} // Valeur actuelle de l'état pour l'appartement (optionnel)
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
							/>
						</Form.Group>
					</Col>
					{/* Champ pour le code postal */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="codePostal">
							<Form.Label>Code Postal <span className="text-danger">*</span> :</Form.Label>
							<Form.Control
								type="text"
								name="code_postal" // Nom du champ pour le code postal
								placeholder="Code Postal" // Placeholder pour indiquer la saisie à l'utilisateur
								value={adresseData.code_postal} // Valeur actuelle de l'état pour le code postal
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Champ pour la ville */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="ville">
							<Form.Label>Ville <span className="text-danger">*</span> :</Form.Label>
							<Form.Control
								type="text"
								name="ville" // Nom du champ pour la ville
								placeholder="Ville" // Placeholder pour indiquer la saisie à l'utilisateur
								value={adresseData.ville} // Valeur actuelle de l'état pour la ville
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Champ pour le pays */}
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="pays">
							<Form.Label>Pays <span className="text-danger">*</span> :</Form.Label>
							<Form.Control
								type="text"
								name="pays" // Nom du champ pour le pays
								placeholder="Pays" // Placeholder pour indiquer la saisie à l'utilisateur
								value={adresseData.pays} // Valeur actuelle de l'état pour le pays
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Champ pour le numéro de téléphone */}
					<Col xs={12} className="mb-3">
						<Form.Group controlId="telephone">
							<Form.Label>Tel <span className="text-danger">*</span> :</Form.Label>
							<Form.Control
								type="text"
								name="telephone" // Nom du champ pour le numéro de téléphone
								placeholder="Numéro de téléphone" // Placeholder pour indiquer la saisie à l'utilisateur
								value={adresseData.telephone} // Valeur actuelle de l'état pour le numéro de téléphone
								onChange={handleChange} // Mettre à jour l'état lorsqu'une saisie est effectuée
								required // Champ requis pour la soumission du formulaire
							/>
						</Form.Group>
					</Col>
					{/* Case à cocher pour créer une autre adresse automatiquement */}
					<Col xs={12} className="mb-3">
						<Form.Group controlId="similaire">
							<Form.Check
								type="checkbox"
								label="Créer l'autre adresse automatiquement" // Texte pour indiquer la fonctionnalité de la case à cocher
								name="similaire" // Nom du champ pour la case à cocher
								checked={adresseData.similaire} // Valeur actuelle de l'état pour la case à cocher
								onChange={handleChange} // Mettre à jour l'état lorsqu'une sélection est effectuée
							/>
						</Form.Group>
					</Col>
				</Row>
				{/* Bouton de validation du formulaire */}
				<div className="text-center mt-4">
					<Button variant="dark" type="submit">
						Valider
					</Button>
				</div>
			</Form>
		</Container>
	);
};

export default AddAdressePage; // Exporter le composant AddAdressePage pour l'utiliser dans d'autres fichiers
