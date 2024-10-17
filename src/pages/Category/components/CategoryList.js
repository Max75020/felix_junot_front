import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import categoryApi from "../services/Category.api";
import { Card, Col, Row, Container } from "react-bootstrap";
import { extractIdFromUrl } from "../../../utils/tools";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const fetchCategory = async () => {
    try {
      const response = await categoryApi.getAllCategoriesNoToken();
      if (response && response["hydra:member"]) {
        setCategories(response["hydra:member"]);
      } else {
        console.error("Aucune catégorie trouvée");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // Function to handle category click
  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}/all`); // Redirect to the category page
  };

  // Function to handle product click
  const handleProductClick = (productUrl) => {
    const productId = extractIdFromUrl(productUrl); // Utilisation de la fonction générique
    navigate(`/product/${productId}`); // Redirect to the product page
  };

  return (
    <Container>
      <h1>Catégories et Produits</h1>
      {categories.map((category) => (
        <div key={category.id_categorie} className="mb-5">
          <h2
            className="text-center text-uppercase mb-4"
            style={{ cursor: "pointer", color: "blue" }} // Indicate clickable style
            onClick={() => handleCategoryClick(category.id_categorie)} // Redirect on click
          >
            {category.nom}
          </h2>
          <Row>
            {category.produits && category.produits.length > 0 ? (
              category.produits.slice(0, 3).map((produit) => ( // Limit to 3 products
                <Col key={produit["@id"]} md={4} className="mb-4">
                  <Card className="text-center">
                    <Card.Img
                      variant="top"
                      src="https://placehold.co/400" // Replace with the actual product image URL
                      alt={`Image de ${produit.nom}`}
                    />
                    <Card.Body>
                      <Card.Title 
                        style={{ cursor: "pointer", color: "blue" }} // Indicate clickable style
                        onClick={() => handleProductClick(produit["@id"])} // Redirect on click
                      >
                        {produit.nom}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">Aucun produit disponible</p>
            )}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default CategoryList;
