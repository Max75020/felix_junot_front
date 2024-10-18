import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Footer/footer.css';
import { FaInstagram } from "react-icons/fa";
import { Container } from 'react-bootstrap';

const Footer = () => {
	// Mémoriser l'année courante pour éviter de la recalculer à chaque rendu
	const currentYear = useMemo(() => new Date().getFullYear(), []);

	const instagramUrl = process.env.REACT_APP_INSTAGRAM_URL || 'https://www.instagram.com/felixjunot/';

	return (
		// Élément principal du footer avec un label d'accessibilité pour les lecteurs d'écran
		<footer className="text-center text-lg-start footer pt-4 mt-4 border-top" aria-label="Navigation du pied de page">
			<Container>
				{/* Vue Ordinateur - 3 Colonnes avec 2 éléments chacune */}
				<div className="d-none d-lg-flex row justify-content-center align-items-center mb-5">
					{/* Première Colonne */}
					<div className="col-lg-4 text-center">
						<ul className="list-unstyled footer-column">
							<li>
								{/* Lien vers la page FAQ */}
								<Link to="/faq">FAQ</Link>
							</li>
							<li>
								{/* Lien vers la page Mentions Légales */}
								<Link to="/legal-notices">Mentions Légales</Link>
							</li>
						</ul>
					</div>
					{/* Deuxième Colonne */}
					<div className="col-lg-4 text-center">
						<ul className="list-unstyled footer-column">
							<li >
								{/* Lien vers la page Contact */}
								<Link to="/contact">Contactez-moi</Link>
							</li>
							<li>
								{/* Lien vers le profil Instagram, configurable via une variable d'environnement */}
								<a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Visitez notre page Instagram">
									<FaInstagram className="logo-instagram" />
								</a>
							</li>
						</ul>
					</div>
					{/* Troisième Colonne */}
					<div className="col-lg-4 text-center">
						<ul className="list-unstyled footer-column">
							<li>
								{/* Lien vers la page CGV (Conditions Générales de Vente) */}
								<Link to="/cgv">CGV</Link>
							</li>
							<li>
								{/* Lien vers la page des Conditions de Livraison */}
								<Link to="/delivery-conditions">Conditions de Livraison</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Vue Tablette - 2 Colonnes avec 3 éléments chacune */}
				<div className="d-none d-md-flex d-lg-none row justify-content-center align-items-center mb-5">
					{/* Première Colonne */}
					<div className="col-md-6 text-center">
						<ul className="list-unstyled footer-column">
							<li>
								{/* Lien vers la page FAQ */}
								<Link to="/faq">FAQ</Link>
							</li>
							<li>
								{/* Lien vers la page Mentions Légales */}
								<Link to="/legal-notices">Mentions Légales</Link>
							</li>
							<li>
								{/* Lien vers la page CGV (Conditions Générales de Vente) */}
								<Link to="/cgv">CGV</Link>
							</li>
						</ul>
					</div>
					{/* Deuxième Colonne */}
					<div className="col-md-6 text-center">
						<ul className="list-unstyled footer-column">
							<li>
								{/* Lien vers la page Contact */}
								<Link to="/contact">Contactez-moi</Link>
							</li>
							<li>
								{/* Lien vers le profil Instagram */}
								<a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Visitez notre page Instagram">
									<FaInstagram className="logo-instagram" />
								</a>
							</li>
							<li>
								{/* Lien vers la page des Conditions de Livraison */}
								<Link to="/delivery-conditions">Conditions de Livraison</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Vue Smartphone - 1 Colonne avec tous les éléments */}
				<div className="d-md-none d-flex row mb-5 justify-content-center align-items-center">
					<div className="col-12 text-center">
						<ul className="list-unstyled footer-column">
							<li>
								{/* Lien vers la page FAQ */}
								<Link to="/faq">FAQ</Link>
							</li>
							<li>
								{/* Lien vers la page Mentions Légales */}
								<Link to="/legal-notices">Mentions Légales</Link>
							</li>
							<li>
								{/* Lien vers la page CGV (Conditions Générales de Vente) */}
								<Link to="/cgv">CGV</Link>
							</li>
							<li>
								{/* Lien vers la page Contact */}
								<Link to="/contact">Contactez-moi</Link>
							</li>
							<li>
								{/* Lien vers le profil Instagram */}
								<a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Visitez notre page Instagram">
									<FaInstagram className="logo-instagram" />
								</a>
							</li>
							<li>
								{/* Lien vers la page des Conditions de Livraison */}
								<Link to="/delivery-conditions">Conditions de Livraison</Link>
							</li>
						</ul>
					</div>
				</div>
			</Container>

			{/* Section des droits d'auteur avec l'année courante */}
			<div className="p-1 footer-bottom">
				<p className="text-light">&copy; FÉLIX JUNOT {currentYear}</p>
			</div>
		</footer>
	);
}

export default Footer;
