import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../img/logo/logo.svg";
import { UserContext } from "../../context/UserContext";
import { useCart } from "../../context/CartContext"; // Importer le contexte du panier
import categoryApi from "../../pages/Category/services/Category.api";
import UserDropdown from "./Navbar/UserDropdown";
import CartDropdown from "./Navbar/CartDropdown";
import { BsPerson } from "react-icons/bs"; // Importer l'icône utilisateur
import "../../assets/styles/components/Navbar.css";
import Sidebar from "./Navbar/Sidebar";

function MyNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    // Utiliser les états et fonctions du contexte utilisateur et panier
    const { user, loading, logout } = useContext(UserContext);
    const { cartItems, removeFromCart, totalPanier } = useCart(); // Récupérer les éléments du panier via le contexte

    // Calculer le total du panier


    const userInitials = user ? getInitials(user.email).toUpperCase() : "";

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleCategories = () => setCategoriesOpen(!categoriesOpen);

    const fetchCategories = async () => {
        try {
            const response = await categoryApi.getAllCategoriesNoToken();
            setCategories(response["hydra:member"] || []);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <Navbar className="bg-light" expand={false}>
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        onClick={toggleSidebar}
                        className="burger-toggle"
                    />
                    <Navbar.Brand className="mx-auto" href="/">
                        <img src={logo} alt="Logo" id="navbar-logo" />
                    </Navbar.Brand>
                    <Nav className="d-flex flex-row align-items-center">
                        {!loading && (
                            user ? (
                                <UserDropdown
                                    user={user}
                                    userInitials={userInitials}
                                    handleLogout={logout}
                                />
                            ) : (
                                <Nav.Link href="/login" className="px-2">
                                    <BsPerson size={24} />
                                </Nav.Link>
                            )
                        )}
                        <CartDropdown
                            cartItems={cartItems} 
                            removeFromCart={removeFromCart} // Utilisation de la fonction du contexte pour supprimer un article
                            totalPanier={totalPanier}
                        />
                    </Nav>
                </Container>
            </Navbar>
            <Sidebar
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                categoriesOpen={categoriesOpen}
                toggleCategories={toggleCategories}
                categories={categories}
            />
        </>
    );
}

// Fonction pour obtenir les initiales de l'utilisateur
function getInitials(name) {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts.length === 1
        ? nameParts[0].charAt(0)
        : nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
}

export default MyNavbar;
