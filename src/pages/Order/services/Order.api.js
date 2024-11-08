import apiService from "../../../services/apiService";

// Définition de l'endpoint pour l'entité Order
const ORDER_ENDPOINT = 'commandes';

const orderApi = {
	// Récupérer toutes les commandes
	getAllOrders: async (params = {}) => {
		return await apiService.find(ORDER_ENDPOINT, params);
	},


	// Récupérer une commande par ID
	getOrderById: async (id) => {
		return await apiService.get(`${ORDER_ENDPOINT}/${id}`);
	},

	// Créer une nouvelle commande
	createOrder: async (data) => {
		return await apiService.post(ORDER_ENDPOINT, data);
	},

	// Mettre à jour une commande par ID
	updateOrder: async (id, data) => {
		return await apiService.patch(`${ORDER_ENDPOINT}/${id}`, data);
	},

	// Supprimer une commande par ID
	deleteOrder: async (id) => {
		return await apiService.delete(`${ORDER_ENDPOINT}/${id}`);
	},
};

export default orderApi;
