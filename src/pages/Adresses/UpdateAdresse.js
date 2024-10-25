import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const UpdateAdresse = () => {
	return (
		<Container className="my-5">
			<h1 className="text-center mb-4">Modifier l'adresse</h1>
			<Form>
				<Row>
				<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="nomAdresse">
							<Form.Label>Nom de l'adresse :</Form.Label>
							<Form.Control type="text" placeholder="Prénom" />
						</Form.Group>
				</Col>
				<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="typeAdresse">
							<Form.Label>Type d'Adresse :</Form.Label>
							<Form.Control type="text" placeholder="Prénom" />
						</Form.Group>
				</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="prenom">
							<Form.Label>Prénom :</Form.Label>
							<Form.Control type="text" placeholder="Prénom" />
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="nom">
							<Form.Label>Nom :</Form.Label>
							<Form.Control type="text" placeholder="Nom" />
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="rue">
							<Form.Label>Rue/Avenue/Bd :</Form.Label>
							<Form.Control type="text" placeholder="Rue/Avenue/Bd" />
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="batiment">
							<Form.Label>Bâtiment :</Form.Label>
							<Form.Control type="text" placeholder="Bâtiment" />
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="appartement">
							<Form.Label>Appartement :</Form.Label>
							<Form.Control type="text" placeholder="Appartement" />
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="codePostal">
							<Form.Label>Code Postal :</Form.Label>
							<Form.Control type="text" placeholder="Code Postal" />
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="ville">
							<Form.Label>Ville :</Form.Label>
							<Form.Control type="text" placeholder="Ville" />
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="mb-3">
						<Form.Group controlId="pays">
							<Form.Label>Pays :</Form.Label>
							<Form.Control type="text" placeholder="Pays" />
						</Form.Group>
					</Col>
					<Col xs={12} className="mb-3">
						<Form.Group controlId="telephone">
							<Form.Label>Tel :</Form.Label>
							<Form.Control type="text" placeholder="Numéro de téléphone" />
						</Form.Group>
					</Col>
				</Row>
				<div className="text-center mt-4">
					<Button variant="dark" type="submit">
						Valider
					</Button>
				</div>
			</Form>
		</Container>
	);
}

export default UpdateAdresse