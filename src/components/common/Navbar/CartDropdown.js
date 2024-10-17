import React from "react";
import { Dropdown } from "react-bootstrap";
import { BsBag, BsTrash } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";

function CartDropdown({ cartItems, handleRemove }) {
    const total = cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);

        console.log(cartItems);

    return (
        <Dropdown align="end">
            <Dropdown.Toggle
                variant="none"
                id="dropdown-cart"
                className="px-2"
                bsPrefix="custom-dropdown-toggle"
                style={{
                    backgroundColor: "transparent",
                    border: "none",
                }}
            >
                <BsBag size={24} />
                <span className="badge bg-primary ms-2">
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
                        <span className="text-primary">{total} €</span>
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
                                    onClick={() => handleRemove(item.id)}
                                    variant="link"
                                    className="p-0 position-absolute"
                                    style={{
                                        top: "0px",
                                        right: "10px",
                                    }}
                                >
                                    <MdClose size={20} color="red" />
                                </Button>

                                {/* Image du produit */}
                                <img
                                    src={item.backgroundImage}
                                    alt={item.name}
                                    className="rounded"
                                    style={{
                                        width: "80px", // Agrandissement de l'image
                                        height: "80px",
                                        objectFit: "cover",
                                        marginRight: "15px",
                                    }}
                                />

                                {/* Détails du produit */}
                                <div className="flex-grow-1 me-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <span
                                                className="fw-bold d-block"
                                                style={{
                                                    fontSize: "14px",
                                                    textTransform: "uppercase",
                                                }} // Mise en majuscule comme dans l'image
                                            >
                                                {item.produit.nom}
                                            </span>
                                            <span
                                                className="text-muted"
                                                style={{ fontSize: "12px" }}
                                            >
                                                A l'unité : {item.produit.prix_ttc} €
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
                                        <div>Total: {item.prixTotal}</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Bouton Checkout */}
                        <div className="text-center p-2">
                            <button className="btn btn-primary w-100">
                                Checkout
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
