import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../../../context/UserContext';
import { routes } from '../../../../routes/AppRouter';
import registerApi from '../services/Register.api';


const RegisterForm = () => {
  const [prenom, setprenom] = useState('');
  const [nom, setnom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Ajout du champ confirmPassword

  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // Pour la redirection

  const { login, user } = useContext(UserContext); // Accéder à la fonction login et à l'utilisateur

  const handleSubmit = async (event) => {
    event.preventDefault();
      // Vérification si les mots de passe correspondent
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

    try {
      // Appel de la méthode login ou register depuis le contexte
      await registerApi.register({ prenom, nom, email, password });

      // Si l'utilisateur est enregistré avec succès
      if (localStorage.getItem('token')) {
        setIsRegistered(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Error during registration.');
    }
  };

  if (isRegistered || user) {
    return <Navigate to={routes.CATEGORIES.INDEX} />; // Redirige vers la page souhaitée après enregistrement
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Prénom */}
          <Form.Group className="mb-3" controlId="prenom">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={prenom}
              onChange={(e) => setprenom(e.target.value)}
              required
            />
          </Form.Group>

          {/* Nom */}
          <Form.Group className="mb-3" controlId="nom">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={nom}
              onChange={(e) => setnom(e.target.value)}
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {/* Mot de passe */}
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterForm;
