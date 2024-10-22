import React from "react";
import { Dropdown } from "react-bootstrap";
import { BsBag } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";

function CartDropdown({ cartItems, totalPanier, removeFromCart }) {
    return (
        <Dropdown align="end">
            <Dropdown.Toggle
                variant="none"
                id="dropdown-cart"
                className="px-2 hover border-0 bg-t"
                bsPrefix="custom-dropdown-toggle"
            >
                <BsBag size={24} />
                <span className="badge bg-primary ms-2 d-xs-none">
                    {cartItems.length}
                </span>
            </Dropdown.Toggle>

            <Dropdown.Menu
                align="end"
                style={{
                    position: "absolute",
                    top: "40px",
                    right: "0px",
                    width: "300px", // Ajuste la largeur du menu pour correspondre à l'image
                }}
            >
                {/* Header du panier */}
                <div className="d-flex justify-content-between align-items-center p-3 mt-0 pt-0 pb-2 border-bottom">
                    <div className="d-flex align-items-center">
                        Votre panier
                    </div>
                    <div>
                        <span className="fw-bold">TOTAL: </span>
                        <span className="text-primary">{parseFloat(totalPanier).toFixed(2)} €</span>
                    </div>
                </div>

                {/* Liste des articles du panier */}
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((item) => (
                            <div
                                className="position-relative d-flex align-items-center mb-3 border-bottom pb-2"
                                key={item.id}
                                style={{ padding: "10px" }} // Ajout d'un padding pour l'espacement
                            >
                                {/* Icône de poubelle */}
                                <Button
                                    onClick={() => removeFromCart(item.id)}
                                    variant="link"
                                    className="p-0 position-absolute"
                                    style={{
                                        bottom: "10px",
                                        right: "10px",
                                    }}
                                >
                                    <MdClose size={20} color="red" />
                                </Button>

                                {/* Image du produit */}
                                <img
                                    src={item.produit.image || "https://placehold.co/80"}
                                    alt={item.produit.nom}
                                    className="rounded"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        marginRight: "15px",
                                    }}
                                />

                                {/* Détails du produit */}
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <span
                                                className="fw-bold d-block"
                                                style={{
                                                    fontSize: "14px",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                {item.produit.nom}
                                            </span>
                                            <span
                                                className="text-muted"
                                                style={{ fontSize: "12px" }}
                                            >
                                                A l'unité : {item.produit.prix_ttc} € / unité
                                            </span>
                                            <span
                                                className="text-muted"
                                                style={{
                                                    fontSize: "12px",
                                                    display: "block",
                                                }}
                                            >
                                                Quantité : {item.quantite}
                                            </span>
                                        </div>
                                        <div className="text-end">
                                            <span className="fw-bold">
                                                {parseFloat(item.prix_total_produit).toFixed(2)} €
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Bouton Checkout */}
                        <div className="text-center p-2">
                            <button className="btn btn-primary w-100">
                                Payer
                            </button>
                        </div>
                    </>
                ) : (
                    <Dropdown.Item disabled>Le panier est vide</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default CartDropdown;
