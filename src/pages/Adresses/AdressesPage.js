import React, { useState, useEffect } from 'react'; // Importer React et les hooks useState et useEffect pour la gestion de l'état et les effets secondaires
import { Button, Card, Container, Row, Col } from 'react-bootstrap'; // Importer les composants Bootstrap pour la mise en page et la présentation
import AdresseApi from './services/Adresses.api'; // Importer le service AdresseApi pour gérer les requêtes relatives aux adresses
import { Link } from "react-router-dom"; // Importer Link pour gérer les liens internes dans l'application

/**
 * @module Adresses
 * @description Gestion des adresses, incluant l'affichage, l'ajout, la modification et la suppression.
 */

/**
 * @class AdressesPage
 * @memberof module:Adresses
 * @description Page principale pour afficher, ajouter, modifier et supprimer des adresses.
 * @returns {JSX.Element} Élément JSX représentant la page des adresses.
 */
const AdressesPage = () => {
	// État local pour stocker la liste des adresses et indiquer si les adresses sont en cours de chargement
	const [adresses, setAdresses] = useState([]); // Initialiser adresses avec un tableau vide
	const [loading, setLoading] = useState(true); // Initialiser loading à true pour indiquer que les adresses sont en cours de chargement

	/**
	 * Effet exécuté après le montage du composant pour récupérer la liste des adresses.
	 *
	 * Cet effet utilise une fonction asynchrone pour appeler l'API, mettre à jour
	 * l'état avec les adresses récupérées et gérer l'indicateur de chargement.
	 */
	useEffect(() => {
		/**
		 * Récupère toutes les adresses depuis l'API et met à jour l'état local.
		 *
		 * @async
		 * @function fetchAdresses
		 * @memberof module:Adresses
		 * @returns {Promise<void>} Une promesse résolue une fois les adresses récupérées ou en cas d'erreur.
		 */
		const fetchAdresses = async () => {
			try {
				setLoading(true); // Activer l'indicateur de chargement avant de récupérer les adresses
				const response = await AdresseApi.getAllAdresses(); // Appeler l'API pour récupérer toutes les adresses
				setAdresses(response["hydra:member"]); // Stocker les adresses reçues dans l'état
			} catch (error) {
				console.error('Erreur lors de la récupération des adresses:', error); // Afficher une erreur en cas d'échec de la requête
			} finally {
				setLoading(false); // Désactiver l'indicateur de chargement après la récupération des adresses, que cela ait réussi ou échoué
			}
		};

		fetchAdresses(); // Appeler la fonction de récupération des adresses
	}, []); // Le tableau vide en dépendance indique que cet effet ne s'exécute que lors du montage initial

	/**
	 * Supprime une adresse par son identifiant.
	 *
	 * Cette fonction appelle l'API pour supprimer l'adresse spécifiée, puis met à jour l'état local
	 * en filtrant l'adresse supprimée de la liste des adresses.
	 *
	 * @async
	 * @function handleDelete
	 * @memberof module:Adresses
	 * @param {number} id - L'identifiant de l'adresse à supprimer.
	 * @returns {Promise<void>} Une promesse résolue une fois la suppression terminée ou en cas d'erreur.
	 */
	const handleDelete = async (id) => {
		try {
			await AdresseApi.deleteAdresse(id); // Appeler l'API pour supprimer l'adresse par son id
			setAdresses(adresses.filter(adresse => adresse.id_adresse !== id)); // Mettre à jour l'état en filtrant les adresses supprimées
		} catch (error) {
			console.error('Erreur lors de la suppression de l\'adresse:', error); // Afficher une erreur en cas d'échec de la suppression
		}
	};

	// Filtrer les adresses par type pour obtenir les adresses de facturation et de livraison
	const adressesFacturation = adresses.filter(adresse => adresse.type === "Facturation"); // Filtrer les adresses de type "Facturation"
	const adressesLivraison = adresses.filter(adresse => adresse.type === "Livraison"); // Filtrer les adresses de type "Livraison"

	/**
	 * Rend une liste de cartes affichant les détails des adresses.
	 *
	 * Cette fonction génère une mise en page sous forme de grille contenant une carte pour chaque adresse.
	 * Chaque carte inclut les informations de l'adresse (nom, rue, ville, etc.) ainsi que des boutons pour modifier
	 * ou supprimer l'adresse.
	 *
	 * @function renderAdresses
	 * @memberof module:Adresses
	 * @param {Array<Object>} adresses - La liste des adresses à afficher.
	 * @returns {JSX.Element} Un composant JSX représentant les cartes des adresses.
	 */
	const renderAdresses = (adresses) => (
		<Row className='col-12 mx-auto d-flex align-items-center flex-column flex-md-row justify-content-center'>
			{adresses.map((adresse) => (
				<Col key={adresse.id_adresse} xs={8} sm={7} md={5} lg={4} xl={3} className="mb-4">
					<Card className="text-center border-dark">
						<Card.Header><h6>{adresse.nom_adresse}</h6></Card.Header> {/* Afficher le nom de l'adresse dans l'en-tête de la carte */}
						<Card.Body>
							<Card.Text>
								{adresse.prenom} {adresse.nom} <br /> {/* Afficher le prénom et le nom */}
								{adresse.rue} <br /> {/* Afficher la rue */}
								{adresse.batiment} <br /> {/* Afficher le bâtiment si disponible */}
								{adresse.appartement} <br /> {/* Afficher l'appartement si disponible */}
								{adresse.code_postal} <br /> {/* Afficher le code postal */}
								{adresse.ville} <br /> {/* Afficher la ville */}
								{adresse.pays} <br /> {/* Afficher le pays */}
								{adresse.telephone} <br /> {/* Afficher le numéro de téléphone */}
							</Card.Text>
							<div className="d-flex flex-column justify-content-center">
								<Link to={`/adresses/edit/${adresse.id_adresse}`} className="text-decoration-none"> {/* Lien pour éditer l'adresse */}
									<Button variant="dark" className="m-1 w-100">
										Modifier
									</Button>
								</Link>
								<Button variant="dark" className="m-1 w-100" onClick={() => handleDelete(adresse.id_adresse)}> {/* Bouton pour supprimer l'adresse */}
									Supprimer
								</Button>
							</div>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);

	/** Affichage pendant le chargement des adresses */
	if (loading) {
		return (
			<Container className="my-5">
				<h1 className="text-center">Chargement des adresses...</h1> {/* Message de chargement affiché pendant la récupération des adresses */}
			</Container>
		);
	}

	// Affichage principal des adresses
	return (
		<Container className="my-5">
			<h1>Mes Adresses</h1> {/* Titre principal de la page */}

			<h2 className="mb-3">Adresse de Facturation</h2> {/* Sous-titre pour les adresses de facturation */}
			{renderAdresses(adressesFacturation)} {/* Appeler la fonction pour afficher les adresses de facturation */}

			<h2 className="mt-5 mb-3">Adresse de Livraison</h2> {/* Sous-titre pour les adresses de livraison */}
			{renderAdresses(adressesLivraison)} {/* Appeler la fonction pour afficher les adresses de livraison */}

			<div className="text-center mt-4">
				<Link to="/adresses/add" className="text-decoration-none"> {/* Lien pour ajouter une nouvelle adresse */}
					<Button variant="dark">Ajouter une nouvelle adresse</Button>
				</Link>
			</div>
		</Container>
	);
};

export default AdressesPage; // Exporter le composant par défaut