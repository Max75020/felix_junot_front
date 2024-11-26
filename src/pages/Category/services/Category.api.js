import apiService from "../../../services/apiService"; // Importation du service d'API générique pour effectuer les requêtes HTTP

// Définitions des endpoints pour l'entité Category
const CATEGORY_ENDPOINT = 'categories'; // Endpoint de base pour accéder aux ressources liées aux catégories

// Objet contenant les méthodes d'API pour les opérations CRUD sur les catégories
const categoryApi = {
	// Récupérer toutes les catégories (avec possibilité de paramètres supplémentaires)
	getAllCategories: async (params = {}) => {
		// Envoi d'une requête GET pour récupérer toutes les catégories (avec token d'authentification)
		return await apiService.find(CATEGORY_ENDPOINT, params);
	},

	// Récupérer toutes les catégories sans token d'authentification (par exemple, pour un accès public)
	getAllCategoriesNoToken: async (params = {}) => {
		// Envoi d'une requête GET pour récupérer toutes les catégories sans nécessiter de token
		return await apiService.findNoToken(CATEGORY_ENDPOINT, params);
	},

	// Récupérer une catégorie spécifique par ID
	getCategoryById: async (id) => {
		// Envoi d'une requête GET pour récupérer une catégorie par son ID (avec token d'authentification)
		return await apiService.get(`${CATEGORY_ENDPOINT}/${id}`);
	},

	// Récupérer une catégorie par ID sans utiliser de token d'authentification
	getCategoryByIdNoToken: async (id) => {
		// Envoi d'une requête GET pour récupérer une catégorie sans nécessiter de token
		return await apiService.getNoToken(`${CATEGORY_ENDPOINT}/${id}`);
	},

	// Créer une nouvelle catégorie
	createCategory: async (data) => {
		// Envoi d'une requête POST pour créer une nouvelle catégorie avec les données fournies
		return await apiService.post(CATEGORY_ENDPOINT, data);
	},

	// Mettre à jour une catégorie existante par son ID
	updateCategory: async (id, data) => {
		// Envoi d'une requête PUT pour mettre à jour une catégorie existante avec les nouvelles données
		return await apiService.put(`${CATEGORY_ENDPOINT}/${id}`, data);
	},

	// Supprimer une catégorie par son ID
	deleteCategory: async (id) => {
		// Envoi d'une requête DELETE pour supprimer une catégorie spécifique via son ID
		return await apiService.delete(`${CATEGORY_ENDPOINT}/${id}`);
	},
};

// Exportation de l'objet categoryApi pour qu'il puisse être utilisé dans d'autres parties de l'application
export default categoryApi;
