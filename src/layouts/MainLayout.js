import React from 'react'; // Importation de la bibliothèque React pour créer des composants
import { Outlet } from 'react-router-dom'; // Importation de Outlet de react-router-dom pour rendre les composants enfants des routes
import MyNavbar from '../components/common/Navbar'; // Importation du composant de navigation Navbar
import Footer from '../components/common/Footer'; // Importation du composant Footer pour le pied de page

// Composant de mise en page principal qui encapsule les autres composants
function MainLayout() {
	return (
		// Conteneur principal qui englobe la mise en page
		<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
			{/* Affiche la barre de navigation en haut de la page */}
			<MyNavbar />
			{/* Section principale du site qui contient les composants enfants (rendus via Outlet) */}
			<main style={{ flex: 1 }}>
				<Outlet /> {/* Outlet est utilisé ici pour rendre les composants enfants associés aux routes */}
			</main>
			{/* Affiche le pied de page en bas de la page */}
			<Footer />
		</div>
	);
}

export default MainLayout; // Exportation du composant MainLayout pour utilisation dans d'autres fichiers