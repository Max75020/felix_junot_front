import apiService from "../../../../services/apiService"; // Importation du service d'API générique pour effectuer les requêtes HTTP
// Définition de l'endpoint pour la réinitialisation du mot de passe
const PASSWORD_RESET_ENDPOINT = 'password-reset'; // Endpoint pour la réinitialisation du mot de passe

// Objet contenant la méthode pour réinitialiser le mot de passe
const passwordResetApi = {
	passwordReset: async (token, new_password) => {
		const data = { token, new_password }; // Préparation des données avec le token et le nouveau mot de passe
		return await apiService.post(PASSWORD_RESET_ENDPOINT, data); // Envoi de la requête POST pour réinitialiser le mot de passe
	}
};

// Définition de l'endpoint pour la demande de réinitialisation de mot de passe
const PASSWORD_RESET_REQUEST_ENDPOINT = 'password-reset-request'; // Endpoint pour demander la réinitialisation du mot de passe

// Objet contenant la méthode pour demander une réinitialisation de mot de passe
const passwordResetRequestApi = {
	passwordResetRequest: async (data) => {
		return await apiService.post(PASSWORD_RESET_REQUEST_ENDPOINT, data); // Envoi de la requête POST pour demander un email de réinitialisation
	}
};

// Fusion des deux objets d'API en un seul pour l'exportation
const forgotPasswordApi = {
	...passwordResetApi, // Inclut les méthodes de réinitialisation du mot de passe
	...passwordResetRequestApi // Inclut les méthodes pour demander la réinitialisation du mot de passe
};

// Exportation de l'objet forgotPasswordApi
export default forgotPasswordApi; // Ce module peut maintenant être utilisé pour toutes les opérations de réinitialisation de mot de passe
