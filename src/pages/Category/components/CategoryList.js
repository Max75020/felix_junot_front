import React, { useState, useEffect } from "react"; // Importation de React et des hooks useState et useEffect
import { useNavigate } from "react-router-dom"; // Importation du hook useNavigate pour la navigation entre les pages
import categoryApi from "../services/Category.api"; // Importation du service d'API pour les catégories
import { Card, Col, Row, Container } from "react-bootstrap"; // Importation des composants de React Bootstrap pour la mise en page
import { extractIdFromUrl } from "../../../utils/tools"; // Importation de la fonction utilitaire pour extraire l'ID depuis une URL
import "../../../assets/styles/Category/CategoryList.css"; // Importation du fichier CSS pour styliser la liste des catégories

// Composant principal pour afficher la liste des catégories
const CategoryList = () => {
	const [categories, setCategories] = useState([]); // État pour stocker la liste des catégories
	const navigate = useNavigate(); // Hook pour naviguer entre les pages

	// Fonction pour récupérer la liste des catégories via l'API
	const fetchCategory = async () => {
		try {
			const response = await categoryApi.getAllCategoriesNoToken(); // Appel à l'API pour récupérer toutes les catégories
			if (response && response["hydra:member"]) {
				setCategories(response["hydra:member"]); // Mise à jour de l'état avec les catégories récupérées
			} else {
				console.error("Aucune catégorie trouvée");
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des catégories:", error);
		}
	};

	// Utilisation du hook useEffect pour appeler fetchCategory lors du montage du composant
	useEffect(() => {
		fetchCategory();
	}, []);

	// Fonction pour rediriger vers la page du produit
	const handleProductClick = (productUrl) => {
		const productId = extractIdFromUrl(productUrl); // Extraction de l'ID du produit depuis l'URL
		navigate(`/product/${productId}`); // Redirection vers la page du produit correspondant
	};

	// Utilitaire pour obtenir l'URL de l'image principale d'un produit
	const getProductImageUrl = (produit) => {
		const coverImage = produit.images?.find((img) => img.cover); // Recherche de l'image de couverture du produit
		const imagePath = coverImage ? coverImage.Chemin : produit.images?.[0]?.Chemin; // Utilisation de l'image de couverture ou de la première image disponible
		return imagePath ? `${process.env.REACT_APP_URL_SERVER}/${imagePath}` : "https://placehold.co/400"; // Retourne l'URL complète de l'image ou une image par défaut
	};

	// Rendu du composant : liste des catégories et aperçu des produits
	return (
		<Container>
			<h1>Catégories</h1> {/* Titre principal de la page */}
			{categories.map((category) => (
				<div key={category.id_categorie} className="mb-5">
					{/* Titre de chaque catégorie, qui permet de naviguer vers une page avec tous les produits de cette catégorie */}
					<h2
						className="text-center text-uppercase mb-4"
						style={{ cursor: "pointer", color: "blue" }}
						onClick={() => navigate(`/categories/${category.id_categorie}/all`)} // Redirection vers la page de la catégorie spécifique
					>
						{category.nom}
					</h2>
					<Row>
						{/* Affichage des produits de la catégorie (limité aux 3 premiers produits) */}
						{category.produits && category.produits.length > 0 ? (
							category.produits.slice(0, 3).map((produit) => (
								<Col key={produit["@id"]} xs={12} sm={6} md={4} className="mb-4 d-flex justify-content-center">
									<Card
										className="text-center h-100 product-card"
										onClick={() => handleProductClick(produit["@id"])} // Redirection vers la page du produit au clic
										style={{ cursor: "pointer", width: "100%", maxWidth: "300px" }}
									>
										{/* Conteneur pour l'image du produit */}
										<div
											className="product-image-container"
											style={{
												backgroundImage: `url(${getProductImageUrl(produit)})`, // Affichage de l'image du produit
											}}
										></div>
										<Card.Body>
											<Card.Title className="product-title">
												{produit.nom} {/* Nom du produit */}
											</Card.Title>
										</Card.Body>
									</Card>
								</Col>
							))
						) : (
							// Message affiché si aucun produit n'est disponible pour la catégorie
							<p className="text-center">Aucun produit disponible</p>
						)}
					</Row>
				</div>
			))}
		</Container>
	);
};

export default CategoryList; // Exportation du composant pour l'utiliser dans d'autres parties de l'application
