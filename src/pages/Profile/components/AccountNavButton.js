// Importation des bibliothèques React et React Bootstrap nécessaires pour ce composant
import React from "react";
import { Button, Col } from "react-bootstrap";

// Importation du composant Link de React Router pour gérer les redirections
import { Link } from "react-router-dom";

// Composant AccountNavButton : permet de créer un bouton de navigation pour la page de profil utilisateur
const AccountNavButton = ({ icon: IconComponent, text, size, link, ...props }) => {
	return (
		// Le bouton est contenu dans une colonne pour assurer une mise en page responsive
		<Col xs={8} md={4} lg={3} className="text-center">
			{/* Utilisation du composant Link pour rediriger l'utilisateur vers la page cible */}
			<Link to={link} className="text-decoration-none">
				{/* Bouton stylisé avec React Bootstrap */}
				<Button
					variant="outline-dark" // Style du bouton
					className="account-nav-btn d-flex flex-column align-items-center gap-3" // Classes CSS personnalisées
					{...props} // Transmission des propriétés supplémentaires
				>
					{/* Section pour l'icône, stylisée avec une boîte dédiée */}
					<div className="icon-box">
						<IconComponent size={size} /> {/* Icône dynamique basée sur les props */}
					</div>
					{/* Texte du bouton en majuscules */}
					<p className="text-uppercase m-0">{text}</p>
				</Button>
			</Link>
		</Col>
	);
};

// Exportation du composant pour l'utiliser dans d'autres parties de l'application
export default AccountNavButton;
