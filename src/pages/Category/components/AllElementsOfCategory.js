import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Ajout de useNavigate pour la redirection
import categoryApi from "../services/Category.api";
import { Card, Col, Row, Container } from "react-bootstrap";
import { extractIdFromUrl } from "../../../utils/tools"; // Utiliser une fonction utilitaire pour extraire l'ID du produit si nécessaire

const AllElementsOfCategory = () => {
	const [category, setCategory] = useState(null);
	const { id } = useParams(); // Récupère l'ID de la catégorie depuis l'URL
	const navigate = useNavigate(); // Utiliser useNavigate pour la navigation

	const fetchCategory = async () => {
		try {
			const response = await categoryApi.getAllCategoriesNoToken();
			if (response && response["hydra:member"]) {
				const selectedCategory = response["hydra:member"].find(cat => cat.id_categorie === parseInt(id));
				setCategory(selectedCategory); // Stocke la catégorie trouvée
			} else {
				console.error("Aucune catégorie trouvée");
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des catégories:", error);
		}
	};

	// Fonction pour rediriger vers la page du produit
	const handleProductClick = (productUrl) => {
		const productId = extractIdFromUrl(productUrl); // Extraire l'ID du produit de l'URL
		navigate(`/product/${productId}`); // Redirige vers la page du produit avec l'ID
	};

	useEffect(() => {
		fetchCategory();
	}, [id]); // Utiliser l'id pour recharger les données si la catégorie change

	return (
		<Container>
			<h1>{category?.nom}</h1>
			{category && category.produits && category.produits.length > 0 ? (
				<Row>
					{category.produits.map((produit) => (
						<Col key={produit["@id"]} md={4} className="mb-4">
							<Card
								className="text-center cursor-pointer"
								onClick={() => handleProductClick(produit["@id"])} // Redirige vers la page produit lors du clic
							>
								<Card.Img
									variant="top"
									src="https://placehold.co/400" // Remplace par l'URL de l'image du produit si disponible
									alt={`Image de ${produit.nom}`}
									className="card-hover"
								/>
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
