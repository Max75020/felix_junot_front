import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import categoryApi from '../../Category/services/Category.api';

const CardSliderWithArrows = () => {
	const [category, setCategory] = useState(null);

	const fetchCategory = async () => {
		try {
			const response = await categoryApi.getCategoryByIdNoToken(1);
			console.log('Structure de la réponse:', response);
			if (response) {
				setCategory(response);
			} else {
				console.error('Aucune catégorie trouvée');
			}
		} catch (error) {
			console.error('Erreur lors de la récupération de la catégorie:', error);
		}
	};

	useEffect(() => {
		fetchCategory();
	}, []);

	return (
		<Container className="text-center" style={{ marginTop: '40px' }}>
			{category ? (
				<>
					<h2 style={{ marginBottom: '40px' }}>{category.nom}</h2>
					<Row className="justify-content-center">
						{category?.produits?.length > 0 ? (
							category.produits.map((produit, index) => (
								<Col xs={12} sm={6} md={4} className="d-flex justify-content-center mb-4 gap-5" key={index}>
									<Card style={{ width: '18rem' }}>
										<Card.Img
											variant="top"
											src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ot2SnJSVboBI9WKAVAt13u75_PB3TJvv0g&s"
										/>
										<Card.Body>
											<Card.Title>{produit.nom}</Card.Title>
										</Card.Body>
									</Card>
								</Col>
							))
						) : (
							<p>Aucun produit disponible</p>
						)}
					</Row>
				</>
			) : (
				<p>Aucune catégorie disponible</p>
			)}
			<Button variant="dark" className="mt-4">
				TOUT VOIR
			</Button>
		</Container>
	);
};

export default CardSliderWithArrows;
