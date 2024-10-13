const BASE_URL = 'http://localhost:8741/api';

// Récupérer le token (par exemple, stocké dans localStorage)
const getToken = () => {
	return localStorage.getItem('token');
};

// Fonction pour traiter la réponse API
const handleResponse = async (response) => {
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'An error occurred');
	}
	return response.json();
};

const apiService = {
	// Requête GET pour récupérer une ressource par ID
	get: async (endpoint) => {
		const token = getToken();
		const response = await fetch(`${BASE_URL}/${endpoint}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}` // Ajout du token dans le header
			},
		});
		return handleResponse(response);
	},

	getNoToken: async (endpoint) => {
		const response = await fetch(`${BASE_URL}/${endpoint}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return handleResponse(response);
	},

	// Requête POST pour créer une nouvelle ressource
	post: async (endpoint, data) => {
		const token = getToken();
		const response = await fetch(`${BASE_URL}/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}` // Ajout du token dans le header
			},
			body: JSON.stringify(data),
		});
		return handleResponse(response);
	},

	// Requête PUT pour mettre à jour une ressource existante
	put: async (endpoint, data) => {
		const token = getToken();
		const response = await fetch(`${BASE_URL}/${endpoint}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}` // Ajout du token dans le header
			},
			body: JSON.stringify(data),
		});
		return handleResponse(response);
	},

	// Requête PATCH pour mettre à jour une ressource existante
	patch: async (endpoint, data) => {
		const token = getToken();
		const response = await fetch(`${BASE_URL}/${endpoint}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}` // Ajout du token dans le header
			},
			body: JSON.stringify(data),
		});
		return handleResponse(response);
	},

	// Requête DELETE pour supprimer une ressource par ID
	delete: async (endpoint) => {
		const token = getToken();
		const response = await fetch(`${BASE_URL}/${endpoint}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}` // Ajout du token dans le header
			},
		});
		return handleResponse(response);
	},

	// Requête FIND pour récupérer plusieurs éléments
	find: async (endpoint, params = {}) => {
		const token = getToken();
		const query = new URLSearchParams(params).toString();
		const response = await fetch(`${BASE_URL}/${endpoint}?${query}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}` // Ajout du token dans le header
			},
		});
		return handleResponse(response);
	},

	// Requête FIND pour récupérer plusieurs éléments sans token
	findNoToken: async (endpoint, params = {}) => {
		const query = new URLSearchParams(params).toString();
		const response = await fetch(`${BASE_URL}/${endpoint}?${query}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return handleResponse(response);
	},

	// Requête custom pour gérer différents types de méthodes et headers
	customRequest: async (method, endpoint, data = null, additionalHeaders = {}) => {
		const token = getToken();
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`, // Ajout du token dans le header
			...additionalHeaders, // Ajouter des headers supplémentaires si fournis
		};

		const response = await fetch(`${BASE_URL}/${endpoint}`, {
			method,
			headers,
			body: data ? JSON.stringify(data) : null, // Inclure les données seulement si fournies
		});

		return handleResponse(response);
	},
};

export default apiService;
