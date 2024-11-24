import React, { useState } from "react";
import "../../assets/styles/Contact/ContactForm.css";

const ContactForm = () => {
	// État pour gérer les données du formulaire, initialisé avec des chaînes vides pour chaque champ
	const [formData, setFormData] = useState({
		prenom: "",
		nom: "",
		email: "",
		sujet: "",
		message: "",
	});

	// État pour gérer les erreurs de validation pour chaque champ du formulaire
	const [errors, setErrors] = useState({});
	// État pour gérer le message de statut pour la soumission du formulaire
	const [status, setStatus] = useState("");

	// Fonction pour valider les champs du formulaire avant la soumission
	const validate = () => {
		const newErrors = {};
		// Validation du champ prénom
		if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis.";
		// Validation du champ nom
		if (!formData.nom.trim()) newErrors.nom = "Le nom est requis.";
		// Validation du champ email
		if (!formData.email.trim()) {
			newErrors.email = "L'adresse email est requise.";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			// Vérifie si l'email a un format valide
			newErrors.email = "L'adresse email n'est pas valide.";
		}
		// Validation du champ sujet
		if (!formData.sujet.trim()) newErrors.sujet = "Le sujet est requis.";
		// Validation du champ message
		if (!formData.message.trim()) newErrors.message = "Le message est requis.";

		// Met à jour l'état des erreurs avec les erreurs de validation trouvées
		setErrors(newErrors);
		// Retourne true s'il n'y a pas d'erreurs, sinon false
		return Object.keys(newErrors).length === 0;
	};

	// Gère les changements dans les champs du formulaire
	const handleChange = (e) => {
		const { id, value } = e.target;
		// Met à jour l'état formData avec la nouvelle valeur du champ modifié
		setFormData({ ...formData, [id]: value });
	};

	// Gère la soumission du formulaire
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Valide les données du formulaire avant la soumission
		if (!validate()) {
			setStatus("Veuillez corriger les erreurs dans le formulaire.");
			return;
		}

		// Clé API et URL pour envoyer l'email en utilisant Brevo
		const apiKey = process.env.REACT_APP_BREVO_API_KEY;
		const apiUrl = "https://api.brevo.com/v3/smtp/email";

		// Construction des données de l'email pour la requête API
		const emailData = {
			sender: { name: `${formData.prenom} ${formData.nom}`, email: "no-reply@felixjunotceramique.fr" },
			to: [{ email: "felixjunot.ceramique@gmail.com", name: "Félix Junot Céramique" }],
			subject: formData.sujet,
			htmlContent:
				`
				<h1>Nouveau message de ${formData.prenom} ${formData.nom}</h1>
				<p>Email de l'utilisateur : ${formData.email}</p>
				<p>Message :</p>
				<p>${formData.message}</p>
			`,
			headers: {
				"Reply-To": formData.email,
			},
		};

		try {
			// Effectue une requête POST à l'API pour envoyer l'email
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"api-key": apiKey,
				},
				body: JSON.stringify(emailData),
			});

			// Vérifie si la réponse n'est pas réussie
			if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
			}

			// Si l'envoi est réussi, met à jour le statut et réinitialise les champs du formulaire
			setStatus("Message envoyé avec succès !");
			setFormData({ prenom: "", nom: "", email: "", sujet: "", message: "" });
			setErrors({});
		} catch (error) {
			// Log l'erreur et met à jour le message de statut avec les détails de l'erreur
			console.error("Erreur lors de l'envoi de l'email:", error);
			setStatus(`Erreur lors de l'envoi: ${error.message}`);
		}
	};

	return (
		<div className="contact-form-container">
			<div className="contact-header">
				<h2>CONTACTEZ MOI</h2>
			</div>
			<form className="contact-form" onSubmit={handleSubmit}>
				<div className="column-container">
					<div className="prenom-container">
						<label htmlFor="prenom">Prénom :</label>
						<input
							id="prenom"
							type="text"
							placeholder="Prénom"
							value={formData.prenom}
							onChange={handleChange}
						/>
						{errors.prenom && <p className="error-text centered-text">{errors.prenom}</p>}
					</div>
					<div className="nom-container">
						<label htmlFor="nom">Nom :</label>
						<input
							id="nom"
							type="text"
							placeholder="Nom"
							value={formData.nom}
							onChange={handleChange}
						/>
						{errors.nom && <p className="error-text centered-text">{errors.nom}</p>}
					</div>
				</div>
				<div className="column-container">
					<div className="email-container">
						<label htmlFor="email">Adresse Email :</label>
						<input
							id="email"
							type="email"
							placeholder="Adresse Email"
							value={formData.email}
							onChange={handleChange}
						/>
						{errors.email && <p className="error-text centered-text">{errors.email}</p>}
					</div>
					<div className="sujet-container">
						<label htmlFor="sujet">Sujet :</label>
						<input
							id="sujet"
							type="text"
							placeholder="Sujet"
							value={formData.sujet}
							onChange={handleChange}
						/>
						{errors.sujet && <p className="error-text centered-text">{errors.sujet}</p>}
					</div>
				</div>
				<div className="message-container full-width">
					<label htmlFor="message">Message :</label>
					<textarea
						id="message"
						className="min-vh-25"
						placeholder="Message"
						value={formData.message}
						onChange={handleChange}
					/>
					{errors.message && <p className="error-text centered-text">{errors.message}</p>}
				</div>
				<div className="button-container">
					<button
						className="btn btn-primary col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-2-xxl"
						type="submit"
					>
						ENVOYER
					</button>
				</div>
				{status && <p className={`centered-text ${status.includes("succès") ? "success-text" : "error-text"}`}>{status}</p>}
			</form>
		</div>
	);
};

export default ContactForm;