const BASE_URL = 'http://localhost:8741/api';

// Récupérer le token d'accès
const getToken = () => {
	return localStorage.getItem('token');
};

// Récupérer le refresh token
const getRefreshToken = () => {
	return localStorage.getItem('refresh_token');
};

// Sauvegarder le nouveau token
const setToken = (token) => {
	localStorage.setItem('token', token);
};

// Supprimer les tokens (lorsque l'utilisateur doit se reconnecter)
export const clearTokens = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('refresh_token');
};

// Rediriger vers la page de connexion (par exemple)
const redirectToLogin = () => {
	clearTokens();
	window.location.href = '/login'; // Remplacer par la route appropriée
};

// Rafraîchir le token d'accès en utilisant le refresh token
const refreshAccessToken = async () => {
	const refreshToken = getRefreshToken();
	if (!refreshToken) {
		throw new Error('Refresh token not available');
	}

	try {
		const response = await fetch(`${BASE_URL}/token/refresh`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refresh_token: refreshToken }),
		});

		if (response.ok) {
			const data = await response.json();
			setToken(data.token);
			return data.token;
		} else {
			throw new Error('Unable to refresh token');
		}
	} catch (error) {
		console.error("Erreur lors de la régénération du token", error);
		throw error; // Laisser l'appelant décider quoi faire
	}
};

// Fonction générique pour gérer la logique de requête avec auto-refresh
const makeRequest = async (method, endpoint, data = null, requireAuth = true) => {
	let token = requireAuth ? getToken() : null;

	const headers = {
		'Content-Type': 'application/json',
	};
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	let response = await fetch(`${BASE_URL}/${endpoint}`, {
		method,
		headers,
		body: data ? JSON.stringify(data) : null,
	});

	if (response.status === 401 && requireAuth) {
		// Si le token est expiré, essaye de le rafraîchir
		try {
			token = await refreshAccessToken();
			headers['Authorization'] = `Bearer ${token}`;
			response = await fetch(`${BASE_URL}/${endpoint}`, {
				method,
				headers,
				body: data ? JSON.stringify(data) : null,
			});
		} catch (error) {
			redirectToLogin(); // Déconnecter l'utilisateur en cas d'échec du refresh
			return; // Arrêter l'exécution après la redirection
		}
	}

	return handleResponse(response);
};

// Fonction pour traiter la réponse API
const handleResponse = async (response) => {
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || 'An error occurred');
	}
	try {
		return await response.json();
	} catch (e) {
		return true; // Pas de contenu JSON, renvoyer simplement `true`
	}
};

// Les méthodes du `apiService` utilisent désormais la fonction `makeRequest`
const apiService = {
	get: async (endpoint) => makeRequest('GET', endpoint),
	getNoToken: async (endpoint) => makeRequest('GET', endpoint, null, false),
	post: async (endpoint, data, requireAuth = true) => makeRequest('POST', endpoint, data, requireAuth),
	put: async (endpoint, data) => makeRequest('PUT', endpoint, data),
	patch: async (endpoint, data) => makeRequest('PATCH', endpoint, data),
	delete: async (endpoint) => makeRequest('DELETE', endpoint),
	find: async (endpoint, params = {}) => {
		const query = new URLSearchParams(params).toString();
		return makeRequest('GET', `${endpoint}?${query}`);
	},
	findNoToken: async (endpoint, params = {}) => {
		const query = new URLSearchParams(params).toString();
		return makeRequest('GET', `${endpoint}?${query}`, null, false);
	},
	customRequest: async (method, endpoint, data = null, additionalHeaders = {}) => {
		const token = getToken();
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
			...additionalHeaders,
		};

		const response = await fetch(`${BASE_URL}/${endpoint}`, {
			method,
			headers,
			body: data ? JSON.stringify(data) : null,
		});

		return handleResponse(response);
	},
};

export default apiService;
