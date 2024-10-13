import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import categoryApi from '../../Category/services/Category.api';

const CardSliderWithArrows = () => {
  const [category, setCategory] = useState(null); // État pour stocker la catégorie

  // Fonction pour récupérer la catégorie avec l'ID 1 depuis l'API
  const fetchCategory = async () => {
    try {
      const response = await categoryApi.getCategoryByIdNoToken(1); // Appel API avec ID 1
      console.log('Response:', response); // Déboguer la réponse API pour voir sa structure

      if (response) {
        setCategory(response); // Stocker la catégorie récupérée
      } else {
        console.error('Aucune catégorie trouvée');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la catégorie:', error);
    }
  };

  // Utilisation de useEffect pour récupérer la catégorie lors du montage du composant
  useEffect(() => {
    fetchCategory(); // Appel de la fonction pour récupérer la catégorie
  }, []);

  return (
    <Container className="text-center" style={{ marginTop: '40px' }}>
      {category ? (
        <>
          <h2 style={{ marginBottom: '40px' }}>{category.nom}</h2> {/* Affiche le nom de la catégorie */}
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} className="d-flex justify-content-center mb-4">
						{category.produits && category.produits.length > 0 ? (
                        category.produits.map((produit, index) => (
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/150" // Remplacez par une image réelle si disponible
                />
                <Card.Body>
                  <Card.Title>{produit.nom}</Card.Title> {/* Affiche le nom de la catégorie */}
                </Card.Body>
              </Card>
                        ))
                      ) : (
                        <li>Aucun produit disponible</li>
                      )}
            </Col>
          </Row>
        </>
      ) : (
        <p>Aucune catégorie disponible</p>
      )}
      <Button variant="dark" className="mt-4">TOUT VOIR</Button>
    </Container>
  );
};

export default CardSliderWithArrows;
