import apiService from "../../../services/apiService";

// Définitions des endpoints pour l'entité Adresses
const ADRESSES_ENDPOINT = 'adresses';

const AdresseApi = {
	// Récupérer toutes les adresses
	getAllAdresses: async (page = 1) => {
		return await apiService.get(`${ADRESSES_ENDPOINT}?page=${page}`);
	},

	// Récupérer une adresse par son ID
	getAdresseById: async (id) => {
		return await apiService.get(`${ADRESSES_ENDPOINT}/${id}`);
	},

	// Créer une nouvelle adresse
	createAdresse: async (adresseData) => {
		return await apiService.post(`${ADRESSES_ENDPOINT}`, adresseData);
	},

	// Modifier une adresse partiellement (PATCH)
	updateAdresse: async (id, adresseData) => {
		return await apiService.patch(`${ADRESSES_ENDPOINT}/${id}`, adresseData);
	},

	// Supprimer une adresse par son ID
	deleteAdresse: async (id) => {
		return await apiService.delete(`${ADRESSES_ENDPOINT}/${id}`);
	},
};

export default AdresseApi;
