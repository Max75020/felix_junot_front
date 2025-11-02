import { createContext, useEffect, useState } from 'react'; // Importation de React et des hooks nécessaires
import loginCheckerApi from '../pages/Auth/Login/services/LoginCheck.api'; // Importation de l'API pour vérifier la connexion de l'utilisateur
import apiService, { clearTokens } from '../services/apiService'; // Importation du service API principal et de la fonction clearTokens pour supprimer les tokens utilisateur

// Création du contexte utilisateur pour gérer les informations de l'utilisateur connecté
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	// État pour stocker les informations de l'utilisateur connecté
	const [user, setUser] = useState(null);
	// État pour indiquer si l'application est en cours de chargement (ex. récupération de l'utilisateur)
	const [loading, setLoading] = useState(true);

	// Fonction pour vérifier si l'utilisateur est connecté
	const checkUserLoggedIn = async () => {
		const token = localStorage.getItem('token'); // Récupérer le token de l'utilisateur depuis le localStorage
		if (!token) {
			// Si aucun token n'est présent, l'utilisateur est considéré comme déconnecté
			setUser(null);
			setLoading(false); // Arrêter le chargement
			return;
		}

		try {
			// Utilise apiService pour récupérer les informations de l'utilisateur connecté
			const response = await apiService.get('utilisateurs/me');
			// Ajouter l'IRI (Identifiant de Ressource Internationalisé) basé sur l'ID utilisateur
			const iri = `/api/utilisateurs/${response.id_utilisateur}`;

			// Inclure la liste des favoris et des adresses dans l'objet utilisateur pour éviter les erreurs
			setUser({
				...response,
				'@id': iri, // Ajout de l'IRI correct pour l'utilisateur
				favoris: response.favoris || [], // Assurer que les favoris soient une liste même si non présents
				adresses: response.adresses || [], // Assurer que les adresses soient une liste même si non présentes
			});
		} catch (error) {
			console.error("Erreur lors de la récupération de l'utilisateur", error); // Afficher une erreur si l'API échoue
			// Si l'authentification échoue, définir `user` comme `null`
			setUser(null);
		} finally {
			setLoading(false); // Fin du chargement
		}
	};

	// Fonction pour connecter l'utilisateur
	const login = async (email, password) => {
		try {
			// Appel de l'API pour vérifier les informations de connexion
			const response = await loginCheckerApi.login(email, password);

			// Si la connexion est réussie (le token est stocké), vérifier l'utilisateur connecté
			if (response.token) {
				await checkUserLoggedIn(); // Récupérer l'utilisateur après une connexion réussie
			}
		} catch (error) {
			console.error('Erreur de connexion', error); // Afficher l'erreur si la connexion échoue
			throw error; // Lever l'erreur à nouveau pour la capturer dans le composant appelant
		}
	};

	// Fonction pour déconnecter l'utilisateur
	const logout = () => {
		// Supprimer les tokens de l'utilisateur
		clearTokens(); // Utiliser clearTokens() défini dans `apiService` pour supprimer les tokens de l'utilisateur
		setUser(null); // Supprimer les informations de l'utilisateur du contexte
		window.location.href = '/'; // Rediriger vers la page d'accueil après déconnexion
	};

	// Fonction pour mettre à jour les informations de l'utilisateur
	const updateUser = async (updatedData) => {
		if (!user || !user.id_utilisateur) {
			console.error("ID utilisateur manquant."); // Vérifier si l'utilisateur est défini avant de procéder
			return;
		}

		try {
			// Appel API pour mettre à jour les informations de l'utilisateur
			const response = await apiService.patch(`utilisateurs/${user.id_utilisateur}`, updatedData);
			// Ajouter l'IRI basé sur l'ID utilisateur mis à jour
			const iri = `/api/utilisateurs/${response.id_utilisateur}`;
			setUser({
				...response,
				'@id': iri, // Mise à jour de l'IRI pour l'utilisateur
				favoris: response.favoris || [], // Assurer que les favoris soient une liste
				adresses: response.adresses || [], // Assurer que les adresses soient une liste
			});
		} catch (error) {
			console.error("Erreur lors de la mise à jour de l'utilisateur", error); // Afficher l'erreur en cas d'échec de la mise à jour
		}
	};

	// Fonction utilitaire pour vérifier si l'utilisateur a un rôle administrateur
	const isAdmin = () => {
		const roles =
			user?.roles_generated ||
			user?.roles || // c’est ce que renvoie ton /utilisateurs/me
			[];
		return Array.isArray(roles) && roles.includes('ROLE_ADMIN');
	};


	// Fonction pour supprimer l'utilisateur
	const deleteUser = async () => {
		if (!user || !user.id_utilisateur) {
			console.error("ID utilisateur manquant."); // Vérifier si l'utilisateur est défini avant de procéder
			return;
		}

		try {
			// Appel API pour supprimer l'utilisateur
			await apiService.delete(`utilisateurs/${user.id_utilisateur}`);
			logout(); // Déconnecter l'utilisateur après suppression
		} catch (error) {
			console.error("Erreur lors de la suppression de l'utilisateur", error); // Afficher l'erreur en cas d'échec de la suppression
		}
	};

	// useEffect pour vérifier si l'utilisateur est connecté lors du montage du composant
	useEffect(() => {
		checkUserLoggedIn(); // Vérifier si l'utilisateur est connecté
	}, []);

	// Fournir les valeurs et les fonctions liées à l'utilisateur dans le contexte
	return (
		<UserContext.Provider value={{ user, setUser, loading, login, logout, updateUser, isAdmin, deleteUser }}>
			{!loading && children} {/* Ne pas afficher les enfants tant que le chargement est en cours */}
		</UserContext.Provider>
	);
};
