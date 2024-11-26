import apiService from "../../../services/apiService"; // Importation du service API pour les appels HTTP

// Définition de l'endpoint pour l'entité Order
const ORDER_ENDPOINT = 'commandes';

const orderApi = {
	// Récupérer toutes les commandes
	getAllOrders: async (params = {}) => {
		// Appel à l'API pour obtenir toutes les commandes, avec la possibilité de fournir des paramètres de recherche
		return await apiService.find(ORDER_ENDPOINT, params);
	},

	// Récupérer une commande par ID
	getOrderById: async (id) => {
		// Appel à l'API pour obtenir les détails d'une commande spécifique via son ID
		return await apiService.get(`${ORDER_ENDPOINT}/${id}`);
	},

	// Créer une nouvelle commande
	createOrder: async (data) => {
		// Appel à l'API pour créer une nouvelle commande avec les données fournies
		return await apiService.post(ORDER_ENDPOINT, data);
	},

	// Mettre à jour une commande par ID
	updateOrder: async (id, data) => {
		// Appel à l'API pour mettre à jour une commande existante avec les nouvelles données, en utilisant la méthode PATCH
		return await apiService.patch(`${ORDER_ENDPOINT}/${id}`, data);
	},

	// Supprimer une commande par ID
	deleteOrder: async (id) => {
		// Appel à l'API pour supprimer une commande spécifique via son ID
		return await apiService.delete(`${ORDER_ENDPOINT}/${id}`);
	},
};

// Exportation de l'objet orderApi pour l'utiliser dans d'autres parties de l'application
export default orderApi;
