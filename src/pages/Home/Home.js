import React from 'react'; // Importation de React
import CardSlider from './components/CardSlider'; // Importation du composant CardSlider pour afficher une sélection de cartes
import MyCarousel from './components/Carousel/Carousel'; // Importation du composant MyCarousel pour afficher le carrousel

/**
 * Composant principal pour la page d'accueil.
 *
 * @component
 * @example
 * return (
 *   <Home />
 * )
 * 
 * @returns {JSX.Element} La structure de la page d'accueil incluant un carrousel et un slider de cartes.
 */
function Home() {
	return (
		<div>
			{/* Carrousel affiché en haut de la page d'accueil */}
			<MyCarousel />

			{/* Section contenant le slider avec des cartes de produits ou catégories */}
			<div>
				<CardSlider />
			</div>
		</div>
	);
}

export default Home; // Exportation du composant Home pour être utilisé ailleurs dans l'application
