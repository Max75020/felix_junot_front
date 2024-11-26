// URL de base pour l'API, extraite des variables d'environnement
const BASE_URL = `${process.env.REACT_APP_URL_SERVER}/api`;

// Fonction pour récupérer le token d'accès dans le localStorage
const getToken = () => {
	return localStorage.getItem('token');
};

// Fonction pour récupérer le refresh token dans le localStorage
const getRefreshToken = () => {
	return localStorage.getItem('refresh_token');
};

// Fonction pour sauvegarder un nouveau token dans le localStorage
const setToken = (token) => {
	localStorage.setItem('token', token);
};

// Fonction pour supprimer les tokens (utile pour une déconnexion ou une expiration)
export const clearTokens = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('refresh_token');
};

// Fonction pour rediriger l'utilisateur vers la page de connexion en cas d'erreur
const redirectToLogin = () => {
	clearTokens(); // Supprime les tokens de l'utilisateur
	window.location.href = '/login'; // Redirection vers la route de connexion
};

// Fonction pour rafraîchir le token d'accès en utilisant le refresh token
const refreshAccessToken = async () => {
	const refreshToken = getRefreshToken();
	if (!refreshToken) {
		throw new Error('Refresh token not available'); // Erreur si aucun refresh token
	}

	try {
		const response = await fetch(`${BASE_URL}/token/refresh`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refresh_token: refreshToken }), // Envoi du refresh token
		});

		if (response.ok) {
			const data = await response.json();
			setToken(data.token); // Sauvegarde du nouveau token
			return data.token;
		} else {
			throw new Error('Unable to refresh token'); // Erreur si le rafraîchissement échoue
		}
	} catch (error) {
		console.error("Erreur lors de la régénération du token", error);
		throw error; // Propagation de l'erreur pour un traitement ultérieur
	}
};

// Fonction générique pour gérer les requêtes API avec gestion automatique des tokens
const makeRequest = async (method, endpoint, data = null, requireAuth = true) => {
	let token = requireAuth ? getToken() : null; // Récupération du token si nécessaire

	const headers = {
		'Content-Type': 'application/json', // Type de contenu par défaut
	};
	if (token) {
		headers['Authorization'] = `Bearer ${token}`; // Ajout du token dans les headers
	}

	if (method === 'PATCH') {
		headers['Content-Type'] = 'application/merge-patch+json'; // Type spécifique pour PATCH
	}

	// Première tentative de requête
	let response = await fetch(`${BASE_URL}/${endpoint}`, {
		method,
		headers,
		body: data ? JSON.stringify(data) : null,
	});

	// Si le token est expiré, tenter de le rafraîchir
	if (response.status === 401 && requireAuth) {
		try {
			token = await refreshAccessToken(); // Rafraîchir le token
			headers['Authorization'] = `Bearer ${token}`; // Mettre à jour le token dans les headers
			// Réessayer la requête avec le nouveau token
			response = await fetch(`${BASE_URL}/${endpoint}`, {
				method,
				headers,
				body: data ? JSON.stringify(data) : null,
			});
		} catch (error) {
			redirectToLogin(); // Redirection vers la connexion en cas d'échec
			return; // Arrêter l'exécution après la redirection
		}
	}

	return handleResponse(response); // Traiter la réponse
};

// Fonction pour traiter la réponse de l'API
const handleResponse = async (response) => {
	if (!response.ok) {
		// Si la réponse n'est pas valide, extraire le message d'erreur
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || 'An error occurred'); // Lever une erreur avec un message
	}
	try {
		return await response.json(); // Retourner les données JSON si disponibles
	} catch (e) {
		return true; // Si aucun contenu JSON, retourner `true`
	}
};

// Service API encapsulant les différentes méthodes HTTP
const apiService = {
	// Méthode GET standard
	get: async (endpoint) => makeRequest('GET', endpoint),

	// Méthode GET sans token (ex : routes publiques)
	getNoToken: async (endpoint) => makeRequest('GET', endpoint, null, false),

	// Méthode POST avec ou sans token
	post: async (endpoint, data, requireAuth = true) => makeRequest('POST', endpoint, data, requireAuth),

	// Méthode PUT
	put: async (endpoint, data) => makeRequest('PUT', endpoint, data),

	// Méthode PATCH
	patch: async (endpoint, data) => makeRequest('PATCH', endpoint, data),

	// Méthode DELETE
	delete: async (endpoint) => makeRequest('DELETE', endpoint),

	// Méthode pour rechercher avec des paramètres de requête
	find: async (endpoint, params = {}) => {
		const query = new URLSearchParams(params).toString(); // Construction de la query string
		return makeRequest('GET', `${endpoint}?${query}`);
	},

	// Méthode FIND sans token
	findNoToken: async (endpoint, params = {}) => {
		const query = new URLSearchParams(params).toString();
		return makeRequest('GET', `${endpoint}?${query}`, null, false);
	},

	// Méthode pour effectuer des requêtes personnalisées
	customRequest: async (method, endpoint, data = null, additionalHeaders = {}) => {
		const token = getToken(); // Récupérer le token
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
			...additionalHeaders, // Ajout des headers supplémentaires
		};

		const response = await fetch(`${BASE_URL}/${endpoint}`, {
			method,
			headers,
			body: data ? JSON.stringify(data) : null, // Ajout du body si nécessaire
		});

		return handleResponse(response); // Traiter la réponse
	},
};

// Exportation du service pour utilisation dans d'autres fichiers
export default apiService;
