import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import registerApi from '../services/Register.api';

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		prenom: '',
		nom: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [error, setError] = useState('');
	const [isRegistered, setIsRegistered] = useState(false);

	// Gérer les changements dans le formulaire
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Gérer la soumission du formulaire
	const handleSubmit = async (event) => {
		event.preventDefault();

		const { prenom, nom, email, password, confirmPassword } = formData;

		// Vérifier si les mots de passe correspondent
		if (password !== confirmPassword) {
			setError('Les mots de passe ne correspondent pas.');
			return;
		}

		try {
			setError(''); // Réinitialiser l'erreur
			console.log('Tentative d\'inscription avec les données :', formData);

			// Appel à l'API pour l'inscription
			await registerApi.register({ prenom, nom, email, password });

			// Si l'inscription réussit, on affiche le message de confirmation
			setIsRegistered(true);
		} catch (err) {
			console.error('Erreur lors de l\'inscription :', err);
			// Gestion des erreurs API
			setError(err.response?.data?.message || 'Une erreur s\'est produite pendant l\'inscription.');
		}
	};

	// Si l'inscription est réussie, afficher un message de confirmation
	if (isRegistered) {
		return (
			<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
				<Alert variant="success" className="text-center">
					Inscription réussie ! Un e-mail de confirmation vous a été envoyé. Veuillez vérifier votre boîte de réception pour activer votre compte.
				</Alert>
			</Container>
		);
	}

	return (
		<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
			<div className="w-100" style={{ maxWidth: '400px' }}>
				<Form onSubmit={handleSubmit}>
					{/* Affichage des erreurs */}
					{error && <Alert variant="danger">{error}</Alert>}

					{/* Prénom */}
					<Form.Group className="mb-3" controlId="prenom">
						<Form.Label>Prénom</Form.Label>
						<Form.Control
							type="text"
							name="prenom"
							placeholder="Prénom"
							value={formData.prenom}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					{/* Nom */}
					<Form.Group className="mb-3" controlId="nom">
						<Form.Label>Nom</Form.Label>
						<Form.Control
							type="text"
							name="nom"
							placeholder="Nom"
							value={formData.nom}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					{/* Email */}
					<Form.Group className="mb-3" controlId="email">
						<Form.Label>Adresse Email</Form.Label>
						<Form.Control
							type="email"
							name="email"
							placeholder="exemple@gmail.com"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					{/* Mot de passe */}
					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Mot de passe</Form.Label>
						<Form.Control
							type="password"
							name="password"
							placeholder="Mot de passe"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					{/* Confirmation du mot de passe */}
					<Form.Group className="mb-3" controlId="confirmPassword">
						<Form.Label>Confirmer le Mot de passe</Form.Label>
						<Form.Control
							type="password"
							name="confirmPassword"
							placeholder="Confirmer le Mot de passe"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					{/* Bouton d'inscription */}
					<Button className="btn-dark d-flex mx-auto" type="submit">
						S'inscrire
					</Button>
				</Form>
			</div>
		</Container>
	);
};

export default RegisterForm;
