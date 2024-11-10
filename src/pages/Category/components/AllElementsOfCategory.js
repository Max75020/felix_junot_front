import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import categoryApi from "../services/Category.api";
import { Card, Col, Row, Container } from "react-bootstrap";
import { extractIdFromUrl } from "../../../utils/tools";
import "../../../assets/styles/Products/ProductList.css"; // Assurez-vous d'avoir ce fichier CSS pour les effets

const AllElementsOfCategory = () => {
	const [category, setCategory] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

	const fetchCategory = async () => {
		try {
			const response = await categoryApi.getAllCategoriesNoToken();
			if (response && response["hydra:member"]) {
				const selectedCategory = response["hydra:member"].find(
					(cat) => cat.id_categorie === parseInt(id)
				);
				setCategory(selectedCategory);
			} else {
				console.error("Aucune catégorie trouvée");
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des catégories:", error);
		}
	};

	// Fonction pour rediriger vers la page du produit
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

	useEffect(() => {
		fetchCategory();
	}, [id]);

	return (
		<Container>
			<h1>{category?.nom}</h1>
			{category && category.produits && category.produits.length > 0 ? (
				<Row>
					{category.produits.map((produit) => (
						<Col key={produit["@id"]} md={4} className="mb-4">
							<Card
								className="text-center cursor-pointer h-100 product-card"
								onClick={() => handleProductClick(produit["@id"])}
							>
								<div className="product-image-container">
									<Card.Img
										variant="top"
										src={getProductImageUrl(produit)}
										alt={`Image de ${produit.nom}`}
										style={{
											height: "400px", // Hauteur fixe de 400px
											objectFit: "cover", // Recadrage pour remplir l'espace sans déformation
										}}
										className="product-image"
									/>
								</div>
								<Card.Body>
									<Card.Title>{produit.nom}</Card.Title>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			) : (
				<p className="text-center">Aucun produit disponible pour cette catégorie</p>
			)}
		</Container>
	);
};

export default AllElementsOfCategory;
