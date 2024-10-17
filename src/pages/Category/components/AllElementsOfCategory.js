import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Pour récupérer l'ID de la catégorie depuis l'URL
import categoryApi from "../services/Category.api";
import { Card, Col, Row, Container } from "react-bootstrap";

const AllElementsOfCategory = () => {
  const [category, setCategory] = useState(null);
  const { id } = useParams(); // Récupère l'ID de la catégorie depuis l'URL

  const fetchCategory = async () => {
    try {
      const response = await categoryApi.getAllCategoriesNoToken();
      if (response && response["hydra:member"]) {
        const selectedCategory = response["hydra:member"].find(cat => cat.id_categorie === parseInt(id));
        setCategory(selectedCategory); // Stocke la catégorie trouvée
      } else {
        console.error("Aucune catégorie trouvée");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]); // Utiliser l'id pour recharger les données si la catégorie change

  return (
    <Container>
      <h1>Produits de la catégorie {category?.nom}</h1>
      {category && category.produits && category.produits.length > 0 ? (
        <Row>
          {category.produits.map((produit) => (
            <Col key={produit["@id"]} md={4} className="mb-4">
              <Card className="text-center">
                <Card.Img
                  variant="top"
                  src="https://placehold.co/400" // Remplace par l'URL de l'image du produit si disponible
                  alt={`Image de ${produit.nom}`}
                />
                <Card.Body>
                  <Card.Title>{produit.nom}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">Aucun produit disponible pour cette catégorie</p>
      )}
    </Container>
  );
};

export default AllElementsOfCategory;
