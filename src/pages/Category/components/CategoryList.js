import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import categoryApi from "../services/Category.api";
import { Card, Col, Row, Container } from "react-bootstrap";
import { extractIdFromUrl } from "../../../utils/tools";
import "../../../assets/styles/Products/ProductDetail.css";

const CategoryList = () => {
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();

	const fetchCategory = async () => {
		try {
			const response = await categoryApi.getAllCategoriesNoToken();
			if (response && response["hydra:member"]) {
				setCategories(response["hydra:member"]);
			} else {
				console.error("Aucune catégorie trouvée");
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des catégories:", error);
		}
	};

	useEffect(() => {
		fetchCategory();
	}, []);

	// Fonction pour rediriger vers la page produit
	const handleProductClick = (productUrl) => {
		const productId = extractIdFromUrl(productUrl);
		navigate(`/product/${productId}`);
	};

	// Utilitaire pour obtenir l'URL de l'image principale d'un produit
	const getProductImageUrl = (produit) => {
		const coverImage = produit.images?.find((img) => img.cover);
		const imagePath = coverImage ? coverImage.Chemin : produit.images?.[0]?.Chemin;
		return imagePath ? `http://localhost:8741/${imagePath}` : "https://placehold.co/400";
	};

	return (
		<Container>
			<h1>Catégories</h1>
			{categories.map((category) => (
				<div key={category.id_categorie} className="mb-5">
					<h2
						className="text-center text-uppercase mb-4"
						style={{ cursor: "pointer", color: "blue" }}
						onClick={() => navigate(`/categories/${category.id_categorie}/all`)}
					>
						{category.nom}
					</h2>
					<Row>
						{category.produits && category.produits.length > 0 ? (
							category.produits.slice(0, 3).map((produit) => (
								<Col key={produit["@id"]} md={4} className="mb-4">
									<Card
										className="text-center h-100 product-card"
										onClick={() => handleProductClick(produit["@id"])}
										style={{ cursor: "pointer" }}
									>
										<div className="product-image-container">
											<Card.Img
												variant="top"
												src={getProductImageUrl(produit)}
												alt={`Image de ${produit.nom}`}
												className="product-image"
												style={{
													height: "400px",
													objectFit: "cover",
												}}
											/>
										</div>
										<Card.Body>
											<Card.Title className="product-title">
												{produit.nom}
											</Card.Title>
										</Card.Body>
									</Card>
								</Col>
							))
						) : (
							<p className="text-center">Aucun produit disponible</p>
						)}
					</Row>
				</div>
			))}
		</Container>
	);
};

export default CategoryList;
