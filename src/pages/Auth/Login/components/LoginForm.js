import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../../../context/UserContext';
import { routes } from '../../../../routes/AppRouter';
import { showSuccess } from '../../../../services/popupService';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Pour la redirection

  const { login, user } = useContext(UserContext); // Accéder à la fonction login et à l'utilisateur

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Appel de la méthode login depuis le contexte
      await login(email, password);
      
      // Si l'utilisateur est connecté
      if (localStorage.getItem('token')) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid login credentials.');
    }
  };

  if (isAuthenticated || user) {
    showSuccess("Connexion réussie"); // Show success toast
    return <Navigate to={routes.CATEGORIES.INDEX} />; // Redirige vers la page souhaitée après connexion
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Adresse Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          {/* mot de passe oublié */}
            <a href={routes.AUTH.FORGOT_PASSWORD}>Forgot password?</a>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default LoginForm;
