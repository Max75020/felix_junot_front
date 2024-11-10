import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Image, ListGroup, Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import produitApi from "../services/Product.api";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useCart } from "../../../context/CartContext";
import { UserContext } from "../../../context/UserContext";
import { extractIdFromUrl } from "../../../utils/tools";
import { showWarning } from "../../../services/popupService";
import favorisApi from "../../Favorites/services/Favorites.api";
import "../../../assets/styles/Products/ProductDetail.css";

const ProductDetail = () => {
	const [quantity, setQuantity] = useState(1);
	const [product, setProduct] = useState(null);
	const [isInCart, setIsInCart] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const [favoriteId, setFavoriteId] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null); // Pour gérer l'image sélectionnée
	const { id } = useParams();
	const {
		addToCart,
		removeFromCart,
		fetchCart,
		incrementQuantity,
		decrementQuantity,
		cartItems,
	} = useCart();
	const { user, setUser } = useContext(UserContext);

	const isUserConnected = !!user;
	const userCartId = user && user.panierOuvert ? extractIdFromUrl(user.panierOuvert["@id"]) : null;

	const fetchProduct = async () => {
		if (!id) return;
		try {
			const response = await produitApi.getProduitById(id);
			setProduct(response);
			setSelectedImage(response.images.find(img => img.cover)?.Chemin || response.images[0]?.Chemin);

			const existingCartItem = cartItems.find(
				(item) => item.produit["@id"] === response["@id"]
			);
			if (existingCartItem) {
				setIsInCart(true);
				setQuantity(existingCartItem.quantite);
			} else {
				setIsInCart(false);
				setQuantity(1);
			}
		} catch (error) {
			console.error("Erreur lors de la récupération du produit:", error);
		}
	};

	const handleAddToCart = () => {
		if (product) {
			addToCart(product["@id"], quantity);
			setIsInCart(true);
		}
	};

	const handleRemoveFromCart = () => {
		if (product) {
			const cartItem = cartItems.find(
				(item) => item.produit["@id"] === product["@id"]
			);
			if (cartItem) {
				removeFromCart(cartItem.id);
				setIsInCart(false);
				setQuantity(1);
			}
		}
	};

	const handleIncrementQuantity = () => {
		if (product && product["@id"]) {
			if (quantity < product.stock) {
				setQuantity((prevQuantity) => prevQuantity + 1);
				incrementQuantity(product["@id"]);
			} else {
				showWarning("Stock maximum atteint pour ce produit.");
			}
		}
	};

	const handleDecrementQuantity = () => {
		if (product && product["@id"] && quantity > 1) {
			setQuantity((prevQuantity) => prevQuantity - 1);
			decrementQuantity(product["@id"]);
		}
	};

	const handleAddToFavorites = async () => {
		if (!product) return;
		try {
			const response = await favorisApi.addFavori(user["@id"], product["@id"]);
			if (!response.id_favoris) {
				console.error("Erreur : L'ID du favori ajouté est manquant dans la réponse.");
				return;
			}
			setFavoriteId(response.id_favoris);
			setIsFavorite(true);
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
			console.error("Erreur lors de l'ajout aux favoris:", error);
		}
	};

	const handleRemoveFromFavorites = async () => {
		if (!favoriteId) return;
		try {
			await favorisApi.deleteFavori(favoriteId);
			setFavoriteId(null);
			setIsFavorite(false);
			setUser((prevUser) => ({
				...prevUser,
				favoris: prevUser.favoris.filter((fav) => fav.id_favoris !== favoriteId)
			}));
		} catch (error) {
			console.error("Erreur lors de la suppression du favori:", error);
		}
	};

	const checkIfProductIsFavorite = () => {
		if (user && product && user.favoris) {
			const favorite = user.favoris.find(
				(fav) => fav.produit && fav.produit["@id"] === product["@id"]
			);
			if (favorite) {
				setIsFavorite(true);
				setFavoriteId(favorite.id_favoris);
			} else {
				setIsFavorite(false);
			}
		}
	};

	useEffect(() => {
		if (user && product) {
			checkIfProductIsFavorite();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, product]);

	useEffect(() => {
		if (userCartId) {
			fetchCart(userCartId);
		}
		fetchProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, userCartId]);

	// Synchroniser l'état `isInCart` et `quantity` avec `cartItems`
	useEffect(() => {
		if (product) {
			const cartItem = cartItems.find((item) => item.produit["@id"] === product["@id"]);
			if (cartItem) {
				setIsInCart(true);
				setQuantity(cartItem.quantite);
			} else {
				setIsInCart(false);
				setQuantity(1);
			}
		}
	}, [cartItems, product]);

	const handleImageSelect = (imagePath) => {
		setSelectedImage(imagePath);
	};

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


	const renderMobileView = () => (
		<div>
			<Carousel>
				{product?.images.map((image, index) => (
					<Carousel.Item key={index}>
						<Image
							className="d-block w-100 carousel-image-mobile"
							src={`${process.env.REACT_APP_URL_SERVER}/${image.Chemin}`}
							alt={`Image de ${product?.nom}`}
						/>
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


	const renderDisconnectedView = () => (
		<div className="disconnected-view text-center">
			<h2 className="text-uppercase">{product?.nom}</h2>
			<div className="product-images">
				<Image
					src={`${process.env.REACT_APP_URL_SERVER}/${selectedImage}`}
					fluid
					className="mb-3"
				/>
				{product?.images.map((image, index) => (
					<Image
						key={index}
						src={`${process.env.REACT_APP_URL_SERVER}/${image.Chemin}`}
						thumbnail
						className="mx-1"
					/>
				))}
			</div>
		</div>
	);

	return (
		<Container className="container-fluid-custom mt-5">
			{isUserConnected ? (
				<>
					{/* Affichage pour mobile */}
					<div className="d-md-none">{renderMobileView()}</div>

					{/* Affichage pour desktop */}
					<div className="d-none d-md-block">{renderConnectedView()}</div>
				</>
			) : (
				renderDisconnectedView()
			)}
		</Container>
	);
};

export default ProductDetail;
