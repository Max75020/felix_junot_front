// Fonction `reportWebVitals` : permet de mesurer les performances de l'application
const reportWebVitals = (onPerfEntry) => {
	// Vérifie si un callback `onPerfEntry` est fourni et s'il s'agit d'une fonction
	if (onPerfEntry && onPerfEntry instanceof Function) {
		// Import dynamique du module `web-vitals` pour mesurer les métriques de performance
		import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
			// CLS (Cumulative Layout Shift) : mesure les décalages visuels inattendus
			getCLS(onPerfEntry);

			// FID (First Input Delay) : mesure le délai entre la première interaction de l'utilisateur et la réponse du navigateur
			getFID(onPerfEntry);

			// FCP (First Contentful Paint) : mesure le temps avant que le premier contenu visuel apparaisse
			getFCP(onPerfEntry);

			// LCP (Largest Contentful Paint) : mesure le temps de rendu de l'élément visuellement le plus grand
			getLCP(onPerfEntry);

			// TTFB (Time to First Byte) : mesure le délai avant que le navigateur reçoive le premier octet de la réponse serveur
			getTTFB(onPerfEntry);
		});
	}
};

// Export par défaut de la fonction `reportWebVitals`
export default reportWebVitals;
