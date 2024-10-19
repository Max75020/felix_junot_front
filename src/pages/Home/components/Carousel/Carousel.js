import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
// Imports des images avec différents formats
import firstImage240w from '../../../../assets/images/first/240w.jpg';
import firstImage320w from '../../../../assets/images/first/320w.jpg';
import firstImage480w from '../../../../assets/images/first/480w.jpg';
import firstImage640w from '../../../../assets/images/first/640w.jpg';
import firstImage720w from '../../../../assets/images/first/720w.jpg';
import firstImage1080w from '../../../../assets/images/first/1080w.jpg';

import secondImage240w from '../../../../assets/images/second/240w.jpg';
import secondImage320w from '../../../../assets/images/second/320w.jpg';
import secondImage480w from '../../../../assets/images/second/480w.jpg';
import secondImage640w from '../../../../assets/images/second/640w.jpg';
import secondImage720w from '../../../../assets/images/second/720w.jpg';
import secondImage1080w from '../../../../assets/images/second/1080w.jpg';

import thirdImage240w from '../../../../assets/images/third/240w.jpg';
import thirdImage320w from '../../../../assets/images/third/320w.jpg';
import thirdImage480w from '../../../../assets/images/third/480w.jpg';
import thirdImage640w from '../../../../assets/images/third/640w.jpg';
import thirdImage720w from '../../../../assets/images/third/720w.jpg';
import thirdImage1080w from '../../../../assets/images/third/1080w.jpg';

import '../../../../assets/styles/components/MyCarousel.css'; // Importer le fichier de styles CSS :

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
						srcSet={`${firstImage240w} 240w, ${firstImage320w} 320w, ${firstImage480w} 480w, ${firstImage640w} 640w, ${firstImage720w} 720w, ${firstImage1080w} 1080w`}
						sizes="(max-width: 1080px) 100vw, 1080px"
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
						alt="Second slide"
						srcSet={`${secondImage240w} 240w, ${secondImage320w} 320w, ${secondImage480w} 480w, ${secondImage640w} 640w, ${secondImage720w} 720w, ${secondImage1080w} 1080w`}
						sizes="(max-width: 1080px) 100vw, 1080px"
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
						alt="Third slide"
						srcSet={`${thirdImage240w} 240w, ${thirdImage320w} 320w, ${thirdImage480w} 480w, ${thirdImage640w} 640w, ${thirdImage720w} 720w, ${thirdImage1080w} 1080w`}
						sizes="(max-width: 1080px) 100vw, 1080px"
					/>
				</div>
				<Carousel.Caption>
					<a href="/categories" className="btn-light text-dark">
						Découvrir toutes les catégories
					</a>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};

export default MyCarousel;
