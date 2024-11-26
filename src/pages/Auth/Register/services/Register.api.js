import apiService from "../../../../services/apiService"; // Importation du service d'API générique pour effectuer les requêtes HTTP

// Définitions des endpoints pour l'entité Utilisateurs
const REGISTER_ENDPOINT = 'utilisateurs'; // Endpoint pour l'inscription des utilisateurs

const CONFIRM_SIGNUP_ENDPOINT = 'confirm-signup'; // Endpoint pour la confirmation de l'inscription

// Objet contenant les méthodes d'API pour l'inscription et la confirmation d'inscription
const registerApi = {
	// Méthode pour inscrire un nouvel utilisateur
	register: (data) => {
		// Envoi de la requête POST pour l'inscription avec les données de l'utilisateur
		return apiService.post(REGISTER_ENDPOINT, data, false);
	},

	// Méthode pour confirmer l'inscription d'un utilisateur à l'aide du token
	confirmSignup: (token) => {
		// Envoi d'une requête GET pour confirmer l'inscription avec le token fourni
		return apiService.get(`${CONFIRM_SIGNUP_ENDPOINT}?token=${token}`);
	},
};

// Exportation de l'objet registerApi pour l'utiliser dans d'autres parties de l'application
export default registerApi;

