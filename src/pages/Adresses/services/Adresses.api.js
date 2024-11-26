import apiService from "../../../services/apiService"; // Importation du service API principal pour gérer les requêtes HTTP vers le backend

// Définitions des endpoints pour l'entité Adresses
const ADRESSES_ENDPOINT = 'adresses'; // Constante définissant l'endpoint pour accéder aux adresses

const AdresseApi = {
	// Récupérer toutes les adresses avec pagination (par défaut, la page 1)
	getAllAdresses: async (page = 1) => {
		return await apiService.get(`${ADRESSES_ENDPOINT}?page=${page}`); // Appel GET pour récupérer toutes les adresses, avec pagination
	},

	// Récupérer une adresse par son ID
	getAdresseById: async (id) => {
		return await apiService.get(`${ADRESSES_ENDPOINT}/${id}`); // Appel GET pour récupérer une adresse spécifique via son ID
	},

	// Créer une nouvelle adresse
	createAdresse: async (adresseData) => {
		return await apiService.post(`${ADRESSES_ENDPOINT}`, adresseData); // Appel POST pour créer une nouvelle adresse avec les données fournies
	},

	// Modifier une adresse partiellement (PATCH)
	updateAdresse: async (id, adresseData) => {
		return await apiService.patch(`${ADRESSES_ENDPOINT}/${id}`, adresseData); // Appel PATCH pour modifier partiellement une adresse existante
	},

	// Supprimer une adresse par son ID
	deleteAdresse: async (id) => {
		return await apiService.delete(`${ADRESSES_ENDPOINT}/${id}`); // Appel DELETE pour supprimer une adresse spécifique via son ID
	},
};

export default AdresseApi; // Exportation du module pour permettre son utilisation dans d'autres parties de l'application
