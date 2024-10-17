import apiService from "../../../../services/apiService";


// Définitions des endpoints pour l'entité Category
const REGISTER_ENDPOINT = 'utilisateurs';

const registerApi = {
	register: (data) => {
		return apiService.post(REGISTER_ENDPOINT, data, false);
	},
};

export default registerApi;
