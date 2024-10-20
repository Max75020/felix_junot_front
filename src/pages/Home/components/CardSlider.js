import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container, Carousel } from "react-bootstrap";
import categoryApi from "../../Category/services/Category.api";
import { NavLink, useNavigate } from "react-router-dom";
import { extractIdFromUrl } from "../../../utils/tools";

const CardSliderWithArrows = () => {
	const [category, setCategory] = useState(null);
	const [isMobile, setIsMobile] = useState(false);
	const navigate = useNavigate(); // Hook for navigation

	const fetchCategory = async () => {
		try {
			const response = await categoryApi.getCategoryByIdNoToken(1);
			console.log("Structure de la réponse:", response);
			if (response) {
				setCategory(response);
			} else {
				console.error("Aucune catégorie trouvée");
			}
		} catch (error) {
			console.error(
				"Erreur lors de la récupération de la catégorie:",
				error
			);
		}
	};

	const handleResize = () => {
		setIsMobile(window.innerWidth <= 768);
	};

	const handleProductClick = (productUrl) => {
		const productId = extractIdFromUrl(productUrl); // Utilisation de la fonction générique
		navigate(`/product/${productId}`); // Redirection vers la page produit
	};

	const handleSeeAllClick = () => {
		if (category && category.id_categorie) {
			// Rediriger vers la page "TOUT VOIR" de la catégorie
			navigate(`/categories/${category.id_categorie}/all`);
		}
	};

	useEffect(() => {
		fetchCategory();
		handleResize(); // Initial check
		window.addEventListener("resize", handleResize); // Écouter le redimensionnement de la fenêtre
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<Container className="text-center" style={{ marginTop: "40px" }}>
			{category ? (
				<>
					<h2 style={{ marginBottom: "40px" }}>{category.nom}</h2>
					{isMobile ? (
						// Swiper en mode mobile
						<Carousel>
							{category.produits
								.slice(0, 3)
								.map((produit, index) => (
									<Carousel.Item key={index}>
										<Card>
											<NavLink
												to={`/categories/${category.id_categorie}/all`}
											>
												<Card.Img
													variant="top"
													src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ot2SnJSVboBI9WKAVAt13u75_PB3TJvv0g&s"
												/>
												<Card.Body>
													<Card.Title>
														{produit.nom}
													</Card.Title>
												</Card.Body>
											</NavLink>
										</Card>
									</Carousel.Item>
								))}
						</Carousel>
					) : (
						// Mode bureau
						<Row className="justify-content-center">
							{category.produits &&
								category.produits.length > 0 ? (
								category.produits
									.slice(0, 3)
									.map((produit, index) => (
										<Col
											key={produit["@id"]}
											md={4}
											xs={12}
											sm={6}
											className="d-flex justify-content-center mb-4 gap-5"
										>
											<Card
												className="cursor-pointer card-hover"
												onClick={() =>
													handleProductClick(produit["@id"])
												}
												style={{ width: "18rem" }}
											>
												<Card.Img
													variant="top"
													src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ot2SnJSVboBI9WKAVAt13u75_PB3TJvv0g&s"
												/>
												<Card.Body>
													<Card.Title>
														{produit.nom}
													</Card.Title>
												</Card.Body>
											</Card>
										</Col>
									))
							) : (
								<p>Aucun produit disponible</p>
							)}
						</Row>
					)}
					<Button variant="dark" className="mt-4 mb-4" onClick={handleSeeAllClick}>
						TOUT VOIR
					</Button>
				</>
			) : (
				<p>Aucune catégorie disponible</p>
			)}
		</Container>
	);
};

export default CardSliderWithArrows;
