import apiService from "../../../../services/apiService";



// Définitions des endpoints pour l'entité Category
const LOGINCHECK_ENDPOINT = 'login_check';

const loginCheckerApi = {
  login: async (email, password) => {
    const response = await apiService.post(LOGINCHECK_ENDPOINT, { email, password });

    // Si la réponse contient un token, on sauvegarde le token et l'email dans le localStorage
    if (response && response.token) {
      localStorage.setItem('token', response.token); // Stocker le token
    }

    return response;
  },
};

export default loginCheckerApi;
