import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import forgotPasswordApi from "../services/ForgotPassword.api";
import { useLocation, useNavigate } from "react-router-dom";

const NewPasswordForm = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const token = queryParams.get("token");

	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});

	const [passwordError, setPasswordError] = useState("");
	const [passwordCriteria, setPasswordCriteria] = useState({
		length: false,
		uppercase: false,
		lowercase: false,
		digit: false,
		specialChar: false,
	});

	const [isSubmitted, setIsSubmitted] = useState(false);

	// Validation des critères du mot de passe
	const validatePasswordCriteria = (password) => {
		setPasswordCriteria({
			length: password.length >= 12,
			uppercase: /[A-Z]/.test(password),
			lowercase: /[a-z]/.test(password),
			digit: /[0-9]/.test(password),
			specialChar: /[\W]/.test(password),
		});
	};

	// Validation des mots de passe
	const validatePasswords = (password, confirmPassword) => {
		if (!password || !confirmPassword) {
			setPasswordError("Les deux champs doivent être remplis.");
		} else if (password !== confirmPassword) {
			setPasswordError("Les mots de passe ne correspondent pas.");
		} else {
			setPasswordError("");
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		if (name === "password" || name === "confirmPassword") {
			validatePasswords(
				name === "password" ? value : formData.password,
				name === "confirmPassword" ? value : formData.confirmPassword
			);
		}

		if (name === "password") {
			validatePasswordCriteria(value);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (passwordError) return;

		try {
			await forgotPasswordApi.passwordReset(token, formData.password);
			setIsSubmitted(true);

			// Redirection vers la page de connexion après 2 secondes
			setTimeout(() => {
				navigate("/login"); // Remplacez "/login" par la route de votre page de connexion
			}, 5000);
		} catch (err) {
			console.error("Erreur lors de la réinitialisation : ", err);
		}
	};

	const isFormValid =
		Object.values(passwordCriteria).every(Boolean) &&
		!passwordError &&
		formData.password &&
		formData.confirmPassword;

	if (isSubmitted) {
		return (
			<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
				<div className="alert alert-success text-center">
					Votre mot de passe a été réinitialisé avec succès !
				</div>
			</Container>
		);
	}

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
							onChange={handleChange}
							required
						/>
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
							onChange={handleChange}
							required
						/>
						{/* Affichage des erreurs de correspondance des mots de passe */}
						<ul>
							<li style={{ color: passwordError ? "red" : "green" }}>
								{passwordError || "Les mots de passe correspondent."}
							</li>
						</ul>
					</Form.Group>

					<Button type="submit" className="btn-dark w-100" disabled={!isFormValid}>
						Réinitialiser le mot de passe
					</Button>
				</Form>
			</div>
		</Container>
	);
};

export default NewPasswordForm;
