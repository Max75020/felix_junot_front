import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Container, Spinner } from 'react-bootstrap';

const ConfirmSignupPage = () => {
	const [searchParams] = useSearchParams();
	const [status, setStatus] = useState('loading'); // "loading", "success", "error"

	useEffect(() => {
		const token = searchParams.get('token');
		console.log(token);

		if (token) {
			// Appel de l'API pour valider le token
			fetch(`${process.env.REACT_APP_API_URL}api/confirm-signup?token=${token}`, {
				method: 'GET',
			})
				.then((response) => {
					if (response.ok) {
						setStatus('success');
					} else {
						setStatus('error');
					}
				})
				.catch(() => setStatus('error'));
		} else {
			setStatus('error');
		}
	}, [searchParams]);

	if (status === 'loading') {
		return (
			<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
				<Spinner animation="border" />
			</Container>
		);
	}

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
