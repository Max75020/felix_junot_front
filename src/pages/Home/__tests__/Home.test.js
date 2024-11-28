import { render, screen } from '@testing-library/react';
import Home from '../Home'; // Importer le composant Home

// Mock des sous-composants
jest.mock('../components/CardSlider', () => () => <div data-testid="card-slider">CardSlider Mock</div>);
jest.mock('../components/Carousel/Carousel', () => () => <div data-testid="carousel">Carousel Mock</div>);

describe('Home Component', () => {
	test('doit afficher le carrousel et le slider de cartes', () => {
		// Rendu du composant Home
		render(<Home />);

		// Vérifie que le carrousel est affiché
		const carousel = screen.getByTestId('carousel');
		expect(carousel).toBeInTheDocument();

		// Vérifie que le slider de cartes est affiché
		const cardSlider = screen.getByTestId('card-slider');
		expect(cardSlider).toBeInTheDocument();
	});
});
