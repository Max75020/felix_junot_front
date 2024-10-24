import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

const AdressesPage = () => {
	// Liste des adresses avec les données fournies
	const adresses = [
		{
			id_adresse: 1,
			nom: "Adresse de Facturation",
			details: {
				type: "Facturation",
				prenom: "Maxime",
				nom: "DUPLAISSY",
				rue: "1 Rue du boss(eur)",
				batiment: "Bâtiment 1",
				appartement: "Appartement 1",
				codePostal: "75020",
				ville: "Paris",
				pays: "France",
				telephone: "+33123456789",
			},
		},
		{
			id_adresse: 2,
			nom: "Adresse de Livraison",
			details: {
				type: "Livraison",
				prenom: "Maxime",
				nom: "DUPLAISSY",
				rue: "1 Rue du boss(eur)",
				batiment: "Bâtiment 1",
				appartement: "Appartement 1",
				codePostal: "75020",
				ville: "Paris",
				pays: "France",
				telephone: "+33123456789",
			},
		},
		{
			id_adresse: 3,
			nom: "Adresse de Facturation",
			details: {
				type: "Facturation",
				prenom: "Maxime",
				nom: "DUPLAISSY",
				rue: "1 Rue du boss(eur)",
				batiment: "Bâtiment 1",
				appartement: "Appartement 1",
				codePostal: "75020",
				ville: "Paris",
				pays: "France",
				telephone: "+33123456789",
			},
		},
		{
			id_adresse: 4,
			nom: "Adresse de Livraison",
			details: {
				type: "Livraison",
				prenom: "Maxime",
				nom: "DUPLAISSY",
				rue: "1 Rue du boss(eur)",
				batiment: "Bâtiment 1",
				appartement: "Appartement 1",
				codePostal: "75020",
				ville: "Paris",
				pays: "France",
				telephone: "+33123456789",
			},
		},
		{
			id_adresse: 5,
			nom: "Adresse de Facturation",
			details: {
				type: "Facturation",
				prenom: "Maxime",
				nom: "DUPLAISSY",
				rue: "1 Rue du boss(eur)",
				batiment: "Bâtiment 1",
				appartement: "Appartement 1",
				codePostal: "75020",
				ville: "Paris",
				pays: "France",
				telephone: "+33123456789",
			},
		},
		{
			id_adresse: 6,
			nom: "Adresse de Livraison",
			details: {
				type: "Livraison",
				prenom: "Maxime",
				nom: "DUPLAISSY",
				rue: "1 Rue du boss(eur)",
				batiment: "Bâtiment 1",
				appartement: "Appartement 1",
				codePostal: "75020",
				ville: "Paris",
				pays: "France",
				telephone: "+33123456789",
			},
		},
		{
			id_adresse: 5,
			nom: "Adresse de Facturation",
			details: {
				type: "Facturation",
				prenom: "Maxime",
				nom: "DUPLAISSY",
				rue: "1 Rue du boss(eur)",
				batiment: "Bâtiment 1",
				appartement: "Appartement 1",
				codePostal: "75020",
				ville: "Paris",
				pays: "France",
				telephone: "+33123456789",
			},
		},
		{
			id_adresse: 6,
			nom: "Adresse de Livraison",
			details: {
				type: "Livraison",
				prenom: "Maxime",
				nom: "DUPLAISSY",
				rue: "1 Rue du boss(eur)",
				batiment: "Bâtiment 1",
				appartement: "Appartement 1",
				codePostal: "75020",
				ville: "Paris",
				pays: "France",
				telephone: "+33123456789",
			},
		},
		{
			id_adresse: 5,
			nom: "Adresse de Facturation",
			details: {
				type: "Facturation",
				prenom: "Maxime",
				nom: "DUPLAISSY",
				rue: "1 Rue du boss(eur)",
				batiment: "Bâtiment 1",
				appartement: "Appartement 1",
				codePostal: "75020",
				ville: "Paris",
				pays: "France",
				telephone: "+33123456789",
			},
		},
		{
			id_adresse: 6,
			nom: "Adresse de Livraison",
			details: {
				type: "Livraison",
				prenom: "Maxime",
				nom: "DUPLAISSY",
				rue: "1 Rue du boss(eur)",
				batiment: "Bâtiment 1",
				appartement: "Appartement 1",
				codePostal: "75020",
				ville: "Paris",
				pays: "France",
				telephone: "+33123456789",
			},
		},
	];

	// Filtrage des adresses par type
	const adressesFacturation = adresses.filter(adresse => adresse.details.type === "Facturation");
	const adressesLivraison = adresses.filter(adresse => adresse.details.type === "Livraison");

	const renderAdresses = (adresses) => (
		<Row className='col-12 mx-auto d-flex align-items-center flex-column flex-md-row justify-content-center'>
			{adresses.map((adresse) => (
				<Col key={adresse.id_adresse} xs={8} sm={7} md={5} lg={4} xl={3} className="mb-4">
					<Card className="text-center border-dark">
						<Card.Header><h6>{adresse.nom}</h6></Card.Header>
						<Card.Body>
							<Card.Text>
								{adresse.details.prenom} {adresse.details.nom} <br />
								{adresse.details.rue} <br />
								{adresse.details.batiment} <br />
								{adresse.details.appartement} <br />
								{adresse.details.codePostal} <br />
								{adresse.details.ville} <br />
								{adresse.details.pays} <br />
								{adresse.details.telephone} <br />
							</Card.Text>
							<Button variant="dark" className="m-1">
								Modifier
							</Button>
							<Button variant="dark" className="m-1">
								Supprimer
							</Button>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);

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
