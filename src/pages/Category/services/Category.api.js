import apiService from "../../../services/apiService";


// Définitions des endpoints pour l'entité Category
const CATEGORY_ENDPOINT = 'categories';

const categoryApi = {
	// Récupérer toutes les catégories
	getAllCategories: async (params = {}) => {
		return await apiService.find(CATEGORY_ENDPOINT, params);
	},

	// Récupérer toutes les catégories sans token
	getAllCategoriesNoToken: async (params = {}) => {
		return await apiService.findNoToken(CATEGORY_ENDPOINT, params);
	},

	// Récupérer une catégorie par ID
	getCategoryById: async (id) => {
		return await apiService.get(`${CATEGORY_ENDPOINT}/${id}`);
	},

	getCategoryByIdNoToken: async (id) => {
		return await apiService.getNoToken(`${CATEGORY_ENDPOINT}/${id}`);
	},
	

	// Créer une nouvelle catégorie
	createCategory: async (data) => {
		return await apiService.post(CATEGORY_ENDPOINT, data);
	},

	// Mettre à jour une catégorie par ID
	updateCategory: async (id, data) => {
		return await apiService.put(`${CATEGORY_ENDPOINT}/${id}`, data);
	},

	// Supprimer une catégorie par ID
	deleteCategory: async (id) => {
		return await apiService.delete(`${CATEGORY_ENDPOINT}/${id}`);
	},
};

export default categoryApi;
