import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';


const toastManager = {
	showSuccess: () => { }, // Fonction placeholder pour afficher des messages de succès
	showError: () => { }, // Fonction placeholder pour afficher des messages d'erreur
	showInfo: () => { }, // Fonction placeholder pour afficher des messages d'information
	showWarning: () => { }, // Fonction placeholder pour afficher des messages d'avertissement
};

const PopupService = () => {
	const [toasts, setToasts] = useState([]); // État pour gérer la liste des toasts actifs

	// Fonction pour ajouter un toast avec un paramètre de délai optionnel
	const addToast = (message, type = 'info', title = 'Notification', delay = 5000) => {
		const id = new Date().getTime(); // ID unique pour chaque toast, basé sur l'horodatage actuel
		setToasts([...toasts, { id, message, type, title, delay }]); // Ajoute le nouveau toast à la liste existante des toasts
	};

	// Initialiser les fonctions du gestionnaire de toasts avec un délai optionnel
	toastManager.showSuccess = (message, delay) => addToast(message, 'success', 'Succès', delay); // Fonction pour afficher un toast de succès
	toastManager.showError = (message, delay) => addToast(message, 'danger', 'Erreur', delay); // Fonction pour afficher un toast d'erreur
	toastManager.showInfo = (message, delay) => addToast(message, 'info', 'Info', delay); // Fonction pour afficher un toast d'information
	toastManager.showWarning = (message, delay) => addToast(message, 'warning', 'Avertissement', delay); // Fonction pour afficher un toast d'avertissement

	return (
		<ToastContainer position="bottom-end" className="p-3">
			{/* Itérer sur chaque toast et le rendre */}
			{toasts.map((toast) => (
				<Toast
					key={toast.id} // Clé unique pour chaque composant toast
					onClose={() =>
						// Retirer le toast de l'état lorsqu'il est fermé
						setToasts((currentToasts) =>
							currentToasts.filter((t) => t.id !== toast.id) // Filtrer le toast qui a été fermé
						)
					}
					delay={toast.delay} // Délai personnalisé pour la durée d'affichage du toast
					autohide // Cache automatiquement le toast après le délai spécifié
					className={`d-inline-block m-1 toast-${toast.type}`} // Appliquer une classe en fonction du type de toast (succès, erreur, etc.)
				>
					<Toast.Header>
						{/* Image placeholder pour l'en-tête du toast */}
						<img
							src="https://via.placeholder.com/20"
							className="rounded me-2"
							alt=""
						/>
						<strong className="me-auto">{toast.title}</strong> {/* Titre du toast, par exemple "Succès", "Erreur" */}
						<small>À l'instant</small> {/* Horodatage ou indication du moment où le toast est apparu */}
					</Toast.Header>
					<Toast.Body>
						{toast.message} {/* Contenu du message du toast */}
					</Toast.Body>
				</Toast>
			))}
		</ToastContainer>
	);
};

// Exporter les fonctions du gestionnaire de toasts avec un paramètre de délai optionnel
export const showSuccess = (message, delay) => toastManager.showSuccess(message, delay); // Fonction pour afficher un toast de succès avec un délai optionnel
export const showError = (message, delay) => toastManager.showError(message, delay); // Fonction pour afficher un toast d'erreur avec un délai optionnel
export const showInfo = (message, delay) => toastManager.showInfo(message, delay); // Fonction pour afficher un toast d'information avec un délai optionnel
export const showWarning = (message, delay) => toastManager.showWarning(message, delay); // Fonction pour afficher un toast d'avertissement avec un délai optionnel

export default PopupService;