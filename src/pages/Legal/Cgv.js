import React from 'react'; // Importation de React
import "../../assets/styles/Legal/Cgv.css"; // Importation des styles spécifiques pour le composant CGV

// Composant principal pour afficher les Conditions Générales de Vente (CGV)
const Cgv = () => {
    // Récupération des URL depuis les variables d'environnement
	const textUrl = process.env.REACT_APP_URL_TEXT; // URL affichée en tant que texte
	const realUrl = process.env.REACT_APP_URL; // URL réelle utilisée pour les liens

	return (
		// Conteneur principal pour les CGV avec des marges pour centrer le contenu
		<div className="conditions-container col-10 mx-auto mt-5 mb-5">
			<h1>Conditions Générales de Vente (CGV)</h1>

			{/* Préambule des CGV */}
			<h2>Préambule</h2>
			<p>
				Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des ventes effectuées sur le site internet <a href={realUrl}>{textUrl}</a>. En passant commande sur ce site, l'acheteur accepte sans réserve les présentes conditions.
			</p>

			{/* Article 1 : Objet des CGV */}
			<h2>Article 1 : Objet</h2>
			<p>
				Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne des produits proposés par Félix Junot Céramique via le site <a href={realUrl}>{textUrl}</a>.
			</p>

			{/* Article 2 : Informations sur les produits */}
			<h2>Article 2 : Produits</h2>
			<p>
				Les produits proposés à la vente sont des œuvres et créations artisanales en céramique fabriquées par l'artiste Félix JUNOT. Chaque pièce est unique avec des variations possibles de couleur, de taille, et de finition. Les photographies des produits sont les plus fidèles possibles mais ne peuvent assurer une similitude parfaite avec le produit proposé, notamment en ce qui concerne les couleurs.
			</p>

			{/* Article 3 : Prix */}
			<h2>Article 3 : Prix</h2>
			<p>
				Les prix des produits sont indiqués en euros, toutes taxes comprises (TTC), hors frais de livraison, qui sont précisés au moment de la validation de la commande. Félix Junot Céramique se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix affiché le jour de la commande sera le seul applicable à l'acheteur.
			</p>

			{/* Article 4 : Commande */}
			<h2>Article 4 : Commande</h2>
			<p>
				La commande est validée dès la confirmation du paiement. Le client recevra un email de confirmation récapitulant les détails de la commande. Félix Junot Céramique se réserve le droit d'annuler ou de refuser toute commande d'un client avec lequel il existerait un litige relatif au paiement d'une commande antérieure.
			</p>

			{/* Article 5 : Paiement */}
			<h2>Article 5 : Paiement</h2>
			<p>
				Le paiement s'effectue par carte bancaire via une plateforme sécurisée (Stripe). Les produits commandés demeurent la propriété du vendeur jusqu'au paiement complet du prix.
			</p>

			{/* Article 6 : Livraison */}
			<h2>Article 6 : Livraison</h2>
			<p>
				Les produits sont livrés à l'adresse de livraison indiquée au cours du processus de commande. Félix Junot Céramique s'engage à expédier les commandes dans les délais indiqués lors de la confirmation de commande. Les délais de livraison sont donnés à titre indicatif et peuvent varier en fonction de la disponibilité des produits et du transporteur choisi. Les frais de livraison sont calculés et indiqués lors de la commande. En cas de retard de livraison, le client peut contacter Félix Junot Céramique pour convenir d'une solution.
			</p>

			{/* Article 7 : Rétractation et Retours */}
			<h2>Article 7 : Rétractation et Retours</h2>
			<p>
				Conformément à l'article L121-21 du Code de la Consommation, le client dispose d'un délai de 14 jours à compter de la réception de sa commande pour exercer son droit de rétractation. Cependant, ce droit de rétractation ne s'applique pas aux œuvres céramiques personnalisées ou fabriquées sur commande, conformément à l’article L221-28 du Code de la Consommation. Les commandes de produits personnalisés ne sont ni échangeables ni remboursables, sauf en cas de défaut ou de non-conformité avérée.
			</p>
			<p>
				Pour les produits non personnalisés, le client devra renvoyer le ou les produits dans leur état et emballage d'origine à ses frais. Les articles endommagés, salis ou incomplets ne seront pas repris. En cas de rétractation, Félix Junot Céramique remboursera le client du montant total de la commande hors frais de retour dans un délai de 14 jours suivant la réception des produits retournés.
			</p>

			{/* Article 8 : Garantie */}
			<h2>Article 8 : Garantie</h2>
			<p>
				Les produits vendus sur le site bénéficient de la garantie légale de conformité prévue aux articles L217-4 et suivants du Code de la Consommation ainsi que de la garantie contre les vices cachés prévue aux articles 1641 et suivants du Code Civil. En cas de produit défectueux ou non conforme, le client doit contacter Félix Junot Céramique dans les meilleurs délais pour convenir des modalités de retour et de remplacement ou de remboursement.
			</p>

			{/* Article 9 : Responsabilité */}
			<h2>Article 9 : Responsabilité</h2>
			<p>
				L'artiste s’engage à fournir un produit conforme à la description sur le site. Cependant, Félix Junot Céramique ne pourra être tenu responsable des variations de couleur ou de texture inhérentes à la fabrication artisanale des pièces en céramique. De plus, la responsabilité de Félix Junot Céramique ne pourra être engagée pour tous les inconvénients ou dommages inhérents à l'utilisation du réseau internet, notamment une rupture du service, une intrusion extérieure ou la présence de virus informatiques.
			</p>

			{/* Article 10 : Données Personnelles */}
			<h2>Article 10 : Données Personnelles</h2>
			<p>
				Les informations recueillies sur le site sont nécessaires pour le traitement des commandes. Elles sont confidentielles et traitées dans le respect de la législation en vigueur relative à la protection des données personnelles. Le client dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles en contactant Félix Junot Céramique. Voir la politique de confidentialité : <a href={`${realUrl}/privacy-policy`}>{textUrl}/privacy-policy</a>
			</p>

			{/* Article 11 : Propriété Intellectuelle */}
			<h2>Article 11 : Propriété Intellectuelle</h2>
			<p>
				Tous les éléments du site <a href={realUrl}>{textUrl}</a> sont et restent la propriété intellectuelle et exclusive de Félix Junot Céramique. Nul n'est autorisé à reproduire, exploiter, rediffuser ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site qu'ils soient logiciels, visuels ou sonores.
			</p>

			{/* Article 12 : Droit Applicable et Juridiction Compétente */}
			<h2>Article 12 : Droit Applicable et Juridiction Compétente</h2>
			<p>
				Les présentes CGV sont soumises au droit français. En cas de litige ou de réclamation, le client s'adressera en priorité à Félix Junot Céramique pour obtenir une solution amiable. À défaut, le litige sera porté devant les tribunaux compétents.
			</p>

			{/* Article 13 : Informations précontractuelles */}
			<h2>Article 13 : Informations précontractuelles</h2>
			<p>
				En validant la commande, l'acheteur reconnaît avoir pris connaissance des présentes CGV et les accepter sans réserve. L’acheteur reconnaît également que les œuvres commandées peuvent être des produits personnalisés ou réalisés sur mesure et ne peuvent donc pas être retournées dans le cadre du droit de rétractation.
			</p>
		</div>
	);
};

export default Cgv; // Exportation du composant CGV pour être utilisé dans d'autres parties de l'application
