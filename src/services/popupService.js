import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

// Singleton to manage toast functions
const toastManager = {
	showSuccess: () => { },
	showError: () => { },
	showInfo: () => { },
	showWarning: () => { },
};

const PopupService = () => {
	const [toasts, setToasts] = useState([]);

	// Function to add a toast
	const addToast = (message, type = 'info', title = 'Notification') => {
		const id = new Date().getTime(); // Unique ID for each toast
		setToasts([...toasts, { id, message, type, title }]);
	};

	// Initialize the toast manager functions
	toastManager.showSuccess = (message) => addToast(message, 'success', 'Succès');
	toastManager.showError = (message) => addToast(message, 'danger', 'Erreur');
	toastManager.showInfo = (message) => addToast(message, 'info', 'Info');
	toastManager.showWarning = (message) => addToast(message, 'warning', 'Avertissement');

	return (
		<ToastContainer position="bottom-end" className="p-3">
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					onClose={() =>
						setToasts((currentToasts) =>
							currentToasts.filter((t) => t.id !== toast.id)
						)
					}
					delay={3000}
					autohide
					className={`d-inline-block m-1 toast-${toast.type}`} // Appliquer la classe basée sur le type de toast
				>
					<Toast.Header>
						<img
							src="https://via.placeholder.com/20"
							className="rounded me-2"
							alt=""
						/>
						<strong className="me-auto">{toast.title}</strong>
						<small>Just now</small>
					</Toast.Header>
					<Toast.Body>
						{toast.message}
					</Toast.Body>
				</Toast>
			))}
		</ToastContainer>
	);
};

// Export the toast manager functions
export const showSuccess = (message) => toastManager.showSuccess(message);
export const showError = (message) => toastManager.showError(message);
export const showInfo = (message) => toastManager.showInfo(message);
export const showWarning = (message) => toastManager.showWarning(message);

export default PopupService;
