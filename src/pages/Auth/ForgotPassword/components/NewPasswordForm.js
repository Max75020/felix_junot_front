import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import forgotPasswordApi from "../services/ForgotPassword.api";
import { showSuccess } from "../../../../services/popupService";
import { useLocation } from "react-router-dom";

const NewPasswordForm = () => {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            console.log("Payload:", { token, password }); // Vérifier le payload
            await forgotPasswordApi.passwordReset(token, password);
            showSuccess("Votre mot de passe a été réinitialisé avec succès");
        } catch (error) {
            console.error("Erreur:", error); // Log the error
            setError("Une erreur s'est produite lors de la réinitialisation");
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && (
                        <div className="alert alert-success">
                            {successMessage}
                        </div>
                    )}

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Nouveau mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirmer Nouveau mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Envoyer la demande de réinitialisation
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default NewPasswordForm;
