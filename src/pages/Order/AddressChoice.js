import React, { useState, useEffect } from 'react'; // Importation des hooks useState et useEffect depuis la bibliothèque react
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap'; // Importation des composants depuis la bibliothèque react-bootstrap
import AdresseApi from '../Adresses/services/Adresses.api'; // Importation du service API pour récupérer les adresses
import { useNavigate } from "react-router-dom"; // Importation de useNavigate pour gérer la navigation
import { HiArrowLongRight } from "react-icons/hi2"; // Importation de l'icône flèche droite depuis react-icons/hi
import '../../assets/styles/Order/AddressChoice.css'; // Importation du fichier de styles pour la page
import { useOrder } from '../../context/OrderContext'; // Importation du contexte OrderContext pour partager les données de commande

const AddressChoice = () => {
	// Déclaration des états pour gérer les adresses, le chargement, et les adresses sélectionnées
	const [adresses, setAdresses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedLivraison, setSelectedLivraison] = useState(null);
	const [selectedFacturation, setSelectedFacturation] = useState(null);

	const navigate = useNavigate();
	const { updateSelectedLivraison, updateSelectedFacturation } = useOrder();

	// Fonction pour ajouter une nouvelle adresse
	const handleAddNewAddress = () => {
		// Redirige vers la page de création d'une nouvelle adresse
		navigate("/adresses/add", { state: { fromAddressChoice: true } });
	};

	// Fonction pour éditer une adresse existante
	const handleEditAddress = (id) => {
		// Redirige vers la page d'édition d'une adresse spécifique
		navigate(`/adresses/edit/${id}`, { state: { fromAddressChoice: true } });
	};

	// Fonction pour supprimer une adresse
	const handleDelete = async (id) => {
		try {
			// Supprime l'adresse via l'API et met à jour la liste des adresses
			await AdresseApi.deleteAdresse(id);
			setAdresses(adresses.filter((adresse) => adresse.id_adresse !== id));
		} catch (error) {
			console.error("Erreur lors de la suppression de l'adresse:", error);
		}
	};

	// Fonction pour récupérer les adresses lors du chargement du composant
	useEffect(() => {
		const fetchAdresses = async () => {
			try {
				setLoading(true);
				// Appel à l'API pour récupérer toutes les adresses
				const response = await AdresseApi.getAllAdresses();
				setAdresses(response['hydra:member']);
			} catch (error) {
				console.error('Erreur lors de la récupération des adresses:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchAdresses();
	}, []);

	// Fonction pour sélectionner une adresse de livraison
	const handleLivraisonSelect = (adresse) => {
		setSelectedLivraison(adresse.id_adresse);
		updateSelectedLivraison(adresse); // Met à jour l'adresse de livraison dans OrderContext
	};

	// Fonction pour sélectionner une adresse de facturation
	const handleFacturationSelect = (adresse) => {
		setSelectedFacturation(adresse.id_adresse);
		updateSelectedFacturation(adresse); // Met à jour l'adresse de facturation dans OrderContext
	};

	// Fonction pour rendre les cartes d'adresses pour l'affichage
	const renderAdresses = (adresses, type) => (
		<Row className='col-12 mx-auto d-flex align-items-center flex-column flex-md-row justify-content-center'>
			{adresses.map((adresse) => (
				<Col key={adresse.id_adresse} xs={8} sm={7} md={5} lg={4} xl={3} className="mb-4">
					<Card
						className={`text-center border-dark position-relative card-hover address-card ${type === "Livraison" && selectedLivraison === adresse.id_adresse ? 'selected' : ''} ${type === "Facturation" && selectedFacturation === adresse.id_adresse ? 'selected' : ''}`}
						onClick={() => type === "Livraison" ? handleLivraisonSelect(adresse) : handleFacturationSelect(adresse)}
					>
						<Card.Header className="d-flex align-items-center justify-content-between">
							<Form.Check
								type="radio"
								name={`adresse-${type}`}
								checked={type === "Livraison" ? selectedLivraison === adresse.id_adresse : selectedFacturation === adresse.id_adresse}
								onChange={() => type === "Livraison" ? handleLivraisonSelect(adresse) : handleFacturationSelect(adresse)}
							/>
							<h6 className="mb-0">{adresse.nom_adresse}</h6>
						</Card.Header>
						<Card.Body>
							<Card.Text>
								{adresse.prenom} {adresse.nom} <br />
								{adresse.rue} <br />
								{adresse.batiment} <br />
								{adresse.appartement} <br />
								{adresse.code_postal} <br />
								{adresse.ville} <br />
								{adresse.pays} <br />
								{adresse.telephone} <br />
							</Card.Text>
							<div className="d-flex flex-column justify-content-center">
								<Button onClick={(e) => { e.stopPropagation(); handleEditAddress(adresse.id_adresse); }} variant="dark" className="m-1 w-100">
									Modifier
								</Button>
								<Button
									variant="dark"
									className="m-1 w-100"
									onClick={(e) => { e.stopPropagation(); handleDelete(adresse.id_adresse); }}
								>
									Supprimer
								</Button>
							</div>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);

	// Fonction pour rediriger vers la page de choix du transporteur
	const handleCarrierChoice = () => {
		if (selectedLivraison && selectedFacturation) {
			navigate('/carrier-choice', { state: { selectedLivraison, selectedFacturation } });
		}
	};

	// Affiche un message de chargement pendant que les adresses sont en cours de récupération
	if (loading) {
		return (
			<Container className="my-5">
				<h1 className="text-center">Chargement des adresses...</h1>
			</Container>
		);
	}

	return (
		<Container className="my-5">
			<h1 className="text-center">Choix des Adresses</h1>

			{/* Section pour l'adresse de livraison */}
			<h2 className="mt-5 mb-5">Adresse de Livraison</h2>
			{renderAdresses(adresses.filter((adresse) => adresse.type === 'Livraison'), "Livraison")}

			{/* Section pour l'adresse de facturation */}
			<h2 className="mt-5 mb-5">Adresse de Facturation</h2>
			{renderAdresses(adresses.filter((adresse) => adresse.type === 'Facturation'), "Facturation")}

			{/* Bouton pour ajouter une nouvelle adresse */}
			<div className="text-center mt-2 mb-5 d-flex flex-column justify-content-center align-items-center gap-5">
				<Button onClick={handleAddNewAddress} variant="dark" size="lg" className="m-2">
					Ajouter une nouvelle adresse
				</Button>
			</div>

			{/* Bouton pour continuer vers le choix du transporteur */}
			<div className="text-center mt-5 d-flex flex-column justify-content-center align-items-center gap-5">
				<Button
					size="lg"
					onClick={handleCarrierChoice}
					disabled={!selectedLivraison || !selectedFacturation}
					className="d-flex align-items-center justify-content-center gap-1"
					variant="dark"
				>
					Choix du transporteur
					<HiArrowLongRight className="ms-2" size={35} />
				</Button>
			</div>
		</Container>
	);
};

export default AddressChoice;
