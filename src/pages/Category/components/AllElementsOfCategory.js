import React, { useState, useEffect } from "react"; // Importation de React et des hooks useState et useEffect
import { useParams, useNavigate } from "react-router-dom"; // Importation des hooks pour accéder aux paramètres d'URL et pour la navigation
import categoryApi from "../services/Category.api"; // Importation du service d'API pour les catégories
import { Card, Col, Row, Container } from "react-bootstrap"; // Importation des composants de React Bootstrap pour la mise en page
import { extractIdFromUrl } from "../../../utils/tools"; // Importation de la fonction utilitaire pour extraire l'ID depuis une URL
import "../../../assets/styles/Products/ProductList.css"; // Importation du fichier CSS pour styliser la liste des produits

// Composant principal pour afficher tous les éléments d'une catégorie
const AllElementsOfCategory = () => {
	const [category, setCategory] = useState(null); // État pour stocker les informations de la catégorie sélectionnée
	const { id } = useParams(); // Récupération de l'ID de la catégorie depuis l'URL
	const navigate = useNavigate(); // Hook pour naviguer entre les pages

	// Fonction pour récupérer les informations de la catégorie via l'API
	const fetchCategory = async () => {
		try {
			const response = await categoryApi.getAllCategoriesNoToken(); // Appel à l'API pour récupérer toutes les catégories
			if (response && response["hydra:member"]) {
				// Recherche de la catégorie dont l'ID correspond à celui de l'URL
				const selectedCategory = response["hydra:member"].find(
					(cat) => cat.id_categorie === parseInt(id)
				);
				setCategory(selectedCategory); // Mise à jour de l'état avec la catégorie sélectionnée
			} else {
				console.error("Aucune catégorie trouvée");
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des catégories:", error);
		}
	};

	// Fonction pour rediriger vers la page du produit
	const handleProductClick = (productUrl) => {
		const productId = extractIdFromUrl(productUrl); // Extraction de l'ID du produit depuis l'URL
		navigate(`/product/${productId}`); // Redirection vers la page du produit correspondant
	};

	// Utilitaire pour obtenir l'URL de l'image principale d'un produit
	const getProductImageUrl = (produit) => {
		// Recherche de l'image de couverture du produit
		const coverImage = produit.images?.find((img) => img.cover);
		const imagePath = coverImage ? coverImage.Chemin : produit.images?.[0]?.Chemin; // Utilisation de l'image de couverture ou de la première image disponible
		return imagePath ? `${process.env.REACT_APP_URL_SERVER}/${imagePath}` : "https://placehold.co/400"; // Retourne l'URL complète de l'image ou une image par défaut
	};

	// Appel à la fonction fetchCategory lors du montage du composant ou quand l'ID change
	useEffect(() => {
		fetchCategory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	// Affichage de la catégorie et de ses produits
	return (
		<Container>
			<h1>{category?.nom}</h1> {/* Titre de la catégorie */}
			{category && category.produits && category.produits.length > 0 ? (
				<Row>
					{/* Itération sur la liste des produits de la catégorie pour les afficher */}
					{category.produits.map((produit) => (
						<Col key={produit["@id"]} xs={12} sm={6} md={4} className="mb-4 d-flex justify-content-center">
							<Card
								className="text-center cursor-pointer h-100 product-card"
								onClick={() => handleProductClick(produit["@id"])} // Redirection vers la page du produit au clic
								style={{ width: "100%", maxWidth: "300px" }}
							>
								{/* Conteneur pour l'image du produit */}
								<div
									className="product-image-container"
									style={{
										backgroundImage: `url(${getProductImageUrl(produit)})`, // Affichage de l'image du produit
									}}
								></div>
								<Card.Body>
									<Card.Title>{produit.nom}</Card.Title> {/* Nom du produit */}
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			) : (
				<p className="text-center">Aucun produit disponible pour cette catégorie</p> // Message si aucun produit n'est disponible pour la catégorie
			)}
		</Container>
	);
};

export default AllElementsOfCategory; // Exportation du composant pour l'utiliser dans d'autres parties de l'application
