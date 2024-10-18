import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          {/* Première colonne */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#!" className="text-dark">FAQ</a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-dark">Mentions Légales</a>
              </li>
            </ul>
          </div>

          {/* Deuxième colonne */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#!" className="text-dark">Contactez-moi</a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-dark">
                  <i className="bi bi-instagram" style={{ fontSize: '2rem' }}></i>
                </a>
              </li>
            </ul>
          </div>

          {/* Troisième colonne */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#!" className="text-dark">CGV</a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-dark">Conditions de Livraison</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center p-3">
        © FÉLIX JUNOT {currentYear}
      </div>
    </footer>
  );
}

export default Footer;
