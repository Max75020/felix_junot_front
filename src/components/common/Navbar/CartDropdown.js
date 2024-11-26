/* Importation de React pour utiliser des composants fonctionnels */
import React from "react";
/* Importation des composants nécessaires de React Bootstrap pour le Dropdown et les boutons */
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
/* Importation des icônes utilisées dans le composant (icône du panier et icône pour fermer) */
import { BsBag } from "react-icons/bs";
import { MdClose } from "react-icons/md";
/* Importation de Link de React Router pour les liens internes de l'application */
import { Link } from "react-router-dom";

function CartDropdown({ cartItems, totalPanier, removeFromCart }) {
	/* Fonction utilitaire pour obtenir l'URL de l'image de couverture du produit */
	const getCoverImageUrl = (produit) => {
		// Cherche l'image de couverture dans la liste des images du produit
		const coverImage = produit.images.find((image) => image.cover);
		// Si une image de couverture existe, retourne son chemin complet, sinon une image par défaut
		return coverImage ? `${process.env.REACT_APP_URL_SERVER}/${coverImage.Chemin}` : "https://placehold.co/80";
	};

	return (
		<Dropdown align="end">
			<Dropdown.Toggle
				variant="none"
				id="dropdown-cart"
				className="px-2 hover border-0 bg-t"
				bsPrefix="custom-dropdown-toggle"
			>
				{/* Icône du panier avec le nombre d'articles */}
				<BsBag size={24} />
				{/* Badge indiquant le nombre d'articles dans le panier */}
				<span className="badge bg-primary ms-2 d-xs-none">
					{cartItems.length}
				</span>
			</Dropdown.Toggle>

			<Dropdown.Menu
				align="end"
				style={{
					position: "absolute",
					top: "40px",
					right: "0px",
					width: "350px", // Définit la largeur du menu déroulant
				}}
			>
				{/* Header du panier avec le titre et le total */}
				<div className="d-flex justify-content-between align-items-center p-3 mt-0 pt-0 pb-2 border-bottom">
					{/* Titre du panier */}
					<div className="d-flex align-items-center">
						Votre panier
					</div>
					{/* Total du panier */}
					<div>
						<span className="fw-bold">TOTAL: </span>
						<span className="text-primary">{parseFloat(totalPanier).toFixed(2)} €</span>
					</div>
				</div>

				{/* Liste des articles du panier */}
				{cartItems.length > 0 ? (
					<>
						{/* Parcours de chaque article du panier */}
						{cartItems.map((item) => (
							<div
								className="position-relative d-flex align-items-center mb-3 border-bottom pb-3"
								key={item.id}
								style={{ padding: "10px" }} // Espacement interne de chaque article du panier
							>
								{/* Bouton pour supprimer l'article du panier */}
								<Button
									onClick={() => removeFromCart(item.id)}
									variant="link"
									className="p-0 position-absolute"
									style={{
										bottom: "10px", // Positionné en bas à droite
										right: "10px",
									}}
								>
									{/* Icône pour supprimer l'article */}
									<MdClose size={20} color="red" />
								</Button>

								{/* Image du produit */}
								<img
									src={getCoverImageUrl(item.produit)}
									alt={item.produit.nom}
									className="rounded"
									style={{
										width: "80px", // Largeur de l'image
										height: "80px", // Hauteur de l'image
										objectFit: "cover", // Assure que l'image couvre bien l'espace alloué sans déformation
										marginRight: "15px", // Espacement entre l'image et les détails du produit
									}}
								/>

								{/* Détails du produit */}
								<div className="flex-grow-1">
									<div className="d-flex justify-content-between">
										<div>
											{/* Nom du produit */}
											<span
												className="fw-bold d-block"
												style={{
													fontSize: "14px",
													textTransform: "uppercase", // Nom du produit en majuscules
												}}
											>
												{item.produit.nom}
											</span>
											{/* Prix par unité du produit */}
											<span
												className="text-muted"
												style={{ fontSize: "12px" }}
											>
												A l'unité : {item.produit.prix_ttc} € / unité
											</span>
											{/* Quantité du produit */}
											<span
												className="text-muted"
												style={{
													fontSize: "12px",
													display: "block",
												}}
											>
												Quantité : {item.quantite}
											</span>
										</div>
										{/* Prix total pour cet article */}
										<div className="text-end">
											<span className="fw-bold d-flex" style={{ minWidth: "50px" }}>
												{parseFloat(item.prix_total_produit).toFixed(2)} €
											</span>
										</div>
									</div>
								</div>
							</div>
						))}

						{/* Bouton Checkout */}
						<div className="text-center p-2">
							{/* Lien vers la page de récapitulatif du panier */}
							<Link to="/panier-summary" className="text-decoration-none">
								<button className="btn btn-dark w-100">
									Payer
								</button>
							</Link>
						</div>
					</>
				) : (
					/* Message lorsque le panier est vide */
					<Dropdown.Item disabled>Le panier est vide</Dropdown.Item>
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default CartDropdown;
