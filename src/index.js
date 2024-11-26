// Importation des bibliothèques principales
import React from 'react'; // Bibliothèque React pour la création des composants
import ReactDOM from 'react-dom/client'; // Méthode pour rendre l'application dans le DOM

// Importation des fichiers CSS
import './index.css'; // Styles globaux pour l'application
import App from './App'; // Composant principal de l'application
import reportWebVitals from './reportWebVitals'; // Fonction pour mesurer les performances de l'application
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation des styles de Bootstrap
import './assets/fonts/fonts.css'; // Importation des polices personnalisées
import './assets/styles/mybootstrap.css'; // Fichier CSS pour personnaliser Bootstrap

// Création de la racine React dans le DOM
const root = ReactDOM.createRoot(document.getElementById('root')); // Lien avec l'élément HTML ayant l'id "root"

// Rendu de l'application
root.render(
	<React.StrictMode>
		<App /> {/* Composant principal qui englobe toute l'application */}
	</React.StrictMode>
);

// Mesure des performances de l'application
// Cette fonction peut être utilisée pour enregistrer des statistiques ou envoyer des données à des outils d'analyse
// Par exemple : reportWebVitals(console.log)
// Pour plus d'informations : https://bit.ly/CRA-vitals
reportWebVitals();
