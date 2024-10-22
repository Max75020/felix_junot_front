import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Image, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import produitApi from "../services/Product.api";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import { useCart } from "../../../context/CartContext";
import { UserContext } from "../../../context/UserContext";
import { extractIdFromUrl } from "../../../utils/tools";
import { showWarning } from "../../../services/popupService";

/* Importer le css */
import "../../../assets/styles/Products/ProductDetail.css";

const ProductDetail = () => {
	const [quantity, setQuantity] = useState(1);
	const [product, setProduct] = useState(null);
	const [isInCart, setIsInCart] = useState(false); // Nouvel état pour vérifier si le produit est dans le panier
	const { id } = useParams();
	const {
		addToCart,
		removeFromCart,
		fetchCart,
		incrementQuantity,
		decrementQuantity,
		cartItems,
	} = useCart();
	const { user } = useContext(UserContext);

	const isUserConnected = !!user; // Vérifier si l'utilisateur est connecté

	// Récupérer le panier ID à partir de l'IRI du panier
	const userCartId =
		user && user.paniers.length > 0
			? extractIdFromUrl(user.paniers[0]["@id"])
			: null;

	const fetchProduct = async () => {
		try {
			const response = await produitApi.getProduitById(id);
			setProduct(response);

			// Vérification si le produit est dans le panier de l'utilisateur
			const existingCartItem = user?.paniers[0]?.panierProduits.find(
				(item) => item.produit["@id"] === response["@id"]
			);

			if (existingCartItem) {
				setIsInCart(true);
				setQuantity(existingCartItem.quantite);
			}
		} catch (error) {
			console.error("Erreur lors de la récupération du produit:", error);
		}
	};

	const handleAddToCart = () => {
		if (product) {
			addToCart(product["@id"], quantity); // Ajout au panier via le contexte
			setIsInCart(true); // Marque le produit comme ajouté au panier
		}
	};

	const handleRemoveFromCart = () => {
		if (product) {
			const cartItem = cartItems.find(
				(item) => item.produit["@id"] === product["@id"]
			);
			if (cartItem) {
				removeFromCart(cartItem.id); // Utilisation de la méthode du contexte
				setIsInCart(false); // Marquer comme retiré du panier
				setQuantity(1); // Réinitialiser la quantité
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
			setQuantity((prevQuantity) => prevQuantity - 1); // Diminuer la quantité localement
			decrementQuantity(product["@id"]);
		}
	};

	useEffect(() => {
		if (userCartId) {
			fetchCart(userCartId); // Récupération du panier via le contexte
		}
		fetchProduct(); // Récupération du produit via l'API
	}, [id, userCartId]);

	// Rendu de la vue pour les utilisateurs connectés (restauration de l'ancienne structure)
	const renderConnectedView = () => (
		<Row>
			<Col md={1}>
				<ListGroup variant="flush">
					{product?.images.map((image, index) => (
						<ListGroup.Item key={index}>
							<Image src={image} thumbnail />
						</ListGroup.Item>
					))}
				</ListGroup>
			</Col>

			<Col md={6}>
				<Image
					src={
						product?.imagePrincipal ||
						"https://placehold.co/500"
					}
					fluid
				/>
			</Col>

			<Col md={5}>
				{/* Détails du produit */}
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
						>
							<FaHeart />
						</Button>
					</div>
					<p className="text-muted text-left">
						{product?.description || "Description non disponible."}
					</p>
					<div className="d-flex justify-content-center align-items-center gap-3 mb-3">
						<p className="mb-0">Prix :</p>
						<p className="color-title mb-0 fw-bolder">
							{product?.prix_ttc} €
						</p>
					</div>

					{/* Contrôle de la quantité uniquement si le produit est dans le panier */}
					{isInCart ? (
						<Row className="align-items-center">
							<div className="d-flex justify-content-between align-items-center my-3">
								<div className="d-flex align-items-center">
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

						</Row>
					) : null}

					{/* Boutons d'action */}
					<div className="d-flex justify-content-center align-items-center align-content-center flex-wrap mt-4">
						{isInCart ? (
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
						)}
					</div>
				</div>
			</Col>
		</Row>
	);

	// Rendu de la vue pour les utilisateurs non connectés
	const renderDisconnectedView = () => (
		<div className="disconnected-view text-center">
			<h2 className="text-uppercase">{product?.nom}</h2>
			<div className="product-images">
				<Image
					src={product?.imagePrincipal || "https://placehold.co/500"}
					fluid
					className="mb-3"
				/>
				{product?.images.map((image, index) => (
					<Image
						key={index}
						src={image || "https://placehold.co/100"}
						thumbnail
						className="mx-1"
					/>
				))}
			</div>
		</div>
	);

	return (
		<Container className="mt-5">
			{/* Affichage conditionnel basé sur l'état de connexion */}
			{isUserConnected ? renderConnectedView() : renderDisconnectedView()}
		</Container>
	);
};

export default ProductDetail;
