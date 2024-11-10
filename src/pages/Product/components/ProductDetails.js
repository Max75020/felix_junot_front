import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Image, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import produitApi from "../services/Product.api";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useCart } from "../../../context/CartContext";
import { UserContext } from "../../../context/UserContext";
import { extractIdFromUrl } from "../../../utils/tools";
import { showWarning } from "../../../services/popupService";
import favorisApi from "../../Favorites/services/Favorites.api";

/* Importer le css */
import "../../../assets/styles/Products/ProductDetail.css";

const ProductDetail = () => {
	const [quantity, setQuantity] = useState(1);
	const [product, setProduct] = useState(null);
	const [isInCart, setIsInCart] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const [favoriteId, setFavoriteId] = useState(null);
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

	// Récupérer le panier ID à partir de l'IRI du panier
	const userCartId = user && user.panierOuvert ? extractIdFromUrl(user.panierOuvert["@id"]) : null;

	const fetchProduct = async () => {
		if (!id) return;
		try {
			const response = await produitApi.getProduitById(id);
			setProduct(response);

			// Vérification si le produit est dans le panier de l'utilisateur
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
	}, [user, product]);

	useEffect(() => {
		if (userCartId) {
			fetchCart(userCartId);
		}
		fetchProduct();
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

	const renderConnectedView = () => (
		<Row>
			<Col md={1}>
				<ListGroup variant="flush">
					{product?.images.map((image, index) => (
						<ListGroup.Item key={index}>
							<Image src={`http://localhost:8741/${image.Chemin}`} thumbnail />
						</ListGroup.Item>
					))}
				</ListGroup>
			</Col>

			<Col md={6} className="d-flex justify-content-center">
				<Image
					src={
						product?.images.find(img => img.cover)?.Chemin
							? `http://localhost:8741/${product.images.find(img => img.cover).Chemin}`
							: "https://placehold.co/500"
					}
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
					<div className="d-flex align-items-center justify-content-between flex-wrap flex-column flex-lg-row">
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

	const renderDisconnectedView = () => (
		<div className="disconnected-view text-center">
			<h2 className="text-uppercase">{product?.nom}</h2>
			<div className="product-images">
				<Image
					src={
						product?.images.find(img => img.cover)?.Chemin
							? `http://localhost:8741/${product.images.find(img => img.cover).Chemin}`
							: "https://placehold.co/500"
					}
					fluid
					className="mb-3"
				/>
				{product?.images.map((image, index) => (
					<Image
						key={index}
						src={`http://localhost:8741/${image.Chemin}`}
						thumbnail
						className="mx-1"
					/>
				))}
			</div>
		</div>
	);

	return (
		<Container className="mt-5">
			{isUserConnected ? renderConnectedView() : renderDisconnectedView()}
		</Container>
	);
};

export default ProductDetail;
