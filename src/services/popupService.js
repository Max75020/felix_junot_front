// Importation de React et des composants Toast et ToastContainer de React-Bootstrap
import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

// Gestionnaire de toasts : sert de point d'accès global pour afficher les notifications
const toastManager = {
	showSuccess: () => { }, // Fonction placeholder pour afficher des messages de succès
	showError: () => { }, // Fonction placeholder pour afficher des messages d'erreur
	showInfo: () => { }, // Fonction placeholder pour afficher des messages d'information
	showWarning: () => { }, // Fonction placeholder pour afficher des messages d'avertissement
};

// Composant PopupService : gère l'affichage des toasts dans l'application
const PopupService = () => {
	const [toasts, setToasts] = useState([]); // État pour stocker la liste des toasts actifs

	// Fonction pour ajouter un toast
	const addToast = (message, type = 'info', title = 'Notification', delay = 5000) => {
		const id = new Date().getTime(); // Générer un ID unique pour chaque toast
		setToasts([...toasts, { id, message, type, title, delay }]); // Ajouter le nouveau toast à l'état
	};

	// Initialiser les fonctions du gestionnaire de toasts
	toastManager.showSuccess = (message, delay) => addToast(message, 'success', 'Succès', delay); // Toast de succès
	toastManager.showError = (message, delay) => addToast(message, 'danger', 'Erreur', delay); // Toast d'erreur
	toastManager.showInfo = (message, delay) => addToast(message, 'info', 'Info', delay); // Toast d'information
	toastManager.showWarning = (message, delay) => addToast(message, 'warning', 'Avertissement', delay); // Toast d'avertissement

	return (
		// Conteneur des toasts, positionné en bas à droite de l'écran
		<ToastContainer position="bottom-end" className="p-3">
			{/* Rendu de chaque toast dans la liste */}
			{toasts.map((toast) => (
				<Toast
					key={toast.id} // Utilisation d'une clé unique pour chaque toast
					onClose={() =>
						// Supprimer le toast de la liste lorsqu'il est fermé
						setToasts((currentToasts) =>
							currentToasts.filter((t) => t.id !== toast.id)
						)
					}
					delay={toast.delay} // Durée personnalisée avant disparition
					autohide // Fermeture automatique après le délai
					className={`d-inline-block m-1 toast-${toast.type}`} // Appliquer une classe CSS selon le type de notification
				>
					<Toast.Header>
						{/* Image dans l'en-tête du toast (facultatif) */}
						<img
							src="https://via.placeholder.com/20"
							className="rounded me-2"
							alt=""
						/>
						<strong className="me-auto">{toast.title}</strong> {/* Titre du toast */}
						<small>À l'instant</small> {/* Horodatage ou indication du moment */}
					</Toast.Header>
					<Toast.Body>
						{toast.message} {/* Message de la notification */}
					</Toast.Body>
				</Toast>
			))}
		</ToastContainer>
	);
};

// Exportation des fonctions pour permettre l'affichage de toasts depuis d'autres composants
export const showSuccess = (message, delay) => toastManager.showSuccess(message, delay); // Afficher un toast de succès
export const showError = (message, delay) => toastManager.showError(message, delay); // Afficher un toast d'erreur
export const showInfo = (message, delay) => toastManager.showInfo(message, delay); // Afficher un toast d'information
export const showWarning = (message, delay) => toastManager.showWarning(message, delay); // Afficher un toast d'avertissement

// Export par défaut du composant PopupService
export default PopupService;
