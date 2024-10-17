import apiService from "../../../services/apiService";


// Définitions des endpoints pour l'entité Category
const PRODUIT_ENDPOINT = 'produits';

const produitApi = {
	getProduitById: async (id) => {
		return await apiService.getNoToken(`${PRODUIT_ENDPOINT}/${id}`);
	},

};

export default produitApi;
