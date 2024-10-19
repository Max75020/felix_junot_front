import React from 'react';
import "../../assets/styles/Legal/PrivacyPolicy.css";

const PrivacyPolicy = () => {
	return (
		<div className="privacy-policy-container col-10 mx-auto mt-5 mb-5">
			<h1>Charte de Confidentialité</h1>

			<h2>1. Introduction</h2>
			<p>
				Chez felix-junot-ceramique.fr, la protection de vos données personnelles est une priorité. Cette charte de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations personnelles lorsque vous utilisez notre site et nos services.
			</p>

			<h2>2. Données Collectées</h2>
			<p>
				Nous collectons les informations suivantes dans le cadre de la création de comptes utilisateurs et pour la livraison de vos commandes :
			</p>
			<ul>
				<li>Prénom et Nom</li>
				<li>Adresse Email</li>
				<li>Mot de passe (crypté)</li>
				<li>Adresse postale complète (Rue, Bâtiment, Appartement, Code Postal, Ville, Pays)</li>
				<li>Numéro de téléphone</li>
			</ul>
			<p>
				Ces informations sont indispensables pour vous fournir nos services, notamment pour créer votre compte utilisateur, traiter vos commandes et livrer vos achats.
			</p>

			<h2>3. Utilisation des Données</h2>
			<p>
				Les données que nous collectons sont utilisées pour :
			</p>
			<ul>
				<li>Créer et gérer vos comptes utilisateurs sur notre site.</li>
				<li>Traiter vos commandes et assurer la livraison des œuvres que vous achetez.</li>
				<li>Communiquer avec vous concernant vos commandes ou votre compte.</li>
				<li>Respecter les obligations légales et réglementaires.</li>
			</ul>

			<h2>4. Partage des Données</h2>
			<p>
				Nous ne partageons pas vos informations personnelles avec des tiers sauf dans les cas suivants :
			</p>
			<ul>
				<li><strong>Prestataires de services :</strong> Pour assurer la livraison de vos commandes, nous pouvons partager votre adresse et votre numéro de téléphone avec nos partenaires de livraison.</li>
				<li><strong>Obligations légales :</strong> Nous pouvons être amenés à divulguer vos informations si cela est requis par la loi ou pour répondre à une procédure judiciaire.</li>
			</ul>

			<h2>5. Stockage et Sécurité des Données</h2>
			<p>
				Vos données sont stockées en toute sécurité sur nos serveurs. Nous utilisons des mesures de sécurité appropriées pour protéger vos informations contre tout accès, modification, divulgation ou destruction non autorisés.
			</p>

			<h2>6. Vos Droits</h2>
			<p>
				Vous disposez des droits suivants concernant vos données personnelles :
			</p>
			<ul>
				<li><strong>Accès et rectification :</strong> Vous pouvez accéder à vos informations et demander leur correction si elles sont inexactes.</li>
				<li><strong>Suppression :</strong> Vous pouvez demander la suppression de vos données personnelles sous certaines conditions.</li>
				<li><strong>Opposition :</strong> Vous pouvez vous opposer à certains traitements de vos données personnelles.</li>
				<li><strong>Portabilité :</strong> Vous avez le droit de recevoir vos données dans un format structuré, couramment utilisé et lisible par machine.</li>
			</ul>
			<p>
				Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : [adresse email de contact].
			</p>

			<h2>7. Modifications de la Charte de Confidentialité</h2>
			<p>
				Nous nous réservons le droit de modifier cette charte de confidentialité à tout moment. Toute modification sera publiée sur cette page et, si les changements sont significatifs, nous vous en informerons par email ou via notre site web.
			</p>

			<h2>8. Contact</h2>
			<p>
				Si vous avez des questions ou des préoccupations concernant cette charte de confidentialité, n'hésitez pas à nous contacter à l'adresse suivante : [adresse email de contact].
			</p>
		</div>
	);
};

export default PrivacyPolicy;
