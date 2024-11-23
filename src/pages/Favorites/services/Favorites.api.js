import apiService from "../../../services/apiService";

// Définitions des endpoints pour l'entité Favoris
const FAVORIS_ENDPOINT = 'favoris';

const favorisApi = {
	// Récupérer tous les favoris de l'utilisateur connecté
	getFavoris() {
		return apiService.get(FAVORIS_ENDPOINT);
	},

	// Ajouter un produit aux favoris
	addFavori(utilisateurIri, produitIri) {
		const payload = {
			utilisateur: utilisateurIri,
			produit: produitIri
		};
		return apiService.post(FAVORIS_ENDPOINT, payload);
	},

	// Supprimer un favori en fournissant l'ID du favori
	deleteFavori(favoriId) {
		return apiService.delete(`${FAVORIS_ENDPOINT}/${favoriId}`);
	}
};

export default favorisApi;
