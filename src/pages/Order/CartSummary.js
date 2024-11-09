import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useOrder } from '../../context/OrderContext';
import { useCart } from '../../context/CartContext';
import { FaTrashAlt } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import '../../assets/styles/Commandes/CartSummary.css';

const CartSummary = () => {
	const { user } = useContext(UserContext);
	const { orderData } = useOrder(); // Utilise orderData depuis OrderContext
	const { removeFromCart } = useCart(); // Utilisation directe de la fonction de suppression depuis CartContext
	const navigate = useNavigate();

	// Fonction pour formater les prix en euros
	const formatPrice = (price) => {
		return new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
		}).format(price);
	};


	// Fonction pour gérer la suppression d'un article
	const handleRemoveFromCart = async (productId) => {
		try {
			await removeFromCart(productId); // Suppression via CartContext
		} catch (error) {
			console.error("Erreur lors de la suppression de l'article :", error);
		}
	};

	// Navigation conditionnelle vers le choix de l'adresse
	const handleAdresseChoice = () => {
		if (orderData.cartItems && orderData.cartItems.length > 0) {
			navigate("/address-choice");
		}
	};

	// Vérifie si l'utilisateur n'a pas de panier
	if (!user || !user.panierOuvert) {
		return <div className="text-center mt-4">Aucun produit dans le panier.</div>;
	}

	return (
		<Container fluid className="p-4">
			<Row className="mb-4">
				<Col>
					<h1 className="text-center">Récapitulatif du Panier</h1>
				</Col>
			</Row>

			<Row className="d-flex justify-content-center gap-4">
				{orderData.cartItems && orderData.cartItems.map((produitPanier, index) => (
					<div key={index} className="border border-dark rounded p-3 position-relative" style={{ maxWidth: "300px" }}>
						<button
							className="btn btn-link position-absolute top-0 start-0 m-2 p-0 text-dark color-link-hover"
							aria-label="Supprimer le produit"
							onClick={() => handleRemoveFromCart(produitPanier.id)}
						>
							<FaTrashAlt size={20} />
						</button>
						<h4 className="text-center mt-4 text-dark">{produitPanier.produit.nom}</h4>
						<img
							src="https://placehold.co/400"
							alt={produitPanier.produit.nom}
							className="mx-auto d-block img-fluid my-3 rounded"
							style={{ maxWidth: "100%", maxHeight: "300px" }}
						/>
						<div className="d-flex flex-column align-items-center">
							<h4 className="text-dark">RÉFÉRENCE</h4>
							<p className="text-muted p-card">{produitPanier.produit.reference}</p>

							<h4 className="text-dark">QUANTITÉ</h4>
							<p className="text-muted p-card">{produitPanier.quantite}</p>

							<h4 className="text-dark">PRIX UNITAIRE</h4>
							<p className="text-muted p-card">{formatPrice(produitPanier.produit.prix_ttc)}</p>

							<h4 className="text-dark">PRIX TOTAL</h4>
							<p className="fw-bold ">{formatPrice(produitPanier.prix_total_produit)}</p>
						</div>
					</div>
				))}
			</Row>

			<Row className="mt-4">
				<Col className="text-center">
					<h4 className="text-dark">Total Produits</h4>
					<h4 className="fw-bold">{formatPrice(orderData.totalPanier)}</h4>
				</Col>
			</Row>

			<Row className="mt-4">
				<Col className="d-flex align-items-center justify-content-center">
					<Button
						className="d-flex align-items-center justify-content-center gap-2"
						variant="dark"
						size="lg"
						onClick={handleAdresseChoice}
						disabled={!orderData.cartItems || orderData.cartItems.length === 0}
					>
						Choix de l'adresse
						<HiArrowLongRight className="ms-2" size={35} />
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default CartSummary;
