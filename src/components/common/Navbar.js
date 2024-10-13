import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { BsSearch, BsPerson, BsBag } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';

function MyNavbar() {
  const [isOpen, setIsOpen] = useState(false); // Gérer l'état du menu latéral

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Ouvrir ou fermer le menu
  };

  return (
    <>
      {/* Barre de navigation */}
      <Navbar className="bg-light" expand={false}>
        <Container className="d-flex justify-content-between align-items-center">
          {/* Hamburger icon */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} />

          {/* Center Element: Logo/Text */}
          <Navbar.Brand className="mx-auto" href="#home">
            Logo/Texte
          </Navbar.Brand>

          {/* Right Elements: Icons */}
          <Nav className="d-flex flex-row align-items-center">
            <Nav.Link href="#search" className="px-2">
              <BsSearch size={24} />
            </Nav.Link>
            <Nav.Link href="/login" className="px-2">
              <BsPerson size={24} />
            </Nav.Link>
            <Nav.Link href="#cart" className="px-2">
              <BsBag size={24} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barre latérale glissante */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Bouton de fermeture */}
        <div className="close-btn-container">
          <Button onClick={toggleSidebar} className='close-btn'>
            <CgClose/>
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
