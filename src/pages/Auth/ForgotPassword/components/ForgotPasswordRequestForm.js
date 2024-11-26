import React, { useState } from 'react'; // Importation de React et du hook useState pour gérer l'état du composant
import { Form, Button, Container } from 'react-bootstrap'; // Importation des composants de React Bootstrap pour construire le formulaire
import forgotPasswordApi from '../services/ForgotPassword.api'; // Importation du service API pour gérer la demande de réinitialisation de mot de passe
import { showSuccess } from '../../../../services/popupService'; // Importation de la fonction pour afficher une popup de succès

// Composant principal pour le formulaire de demande de réinitialisation de mot de passe
const ForgotPasswordForm = () => {
	const [email, setEmail] = useState(''); // État pour stocker l'adresse email de l'utilisateur
	const [error, setError] = useState(''); // État pour stocker un message d'erreur si la demande échoue
	// eslint-disable-next-line no-unused-vars
	const [successMessage, setSuccessMessage] = useState(''); // État pour stocker un message de succès (non utilisé ici)

	// Fonction pour gérer la soumission du formulaire
	const handleSubmit = async (event) => {
		event.preventDefault(); // Empêche la page de se recharger lors de la soumission du formulaire
		try {
			// Appel à l'API pour envoyer un email de réinitialisation de mot de passe
			await forgotPasswordApi.passwordResetRequest({ email });
			// Affiche une notification de succès si la demande est effectuée correctement
			showSuccess('Un email de réinitialisation a été envoyé à l\'adresse indiquée.');
		} catch (error) {
			// En cas d'erreur, affiche un message d'erreur dans la console et met à jour l'état de l'erreur
			console.error('Erreur lors de la demande de réinitialisation:', error);
			setError('Erreur lors de la demande de réinitialisation du mot de passe.');
		}
	};

	return (
		// Conteneur principal pour centrer le formulaire à l'écran
		<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
			<div className="w-100" style={{ maxWidth: '400px' }}>
				<Form onSubmit={handleSubmit}>
					{/* Affiche un message d'erreur si une erreur est présente */}
					{error && <div className="alert alert-danger">{error}</div>}
					{/* Affiche un message de succès si un message est défini */}
					{successMessage && <div className="alert alert-success">{successMessage}</div>}

					{/* Champ pour l'adresse email */}
					<Form.Group className="mb-3" controlId="email">
						<Form.Label>Adresse Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="exemple@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)} // Met à jour l'état de l'email lors de chaque changement
							required // Champ requis pour la validation du formulaire
						/>
					</Form.Group>

					{/* Bouton pour envoyer la demande de réinitialisation */}
					<Button className='d-flex mx-auto btn-dark' variant="primary" type="submit">
						Envoyer la demande de réinitialisation
					</Button>
				</Form>
			</div>
		</Container>
	);
};

export default ForgotPasswordForm;
