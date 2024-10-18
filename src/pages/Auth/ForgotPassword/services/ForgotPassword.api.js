import apiService from "../../../../services/apiService";


// Définitions des endpoints pour l'entité Category
const PASSWORD_RESET_ENDPOINT = 'password-reset';

const passwordResetApi = {
    passwordReset: async (token, new_password) => {
        const data = { token, new_password };
        return await apiService.post(PASSWORD_RESET_ENDPOINT, data);
    }
};

const PASSWORD_RESET_REQUEST_ENDPOINT = 'password-reset-request';

const passwordResetRequestApi = {
    passwordResetRequest: async (data) => {
        return await apiService.post(PASSWORD_RESET_REQUEST_ENDPOINT, data);
    }
};

const forgotPasswordApi = {
    ...passwordResetApi,
    ...passwordResetRequestApi
};

export default forgotPasswordApi;