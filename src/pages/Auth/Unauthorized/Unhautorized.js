import React from 'react'; // Importation de React pour créer le composant

// Composant pour la page d'accès non autorisé
const Unauthorized = () => {
	return (
		<div>
			<h1>Accès Refusé</h1> {/* Titre indiquant que l'accès est refusé */}
			<p>Vous n'avez pas la permission de voir cette page.</p> {/* Message expliquant que l'utilisateur n'a pas l'autorisation */}
		</div>
	);
};

export default Unauthorized; // Exportation du composant Unauthorized pour l'utiliser dans d'autres parties de l'application
