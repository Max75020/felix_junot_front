import React, { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import produitApi from "../pages/Product/services/Product.api";
import cartApi from "../pages/Cart/services/Cart.api";
import { extractIdFromUrl } from "../utils/tools";

// Création du contexte en haut pour éviter les erreurs d'initialisation
const CartContext = createContext();

// Provider du contexte
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    const fetchCart = async (cartId) => {
        setLoading(true);
        try {
            const response = await cartApi.getCartById(cartId);
            
            if (!response || !response.panierProduits) {
                return;
            }
    
            const panierProduits = response.panierProduits || [];
            console.log("Panier produits:", panierProduits);
    
            const items = await Promise.all(
                panierProduits.map(async (panierProduit) => {
                    const produitId = extractIdFromUrl(panierProduit.produit["@id"]); // Utiliser produit["@id"]
                    
                    const produitDetails = await produitApi.getProduitById(produitId);
                    console.log("Détails du produit:", produitDetails);
                    
                    return {
                        id: panierProduit.id_panier_produit,
                        produit: produitDetails,
                        quantite: panierProduit.quantite,
                        prixTotal: panierProduit.prix_total_produit,
                    };
                })
            );
    
            setCartItems(items);
            console.log("Cart items set:", items);
        } catch (error) {
            console.error("Erreur lors de la récupération du panier:", error);
            console.error("Détails de l'erreur:", error.message);
        } finally {
            setLoading(false);
        }
    };
    
    

    const addToCart = async (productIri, quantity) => {
        setLoading(true);
        try {
            await cartApi.addProductToCart(productIri, quantity);
            if (user && user.paniers.length > 0) {
                const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
                await fetchCart(userCartId);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout au panier:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
    };

    useEffect(() => {
        if (user && user.paniers.length > 0) {
            const userCartId = extractIdFromUrl(user.paniers[0]["@id"]);
            fetchCart(userCartId);
        }
    }, [user]);

    const contextValue = {
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        fetchCart, // Ajout de fetchCart au contexte
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte du panier
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart doit être utilisé dans un CartProvider");
    }
    return context;
};

export default CartContext;
