import React, { useState, useEffect} from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import AdresseApi from './services/Adresses.api';

const AdressesPage = () => {
	const [adresses, setAdresses] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAdresses = async () => {
			try {
				setLoading(true);
				const response = await AdresseApi.getAllAdresses();
				
				setAdresses(response["hydra:member"]);
			} catch (error) {
				console.error('Erreur lors de la récupération des adresses:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchAdresses();
	}, []);

	const handleDelete = async (id) => {
		try {
			await AdresseApi.deleteAdresse(id);
			setAdresses(adresses.filter(adresse => adresse.id_adresse !== id));
		} catch (error) {
			console.error('Erreur lors de la suppression de l\'adresse:', error);
		}
	};

	const adressesFacturation = adresses.filter(adresse => adresse.type === "Facturation");
	const adressesLivraison = adresses.filter(adresse => adresse.type === "Livraison");

	const renderAdresses = (adresses) => (
		<Row className='col-12 mx-auto d-flex align-items-center flex-column flex-md-row justify-content-center'>
			{adresses.map((adresse) => (
				<Col key={adresse.id_adresse} xs={8} sm={7} md={5} lg={4} xl={3} className="mb-4">
					<Card className="text-center border-dark">
						<Card.Header><h6>{adresse.nom}</h6></Card.Header>
						<Card.Body>
							<Card.Text>
								{adresse.prenom} {adresse.nom} <br />
								{adresse.rue} <br />
								{adresse.batiment} <br />
								{adresse.appartement} <br />
								{adresse.code_postal} <br />
								{adresse.ville} <br />
								{adresse.pays} <br />
								{adresse.telephone} <br />
							</Card.Text>
							<div className="d-flex flex-column justify-content-center">
								<Button variant="dark" className="m-1">
									Modifier
								</Button>
								<Button variant="dark" className="m-1" onClick={() => handleDelete(adresse.id_adresse)}>
									Supprimer
								</Button>
							</div>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);

	if (loading) {
		return (
			<Container className="my-5">
				<h1 className="text-center">Chargement des adresses...</h1>
			</Container>
		);
	}

	return (
		<Container className="my-5">
			<h1>Mes Adresses</h1>

			<h2 className="mb-3">Adresse de Facturation</h2>
			{renderAdresses(adressesFacturation)}

			<h2 className="mt-5 mb-3">Adresse de Livraison</h2>
			{renderAdresses(adressesLivraison)}

			<div className="text-center mt-4">
				<Button variant="dark">Ajouter une nouvelle adresse</Button>
			</div>
		</Container>
	);
};

export default AdressesPage;
