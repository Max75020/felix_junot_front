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
		return imagePath ? `${process.env.REACT_APP_URL_SERVER}/${imagePath}` : "https://placehold.co/400";
	};

	useEffect(() => {
		fetchCategory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<Container>
			<h1>{category?.nom}</h1>
			{category && category.produits && category.produits.length > 0 ? (
				<Row>
					{category.produits.map((produit) => (
						<Col key={produit["@id"]} xs={12} sm={6} md={4} className="mb-4 d-flex justify-content-center">
							<Card
								className="text-center cursor-pointer h-100 product-card"
								onClick={() => handleProductClick(produit["@id"])}
								style={{ width: "100%", maxWidth: "300px" }}
							>
								<div
									className="product-image-container"
									style={{
										backgroundImage: `url(${getProductImageUrl(produit)})`,
									}}
								></div>
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
