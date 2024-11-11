import React from 'react';
import CardSlider from './components/CardSlider';
import MyCarousel from './components/Carousel/Carousel';

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
