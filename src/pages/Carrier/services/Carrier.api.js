import apiService from "../../../services/apiService"; // Importation du service d'API générique pour effectuer les requêtes HTTP

// Définitions des endpoints pour l'entité Transporteurs
const TRANSPORTEURS_ENDPOINT = 'transporteurs'; // Endpoint de base pour accéder aux ressources liées aux transporteurs

// Objet contenant les méthodes d'API pour les opérations CRUD sur les transporteurs
const CarrierApi = {
	// Récupérer tous les transporteurs (avec pagination par défaut sur la première page)
	getAllCarriers: async (page = 1) => {
		// Envoi d'une requête GET pour récupérer la liste des transporteurs avec pagination
		return await apiService.get(`${TRANSPORTEURS_ENDPOINT}?page=${page}`);
	},

	// Récupérer un transporteur spécifique par son ID
	getCarrierById: async (id) => {
		// Envoi d'une requête GET pour récupérer un transporteur particulier via son ID
		return await apiService.get(`${TRANSPORTEURS_ENDPOINT}/${id}`);
	},

	// Créer un nouveau transporteur
	createCarrier: async (carrierData) => {
		// Envoi d'une requête POST pour créer un nouveau transporteur avec les données fournies
		return await apiService.post(`${TRANSPORTEURS_ENDPOINT}`, carrierData);
	},

	// Modifier partiellement un transporteur existant (méthode PATCH)
	updateCarrier: async (id, carrierData) => {
		// Envoi d'une requête PATCH pour mettre à jour partiellement un transporteur existant par son ID
		return await apiService.patch(`${TRANSPORTEURS_ENDPOINT}/${id}`, carrierData);
	},

	// Supprimer un transporteur par son ID
	deleteCarrier: async (id) => {
		// Envoi d'une requête DELETE pour supprimer un transporteur spécifique via son ID
		return await apiService.delete(`${TRANSPORTEURS_ENDPOINT}/${id}`);
	},
};

// Exportation de l'objet CarrierApi pour qu'il puisse être utilisé dans d'autres parties de l'application
export default CarrierApi;
