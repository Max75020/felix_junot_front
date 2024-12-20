import apiService from "../../../services/apiService"; // Importation du service API principal pour gérer les requêtes HTTP vers le backend

// Définitions des endpoints pour l'entité Adresses
const ADRESSES_ENDPOINT = 'adresses'; // Constante définissant l'endpoint pour accéder aux adresses

/**
 * @module Adresses/Services
 * @description Service API pour gérer les requêtes relatives aux adresses.
 * Fournit des méthodes pour récupérer, créer, mettre à jour et supprimer des adresses.
 */
const AdresseApi = {
	/**
	 * Récupère toutes les adresses avec pagination.
	 *
	 * @async
	 * @function getAllAdresses
	 * @memberof module:Adresses/Services
	 * @param {number} [page=1] - Numéro de la page à récupérer (par défaut : 1).
	 * @returns {Promise<Object>} Les données paginées des adresses.
	 * 
	 * @example
	 * const adresses = await AdresseApi.getAllAdresses(1);
	 * console.log(adresses);
	 */
	getAllAdresses: async (page = 1) => {
		return await apiService.get(`${ADRESSES_ENDPOINT}?page=${page}`);
	},

	/**
	 * Récupère une adresse par son ID.
	 *
	 * @async
	 * @function getAdresseById
	 * @memberof module:Adresses/Services
	 * @param {number} id - L'identifiant de l'adresse.
	 * @returns {Promise<Object>} Les données de l'adresse.
	 * 
	 * @example
	 * const adresse = await AdresseApi.getAdresseById(5);
	 * console.log(adresse);
	 */
	getAdresseById: async (id) => {
		return await apiService.get(`${ADRESSES_ENDPOINT}/${id}`);
	},

	/**
	 * Crée une nouvelle adresse.
	 *
	 * @async
	 * @function createAdresse
	 * @memberof module:Adresses/Services
	 * @param {Object} adresseData - Les données de l'adresse à créer.
	 * @returns {Promise<Object>} Les données de l'adresse créée.
	 * 
	 * @example
	 * const newAdresse = {
	 *     nom_adresse: "Maison",
	 *     type: "Livraison",
	 *     prenom: "Jean",
	 *     nom: "Dupont",
	 *     rue: "123 Rue Principale",
	 *     code_postal: "75000",
	 *     ville: "Paris",
	 *     pays: "France",
	 *     telephone: "0123456789"
	 * };
	 * const createdAdresse = await AdresseApi.createAdresse(newAdresse);
	 * console.log(createdAdresse);
	 */
	createAdresse: async (adresseData) => {
		return await apiService.post(`${ADRESSES_ENDPOINT}`, adresseData);
	},

	/**
	 * Met à jour partiellement une adresse.
	 *
	 * @async
	 * @function updateAdresse
	 * @memberof module:Adresses/Services
	 * @param {number} id - L'identifiant de l'adresse à mettre à jour.
	 * @param {Object} adresseData - Les nouvelles données pour mettre à jour l'adresse.
	 * @returns {Promise<Object>} Les données de l'adresse mise à jour.
	 * 
	 * @example
	 * const updatedAdresse = {
	 *     rue: "456 Rue Nouvelle",
	 *     ville: "Lyon"
	 * };
	 * const result = await AdresseApi.updateAdresse(1, updatedAdresse);
	 * console.log(result);
	 */
	updateAdresse: async (id, adresseData) => {
		return await apiService.patch(`${ADRESSES_ENDPOINT}/${id}`, adresseData);
	},

	/**
	 * Supprime une adresse par son ID.
	 *
	 * @async
	 * @function deleteAdresse
	 * @memberof module:Adresses/Services
	 * @param {number} id - L'identifiant de l'adresse à supprimer.
	 * @returns {Promise<void>} Une promesse résolue lorsque l'adresse est supprimée.
	 * 
	 * @example
	 * await AdresseApi.deleteAdresse(1);
	 * console.log("Adresse supprimée avec succès.");
	 */
	deleteAdresse: async (id) => {
		return await apiService.delete(`${ADRESSES_ENDPOINT}/${id}`);
	},
};

export default AdresseApi; // Exportation du module pour permettre son utilisation dans d'autres parties de l'application
