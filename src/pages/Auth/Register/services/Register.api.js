import apiService from "../../../../services/apiService";


// Définitions des endpoints pour l'entité Utilisateurs
const REGISTER_ENDPOINT = 'utilisateurs';

const CONFIRM_SIGNUP_ENDPOINT = 'confirm-signup';

const registerApi = {
    register: (data) => {
        return apiService.post(REGISTER_ENDPOINT, data, false);
    },
    confirmSignup: (token) => {
        return apiService.get(`${CONFIRM_SIGNUP_ENDPOINT}?token=${token}`);
    },
};

export default registerApi;

