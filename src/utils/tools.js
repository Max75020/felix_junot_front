// Fonction générique pour extraire l'ID d'une URL
export const extractIdFromUrl = (url) => {
	// Vérifie si l'entrée est une chaîne de caractères
	if (typeof url !== 'string') {
		// Affiche une erreur dans la console si la valeur passée n'est pas une chaîne
		console.error("La valeur passée à extractIdFromUrl n'est pas une chaîne:", url);
		return null; // Retourne null si l'entrée est invalide
	}

	// Découpe l'URL en morceaux en utilisant "/" comme séparateur
	// Prend la dernière partie de l'URL, qui est censée être l'ID
	return url.split("/").pop();
};
