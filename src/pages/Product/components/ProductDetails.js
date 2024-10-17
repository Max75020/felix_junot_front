import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import produitApi from "../services/Product.api";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null); // État pour stocker les informations du produit
    const { id } = useParams(); // Récupère l'ID du produit depuis l'URL

    const fetchProduct = async () => {
        try {
            const response = await produitApi.getProduitById(id); // Appel à l'API pour récupérer le produit par ID
            setProduct(response); // Stocke la réponse dans l'état 'product'
        } catch (error) {
            console.error("Erreur lors de la récupération du produit:", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]); // Recharger les données si l'ID du produit change

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    // Affiche un message de chargement tant que le produit n'est pas chargé
    if (!product) {
        return <p>Chargement...</p>;
    }

    return (
        <Container className="mt-5">
            <Row>
                {/* Section de miniatures d'images à gauche */}
                <Col md={1}>
                    <ListGroup variant="flush">
                        {product.images &&
                            product.images.map((image, index) => (
                                <ListGroup.Item key={index}>
                                    <Image src={image} thumbnail />
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </Col>

                {/* Section de l'image principale */}
                <Col md={6}>
                    <Image
                        src={
                            product.imagePrincipal || "https://placehold.co/500"
                        }
                        fluid
                    />
                </Col>

                {/* Section des détails de l'œuvre */}
                <Col md={5}>
                    <h2 className="text-uppercase">{product.nom}</h2>
                    <p className="lead">Prix en euros: {product.prix_ttc} €</p>

                    {/* Section quantité et bouton favoris */}
                    <Row className="align-items-center">
                        <Col xs={4}>
                            <Button variant="none" onClick={handleDecrease}>
                                <FiMinus />
                            </Button>
                            <span className="mx-2">{quantity}</span>
                            <Button variant="none" onClick={handleIncrease}>
                                <FiPlus />
                            </Button>
                        </Col>
                        <div>
                            Valeur totale: {product.prix_ttc * quantity} €
                        </div>
                    </Row>

                    {/* Section description */}
                    <p className="mt-4">
                        {product.description ||
                            "Aucune description disponible pour ce produit."}
                    </p>

                    {/* Bouton */}
                    <div class="flex align-items-center">
                        <Button variant="dark">
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
