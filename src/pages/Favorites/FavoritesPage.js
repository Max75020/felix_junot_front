import React, { useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Favorites/FavoritesPage.css";

const FavoritesPage = () => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	// Vérifier si l'utilisateur a des favoris
	const favoris = user?.favoris || [];

	// Fonction pour rediriger vers la page du produit au clic
	const handleClick = (productId) => {
		navigate(`/product/${productId}`);
	};

	return (
		<Container className="my-5">
			<h2 className="text-center mb-4">Vos Favoris</h2>
			<Row className="justify-content-center">
				{favoris.length > 0 ? (
					favoris.map((favori, index) => (
						<Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
							<Card className="favori-card" onClick={() => handleClick(favori.produit.id_produit)}>
								<Card.Img
									variant="top"
									src={`${process.env.REACT_APP_URL_SERVER}/${favori.produit.urlCoverProduit}`}
									alt={favori.produit.nom}
									className="favori-image"
								/>
								<Card.Body className="favori-card-body">
									<Card.Title>{favori.produit.nom}</Card.Title>
								</Card.Body>
							</Card>
						</Col>
					))
				) : (
					<p className="text-center">Vous n'avez pas encore de favoris.</p>
				)}
			</Row>
		</Container>
	);
};

export default FavoritesPage;
