import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import forgotPasswordApi from '../services/ForgotPassword.api';
import { showSuccess } from '../../../../services/popupService';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Appel à l'API pour envoyer un email de réinitialisation
            await forgotPasswordApi.passwordResetRequest({ email });
						showSuccess('Un email de réinitialisation a été envoyé à l\'adresse indiquée.');
        } catch (error) {
            console.error('Erreur lors de la demande de réinitialisation:', error);
            setError('Erreur lors de la demande de réinitialisation du mot de passe.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <Form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Adresse Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="exemple@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button className='d-flex mx-auto btn-dark' variant="primary" type="submit">
                        Envoyer la demande de réinitialisation
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default ForgotPasswordForm;
