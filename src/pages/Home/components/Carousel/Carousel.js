import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';

import ExampleCarouselImage from '../../../../ExempleCarouselImage';
import { Button } from 'react-bootstrap';

const MyCarousel = () => {
	const [index, setIndex] = useState(0);
	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};
	return (
		<Carousel activeIndex={index} onSelect={handleSelect}>
			<Carousel.Item>
				<ExampleCarouselImage text="First slide" />
				<Carousel.Caption>
					<h2 className='text-uppercase'>test</h2>
					<Button type='primary'>Découvrir</Button>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<ExampleCarouselImage text="Second slide" />
				<Carousel.Caption>
					<h2 className='text-uppercase'>test</h2>
					<Button type='primary'>Découvrir</Button>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<ExampleCarouselImage text="Third slide" />
				<Carousel.Caption>
					<h2 className='text-uppercase'>test</h2>
					<Button type='primary'>Découvrir</Button>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	)
}

export default MyCarousel