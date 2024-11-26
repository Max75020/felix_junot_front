import React, { useContext } from "react"; // Importation de React et du hook useContext pour accéder au contexte utilisateur
import { Container, Row, Col, Card } from "react-bootstrap"; // Importation des composants Bootstrap pour la mise en page
import { UserContext } from "../../context/UserContext"; // Importation du contexte UserContext pour accéder aux informations utilisateur
import { useNavigate } from "react-router-dom"; // Importation du hook useNavigate pour la navigation entre les pages
import "../../assets/styles/Favorites/FavoritesPage.css"; // Importation des styles CSS pour la page des favoris

// Composant principal pour afficher la page des favoris de l'utilisateur
const FavoritesPage = () => {
	// Accéder aux informations de l'utilisateur connecté via le UserContext
	const { user } = useContext(UserContext);
	// Utilisation du hook useNavigate pour naviguer entre les pages
	const navigate = useNavigate();

	// Vérifier si l'utilisateur a des favoris, sinon initialise un tableau vide
	const favoris = user?.favoris || [];

	// Fonction pour rediriger vers la page du produit au clic
	const handleClick = (productId) => {
		navigate(`/product/${productId}`); // Redirection vers la page du produit en utilisant son ID
	};

	// Rendu du composant : liste des favoris ou message s'il n'y a pas de favoris
	return (
		<Container className="my-5">
			<h2 className="text-center mb-4">Vos Favoris</h2> {/* Titre principal de la page */}
			<Row className="justify-content-center">
				{/* Si l'utilisateur a des favoris, on les affiche sous forme de cartes */}
				{favoris.length > 0 ? (
					favoris.map((favori, index) => (
						<Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
							<Card className="favori-card" onClick={() => handleClick(favori.produit.id_produit)}>
								{/* Affichage de l'image du produit favori */}
								<Card.Img
									variant="top"
									src={`${process.env.REACT_APP_URL_SERVER}/${favori.produit.urlCoverProduit}`}
									alt={favori.produit.nom}
									className="favori-image"
								/>
								<Card.Body className="favori-card-body">
									{/* Affichage du nom du produit favori */}
									<Card.Title>{favori.produit.nom}</Card.Title>
								</Card.Body>
							</Card>
						</Col>
					))
				) : (
					// Message à afficher si l'utilisateur n'a pas encore de favoris
					<p className="text-center">Vous n'avez pas encore de favoris.</p>
				)}
			</Row>
		</Container>
	);
};

export default FavoritesPage; // Exportation du composant FavoritesPage pour être utilisé ailleurs dans l'application
