import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Container, Spinner } from 'react-bootstrap';

const ConfirmSignupPage = () => {
	// Utilisation du hook useSearchParams pour accéder aux paramètres de l'URL
	const [searchParams] = useSearchParams();
	// Déclaration de l'état pour suivre le statut de la validation du compte
	const [status, setStatus] = useState('loading'); // "loading", "success", "error"

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
						// Sinon, on change le statut à "error"
						setStatus('error');
					}
				})
				.catch(() => setStatus('error')); // Gestion des erreurs lors de l'appel de l'API
		} else {
			// Si aucun token n'est présent, on considère qu'il y a une erreur
			setStatus('error');
		}
	}, [searchParams]); // Le hook se déclenche à chaque changement de searchParams

	// Affichage d'un spinner tant que le statut est en "loading"
	if (status === 'loading') {
		return (
			<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
				<Spinner animation="border" />
			</Container>
		);
	}

	// Affichage du message de succès ou d'erreur en fonction du statut de l'inscription
	return (
		<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
			{status === 'success' ? (
				<Alert variant="success" className="text-center">
					Votre compte a été confirmé avec succès ! Vous pouvez maintenant vous connecter.
				</Alert>
			) : (
				<Alert variant="danger" className="text-center">
					Une erreur est survenue lors de la confirmation de votre compte. Le lien est peut-être expiré ou invalide.
				</Alert>
			)}
		</Container>
	);
};

export default ConfirmSignupPage;