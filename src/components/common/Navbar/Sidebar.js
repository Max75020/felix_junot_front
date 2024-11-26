/* Importation des bibliothèques React pour créer des composants fonctionnels */
import React from "react";
/* Importation des composants nécessaires de React Bootstrap */
import { Nav, Button } from "react-bootstrap";
/* Importation des icônes utilisées pour le menu latéral et la navigation */
import { FiPlus, FiMinus } from "react-icons/fi"; // Icônes de plus et de moins pour l'affichage des catégories
import { CgClose } from "react-icons/cg"; // Icône pour fermer la barre latérale

/* Composant Sidebar : affiche un menu latéral avec des catégories */
function Sidebar({ isOpen, toggleSidebar, categoriesOpen, toggleCategories, categories }) {
	return (
		<>
			{/* Conteneur de la barre latérale */}
			<div className={`sidebar ${isOpen ? "open" : ""}`}> {/* Ajoute la classe "open" si isOpen est vrai */}
				{/* Bouton pour fermer la barre latérale */}
				<div className="close-btn-container">
					<Button onClick={toggleSidebar} className="close-btn">
						<CgClose /> {/* Icône pour fermer la barre latérale */}
					</Button>
				</div>

				{/* Menu de navigation de la barre latérale */}
				<Nav className="flex-column p-3">
					{/* Lien vers la page d'accueil */}
					<div className="d-flex align-items-center py-2">
						<Nav.Link href="/" className="p-0 m-0 sidebar-menu-first">
							Accueil
						</Nav.Link>
					</div>

					{/* Séparateur visuel */}
					<hr className="hr-menu" />

					{/* Section des catégories avec toggle */}
					<div
						className="d-flex justify-content-between align-items-center py-2"
						onClick={toggleCategories} // Toggle l'affichage des catégories
					>
						<p className="mb-0 sidebar-menu-first">CATEGORIES</p>
						{/* Affiche l'icône Plus ou Moins selon l'état de categoriesOpen */}
						<span className={`icon-rotate ${categoriesOpen ? "open" : ""}`}>
							{categoriesOpen ? <FiMinus /> : <FiPlus />}
						</span>
					</div>

					{/* Liste des catégories, s'affiche uniquement si categoriesOpen est vrai */}
					<div className={`categories-container ${categoriesOpen ? "open" : ""}`}>
						{categories.map((category) => (
							<Nav.Link
								key={category.id_categorie} // Clé unique pour chaque catégorie
								href={`/categories/${category.id_categorie}/all`} // Lien vers la page de la catégorie
								className="py-1 m-0 sidebar-menu-secondary"
							>
								{category.nom} {/* Nom de la catégorie */}
							</Nav.Link>
						))}
						{/* Lien vers toutes les catégories */}
						<Nav.Link href="/categories" className="py-1 m-0 sidebar-menu-secondary">
							Toutes les catégories
						</Nav.Link>
					</div>

					{/* Séparateur visuel */}
					<hr className="hr-menu" />
				</Nav>
			</div>

			{/* Overlay derrière la barre latérale, qui permet de la fermer en cliquant dessus */}
			{isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
		</>
	);
}

export default Sidebar;
