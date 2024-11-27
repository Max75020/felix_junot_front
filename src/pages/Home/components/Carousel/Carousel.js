import React, { useState } from 'react'; // Importation de React et du hook useState pour gérer l'état local
import Carousel from 'react-bootstrap/Carousel'; // Importation du composant Carousel de React Bootstrap pour le carrousel d'images

// Importation des images à utiliser dans le carrousel
import firstImage from '../../../../assets/images/1/1.jpg';
import secondImage from '../../../../assets/images/2/2.jpg';
import thirdImage from '../../../../assets/images/3/3.jpg';
import fourImage from '../../../../assets/images/4/4.jpg';
import fiveImage from '../../../../assets/images/5/5.jpg';

// Importation du fichier de styles CSS pour personnaliser l'apparence du carrousel
import '../../../../assets/styles/components/MyCarousel.css';

/**
 * Composant MyCarousel pour afficher un carrousel d'images.
 *
 * Ce composant utilise React Bootstrap pour afficher un carrousel interactif permettant de parcourir différentes images.
 * Chaque élément du carrousel contient une image et un lien vers toutes les catégories.
 *
 * @component
 * @example
 * return (
 *   <MyCarousel />
 * )
 *
 * @returns {JSX.Element} Un carrousel d'images avec des légendes et des liens.
 */
const MyCarousel = () => {
	// Déclaration de l'état pour suivre l'index de l'élément actif du carrousel
	const [index, setIndex] = useState(0);

	/**
	 * Met à jour l'état avec l'index de l'image sélectionnée dans le carrousel.
	 *
	 * Cette fonction est appelée lorsqu'une nouvelle image est sélectionnée dans le carrousel.
	 *
	 * @function handleSelect
	 * @param {number} selectedIndex - L'index de l'image sélectionnée.
	 * @returns {void}
	 */
	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex); // Mise à jour de l'état avec l'index de l'élément sélectionné
	};


	return (
		// Composant Carousel de React Bootstrap, avec un événement onSelect pour gérer le changement d'image
		<Carousel activeIndex={index} onSelect={handleSelect}>
			{/* Premier élément du carrousel */}
			<Carousel.Item>
				<div>
					<img
						className="d-block w-100"
						alt="First slide"
						srcSet={firstImage} // Utilisation de l'image importée
					/>
				</div>
				{/* Légende du carrousel avec un bouton pour découvrir toutes les catégories */}
				<Carousel.Caption className="text-align-left">
					<a href="/categories" className="btn btn-light text-dark">
						Découvrir toutes les catégories
					</a>
				</Carousel.Caption>
			</Carousel.Item>

			{/* Deuxième élément du carrousel */}
			<Carousel.Item>
				<div>
					<img
						className="d-block w-100"
						alt="Second slide"
						srcSet={secondImage} // Utilisation de l'image importée
					/>
				</div>
				<Carousel.Caption className="text-align-left">
					<a href="/categories" className="btn btn-light text-dark">
						Découvrir toutes les catégories
					</a>
				</Carousel.Caption>
			</Carousel.Item>

			{/* Troisième élément du carrousel */}
			<Carousel.Item>
				<div>
					<img
						className="d-block w-100"
						alt="Third slide"
						srcSet={thirdImage} // Utilisation de l'image importée
					/>
				</div>
				<Carousel.Caption className="text-align-left">
					<a href="/categories" className="btn btn-light text-dark">
						Découvrir toutes les catégories
					</a>
				</Carousel.Caption>
			</Carousel.Item>

			{/* Quatrième élément du carrousel */}
			<Carousel.Item>
				<div>
					<img
						className="d-block w-100"
						alt="Fourth slide"
						srcSet={fourImage} // Utilisation de l'image importée
					/>
				</div>
				<Carousel.Caption className="text-align-left">
					<a href="/categories" className="btn btn-light text-dark">
						Découvrir toutes les catégories
					</a>
				</Carousel.Caption>
			</Carousel.Item>

			{/* Cinquième élément du carrousel */}
			<Carousel.Item>
				<div>
					<img
						className="d-block w-100"
						alt="Fifth slide"
						srcSet={fiveImage} // Utilisation de l'image importée
					/>
				</div>
				<Carousel.Caption className="text-align-left">
					<a href="/categories" className="btn btn-light text-dark">
						Découvrir toutes les catégories
					</a>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};

export default MyCarousel; // Exportation du composant pour qu'il puisse être utilisé ailleurs dans l'application
