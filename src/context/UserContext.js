import React, { createContext, useState, useEffect } from 'react';
import apiService from '../services/apiService';
import loginCheckerApi from '../pages/Auth/Login/services/LoginCheck.api';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const checkUserLoggedIn = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const response = await apiService.get('utilisateurs/me');
				// Ajouter l'IRI basé sur l'ID utilisateur
				const iri = `/api/utilisateurs/${response.id_utilisateur}`;

				// Inclure la liste des favoris dans l'utilisateur
				setUser({
					...response,
					'@id': iri, // Ajout de l'IRI correcte
					favoris: response.favoris || [], // Assurer que les favoris soient une liste
					adresses: response.adresses || [], // Assurer que les adresses soient une liste
				});
			} catch (error) {
				console.error('Erreur lors de la récupération de l\'utilisateur', error);
				setUser(null);
			}
		}
		setLoading(false);
	};

	// Utiliser le service que vous avez créé pour la connexion
	const login = async (email, password) => {
		try {
			const response = await loginCheckerApi.login(email, password); // Appel de votre service

			// Si la connexion est réussie (le token est stocké), vérifier l'utilisateur
			if (response.token) {
				await checkUserLoggedIn(); // Récupérer l'utilisateur après la connexion
			}
		} catch (error) {
			console.error('Erreur de connexion', error);
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		setUser(null);
	};

	useEffect(() => {
		checkUserLoggedIn();
	}, []);

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
				'@id': iri, // Mise à jour de l'IRI correct
				favoris: response.favoris || [], // Assurer que les favoris soient une liste
				adresses: response.adresses || [], // Assurer que les adresses soient une liste
			});
		} catch (error) {
			console.error("Erreur lors de la mise à jour de l'utilisateur", error);
		}
	};

	useEffect(() => {
		checkUserLoggedIn();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, loading, login, logout, updateUser }}>
			{children}
		</UserContext.Provider>
	);
};
