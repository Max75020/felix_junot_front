import React, { useState, useEffect } from "react"; // Importation de React et des hooks useState et useEffect
import { Card, Button, Row, Col, Container, Carousel } from "react-bootstrap"; // Importation des composants de React Bootstrap
import categoryApi from "../../Category/services/Category.api"; // Importation du service API pour les catégories
import { NavLink, useNavigate } from "react-router-dom"; // Importation des composants de navigation de React Router
import { extractIdFromUrl } from "../../../utils/tools"; // Importation de la fonction utilitaire pour extraire l'ID depuis une URL
import "../../../assets/styles/components/CardSlider.css"; // Importation des styles CSS spécifiques pour le composant

// Composant principal CardSliderWithArrows pour afficher les produits d'une catégorie dans un slider avec des flèches
const CardSliderWithArrows = () => {
	// État pour stocker la catégorie récupérée, et détecter si on est sur un appareil mobile
	const [category, setCategory] = useState(null);
	const [isMobile, setIsMobile] = useState(false);
	const navigate = useNavigate(); // Hook pour naviguer entre les pages

	// Fonction pour récupérer la catégorie avec l'ID 1 depuis l'API
	const fetchCategory = async () => {
		try {
			const response = await categoryApi.getCategoryByIdNoToken(1); // Appel API pour récupérer la catégorie
			if (response) {
				setCategory(response); // Mise à jour de l'état avec la catégorie récupérée
			} else {
				console.error("Aucune catégorie trouvée");
			}
		} catch (error) {
			console.error("Erreur lors de la récupération de la catégorie:", error);
		}
	};

	// Fonction pour gérer la détection de la taille de l'écran et mettre à jour l'état `isMobile`
	const handleResize = () => {
		setIsMobile(window.innerWidth <= 768); // Considérer l'appareil comme mobile si la largeur est inférieure ou égale à 768px
	};

	// Fonction pour rediriger l'utilisateur vers la page du produit sélectionné
	const handleProductClick = (productUrl) => {
		const productId = extractIdFromUrl(productUrl); // Extraction de l'ID du produit depuis l'URL
		navigate(`/product/${productId}`); // Redirection vers la page produit
	};

	// Fonction pour rediriger vers la page contenant tous les produits de la catégorie
	const handleSeeAllClick = () => {
		if (category && category.id_categorie) {
			navigate(`/categories/${category.id_categorie}/all`); // Redirection vers la page de la catégorie
		}
	};

	// Utilitaire pour obtenir l'URL de l'image principale d'un produit
	const getProductImageUrl = (produit) => {
		const coverImage = produit.images?.find((img) => img.cover); // Recherche de l'image de couverture du produit
		const imagePath = coverImage ? coverImage.Chemin : produit.images?.[0]?.Chemin; // Utiliser l'image de couverture ou la première image disponible
		return imagePath ? `${process.env.REACT_APP_URL_SERVER}/${imagePath}` : "https://placehold.co/250"; // Retourner l'URL complète de l'image ou une image par défaut
	};

	// Hook useEffect pour initialiser la catégorie et gérer la détection de la taille de l'écran
	useEffect(() => {
		fetchCategory(); // Appel de la fonction pour récupérer la catégorie
		handleResize(); // Détection initiale de la taille de l'écran
		window.addEventListener("resize", handleResize); // Ajouter un événement "resize" pour mettre à jour la taille de l'écran
		return () => window.removeEventListener("resize", handleResize); // Nettoyer l'événement "resize" lorsque le composant est démonté
	}, []);

	return (
		<Container className="text-center" style={{ marginTop: "40px" }}>
			{category ? (
				<>
					<h2 style={{ marginBottom: "40px" }}>{category.nom}</h2> {/* Titre de la catégorie */}
					{/* Affichage en mode mobile avec un carrousel */}
					{isMobile ? (
						<Carousel>
							{category.produits.slice(0, 3).map((produit, index) => (
								<Carousel.Item key={index}>
									<Card className="text-center mx-auto">
										<NavLink to={`/categories/${category.id_categorie}/all`}>
											{/* Affichage de l'image du produit */}
											<div
												className="image-container"
												style={{
													backgroundImage: `url(${getProductImageUrl(produit)})`,
												}}
											></div>
											<Card.Body>
												<Card.Title className="text-dark no-underline">{produit.nom}</Card.Title>
											</Card.Body>
										</NavLink>
									</Card>
								</Carousel.Item>
							))}
						</Carousel>
					) : (
						// Affichage en mode non-mobile avec une disposition en grille
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
											onClick={() => handleProductClick(produit["@id"])} // Redirection au clic sur la carte
											style={{ width: "300px", height: "300px" }}
										>
											{/* Affichage de l'image du produit */}
											<div
												className="image-container"
												style={{
													backgroundImage: `url(${getProductImageUrl(produit)})`,
												}}
											></div>
											<Card.Body>
												<Card.Title>{produit.nom}</Card.Title>
											</Card.Body>
										</Card>
									</Col>
								))
							) : (
								<p>Aucun produit disponible</p> // Message affiché si aucun produit n'est disponible
							)}
						</Row>
					)}
					{/* Bouton pour voir tous les produits de la catégorie */}
					<Button variant="dark" className="mt-4 mb-4" onClick={handleSeeAllClick}>
						TOUT VOIR
					</Button>
				</>
			) : (
				<p>Aucune catégorie disponible</p> // Message affiché si aucune catégorie n'est disponible
			)}
		</Container>
	);
};

export default CardSliderWithArrows; // Exportation du composant pour l'utiliser dans d'autres parties de l'application
