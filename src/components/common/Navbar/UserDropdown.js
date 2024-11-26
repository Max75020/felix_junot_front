/* Importation des bibliothèques React et React Bootstrap */
import React from "react";
/* Importation du composant Dropdown de React Bootstrap pour créer un menu déroulant */
import { Dropdown } from "react-bootstrap";
/* Importation du hook useNavigate de React Router pour la navigation programmatique */
import { useNavigate } from "react-router-dom";

/* Composant UserDropdown : menu déroulant pour les actions liées à l'utilisateur */
function UserDropdown({ user, userInitials, handleLogout }) {
	// Utilisation du hook useNavigate pour permettre la navigation programmatique
	const navigate = useNavigate();

	return (
		<Dropdown align="end">
			<Dropdown.Toggle
				variant="none"
				id="dropdown-basic"
				className="px-2"
				bsPrefix="custom-dropdown-toggle"
				style={{
					backgroundColor: "#000000", // Couleur de fond du bouton du menu utilisateur
					color: "#fff", // Couleur du texte (initiales de l'utilisateur)
					borderRadius: "50%", // Bordure arrondie pour donner un aspect circulaire
					width: "40px", // Largeur du bouton
					height: "40px", // Hauteur du bouton
					display: "flex", // Utilisé pour centrer le texte à l'intérieur du bouton
					alignItems: "center", // Centre verticalement le contenu du bouton
					justifyContent: "center", // Centre horizontalement le contenu du bouton
					fontSize: "18px", // Taille de la police des initiales de l'utilisateur
					fontWeight: "bold", // Texte en gras pour les initiales de l'utilisateur
					border: "none", // Supprime la bordure par défaut du bouton
				}}
			>
				{/* Affichage des initiales de l'utilisateur */}
				{userInitials}
			</Dropdown.Toggle>

			<Dropdown.Menu
				align="end"
				style={{
					position: "absolute", // Positionnement absolu du menu déroulant
					top: "40px", // Espace entre le menu déroulant et le bouton
					right: "0px", // Alignement à droite du menu déroulant
				}}
			>
				{/* Lien vers la page du profil utilisateur */}
				<Dropdown.Item href="/profil">Profil</Dropdown.Item>
				{/* Bouton de déconnexion qui appelle la fonction handleLogout */}
				<Dropdown.Item onClick={handleLogout}>Déconnexion</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default UserDropdown;