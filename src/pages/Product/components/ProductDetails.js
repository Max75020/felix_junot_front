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
    const { addToCart, fetchCart } = useCart(); // Utilisation du contexte
    const { user } = useContext(UserContext); // Accéder aux informations de l'utilisateur

    // Récupérer le panier ID à partir de l'IRI du panier
    const userCartId = user && user.paniers.length > 0 ? extractIdFromUrl(user.paniers[0]["@id"]) : null;

    const fetchProduct = async () => {
        try {
            const response = await produitApi.getProduitById(id);
            setProduct(response);
        } catch (error) {
            console.error("Erreur lors de la récupération du produit:", error);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product["@id"], quantity); // Ajout au panier via le contexte
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
                        src={product?.imagePrincipal || "https://placehold.co/500"}
                        fluid
                    />
                </Col>

                <Col md={5}>
                    <h2 className="text-uppercase">{product?.nom}</h2>
                    <p className="lead">Prix en euros: {product?.prix_ttc} €</p>

                    <Row className="align-items-center">
                        <Col xs={4}>
                            <Button variant="none" onClick={() => setQuantity(quantity - 1)}>
                                <FiMinus />
                            </Button>
                            <span className="mx-2">{quantity}</span>
                            <Button variant="none" onClick={() => setQuantity(quantity + 1)}>
                                <FiPlus />
                            </Button>
                        </Col>
                    </Row>

                    <div className="mt-4">
                        <Button variant="dark" size="lg" onClick={handleAddToCart}>
                            Ajouter au panier
                        </Button>
                        <Button variant="none" size="lg">
                            <FaHeart />
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
