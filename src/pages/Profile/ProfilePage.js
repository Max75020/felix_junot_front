import React, { useContext, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import "../../assets/styles/Profile/Profile.css";
import { FaHeart } from "react-icons/fa6"; // Import pour l'icône Favoris
import { FaBox } from "react-icons/fa"; // Import pour l'icône Commandes
import { HiLocationMarker } from "react-icons/hi"; // Import pour l'icône Adresses
import UserAvatar from "../../components/UserAvatar/UserAvatar"; // Import du composant UserAvatar
import AccountNavButton from "./components/AccountNavButton"; // Import du composant AccountNavButton

const ProfilePage = () => {
	const { user, loading } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);

	if (loading) {
		return <div>Chargement...</div>;
	}

	// Calculer les initiales de l'utilisateur
	const userInitials = `${user.prenom.charAt(0)}`;

	const handleEditToggle = () => {
		setIsEditing(!isEditing);
	};

	return (
		<Container className="my-5 profile-page-container">
			<Row className="justify-content-center">
				{/* Carte de profil utilisateur */}
				<Col md={6} className="text-center profile-card">
					<div className="profile-avatar mb-3 d-flex justify-content-center">
						{/* Utilisation du composant UserAvatar pour afficher les initiales */}
						<UserAvatar initials={userInitials} />
					</div>
					<h3>{`${user.prenom} ${user.nom}`}</h3>
					<p className="text-muted">{user.email}</p>
					<p className="text-muted mb-1">{user.telephone}</p>
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
			<Row className="justify-content-center mt-5 flex-column flex-md-row align-content-center">
				<AccountNavButton icon={FaHeart} text="Favoris" size={24} />
				<AccountNavButton icon={FaBox} text="Commandes" size={24} />
				<AccountNavButton icon={HiLocationMarker} text="Adresses" size={24} />
			</Row>
		</Container>
	);
};

export default ProfilePage;
