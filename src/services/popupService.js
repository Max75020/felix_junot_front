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
	const addToast = (message, type = 'info') => {
		const id = new Date().getTime(); // Unique ID for each toast
		setToasts([...toasts, { id, message, type }]);

		// Automatically remove the toast after 3 seconds
		setTimeout(() => {
			setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
		}, 3000);
	};

	// Initialize the toast manager functions
	toastManager.showSuccess = (message) => addToast(message, 'success');
	toastManager.showError = (message) => addToast(message, 'danger');
	toastManager.showInfo = (message) => addToast(message, 'info');
	toastManager.showWarning = (message) => addToast(message, 'warning');

	return (
		<ToastContainer position="bottom-end" className="p-3">
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					bg={toast.type}
					onClose={() =>
						setToasts((currentToasts) =>
							currentToasts.filter((t) => t.id !== toast.id)
						)
					}
					delay={3000}
					autohide
				>
					<Toast.Body>{toast.message}</Toast.Body>
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
