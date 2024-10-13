import React from 'react';
import { Navigate } from 'react-router-dom';

// Simuler une fonction qui vérifie si l'utilisateur est authentifié
const isAuthenticated = () => {
	return localStorage.getItem('token'); // Vérifie si un token est présent dans le localStorage
};

// Simuler une fonction qui récupère le rôle de l'utilisateur (par exemple, stocké dans le localStorage)
const getUserRole = () => {
	return localStorage.getItem('role'); // Suppose que vous stockez le rôle dans le localStorage
};

// Composant qui protège l'accès à une route en fonction du rôle
const RoleGuard = ({ children, role }) => {
	const userRole = getUserRole();

	// Vérifier si l'utilisateur est authentifié et s'il a le bon rôle
	if (!isAuthenticated()) {
		return <Navigate to="/login" />; // Redirige vers la page login si non authentifié
	}

	if (role && userRole !== role) {
		return <Navigate to="/unauthorized" />; // Redirige vers une page d'accès non autorisé si le rôle ne correspond pas
	}

	return children; // Renvoie le composant protégé si l'utilisateur a le bon rôle
};

export default RoleGuard;
