import React from "react";
import { Nav, Button } from "react-bootstrap";
import { FiPlus, FiMinus } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

function Sidebar({ isOpen, toggleSidebar, categoriesOpen, toggleCategories, categories }) {
    return (
        <>
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="close-btn-container">
                    <Button onClick={toggleSidebar} className="close-btn">
                        <CgClose />
                    </Button>
                </div>

                <Nav className="flex-column p-3">
                    <div className="d-flex align-items-center py-2">
                        <Nav.Link href="/" className="p-0 m-0 sidebar-menu-first">
                            Accueil
                        </Nav.Link>
                    </div>

                    <hr className="hr-menu" />

                    <div
                        className="d-flex justify-content-between align-items-center py-2"
                        onClick={toggleCategories}
                    >
                        <p className="mb-0 sidebar-menu-first">CATEGORIES</p>
                        <span className={`icon-rotate ${categoriesOpen ? "open" : ""}`}>
                            {categoriesOpen ? <FiMinus /> : <FiPlus />}
                        </span>
                    </div>

                    <div className={`categories-container ${categoriesOpen ? "open" : ""}`}>
                        {categories.map((category) => (
                            <Nav.Link
                                key={category.id_categorie}
                                href={`/categories/${category.id_categorie}/all`}
                                className="py-1 m-0 sidebar-menu-secondary"
                            >
                                {category.nom}
                            </Nav.Link>
                        ))}
                    </div>

                    <hr className="hr-menu" />
                </Nav>
            </div>

            {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        </>
    );
}

export default Sidebar;
