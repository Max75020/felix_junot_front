// Importation des bibliothèques React et des hooks nécessaires
import React, { useState, useEffect, useContext } from "react";
// Importation des composants React-Bootstrap pour la mise en page et les interactions
import { Container, Row, Col, Button, Image, ListGroup, Carousel } from "react-bootstrap";
// Importation du hook `useParams` pour récupérer les paramètres de l'URL
import { useParams } from "react-router-dom";
// Importation des services pour les appels API
import produitApi from "../services/Product.api";
import favorisApi from "../../Favorites/services/Favorites.api";
// Importation des icônes
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
// Importation des contextes pour accéder au panier et aux données utilisateur
import { useCart } from "../../../context/CartContext";
import { UserContext } from "../../../context/UserContext";
// Importation des utilitaires et services
import { extractIdFromUrl } from "../../../utils/tools";
import { showWarning } from "../../../services/popupService";
// Importation des styles spécifiques au composant
import "../../../assets/styles/Products/ProductDetail.css";

const ProductDetail = () => {
	// États pour gérer les données du produit et les interactions utilisateur
	const [quantity, setQuantity] = useState(1); // Pour gérer la quantité d'un produit
	const [product, setProduct] = useState(null); // Pour stocker les informations du produit
	const [isInCart, setIsInCart] = useState(false); // Pour vérifier si le produit est dans le panier
	const [isFavorite, setIsFavorite] = useState(false); // Pour vérifier si le produit est dans les favoris
	const [favoriteId, setFavoriteId] = useState(null); // Pour stocker l'ID du favori
	const [selectedImage, setSelectedImage] = useState(null); // Pour gérer l'image sélectionnée
	const { id } = useParams(); // Récupération de l'ID du produit depuis l'URL

	// Récupération des fonctions et états du contexte panier
	const {
		addToCart,
		removeFromCart,
		fetchCart,
		incrementQuantity,
		decrementQuantity,
		cartItems,
	} = useCart();
	// Récupération des données utilisateur via UserContext
	const { user, setUser } = useContext(UserContext);

	// Vérifie si l'utilisateur est connecté
	const isUserConnected = !!user;
	// Récupération de l'ID du panier ouvert si l'utilisateur est connecté
	const userCartId = user && user.panierOuvert ? extractIdFromUrl(user.panierOuvert["@id"]) : null;

	// Fonction pour récupérer les informations du produit depuis l'API
	const fetchProduct = async () => {
		if (!id) return;
		try {
			const response = await produitApi.getProduitById(id);
			setProduct(response);
			// Définir l'image sélectionnée comme l'image de couverture ou la première disponible
			setSelectedImage(response.images.find(img => img.cover)?.Chemin || response.images[0]?.Chemin);

			// Vérifie si le produit est déjà dans le panier
			const existingCartItem = cartItems.find(
				(item) => item.produit["@id"] === response["@id"]
			);
			// Mettre à jour l'état `isInCart` et `quantity` en conséquence
			if (existingCartItem) {
				// Si le produit est dans le panier, le marquer comme tel
				setIsInCart(true);
				// Mettre à jour la quantité avec la quantité actuelle du produit dans le panier
				setQuantity(existingCartItem.quantite);
			} else {
				// Sinon, réinitialiser la quantité à 1
				setIsInCart(false);
				setQuantity(1);
			}
		} catch (error) {
			// Afficher une erreur en cas d'échec de la récupération des données
			console.error("Erreur lors de la récupération du produit:", error);
		}
	};

	// Fonction pour ajouter le produit au panier
	const handleAddToCart = () => {
		// Vérifier si le produit existe
		if (product) {
			// Ajouter le produit au panier avec la quantité spécifiée
			addToCart(product["@id"], quantity);
			// Mettre à jour l'état pour indiquer que le produit est dans le panier
			setIsInCart(true);
		}
	};

	// Fonction pour supprimer le produit du panier
	const handleRemoveFromCart = () => {
		// Vérifier si le produit existe
		if (product) {
			// Trouver l'élément du panier correspondant au produit
			const cartItem = cartItems.find(
				(item) => item.produit["@id"] === product["@id"]
			);
			// Si l'élément est trouvé, le supprimer du panier
			if (cartItem) {
				// Appeler la fonction pour supprimer le produit du panier
				removeFromCart(cartItem.id);
				// Mettre à jour l'état pour indiquer que le produit n'est plus dans le panier
				setIsInCart(false);
				// Réinitialiser la quantité à 1
				setQuantity(1);
			}
		}
	};

	// Fonction pour augmenter la quantité du produit dans le panier
	const handleIncrementQuantity = () => {
		// Vérifier si le produit existe et a un ID
		if (product && product["@id"]) {
			// Vérifier si la quantité est inférieure au stock disponible
			if (quantity < product.stock) {
				// Augmenter la quantité de 1
				setQuantity((prevQuantity) => prevQuantity + 1);
				// Appeler la fonction pour augmenter la quantité du produit dans le panier
				incrementQuantity(product["@id"]);
			} else {
				// Afficher un message d'avertissement si la quantité maximale est atteinte
				showWarning("Stock maximum atteint pour ce produit.");
			}
		}
	};

	// Fonction pour diminuer la quantité du produit dans le panier
	const handleDecrementQuantity = () => {
		// Vérifier si le produit existe et a un ID
		if (product && product["@id"] && quantity > 1) {
			// Diminuer la quantité de 1
			setQuantity((prevQuantity) => prevQuantity - 1);
			// Appeler la fonction pour diminuer la quantité du produit dans le panier
			decrementQuantity(product["@id"]);
		}
	};

	// Fonction pour ajouter le produit aux favoris
	const handleAddToFavorites = async () => {
		// Vérifier si l'utilisateur et le produit existent
		if (!product) return;
		try {
			// Appeler l'API pour ajouter le produit aux favoris de l'utilisateur
			const response = await favorisApi.addFavori(user["@id"], product["@id"]);
			// Vérifier si l'ID du favori ajouté est présent dans la réponse
			if (!response.id_favoris) {
				// Afficher une erreur si l'ID est manquant
				console.error("Erreur : L'ID du favori ajouté est manquant dans la réponse.");
				return;
			}
			// Mettre à jour l'ID du favori et l'état pour indiquer que le produit est dans les favoris
			setFavoriteId(response.id_favoris);
			// Mettre à jour l'état pour indiquer que le produit est dans les favoris
			setIsFavorite(true);
			// Mettre à jour les favoris de l'utilisateur avec le nouveau favori
			setUser((prevUser) => ({
				...prevUser,
				favoris: [
					...prevUser.favoris,
					{
						id_favoris: response.id_favoris,
						produit: {
							"@id": response.produit["@id"]
						}
					}
				]
			}));
		} catch (error) {
			// Afficher une erreur en cas d'échec de l'ajout aux favoris
			console.error("Erreur lors de l'ajout aux favoris:", error);
		}
	};

	// Fonction pour supprimer le produit des favoris
	const handleRemoveFromFavorites = async () => {
		// Vérifier si l'ID du favori existe
		if (!favoriteId) return;
		try {
			// Appeler l'API pour supprimer le produit des favoris de l'utilisateur
			await favorisApi.deleteFavori(favoriteId);
			// Réinitialiser l'ID du favori et l'état pour indiquer que le produit n'est plus dans les favoris
			setFavoriteId(null);
			// Mettre à jour l'état pour indiquer que le produit n'est plus dans les favoris
			setIsFavorite(false);
			// Mettre à jour les favoris de l'utilisateur en supprimant le favori correspondant
			setUser((prevUser) => ({
				...prevUser,
				favoris: prevUser.favoris.filter((fav) => fav.id_favoris !== favoriteId)
			}));
		} catch (error) {
			// Afficher une erreur en cas d'échec de la suppression des favoris
			console.error("Erreur lors de la suppression du favori:", error);
		}
	};

	// Fonction pour vérifier si le produit est dans les favoris de l'utilisateur
	const checkIfProductIsFavorite = () => {
		// Vérifier si l'utilisateur et le produit existent et si l'utilisateur a des favoris
		if (user && product && user.favoris) {
			// Trouver le favori correspondant au produit dans la liste des favoris de l'utilisateur
			const favorite = user.favoris.find(
				(fav) => fav.produit && fav.produit["@id"] === product["@id"]
			);
			// Si le favori est trouvé, mettre à jour l'état et l'ID du favori
			if (favorite) {
				// Mettre à jour l'état pour indiquer que le produit est dans les favoris
				setIsFavorite(true);
				// Mettre à jour l'ID du favori pour une utilisation ultérieure
				setFavoriteId(favorite.id_favoris);
			} else {
				// Sinon, réinitialiser l'état et l'ID du favori
				setIsFavorite(false);
			}
		}
	};

	// Effet pour vérifier si le produit est dans les favoris de l'utilisateur
	useEffect(() => {
		// Vérifier si l'utilisateur et le produit existent
		if (user && product) {
			// Vérifier si l'utilisateur a des favoris
			checkIfProductIsFavorite();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, product]);

	// Effet pour récupérer les informations du produit et les favoris de l'utilisateur
	useEffect(() => {
		// Appeler la fonction pour récupérer les informations du produit
		if (userCartId) {
			// Si l'utilisateur est connecté, récupérer le panier ouvert
			fetchCart(userCartId);
		}
		fetchProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, userCartId]);

	// Synchroniser l'état `isInCart` et `quantity` avec `cartItems`
	useEffect(() => {
		// Vérifier si le produit existe
		if (product) {
			// Trouver l'élément du panier correspondant au produit
			const cartItem = cartItems.find((item) => item.produit["@id"] === product["@id"]);
			// Si l'élément est trouvé, mettre à jour l'état et la quantité en conséquence
			if (cartItem) {
				// Si le produit est dans le panier, le marquer comme tel
				setIsInCart(true);
				// Mettre à jour la quantité avec la quantité actuelle du produit dans le panier
				setQuantity(cartItem.quantite);
			} else {
				// Sinon, réinitialiser la quantité à 1
				setIsInCart(false);
				setQuantity(1);
			}
		}
	}, [cartItems, product]);

	// Gestion de la sélection d'une image pour affichage
	const handleImageSelect = (imagePath) => {
		// Mettre à jour l'image sélectionnée avec le chemin de l'image
		setSelectedImage(imagePath);
	};

	// Rendu de la vue pour un utilisateur connecté
	const renderConnectedView = () => (
		<Row>
			<Col md={1} className="d-flex flex-column align-items-center overflow-auto" style={{ maxHeight: "600px" }}>
				<ListGroup variant="flush">
					{product?.images.map((image, index) => (
						<ListGroup.Item key={index} onClick={() => handleImageSelect(image.Chemin)} className="thumbnail-item">
							<Image
								src={`${process.env.REACT_APP_URL_SERVER}/${image.Chemin}`}
								thumbnail
								className={selectedImage === image.Chemin ? "selected-thumbnail" : ""}
								style={{
									cursor: "pointer",
									border: selectedImage === image.Chemin ? "2px solid #000" : "1px solid #ddd",
									borderRadius: "5px",
									width: "50px",
									height: "50px",
									objectFit: "cover"
								}}
							/>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Col>

			<Col md={6} className="d-flex justify-content-center">
				<Image
					style={{ borderRadius: "10px", objectFit: "cover" }}
					src={`${process.env.REACT_APP_URL_SERVER}/${selectedImage}`}
					fluid
					className="max-vh-75"
				/>
			</Col>

			<Col md={5}>
				<div className="product-details p-3">
					<div className="d-flex justify-content-center align-items-center mb-3">
						<h2 className="product-title position-relative m-0">
							{product?.nom}
						</h2>
						<Button
							variant="none"
							size="lg"
							className="d-flex align-items-center justify-content-center p-2 bg-t border-0"
							style={{
								width: "50px",
								height: "50px",
							}}
							onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
						>
							{isFavorite ? <FaHeart /> : <FaRegHeart />}
						</Button>
					</div>
					<p className="text-muted text-left">
						{product?.description || "Description non disponible."}
					</p>
					<div className="d-flex align-items-center justify-content-between flex-wrap flex-column flex-lg-row gap-3">
						<div className="d-flex align-items-center gap-3">
							<p className="mb-0">Prix :</p>
							<p className="color-title mb-0 fw-bolder">
								{product?.prix_ttc} €
							</p>
						</div>
						<div className="d-flex justify-content-center align-items-center flex-wrap mt-3 mt-md-0">
							{product?.stock > 0 ? (
								isInCart ? (
									<Button
										variant="danger"
										size="lg"
										onClick={handleRemoveFromCart}
										className="d-flex align-items-center remove-from-cart-btn"
									>
										Supprimer du panier
									</Button>
								) : (
									<Button
										variant="dark"
										size="lg"
										onClick={handleAddToCart}
										className="d-flex align-items-center add-to-cart-btn"
									>
										Ajouter au panier
									</Button>
								)
							) : (
								<span className="text-dark fs-5 text-center">Œuvre victime de son succès stock indisponible</span>
							)}
						</div>
					</div>

					{isInCart && (
						<div className="d-flex justify-content-between align-items-center my-3 flex-column flex-md-row mt-3 mb-3">
							<div className="d-flex align-items-center mb-3 mb-md-0">
								<Button
									variant="none"
									onClick={handleDecrementQuantity}
									className="p-1 border-0"
								>
									<FiMinus />
								</Button>
								<span className="mx-3 fs-5">{quantity}</span>
								<Button
									variant="none"
									onClick={handleIncrementQuantity}
									className="p-1 border-0"
									disabled={quantity >= product?.stock}
								>
									<FiPlus />
								</Button>
							</div>
							<p className="text-muted fs-6 mb-0">{product?.stock} en stock</p>
						</div>
					)}
				</div>
			</Col>
		</Row>
	);

	// Rendu de la vue pour un utilisateur non connecté
	const renderMobileView = () => (
		<div>
			<Carousel>
				{product?.images.map((image, index) => (
					<Carousel.Item key={index}>
						<div className="carousel-image-container-mobile">
							<Image
								className="carousel-image-mobile"
								src={`${process.env.REACT_APP_URL_SERVER}/${image.Chemin}`}
								alt={`Image de ${product?.nom}`}
							/>
						</div>
					</Carousel.Item>
				))}
			</Carousel>

			<div className="product-details p-3 mt-3 text-center">
				<div className="d-flex justify-content-center align-items-center mb-3 flex-column">
					<h2 className="product-title position-relative m-0">
						{product?.nom}
					</h2>
					<Button
						variant="none"
						size="lg"
						className="d-flex align-items-center justify-content-center p-2 bg-t border-0"
						style={{
							width: "50px",
							height: "50px",
						}}
						onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
					>
						{isFavorite ? <FaHeart /> : <FaRegHeart />}
					</Button>
				</div>

				<p className="text-muted text-left">
					{product?.description || "Description non disponible."}
				</p>

				<div className="d-flex align-items-center justify-content-center flex-column">
					<div className="d-flex align-items-center gap-3 mb-3">
						<p className="mb-0">Prix :</p>
						<p className="color-title mb-0 fw-bolder">{product?.prix_ttc} €</p>
					</div>
					<div className="d-flex justify-content-center align-items-center flex-wrap mt-3">
						{product?.stock > 0 ? (
							isInCart ? (
								<Button
									variant="danger"
									size="lg"
									onClick={handleRemoveFromCart}
									className="d-flex align-items-center remove-from-cart-btn mb-3"
								>
									Supprimer du panier
								</Button>
							) : (
								<Button
									variant="dark"
									size="lg"
									onClick={handleAddToCart}
									className="d-flex align-items-center add-to-cart-btn mb-3"
								>
									Ajouter au panier
								</Button>
							)
						) : (
							<span className="text-dark fs-5">Stock indisponible</span>
						)}
					</div>

					{isInCart && (
						<div className="d-flex justify-content-center align-items-center my-3 mt-3">
							<Button
								variant="none"
								onClick={handleDecrementQuantity}
								className="p-1 border-0"
							>
								<FiMinus />
							</Button>
							<span className="mx-3 fs-5">{quantity}</span>
							<Button
								variant="none"
								onClick={handleIncrementQuantity}
								className="p-1 border-0"
								disabled={quantity >= product?.stock}
							>
								<FiPlus />
							</Button>
						</div>
					)}
					<p className="text-muted fs-6 mb-0 mt-2">{product?.stock} en stock</p>
				</div>
			</div>
		</div>
	);

	// Rendu de la vue pour un utilisateur non connecté
	const renderDisconnectedView = () => (
		<div className="disconnected-view">
			<h1 className="product-title position-relative mb-5">
				{product?.nom}
			</h1>
			<div className="gallery">
				{product?.images.map((image, index) => (
					<div key={index} className="gallery-item">
						<img
							src={`${process.env.REACT_APP_URL_SERVER}/${image.Chemin}`}
							alt={product?.nom}
							className="gallery-image"
						/>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<Container className="container-fluid-custom mt-5">
			{/* Vérifie si l'utilisateur est connecté */}
			{isUserConnected ? (
				<>
					{/* Affichage pour mobile */}
					<div className="d-md-none">
						{renderMobileView()} {/* Affiche la vue spécifique pour les appareils mobiles */}
					</div>

					{/* Affichage pour desktop */}
					<div className="d-none d-md-block">
						{renderConnectedView()} {/* Affiche la vue détaillée pour les écrans de bureau */}
					</div>
				</>
			) : (
				renderDisconnectedView() /* Affiche la vue détaillée pour les utilisateurs non connectés */
			)}
		</Container>
	);

};

export default ProductDetail;
