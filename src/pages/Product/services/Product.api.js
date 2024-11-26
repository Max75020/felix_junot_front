import apiService from "../../../services/apiService"; // Importation du service API générique pour effectuer les appels HTTP


// Définition de l'endpoint pour l'entité "Produits"
const PRODUIT_ENDPOINT = 'produits';

// Définition de l'API pour les produits
const produitApi = {
	// Récupére un produit via son ID
	getProduitById: async (id) => {
		return await apiService.getNoToken(`${PRODUIT_ENDPOINT}/${id}`);
	},
};

export default produitApi;
