import React from "react";
import "../../assets/styles/Contact/ContactForm.css";

const ContactForm = () => {
	return (
		<div className="contact-form-container">
			<div className="contact-header">
				<h2>CONTACTEZ MOI</h2>
			</div>
			<form className="contact-form">
				<div className="column-container">
					<div className="prenom-container">
						<label htmlFor="prenom">Prénom :</label>
						<input id="prenom" type="text" placeholder="Prénom" />
					</div>
					<div className="nom-container">
						<label htmlFor="nom">Nom :</label>
						<input id="nom" type="text" placeholder="Nom" />
					</div>
				</div>
				<div className="column-container">
					<div className="email-container">
						<label htmlFor="email">Adresse Email :</label>
						<input id="email" type="email" placeholder="Adresse Email" />
					</div>
					<div className="sujet-container">
						<label htmlFor="sujet">Sujet :</label>
						<input id="sujet" type="text" placeholder="Sujet" />
					</div>
				</div>
				<div className="message-container full-width">
					<label htmlFor="message">Message :</label>
					<textarea id="message" className="min-vh-25" placeholder="Message" />
				</div>
				<div className="button-container">
					<button className="btn btn-primary col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-2-xxl" type="submit">ENVOYER</button>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
