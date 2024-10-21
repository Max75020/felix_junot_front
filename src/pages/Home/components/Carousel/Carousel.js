import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
// Imports des images avec différents formats

import firstImage from '../../../../assets/images/1/1.jpg';

import secondImage from '../../../../assets/images/2/2.jpg';

import thirdImage from '../../../../assets/images/3/3.jpg';

import fourImage from '../../../../assets/images/4/4.jpg';

import fiveImage from '../../../../assets/images/5/5.jpg';

import '../../../../assets/styles/components/MyCarousel.css'; // Importer le fichier de styles CSS

const MyCarousel = () => {
	const [index, setIndex] = useState(0);
	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	return (
		<Carousel activeIndex={index} onSelect={handleSelect}>
			<Carousel.Item>
				<div>
					<img
						className="d-block w-100"
						alt="First slide"
						srcSet={firstImage}
					/>
				</div>
				<Carousel.Caption className="text-align-left">
					<a href="/categories" className="btn btn-light text-dark">
						Découvrir toutes les catégories
					</a>
				</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item>
				<div>
					<img
						className="d-block w-100"
						alt="First slide"
						srcSet={secondImage}
					/>
				</div>
				<Carousel.Caption className="text-align-left">
					<a href="/categories" className="btn btn-light text-dark">
						Découvrir toutes les catégories
					</a>
				</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item>
				<div>
					<img
						className="d-block w-100"
						alt="First slide"
						srcSet={thirdImage}
					/>
				</div>
				<Carousel.Caption className="text-align-left">
					<a href="/categories" className="btn btn-light text-dark">
						Découvrir toutes les catégories
					</a>
				</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item>
				<div>
					<img
						className="d-block w-100"
						alt="First slide"
						srcSet={fourImage}
					/>
				</div>
				<Carousel.Caption className="text-align-left">
					<a href="/categories" className="btn btn-light text-dark">
						Découvrir toutes les catégories
					</a>
				</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item>
				<div>
					<img
						className="d-block w-100"
						alt="First slide"
						srcSet={fiveImage}
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

export default MyCarousel;
