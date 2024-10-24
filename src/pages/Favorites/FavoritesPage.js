import React, { useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import "../../assets/styles/Favorites/FavoritesPage.css";

const FavoritesPage = () => {
	const { user } = useContext(UserContext);

	// Vérifier si l'utilisateur a des favoris
	const favoris = user?.favoris || [];

	return (
		<Container className="my-5">
			<h2 className="text-center mb-4">Vos Favoris</h2>
			<Row className="justify-content-center">
				{favoris.length > 0 ? (
					favoris.map((favori, index) => (
						<Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
							<Card className="favori-card">
								<Card.Img
									variant="top"
									src={favori.image || "https://placehold.co/500"}
									alt={favori.nom}
								/>
								<Card.Body className="text-center">
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
