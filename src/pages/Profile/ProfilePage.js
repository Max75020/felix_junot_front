import React, { useContext, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import "../../assets/styles/Profile/Profile.css";
import { FaHeart } from "react-icons/fa6"; // Import pour l'icône Favoris
import { FaBox } from "react-icons/fa"; // Import pour l'icône Commandes
import { HiLocationMarker } from "react-icons/hi"; // Import pour l'icône Adresses

const ProfilePage = () => {
	const { user, loading } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);

	if (loading) {
		return <div>Chargement...</div>;
	}

	const handleEditToggle = () => {
		setIsEditing(!isEditing);
	};

	return (
		<Container className="my-5 profile-page-container">
			<Row className="justify-content-center">
				{/* Carte de profil utilisateur */}
				<Col md={6} className="text-center profile-card">
					<div className="profile-avatar mb-3">
						<img
							src={user.avatar || "https://via.placeholder.com/100"}
							alt="User Avatar"
							className="rounded-circle"
						/>
					</div>
					<h3>{`${user.prenom} ${user.nom}`}</h3>
					<p className="text-muted mb-1">{user.phone}</p>
					<p className="text-muted">{user.email}</p>
					<Button variant="primary" onClick={handleEditToggle} className="my-3">
						{isEditing ? "Annuler" : "Modifier"}
					</Button>

					{/* Formulaire d'édition */}
					{isEditing && (
						<Form className="text-left">
							<Form.Group className="mb-3">
								<Form.Label>Prénom :</Form.Label>
								<Form.Control
									type="text"
									placeholder="Prénom"
									defaultValue={user.prenom}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Nom :</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nom"
									defaultValue={user.nom}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Numéro de Téléphone :</Form.Label>
								<Form.Control
									type="tel"
									placeholder="Numéro de Téléphone"
									defaultValue={user.telephone}
								/>
							</Form.Group>
							<Button variant="success" className="w-100">
								Sauvegarder
							</Button>
						</Form>
					)}
				</Col>
			</Row>

			{/* Boutons de navigation */}
			<Row className="justify-content-center mt-5">
				<Col xs={4} md={3} className="text-center">
					<Button variant="outline-dark" className="account-nav-btn">
						<FaHeart size={24} /> Favoris
					</Button>
				</Col>
				<Col xs={4} md={3} className="text-center">
					<Button variant="outline-dark" className="account-nav-btn">
						<FaBox size={24} /> Commandes
					</Button>
				</Col>
				<Col xs={4} md={3} className="text-center">
					<Button variant="outline-dark" className="account-nav-btn">
						<HiLocationMarker size={24} /> Adresses
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default ProfilePage;
