import React, { createContext, useState, useEffect } from 'react';
import apiService from '../services/apiService';
import loginCheckerApi from '../pages/Auth/Login/services/LoginCheck.api';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour vérifier si l'utilisateur est connecté
  const checkUserLoggedIn = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await apiService.get('utilisateurs/me'); // Récupérer les infos de l'utilisateur connecté
        setUser(response); // Mettre à jour l'utilisateur dans le contexte
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

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
