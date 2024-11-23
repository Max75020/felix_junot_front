import React, { createContext, useState, useEffect } from 'react';
import apiService, { clearTokens } from '../services/apiService';
import loginCheckerApi from '../pages/Auth/Login/services/LoginCheck.api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Vérifier si l'utilisateur est connecté
	const checkUserLoggedIn = async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			// Si aucun token, l'utilisateur est déconnecté
			setUser(null);
			setLoading(false);
			return;
		}

		try {
			// Utilise apiService pour récupérer les informations de l'utilisateur connecté
			const response = await apiService.get('utilisateurs/me');
			// Ajouter l'IRI basé sur l'ID utilisateur
			const iri = `/api/utilisateurs/${response.id_utilisateur}`;

			// Inclure la liste des favoris dans l'utilisateur
			setUser({
				...response,
				'@id': iri, // Ajout de l'IRI correct
				favoris: response.favoris || [], // Assurer que les favoris soient une liste
				adresses: response.adresses || [], // Assurer que les adresses soient une liste
			});
		} catch (error) {
			console.error('Erreur lors de la récupération de l\'utilisateur', error);
			// Si l'authentification échoue, définir `user` comme `null`
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	// Utiliser le service pour la connexion
	const login = async (email, password) => {
		try {
			const response = await loginCheckerApi.login(email, password); // Appel de votre service

			// Si la connexion est réussie (le token est stocké), vérifier l'utilisateur
			if (response.token) {
				await checkUserLoggedIn(); // Récupérer l'utilisateur après la connexion
			}
		} catch (error) {
			console.error('Erreur de connexion', error);
			throw error; // Lever l'erreur à nouveau pour qu'elle soit capturée dans le composant appelant
		}
	};

	const logout = () => {
		// Supprimer les tokens
		clearTokens(); // Utiliser clearTokens() défini dans `apiService`

		// Déconnecter l'utilisateur
		setUser(null);

		// Rediriger vers la page d'accueil
		window.location.href = '/';
	};

	// Nouvelle fonction pour mettre à jour l'utilisateur
	const updateUser = async (updatedData) => {
		if (!user || !user.id_utilisateur) {
			console.error("ID utilisateur manquant.");
			return;
		}

		try {
			const response = await apiService.patch(`utilisateurs/${user.id_utilisateur}`, updatedData);
			// Ajouter l'IRI basé sur l'ID utilisateur mis à jour
			const iri = `/api/utilisateurs/${response.id_utilisateur}`;
			setUser({
				...response,
				'@id': iri, // Mise à jour de l'IRI correcte
				favoris: response.favoris || [], // Assurer que les favoris soient une liste
				adresses: response.adresses || [], // Assurer que les adresses soient une liste
			});
		} catch (error) {
			console.error("Erreur lors de la mise à jour de l'utilisateur", error);
		}
	};

	// Fonction utilitaire pour vérifier si l'utilisateur est admin
	const isAdmin = () => {
		return user?.roles_generated?.includes('ROLE_ADMIN');
	};

	// Supprimer l'utilisateur
	const deleteUser = async () => {
		if (!user || !user.id_utilisateur) {
			console.error("ID utilisateur manquant.");
			return;
		}

		try {
			await apiService.delete(`utilisateurs/${user.id_utilisateur}`);
			logout(); // Déconnecter l'utilisateur après la suppression
		} catch (error) {
			console.error("Erreur lors de la suppression de l'utilisateur", error);
		}
	};


	useEffect(() => {
		checkUserLoggedIn();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, loading, login, logout, updateUser, isAdmin, deleteUser }}>
			{!loading && children}
		</UserContext.Provider>
	);
};
