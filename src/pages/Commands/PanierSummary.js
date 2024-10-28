import React, { useContext, useEffect } from 'react'; // Importation de useEffect depuis la bibliothèque react
import { Container, Row, Col, Button } from 'react-bootstrap'; // Importation des composants Container, Row, Col et Button depuis la bibliothèque react-bootstrap
import { UserContext } from '../../context/UserContext'; // Importation du contexte UserContext
import { useCart } from '../../context/CartContext'; // Importation du hook personnalisé useCart
import { FaTrashAlt } from "react-icons/fa"; // Importation de l'icône de la corbeille
import { GoArrowRight } from "react-icons/go"; // Importation de l'icône de la flèche droite
import { extractIdFromUrl } from '../../utils/tools'; // Assurez-vous d'importer cette fonction

const PanierSummary = () => {
	// Utilisation du UserContext pour récupérer les informations de l'utilisateur connecté
	const { user } = useContext(UserContext);
	const { cartItems, removeFromCart, fetchCart, totalPanier } = useCart(); // Utilisation du CartContext pour accéder aux fonctions nécessaires

	// Fonction déclenchée lors du montage du composant ou lorsque l'utilisateur change
	useEffect(() => {
		if (user && user.paniers && user.paniers.length > 0) {
			const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
			fetchCart(userCartId); // Récupère les dernières données du panier
		}
	}, [user]); // Déclenche seulement quand `user` change (au montage et lorsque `user` change)

	// Fonction pour gérer la suppression d'un article
	const handleRemoveFromCart = async (productId) => {
		await removeFromCart(productId); // Supprime le produit du panier
		if (user && user.paniers.length > 0) {
			const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
			await fetchCart(userCartId); // Met à jour le panier immédiatement après la suppression
		}
	};

	// Vérifier si l'utilisateur ou le panier est disponible
	if (!user || !user.paniers || user.paniers.length === 0) {
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
				{cartItems.map((produitPanier, index) => (
					<div key={index} className="border border-dark rounded p-3 position-relative" style={{ maxWidth: "300px" }}>
						<button
							className="btn btn-link position-absolute top-0 start-0 m-2 p-0 text-dark"
							aria-label="Supprimer le produit"
							onClick={() => handleRemoveFromCart(produitPanier.id)} // Appel de la fonction handleRemoveFromCart avec l'ID du produit
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
							<p className="text-muted">{produitPanier.produit.reference}</p>

							<h4 className="text-dark">QUANTITÉ</h4>
							<p className="text-muted">{produitPanier.quantite}</p>

							<h4 className="text-dark">PRIX UNITAIRE</h4>
							<p className="text-muted">{(produitPanier.produit.prix_ttc)}€</p>

							<h4 className="text-dark">PRIX TOTAL</h4>
							<p className="fw-bold">{produitPanier.prix_total_produit}€</p>
						</div>
					</div>
				))}
			</Row>

			<Row className="mt-4">
				<Col className="text-center">
					<h4 className="text-dark">Total Produits</h4>
					<h4 className="fw-bold">{totalPanier}€</h4>
				</Col>
			</Row>

			<Row className="mt-4">
				<Col className="d-flex align-items-center justify-content-center">
					<Button className="d-flex align-items-center justify-content-center gap-2" variant="dark" size="lg">
						Choix de l'adresse
						<GoArrowRight className="ms-2" size={30} />
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default PanierSummary;
