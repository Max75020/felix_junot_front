import React from 'react';
//import ExampleCarouselImage from '../../ExempleCarouselImage';
//import { useState } from 'react';
//import { Button } from 'react-bootstrap';
import CardSlider from './components/CardSlider';
import MyCarousel from './components/Carousel/Carousel';
import { showSuccess } from '../../services/popupService';

function Home() {
	return (
		<div>
			<MyCarousel />
			<div>
				<CardSlider />
			</div>
		</div>
	);
}

export default Home;
