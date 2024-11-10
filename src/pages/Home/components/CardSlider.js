import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container, Carousel } from "react-bootstrap";
import categoryApi from "../../Category/services/Category.api";
import { NavLink, useNavigate } from "react-router-dom";
import { extractIdFromUrl } from "../../../utils/tools";

const CardSliderWithArrows = () => {
	const [category, setCategory] = useState(null);
	const [isMobile, setIsMobile] = useState(false);
	const navigate = useNavigate();

	const fetchCategory = async () => {
		try {
			const response = await categoryApi.getCategoryByIdNoToken(1);
			if (response) {
				setCategory(response);
			} else {
				console.error("Aucune catégorie trouvée");
			}
		} catch (error) {
			console.error("Erreur lors de la récupération de la catégorie:", error);
		}
	};

	const handleResize = () => {
		setIsMobile(window.innerWidth <= 768);
	};

	const handleProductClick = (productUrl) => {
		const productId = extractIdFromUrl(productUrl);
		navigate(`/product/${productId}`);
	};

	const handleSeeAllClick = () => {
		if (category && category.id_categorie) {
			navigate(`/categories/${category.id_categorie}/all`);
		}
	};

	const getProductImageUrl = (produit) => {
		const coverImage = produit.images?.find((img) => img.cover);
		const imagePath = coverImage ? coverImage.Chemin : produit.images?.[0]?.Chemin;
		return imagePath ? `${process.env.REACT_APP_URL_SERVER}/${imagePath}` : "https://placehold.co/250";
	};

	useEffect(() => {
		fetchCategory();
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<Container className="text-center" style={{ marginTop: "40px" }}>
			{category ? (
				<>
					<h2 style={{ marginBottom: "40px" }}>{category.nom}</h2>
					{isMobile ? (
						<Carousel>
							{category.produits.slice(0, 3).map((produit, index) => (
								<Carousel.Item key={index}>
									<Card className="text-center mx-auto" style={{ width: "400px" }}>
										<NavLink to={`/categories/${category.id_categorie}/all`}>
											<Card.Img
												variant="top"
												src={getProductImageUrl(produit)}
												style={{
													height: "300px",
													objectFit: "cover",
												}}
												alt={`Image de ${produit.nom}`}
											/>
											<Card.Body>
												<Card.Title>{produit.nom}</Card.Title>
											</Card.Body>
										</NavLink>
									</Card>
								</Carousel.Item>
							))}
						</Carousel>
					) : (
						<Row className="justify-content-center">
							{category.produits && category.produits.length > 0 ? (
								category.produits.slice(0, 3).map((produit, index) => (
									<Col
										key={produit["@id"]}
										md={4}
										xs={12}
										sm={6}
										className="d-flex justify-content-center mb-4"
									>
										<Card
											className="cursor-pointer card-hover text-center"
											onClick={() => handleProductClick(produit["@id"])}
											style={{ width: "300px" }}
										>
											<Card.Img
												variant="top"
												src={getProductImageUrl(produit)}
												style={{
													height: "300px",
													objectFit: "cover",
												}}
												alt={`Image de ${produit.nom}`}
											/>
											<Card.Body>
												<Card.Title>{produit.nom}</Card.Title>
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
