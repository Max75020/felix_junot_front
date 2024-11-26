import React, { useState, useContext } from 'react'; // Importation de React, des hooks useState et useContext
import { Form, Button, Container } from 'react-bootstrap'; // Importation des composants de React Bootstrap pour construire le formulaire
import { Navigate } from 'react-router-dom'; // Importation pour la redirection après authentification
import { UserContext } from '../../../../context/UserContext'; // Importation du contexte utilisateur
import { routes } from '../../../../routes/AppRouter'; // Importation des routes pour la navigation
import { showSuccess, showError } from '../../../../services/popupService'; // Importation des services de popup pour afficher les messages de succès et d'erreur

// Composant principal pour le formulaire de connexion
const LoginForm = () => {
	const [email, setEmail] = useState(''); // État pour stocker l'adresse email saisie par l'utilisateur
	const [password, setPassword] = useState(''); // État pour stocker le mot de passe saisi par l'utilisateur
	const [isAuthenticated, setIsAuthenticated] = useState(false); // État pour vérifier si l'utilisateur est authentifié

	const { login, user } = useContext(UserContext); // Accéder à la fonction login et à l'objet utilisateur via le contexte UserContext

	// Fonction pour gérer la soumission du formulaire
	const handleSubmit = async (event) => {
		event.preventDefault(); // Empêche la page de se recharger lors de la soumission du formulaire

		try {
			// Appel de la méthode login depuis le contexte avec les informations de connexion
			await login(email, password);

			// Si l'utilisateur est connecté, vérifie la présence du token dans le localStorage
			if (localStorage.getItem('token')) {
				setIsAuthenticated(true); // Met à jour l'état d'authentification à vrai
				showSuccess("Connexion réussie"); // Afficher la notification de succès
			}
		} catch (error) {
			// En cas d'erreur, affiche une erreur dans la console et un message d'erreur à l'utilisateur
			console.error('Login failed:', error);
			showError('Identifiants incorrects. Veuillez réessayer.'); // Afficher une notification d'erreur
		}
	};

	// Si l'utilisateur est authentifié ou si l'objet utilisateur est défini, redirige vers la page des catégories
	if (isAuthenticated || user) {
		return <Navigate to={routes.CATEGORIES.INDEX} />; // Redirige vers la page souhaitée après connexion
	}

	// Formulaire de connexion pour l'utilisateur
	return (
		<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
			<div className="w-100" style={{ maxWidth: '400px' }}>
				<Form onSubmit={handleSubmit}>
					{/* Champ pour saisir l'adresse email */}
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Adresse Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="exemple@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)} // Met à jour l'état avec l'email saisi
							required // Le champ est requis
						/>
					</Form.Group>

					{/* Champ pour saisir le mot de passe */}
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Mot de passe</Form.Label>
						<Form.Control
							type="password"
							placeholder="Mot de passe"
							value={password}
							onChange={(e) => setPassword(e.target.value)} // Met à jour l'état avec le mot de passe saisi
							required // Le champ est requis
						/>
						{/* Lien pour mot de passe oublié */}
						<Form.Text className="text-muted ms-3">
							<a className='color-link-hover text-dark text-decoration-none' href={routes.AUTH.FORGOT_PASSWORD}>
								Mot de passe oublié
							</a>
						</Form.Text>
					</Form.Group>

					{/* Bouton pour se connecter */}
					<Button className='d-flex mx-auto btn-dark col-12 text-align-center justify-content-center' type="submit">
						Se connecter
					</Button>

					{/* Texte et lien pour créer un compte si l'utilisateur n'en a pas */}
					<Form.Text className="text-muted d-flex flex-column align-items-center">
						<p className='m-0'>Vous n'avez pas de compte ?</p>
						<a className='color-link-hover text-dark text-decoration-none' href={routes.AUTH.REGISTER}>
							Créer son compte
						</a>
					</Form.Text>
				</Form>
			</div>
		</Container>
	);
};

export default LoginForm; // Exportation du composant LoginForm pour être utilisé dans d'autres parties de l'application
