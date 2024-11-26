// Importation des outils nécessaires pour le test
import { render, screen } from '@testing-library/react'; // Fournit des fonctions pour rendre des composants et interroger le DOM
import App from './App'; // Composant principal de l'application à tester

// Définition du test
test('renders learn react link', () => {
	// Rend le composant `App` dans un environnement de test
	render(<App />);

	// Recherche dans le DOM un élément contenant le texte "learn react" (insensible à la casse grâce à `/i`)
	const linkElement = screen.getByText(/learn react/i);

	// Vérifie que l'élément trouvé est présent dans le DOM
	expect(linkElement).toBeInTheDocument();
});
