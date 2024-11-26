import apiService from "../../../services/apiService"; // Importation du service d'API pour effectuer les requêtes HTTP

// Définitions des endpoints pour l'entité Favoris
const FAVORIS_ENDPOINT = 'favoris'; // Endpoint de base pour accéder aux ressources liées aux favoris

// Objet contenant les méthodes d'API pour les opérations sur les favoris
const favorisApi = {
	// Récupérer tous les favoris de l'utilisateur connecté
	getFavoris() {
		// Envoi d'une requête GET pour récupérer la liste des favoris de l'utilisateur connecté
		return apiService.get(FAVORIS_ENDPOINT);
	},

	// Ajouter un produit aux favoris
	addFavori(utilisateurIri, produitIri) {
		// Préparation des données du favori à ajouter (utilisateur et produit)
		const payload = {
			utilisateur: utilisateurIri, // Identifiant de l'utilisateur (IRI)
			produit: produitIri // Identifiant du produit (IRI)
		};
		// Envoi d'une requête POST pour ajouter un produit aux favoris de l'utilisateur
		return apiService.post(FAVORIS_ENDPOINT, payload);
	},

	// Supprimer un favori en fournissant l'ID du favori
	deleteFavori(favoriId) {
		// Envoi d'une requête DELETE pour supprimer un favori spécifique via son ID
		return apiService.delete(`${FAVORIS_ENDPOINT}/${favoriId}`);
	}
};

// Exportation de l'objet favorisApi pour qu'il puisse être utilisé dans d'autres parties de l'application
export default favorisApi;
