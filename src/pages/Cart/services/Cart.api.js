import apiService from "../../../services/apiService";


// Définitions des endpoints pour l'entité Category
const CART_ENDPOINT = 'paniers';

const cartApi = {
	
  getCartById: async (cartId) => {
    return await apiService.get(`${CART_ENDPOINT}/${cartId}`);
  },
  
  addProductToCart: async (productIri, quantity) => {
    // Envoyer un objet avec la clé "produit" et non "productId"
    return await apiService.post(`${CART_ENDPOINT}/add-product`, {
      produit: productIri, // L'API attend "produit" avec l'IRI du produit
      quantity: quantity,  // Quantité
    });
  },

  removeProductFromCart: async (productIri) => {
    return await apiService.post(`${CART_ENDPOINT}/remove-product`, {
      produit: productIri, // L'API attend "produit" avec l'IRI du produit
    });
  },
  


  
};

export default cartApi;
