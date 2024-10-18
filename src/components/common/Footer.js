import React from 'react';
import { Link } from 'react-router-dom'; // Assure-toi que tu utilises react-router-dom

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer style={{ backgroundColor: '#333', color: '#fff' }} className="text-center text-lg-start">
			<div className="container p-4">
				<div className="row">
					{/* Première colonne */}
					<div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
						<ul className="list-unstyled">
							<li className="mb-2">
								<Link to="/faq" style={{ color: '#fff' }}>FAQ</Link>
							</li>
							<li className="mb-2">
								<Link to="/legal-notices" style={{ color: '#fff' }}>Mentions Légales</Link>
							</li>
						</ul>
					</div>

					{/* Deuxième colonne */}
					<div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
						<ul className="list-unstyled">
							<li className="mb-2">
								<Link to="/contact" style={{ color: '#fff' }}>Contactez-moi</Link>
							</li>
							<li className="mb-2">
								<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
									<i className="bi bi-instagram" style={{ fontSize: '2rem' }}></i>
								</a>
							</li>
						</ul>
					</div>

					{/* Troisième colonne */}
					<div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
						<ul className="list-unstyled">
							<li className="mb-2">
								<Link to="/cgv" style={{ color: '#fff' }}>CGV</Link>
							</li>
							<li className="mb-2">
								<Link to="/delivery-conditions" style={{ color: '#fff' }}>Conditions de Livraison</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Copyright */}
			<div className="text-center p-3" style={{ backgroundColor: '#222', color: '#fff' }}>
				© FÉLIX JUNOT {currentYear}
			</div>
		</footer>
	);
}

export default Footer;
