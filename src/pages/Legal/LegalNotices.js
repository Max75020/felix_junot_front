import React from 'react';
import "../../assets/styles/Legal/LegalNotices.css";

const LegalNotices = () => {
	const textUrl = process.env.REACT_APP_URL_TEST_TEXT;
	const realUrl = process.env.REACT_APP_URL_TEST_REAL;
	return (
		<div className="legal-notices-container col-10 mx-auto mt-5 mb-5">
			<h1>Mentions Légales</h1>

			<h2>1 - Édition du site</h2>
			<p>
				En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet <a href={realUrl}>{textUrl}</a> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
			</p>
			<ul>
				<li><strong>Propriétaire du site :</strong> JUNOT Félix - Contact : felixjunot.ceramique@gmail.com - Adresse : LOGT N 16 35 IMP DES VERGERS 94500 CHAMPIGNY SUR MARNE.</li>
				<li><strong>Identification de l'entreprise :</strong> Entrepreneur individuel JUNOT Félix - SIREN : 829334390 - RCS : 829 334 390 R.C.S. Creteil - Adresse postale : LOGT N 16 35 IMP DES VERGERS 94500 CHAMPIGNY SUR MARNE.</li>
				<li><strong>Directeur de la publication :</strong> felixjunot.ceramique@gmail.com</li>
				<li><strong>Hébergeur :</strong> Digital Ocean, 01 Avenue of the Americas, New York, 10013, United States of America, +1.6463978051</li>
				<li><strong>Délégué à la protection des données :</strong> Félix JUNOT - felixjunot.ceramique@gmail.com</li>
			</ul>

			<h2>2 - Propriété intellectuelle et contrefaçons</h2>
			<p>
				JUNOT Félix est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable de JUNOT Félix.
			</p>
			<p>
				Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
			</p>

			<h2>3 - Limitations de responsabilité</h2>
			<p>
				JUNOT Félix ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur lors de l’accès au site <a href={realUrl}>{textUrl}</a>. JUNOT Félix décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations et contenus présents sur <a href={realUrl}>{textUrl}</a>.
			</p>

			<h2>4 - CNIL et gestion des données personnelles</h2>
			<p>
				Conformément aux dispositions de la loi 78-17 du 6 janvier 1978 modifiée, l’utilisateur du site <a href={realUrl}>{textUrl}</a> dispose d’un droit d’accès, de modification et de suppression des informations collectées. Pour exercer ce droit, envoyez un message à notre Délégué à la Protection des Données : Félix JUNOT - felixjunot.ceramique@gmail.com.
			</p>

			<h2>5 - Liens hypertextes et cookies</h2>
			<p>
				Le site <a href={realUrl}>{textUrl}</a> contient des liens hypertextes vers d’autres sites et dégage toute responsabilité à propos de ces liens externes ou des liens créés par d’autres sites vers <a href={realUrl}>{textUrl}</a>.
			</p>
			<p>
				La navigation sur le site <a href={realUrl}>{textUrl}</a> est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur. Vous avez la possibilité d’accepter ou de refuser les cookies en modifiant les paramètres de votre navigateur.
			</p>

			<h2>6 - Droit applicable et attribution de juridiction</h2>
			<p>
				Tout litige en relation avec l’utilisation du site <a href={realUrl}>{textUrl}</a> est soumis au droit français. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de Créteil.
			</p>
		</div>
	);
};

export default LegalNotices;
