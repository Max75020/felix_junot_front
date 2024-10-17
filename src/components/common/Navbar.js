import React, { useContext, useState } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { BsPerson, BsBag } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import "../../assets/styles/components/Navbar.css";
import logo from "../../img/logo/logo.svg";
import { UserContext } from "../../context/UserContext";

function MyNavbar() {
    const [isOpen, setIsOpen] = useState(false); // Gérer l'état du menu latéral
    const { user, loading, logout } = useContext(UserContext); // Accéder aux informations de l'utilisateur via le contexte
    const navigate = useNavigate(); // Initialiser useNavigate

    // Fonction pour basculer l'ouverture/fermeture du menu latéral
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Fonction pour obtenir les initiales à partir du nom complet
    const getInitials = (name) => {
        if (!name) return "";
        const nameParts = name.split(" ");
        if (nameParts.length === 1) return nameParts[0].charAt(0); // Si un seul mot, utiliser la première lettre
        return (
            nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
        ); // Prenez la première lettre du prénom et du nom de famille
    };

    const userInitials = user ? getInitials(user.email).toUpperCase() : "";

    // Fonction de déconnexion avec redirection
    const handleLogout = () => {
        logout(); // Déconnexion via le contexte
        navigate("/"); // Rediriger vers la page d'accueil après la déconnexion
    };

    return (
        <>
            {/* Barre de navigation */}
            <Navbar className="bg-light" expand={false}>
                <Container className="d-flex justify-content-between align-items-center">
                    {/* Hamburger icon */}
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        onClick={toggleSidebar}
                        className="burger-toggle"
                    />

                    {/* Center Element: Logo/Text */}
                    <Navbar.Brand className="mx-auto" href="/">
                        <img src={logo} alt="Logo" id="navbar-logo" />
                    </Navbar.Brand>

                    {/* Right Elements: Icons */}
                    <Nav className="d-flex flex-row align-items-center">
                        {/* Vérification si l'utilisateur est connecté */}
                        {!loading && user ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="none"
                                    id="dropdown-basic"
                                    className="px-2"
                                    bsPrefix="custom-dropdown-toggle" // Personnaliser pour enlever la flèche
                                    style={{
                                        backgroundColor: "#000000",
                                        color: "#fff",
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        border: "none",
                                    }}
                                >
                                    {userInitials}
                                </Dropdown.Toggle>

                                <Dropdown.Menu
                                    align="end"
                                    style={{
                                        position: "absolute",
                                        top: "40px",
                                        right: "0px",
                                    }}
                                >
                                    <Dropdown.Item href="/profile">
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>
                                        Déconnexion
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Nav.Link href="/login" className="px-2">
                                <BsPerson size={24} />
                            </Nav.Link>
                        )}
                        <Nav.Link href="#cart" className="px-2">
                            <BsBag size={24} />
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* Barre latérale glissante */}
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                {/* Bouton de fermeture */}
                <div className="close-btn-container">
                    <Button onClick={toggleSidebar} className="close-btn">
                        <CgClose />
                    </Button>
                </div>

                {/* Liens du menu latéral */}
                <Nav className="flex-column p-3">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="#contact">Contact</Nav.Link>
                </Nav>
            </div>

            {/* Overlay pour fermer le menu en cliquant à l'extérieur */}
            {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        </>
    );
}

export default MyNavbar;
