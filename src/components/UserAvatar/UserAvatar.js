/* Importation de React pour la création du composant UserAvatar */
import React from "react";
/* Importation de PropTypes pour valider les types des props */
import PropTypes from "prop-types";

/* Composant UserAvatar : Affiche les initiales de l'utilisateur dans un cercle stylisé */
const UserAvatar = ({ initials }) => {
	return (
		<div
			className="bg-black text-white rounded-circle d-flex align-items-center justify-content-center"
			style={{
				width: "100px", // Définit la largeur de l'avatar
				height: "100px", // Définit la hauteur de l'avatar
				fontSize: "36px", // Définit la taille de la police pour les initiales
				fontWeight: "bold", // Applique un style de police en gras pour les initiales
				border: "none", // Supprime toute bordure potentielle
			}}
		>
			{/* Affichage des initiales de l'utilisateur */}
			{initials}
		</div>
	);
};

/* Définition des types des props pour s'assurer que 'initials' est une chaîne de caractères et est requis */
UserAvatar.propTypes = {
	initials: PropTypes.string.isRequired,
};

export default UserAvatar;