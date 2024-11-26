import React, { useState } from "react"; // Importation de React et du hook useState pour gérer l'état du composant
import { Form, Button, Container, Alert } from "react-bootstrap"; // Importation des composants React Bootstrap pour construire le formulaire
import registerApi from "../services/Register.api"; // Importation du service d'API pour l'inscription

// Composant principal pour le formulaire d'inscription
const RegisterForm = () => {
	// Déclaration des états pour stocker les données du formulaire
	const [formData, setFormData] = useState({
		prenom: "", // Prénom
		nom: "", // Nom
		email: "", // Adresse email
		password: "", // Mot de passe
		confirmPassword: "", // Confirmation du mot de passe
	});

	// État pour gérer les erreurs d'inscription
	const [error, setError] = useState("");

	// État pour savoir si l'inscription a réussi
	const [isRegistered, setIsRegistered] = useState(false);

	// État pour stocker les erreurs de validation des mots de passe
	const [passwordError, setPasswordError] = useState("");

	// État pour suivre les critères de validation du mot de passe
	const [passwordCriteria, setPasswordCriteria] = useState({
		length: false, // Longueur du mot de passe
		uppercase: false, // Présence d'une lettre majuscule
		lowercase: false, // Présence d'une lettre minuscule
		digit: false, // Présence d'un chiffre
		specialChar: false, // Présence d'un caractère spécial
	});

	// Fonction pour valider les mots de passe et vérifier s'ils correspondent
	const validatePasswords = (password, confirmPassword) => {
		// Vérifie si les champs de mot de passe et de confirmation sont remplis
		if (!password || !confirmPassword) {
			setPasswordError("Les deux champs doivent être remplis.");
		} else if (password !== confirmPassword) {
			// Vérifie si les mots de passe correspondent
			setPasswordError("Les mots de passe ne correspondent pas.");
		} else {
			// Si tout est bon, aucune erreur
			setPasswordError("");
		}
	};

	// Fonction pour valider les critères du mot de passe (longueur, majuscule, etc.)
	const validatePasswordCriteria = (password) => {
		setPasswordCriteria({
			length: password.length >= 12, // Vérifie que le mot de passe contient au moins 12 caractères
			uppercase: /[A-Z]/.test(password), // Vérifie la présence d'une lettre majuscule
			lowercase: /[a-z]/.test(password), // Vérifie la présence d'une lettre minuscule
			digit: /[0-9]/.test(password), // Vérifie la présence d'un chiffre
			specialChar: /[\W]/.test(password), // Vérifie la présence d'un caractère spécial
		});
	};

	// Gérer les changements dans les champs du formulaire
	const handleChange = (e) => {
		const { name, value } = e.target;
		// Met à jour les valeurs des champs du formulaire
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Valide les mots de passe et leurs critères à chaque modification
		if (name === "password" || name === "confirmPassword") {
			validatePasswords(
				name === "password" ? value : formData.password, 
				name === "confirmPassword" ? value : formData.confirmPassword
			);
		}
		// Si le champ modifié est le mot de passe, on vérifie les critères de sécurité
		if (name === "password") {
			validatePasswordCriteria(value);
		}
	};

	// Gérer la soumission du formulaire
	const handleSubmit = async (event) => {
		event.preventDefault(); // Empêche le rechargement de la page

		const { prenom, nom, email, password, confirmPassword } = formData;

		// Vérifier si les mots de passe correspondent avant de soumettre
		if (password !== confirmPassword) {
			setError("Les mots de passe ne correspondent pas.");
			return;
		}

		try {
			setError(""); // Réinitialiser l'erreur
			console.log("Tentative d'inscription avec les données : ", formData);

			// Appel à l'API pour l'inscription
			await registerApi.register({ prenom, nom, email, password });

			// Si l'inscription réussit, on affiche le message de confirmation
			setIsRegistered(true);
		} catch (err) {
			console.error("Erreur lors de l'inscription : ", err);
			// Gestion des erreurs API
			const violations = err.response?.data?.violations;
			if (violations) {
				// Récupère et affiche les messages d'erreur provenant des violations de l'API
				const messages = violations.map((violation) => `${violation.propertyPath}: ${violation.message}`).join("\n");
				setError(messages);
			} else {
				// Affiche une erreur générique si aucune information spécifique n'est disponible
				setError("Une erreur s'est produite pendant l'inscription.");
			}
		}
	};

	// Si l'inscription est réussie, afficher un message de confirmation
	if (isRegistered) {
		return (
			<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
				<Alert variant="success" className="text-center">
					Inscription réussie ! Un e-mail de confirmation vous a été envoyé. Veuillez vérifier votre boîte de réception pour activer votre compte.
				</Alert>
			</Container>
		);
	}

	// Vérification que tous les champs sont remplis et valides pour activer le bouton
	const isFormValid =
		Object.values(passwordCriteria).every(Boolean) && // Vérifie que tous les critères de mot de passe sont remplis
		!passwordError && // Vérifie qu'il n'y a pas d'erreur de mot de passe
		Object.values(formData).every((value) => value.trim() !== ""); // Vérifie que tous les champs du formulaire sont remplis

	// Formulaire d'inscription
	return (
		<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Form onSubmit={handleSubmit}>
					{/* Affichage des erreurs */}
					{error && <Alert variant="danger">{error}</Alert>}

					{/* Prénom */}
					<Form.Group className="mb-3" controlId="prenom">
						<Form.Label>Prénom</Form.Label>
						<Form.Control
							type="text"
							name="prenom" // Prénom
							placeholder="Prénom" // Indication du champ à l'utilisateur
							value={formData.prenom} // Valeur du champ prénom
							onChange={handleChange} // Mise à jour de l'état à chaque changement
							required // Champ Prénom obligatoire
						/>
					</Form.Group>

					{/* Nom */}
					<Form.Group className="mb-3" controlId="nom">
						<Form.Label>Nom</Form.Label>
						<Form.Control
							type="text"
							name="nom" // Nom
							placeholder="Nom" // Indication du champ à l'utilisateur
							value={formData.nom} // Valeur du champ nom
							onChange={handleChange} // Mise à jour de l'état à chaque changement
							required // Champ Nom obligatoire
						/>
					</Form.Group>

					{/* Email */}
					<Form.Group className="mb-3" controlId="email">
						<Form.Label>Adresse Email</Form.Label>
						<Form.Control
							type="email"
							name="email" // Email
							placeholder="exemple@gmail.com" // Indication du champ à l'utilisateur
							value={formData.email} // Valeur du champ email
							onChange={handleChange} // Mise à jour de l'état à chaque changement
							required // Champ Email obligatoire
						/>
					</Form.Group>

					{/* Mot de passe */}
					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Mot de passe</Form.Label>
						<Form.Control
							type="password"
							name="password" // Mot de passe 
							placeholder="Mot de passe" // Indication du champ à l'utilisateur
							value={formData.password} // Valeur du champ mot de passe
							onChange={handleChange} // Mise à jour de l'état à chaque changement
							required // Champ Mot de passe obligatoire
						/>
						{/* Affichage des critères de validation du mot de passe */}
						<ul>
							{/* Vérification d'un mot de passe d'au moins 12 caractères */}
							<li style={{ color: passwordCriteria.length ? "green" : "red" }}>
								Au moins 12 caractères
							</li>
							{/* Vérification de la présence d'une lettre majuscule */}
							<li style={{ color: passwordCriteria.uppercase ? "green" : "red" }}>
								Une lettre majuscule
							</li>
							{/* Vérification de la présence d'une lettre minuscule */}
							<li style={{ color: passwordCriteria.lowercase ? "green" : "red" }}>
								Une lettre minuscule
							</li>
							{/* Vérification de la présence d'un chiffre */}
							<li style={{ color: passwordCriteria.digit ? "green" : "red" }}>
								Un chiffre
							</li>
							{/* Vérification de la présence d'un caractère spécial */}
							<li style={{ color: passwordCriteria.specialChar ? "green" : "red" }}>
								Un caractère spécial
							</li>
						</ul>
					</Form.Group>

					{/* Confirmation du mot de passe */}
					<Form.Group className="mb-3" controlId="confirmPassword">
						<Form.Label>Confirmer le Mot de passe</Form.Label>
						<Form.Control
							type="password"
							name="confirmPassword" // Confirmation du mot de passe
							placeholder="Confirmer le Mot de passe" // Indication du champ à l'utilisateur
							value={formData.confirmPassword} // Valeur du champ confirmation du mot de passe
							onChange={handleChange} // Mise à jour de l'état à chaque changement
							required // Champ Confirmation du mot de passe obligatoire
						/>
						{/* Affichage des erreurs de correspondance des mots de passe */}
						<ul>
							<li style={{ color: passwordError ? "red" : "green" }}>
								{passwordError || "Les mots de passe correspondent."}
							</li>
						</ul>
					</Form.Group>

					{/* Bouton d'inscription */}
					<Button className="btn-dark d-flex mx-auto" type="submit" disabled={!isFormValid}>
						S'inscrire
					</Button>
				</Form>
			</div>
		</Container>
	);
};

export default RegisterForm; // Exportation du composant RegisterForm pour être utilisé dans l'application
