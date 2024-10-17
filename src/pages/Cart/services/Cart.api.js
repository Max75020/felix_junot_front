import apiService from "../../../services/apiService";


// Définitions des endpoints pour l'entité Category
const CART_ENDPOINT = 'paniers';
const CART_LINES_ENDPOINT = 'panier_produits';
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

  removeProductFromCart: async (cartLineId) => {
    return await apiService.delete(`${CART_LINES_ENDPOINT}/${cartLineId}`), {
		id_panier_produit: cartLineId, // L'API attend "produit" avec l'IRI du produit
    };
  }
  
  


  
};

export default cartApi;
