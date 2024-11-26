import React, { useState } from "react"; // Importation de React et du hook useState pour gérer l'état du composant
import { Form, Button, Container } from "react-bootstrap"; // Importation des composants de React Bootstrap pour construire le formulaire
import forgotPasswordApi from "../services/ForgotPassword.api"; // Importation du service API pour la gestion des mots de passe oubliés
import { useLocation, useNavigate } from "react-router-dom"; // Importation des hooks pour la navigation et les informations de l'URL

// Composant principal pour le formulaire de réinitialisation du mot de passe
const NewPasswordForm = () => {
	const location = useLocation(); // Utilisation du hook pour obtenir les paramètres de l'URL
	const navigate = useNavigate(); // Utilisation du hook pour la redirection après la réinitialisation
	const queryParams = new URLSearchParams(location.search); // Extraction des paramètres de requête de l'URL
	const token = queryParams.get("token"); // Récupération du token de réinitialisation du mot de passe

	// Initialisation de l'état des champs du formulaire
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});

	const [passwordError, setPasswordError] = useState(""); // État pour les erreurs de correspondance des mots de passe
	const [passwordCriteria, setPasswordCriteria] = useState({
		length: false,
		uppercase: false,
		lowercase: false,
		digit: false,
		specialChar: false,
	}); // État pour les critères de validation du mot de passe

	const [isSubmitted, setIsSubmitted] = useState(false); // État pour vérifier si le formulaire a été soumis

	// Validation des critères du mot de passe (longueur, majuscule, etc.)
	const validatePasswordCriteria = (password) => {
		setPasswordCriteria({
			length: password.length >= 12,
			uppercase: /[A-Z]/.test(password),
			lowercase: /[a-z]/.test(password),
			digit: /[0-9]/.test(password),
			specialChar: /[\W]/.test(password),
		});
	};

	// Validation des mots de passe pour vérifier qu'ils correspondent
	const validatePasswords = (password, confirmPassword) => {
		if (!password || !confirmPassword) {
			setPasswordError("Les deux champs doivent être remplis."); // Si l'un des deux champs est vide
		} else if (password !== confirmPassword) {
			setPasswordError("Les mots de passe ne correspondent pas."); // Si les mots de passe ne correspondent pas
		} else {
			setPasswordError(""); // Aucun problème, pas d'erreur à afficher
		}
	};

	// Gestion du changement des champs de formulaire
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Validation des mots de passe si les champs concernés changent
		if (name === "password" || name === "confirmPassword") {
			validatePasswords(
				name === "password" ? value : formData.password,
				name === "confirmPassword" ? value : formData.confirmPassword
			);
		}

		// Validation des critères du mot de passe lors de la modification
		if (name === "password") {
			validatePasswordCriteria(value);
		}
	};

	// Gestion de la soumission du formulaire
	const handleSubmit = async (event) => {
		event.preventDefault(); // Empêche la page de se recharger
		if (passwordError) return; // Empêche la soumission s'il y a une erreur

		try {
			// Appel à l'API pour réinitialiser le mot de passe
			await forgotPasswordApi.passwordReset(token, formData.password);
			setIsSubmitted(true); // Indique que la soumission a été effectuée

			// Redirection vers la page de connexion après 5 secondes
			setTimeout(() => {
				navigate("/login"); // Remplacer "/login" par la route vers la page de connexion appropriée
			}, 5000);
		} catch (err) {
			console.error("Erreur lors de la réinitialisation : ", err); // Affichage de l'erreur en cas d'échec
		}
	};

	// Vérifie si le formulaire est valide avant d'autoriser la soumission
	const isFormValid =
		Object.values(passwordCriteria).every(Boolean) && // Vérifie que tous les critères du mot de passe sont remplis
		!passwordError && // Vérifie qu'il n'y a pas d'erreur de mot de passe
		formData.password && // Vérifie que le mot de passe est renseigné
		formData.confirmPassword; // Vérifie que la confirmation est renseignée

	// Affiche un message de succès si la soumission a réussi
	if (isSubmitted) {
		return (
			<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
				<div className="alert alert-success text-center">
					Votre mot de passe a été réinitialisé avec succès !
				</div>
			</Container>
		);
	}

	// Formulaire de réinitialisation du mot de passe
	return (
		<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<h1 className="text-center">Réinitialisation du mot de passe</h1>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Nouveau mot de passe</Form.Label>
						<Form.Control
							type="password"
							name="password"
							placeholder="Entrez votre nouveau mot de passe"
							value={formData.password}
							onChange={handleChange} // Appelle handleChange à chaque changement de valeur
							required
						/>
						{/* Affiche les critères de validation du mot de passe */}
						<ul>
							<li style={{ color: passwordCriteria.length ? "green" : "red" }}>Au moins 12 caractères</li>
							<li style={{ color: passwordCriteria.uppercase ? "green" : "red" }}>Une lettre majuscule</li>
							<li style={{ color: passwordCriteria.lowercase ? "green" : "red" }}>Une lettre minuscule</li>
							<li style={{ color: passwordCriteria.digit ? "green" : "red" }}>Un chiffre</li>
							<li style={{ color: passwordCriteria.specialChar ? "green" : "red" }}>Un caractère spécial</li>
						</ul>
					</Form.Group>

					<Form.Group className="mb-3" controlId="confirmPassword">
						<Form.Label>Confirmez le mot de passe</Form.Label>
						<Form.Control
							type="password"
							name="confirmPassword"
							placeholder="Confirmez votre mot de passe"
							value={formData.confirmPassword}
							onChange={handleChange} // Appelle handleChange à chaque changement de valeur
							required
						/>
						{/* Affichage des erreurs de correspondance des mots de passe */}
						<ul>
							<li style={{ color: passwordError ? "red" : "green" }}>
								{passwordError || "Les mots de passe correspondent."}
							</li>
						</ul>
					</Form.Group>

					{/* Bouton de soumission, désactivé si le formulaire n'est pas valide */}
					<Button type="submit" className="btn-dark w-100" disabled={!isFormValid}>
						Réinitialiser le mot de passe
					</Button>
				</Form>
			</div>
		</Container>
	);
};

export default NewPasswordForm;
