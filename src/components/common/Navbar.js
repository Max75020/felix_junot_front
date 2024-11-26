/* Importation de React et des hooks nécessaires */
import React, { useContext, useState, useEffect } from "react";
/* Importation des composants Navbar et Nav de React Bootstrap pour la navigation */
import { Navbar, Nav } from "react-bootstrap";
/* Importation des logos (noir et blanc) utilisés dans la navbar */
import logonoir from "../../img/logo/logonoir.svg";
import logoblanc from "../../img/logo/logoblanc.svg";
/* Importation du contexte utilisateur pour accéder aux informations de l'utilisateur connecté */
import { UserContext } from "../../context/UserContext";
/* Importation du contexte du panier pour accéder aux données du panier */
import { useCart } from "../../context/CartContext";
/* Importation de l'API des catégories pour récupérer les catégories de produits */
import categoryApi from "../../pages/Category/services/Category.api";
/* Importation des composants UserDropdown et CartDropdown */
import UserDropdown from "./Navbar/UserDropdown";
import CartDropdown from "./Navbar/CartDropdown";
/* Importation de l'icône utilisateur de react-icons */
import { BsPerson } from "react-icons/bs";
/* Importation des styles CSS spécifiques à la Navbar */
import "../../assets/styles/components/Navbar.css";
/* Importation du composant Sidebar pour le menu latéral */
import Sidebar from "./Navbar/Sidebar";
/* Importation de useLocation de React Router pour connaître l'URL actuelle */
import { useLocation } from "react-router-dom";

function MyNavbar() {
	// État pour gérer l'ouverture du menu latéral
	const [isOpen, setIsOpen] = useState(false);
	// État pour stocker la liste des catégories de produits
	const [categories, setCategories] = useState([]);
	// État pour gérer l'ouverture des catégories dans le menu latéral
	const [categoriesOpen, setCategoriesOpen] = useState(false);
	// Utilisation de useLocation pour connaître l'URL actuelle
	const location = useLocation();

	// Utiliser les états et fonctions du contexte utilisateur et panier
	const { user, loading, logout } = useContext(UserContext); // Accès aux informations de l'utilisateur
	const { cartItems, removeFromCart, totalPanier } = useCart(); // Accès aux informations du panier

	// Définir si on est sur la page d'accueil ("/")
	const isHomePage = location.pathname === '/';

	// Obtenir les initiales de l'utilisateur si connecté
	const userInitials = user ? getInitials(user.email).toUpperCase() : "";

	// Fonction pour basculer l'état du menu latéral
	const toggleSidebar = () => setIsOpen(!isOpen);
	// Fonction pour basculer l'état des catégories dans le menu latéral
	const toggleCategories = () => setCategoriesOpen(!categoriesOpen);

	// Fonction pour récupérer la liste des catégories via l'API
	const fetchCategories = async () => {
		try {
			// Appel de l'API pour récupérer les catégories sans jeton
			const response = await categoryApi.getAllCategoriesNoToken();
			// Mise à jour de l'état avec les catégories récupérées
			setCategories(response["hydra:member"] || []);
		} catch (error) {
			console.error("Erreur lors de la récupération des catégories :", error);
		}
	};

	// useEffect pour récupérer les catégories au montage du composant
	useEffect(() => {
		fetchCategories();
	}, []);

	// Déterminer les classes de la Navbar en fonction de la page actuelle
	const navbarClasses = isHomePage ? "navbar navbar-home" : "navbar bg-light";
	const profilIconClasses = isHomePage ? "px-2 hover" : "px-2 hover text-dark";
	const burgerIconClasses = isHomePage ? "burger-toggle burger-home" : "burger-toggle";
	const logoClasses = isHomePage ? logoblanc : logonoir;

	return (
		<>
			{/* Barre de navigation principale */}
			<Navbar className={navbarClasses} expand={false}>
				<div className="d-flex justify-content-between align-items-center max-w-90 mx-auto w-100">
					{/* Bouton pour ouvrir le menu latéral */}
					<Navbar.Toggle
						aria-controls="basic-navbar-nav"
						onClick={toggleSidebar}
						className={burgerIconClasses}
					/>
					{/* Logo de la marque */}
					<Navbar.Brand className="mx-auto" href="/">
						<img src={logoClasses} alt="Logo" id="navbar-logo" className="text-light" />
					</Navbar.Brand>
					{/* Navigation utilisateur et panier */}
					<Nav className="d-flex flex-row align-items-center">
						{/* Affichage du bouton de connexion ou des initiales de l'utilisateur */}
						{!loading && (
							user ? (
								<UserDropdown
									user={user}
									userInitials={userInitials}
									handleLogout={logout} // Appelle la fonction logout du contexte utilisateur
								/>
							) : (
								<Nav.Link href="/login" className={profilIconClasses}>
									<BsPerson size={24} /> {/* Icône de profil utilisateur */}
								</Nav.Link>
							)
						)}
						{/* Affichage du menu déroulant du panier */}
						<CartDropdown
							cartItems={cartItems} // Articles présents dans le panier
							removeFromCart={removeFromCart} // Utilisation de la fonction du contexte pour supprimer un article
							totalPanier={totalPanier} // Total actuel du panier
						/>
					</Nav>
				</div>
			</Navbar>
			{/* Sidebar pour la navigation supplémentaire */}
			<Sidebar
				isOpen={isOpen} // État d'ouverture du menu latéral
				toggleSidebar={toggleSidebar} // Fonction pour fermer le menu latéral
				categoriesOpen={categoriesOpen} // État d'ouverture des catégories dans le menu latéral
				toggleCategories={toggleCategories} // Fonction pour basculer l'affichage des catégories
				categories={categories} // Liste des catégories récupérées
			/>
		</>
	);
}

// Fonction pour obtenir les initiales de l'utilisateur
function getInitials(name) {
	if (!name) return "";
	const nameParts = name.split(" ");
	// Si le nom ne comporte qu'une seule partie, retourne la première lettre, sinon retourne les initiales
	return nameParts.length === 1
		? nameParts[0].charAt(0)
		: nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
}

export default MyNavbar;