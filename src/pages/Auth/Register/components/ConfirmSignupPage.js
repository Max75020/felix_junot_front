import React, { useEffect, useState } from 'react'; // Importation de React, des hooks useEffect et useState
import { useSearchParams } from 'react-router-dom'; // Importation du hook useSearchParams pour accéder aux paramètres de l'URL
import { Alert, Container, Spinner } from 'react-bootstrap'; // Importation des composants de React Bootstrap pour l'interface utilisateur

// Composant principal pour la page de confirmation de l'inscription
const ConfirmSignupPage = () => {
	// Utilisation du hook useSearchParams pour accéder aux paramètres de l'URL (ici, le token de confirmation)
	const [searchParams] = useSearchParams();

	// Déclaration de l'état pour suivre le statut de la validation du compte ("loading", "success", "error")
	const [status, setStatus] = useState('loading');

	// Utilisation du hook useEffect pour effectuer un appel d'API à la première charge du composant
	useEffect(() => {
		// Récupération du token depuis les paramètres de l'URL
		const token = searchParams.get('token');
		console.log(token); // Affichage du token pour débogage

		if (token) {
			// Appel de l'API pour valider le token d'inscription
			fetch(`${process.env.REACT_APP_API_URL}api/confirm-signup?token=${token}`, {
				method: 'GET',
			})
				.then((response) => {
					// Si la réponse est positive, on change le statut à "success"
					if (response.ok) {
						setStatus('success');
					} else {
						// Sinon, on change le statut à "error" en cas de réponse négative
						setStatus('error');
					}
				})
				.catch(() => setStatus('error')); // Gestion des erreurs lors de l'appel de l'API
		} else {
			// Si aucun token n'est présent dans l'URL, on considère qu'il y a une erreur
			setStatus('error');
		}
	}, [searchParams]); // Le hook se déclenche à chaque fois que searchParams change

	// Affichage d'un spinner (chargement) tant que le statut est en "loading"
	if (status === 'loading') {
		return (
			<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
				<Spinner animation="border" /> {/* Affiche une animation de chargement */}
			</Container>
		);
	}

	// Affichage du message de succès ou d'erreur en fonction du statut de l'inscription
	return (
		<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
			{status === 'success' ? (
				<Alert variant="success" className="text-center">
					{/* Message de confirmation du compte si l'opération est réussie */}
					Votre compte a été confirmé avec succès ! Vous pouvez maintenant vous connecter.
				</Alert>
			) : (
				<Alert variant="danger" className="text-center">
					{/* Message d'erreur si le lien est invalide ou si une erreur est survenue */}
					Une erreur est survenue lors de la confirmation de votre compte. Le lien est peut-être expiré ou invalide.
				</Alert>
			)}
		</Container>
	);
};

export default ConfirmSignupPage; // Exportation du composant ConfirmSignupPage pour être utilisé ailleurs dans l'application
