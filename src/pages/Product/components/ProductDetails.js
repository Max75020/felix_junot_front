import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Image, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import produitApi from "../services/Product.api";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import { useCart } from "../../../context/CartContext";
import { UserContext } from "../../../context/UserContext";
import { extractIdFromUrl } from "../../../utils/tools";

const ProductDetail = () => {
	const [quantity, setQuantity] = useState(1);
	const [product, setProduct] = useState(null);
	const { id } = useParams();
	const {
		addToCart,
		fetchCart,
		incrementQuantity,
		decrementQuantity,
		cartItems,
	} = useCart(); // Utilisation du contexte
	const { user } = useContext(UserContext); // Accéder aux informations de l'utilisateur

	// Récupérer le panier ID à partir de l'IRI du panier
	const userCartId =
		user && user.paniers.length > 0
			? extractIdFromUrl(user.paniers[0]["@id"])
			: null;

	const fetchProduct = async () => {
		try {
			const response = await produitApi.getProduitById(id);
			setProduct(response);

			// Définir la quantité initiale à partir du panier si le produit existe déjà
			const existingCartItem = cartItems.find(
				(item) => item.produit["@id"] === response["@id"]
			);
			if (existingCartItem) {
				setQuantity(existingCartItem.quantite);
			}
		} catch (error) {
			console.error("Erreur lors de la récupération du produit:", error);
		}
	};

	const handleAddToCart = () => {
		if (product) {
			addToCart(product["@id"], quantity); // Ajout au panier via le contexte
		}
	};

	const handleIncrementQuantity = () => {
		if (product && product["@id"]) {
			setQuantity((prevQuantity) => prevQuantity + 1); // Augmenter la quantité localement
			incrementQuantity(product["@id"]);
		}
	};

	const handleDecrementQuantity = () => {
		if (product && product["@id"] && quantity > 1) {
			setQuantity((prevQuantity) => prevQuantity - 1); // Diminuer la quantité localement
			decrementQuantity(product["@id"]);
		}
	};

	useEffect(() => {
		console.log("userCartId:", userCartId);
		if (userCartId) {
			fetchCart(userCartId); // Récupération du panier via le contexte
		}
		fetchProduct(); // Récupération du produit via l'API
	}, [id, userCartId]);

	return (
		<Container className="mt-5">
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
						<h2 className="text-uppercase">{product?.nom}</h2>
						<p className="text-muted">
							{product?.description ||
								"Description non disponible."}
						</p>
						<div className="d-flex justify-content-between align-items-center">
							<p className="lead mb-0">Prix :</p>
							<p className="lead text-primary mb-0">
								{product?.prix_ttc} €
							</p>
						</div>

						{/* Contrôle de la quantité */}
						<Row className="align-items-center my-3">
							<Col
								xs={4}
								className="d-flex justify-content-start align-items-center"
							>
								<Button
									variant="none"
									onClick={handleDecrementQuantity}
									className="p-1"
								>
									<FiMinus />
								</Button>
								<span className="mx-3 fs-5">{quantity}</span>
								<Button
									variant="none"
									onClick={handleIncrementQuantity}
									className="p-1"
								>
									<FiPlus />
								</Button>

							</Col>
							{/* afficher le stock  */}
							<p className="text-muted fs-6">
								{product?.stock} en stock
							</p>
						</Row>

						{/* Boutons d'action */}
						<div className="d-flex justify-content-end gap-5 mt-4">
							<Button
								variant="dark"
								size="lg"
								onClick={handleAddToCart}
								className="d-flex align-items-center"
							>
								Ajouter au panier
							</Button>
							<Button
								variant="none"
								size="lg"
								className="d-flex align-items-center justify-content-center p-2"
								style={{
									width: "50px",
									height: "50px",
									borderRadius: "50%",
									border: "2px solid black",
									backgroundColor: "transparent",
								}}
							>
								<FaHeart />
							</Button>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default ProductDetail;
