import apiService from "../../../services/apiService";

// Définitions des endpoints pour l'entité Transporteurs
const TRANSPORTEURS_ENDPOINT = 'transporteurs';

const CarrierApi = {
	// Récupérer tous les transporteurs
	getAllCarriers: async (page = 1) => {
		return await apiService.get(`${TRANSPORTEURS_ENDPOINT}?page=${page}`);
	},

	// Récupérer un transporteur par son ID
	getCarrierById: async (id) => {
		return await apiService.get(`${TRANSPORTEURS_ENDPOINT}/${id}`);
	},

	// Créer un nouveau transporteur
	createCarrier: async (carrierData) => {
		return await apiService.post(`${TRANSPORTEURS_ENDPOINT}`, carrierData);
	},

	// Modifier un transporteur partiellement (PATCH)
	updateCarrier: async (id, carrierData) => {
		return await apiService.patch(`${TRANSPORTEURS_ENDPOINT}/${id}`, carrierData);
	},

	// Supprimer un transporteur par son ID
	deleteCarrier: async (id) => {
		return await apiService.delete(`${TRANSPORTEURS_ENDPOINT}/${id}`);
	},
};

export default CarrierApi;
