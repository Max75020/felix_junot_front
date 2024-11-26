import apiService from "../../../../services/apiService"; // Importation du service d'API générique pour effectuer les requêtes HTTP

// Définition de l'endpoint pour la vérification de la connexion
const LOGINCHECK_ENDPOINT = 'login_check'; // Endpoint pour vérifier les identifiants de connexion

// Objet contenant la méthode pour vérifier la connexion
const loginCheckerApi = {
	// Fonction pour effectuer la requête de connexion avec l'email et le mot de passe
	login: async (email, password) => {
		const response = await apiService.post(LOGINCHECK_ENDPOINT, { email, password }); // Envoi de la requête POST avec l'email et le mot de passe

		// Si la réponse contient un token, on sauvegarde le token et le refresh token dans le localStorage
		if (response && response.token) {
			localStorage.setItem('token', response.token); // Stocker le token d'authentification pour les futures requêtes
			localStorage.setItem('refresh_token', response.refresh_token); // Stocker le refresh token pour la gestion des sessions prolongées
		}

		return response; // Retourne la réponse de l'API (incluant potentiellement le token et d'autres informations)
	},
};

// Exportation de l'objet loginCheckerApi pour l'utiliser dans d'autres parties de l'application
export default loginCheckerApi;
