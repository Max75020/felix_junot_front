import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import "../../assets/styles/Profile/Profile.css";
import { FaHeart } from "react-icons/fa6"; // Import pour l'icône Favoris
import { FaBox } from "react-icons/fa"; // Import pour l'icône Commandes
import { HiLocationMarker } from "react-icons/hi"; // Import pour l'icône Adresses
import UserAvatar from "../../components/UserAvatar/UserAvatar"; // Import du composant UserAvatar
import AccountNavButton from "./components/AccountNavButton"; // Import du composant AccountNavButton
import { showSuccess } from '../../services/popupService';

const ProfilePage = () => {
	const { user, loading, updateUser } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);
	const { deleteUser } = useContext(UserContext);
	const [prenom, setPrenom] = useState(user?.prenom || "");
	const [nom, setNom] = useState(user?.nom || "");
	const [telephone, setTelephone] = useState(user?.telephone || "");

	// Mettre à jour les champs d'édition lorsque les données utilisateur changent
	useEffect(() => {
		if (user) {
			setPrenom(user.prenom || "");
			setNom(user.nom || "");
			setTelephone(user.telephone || "");
		}
	}, [user]);

	const handleSave = (e) => {
		e.preventDefault();

		// Préparer les données à mettre à jour
		const updatedData = {
			prenom,
			nom,
			telephone,
		};

		// Appeler la fonction updateUser avec les nouvelles données
		updateUser(updatedData);

		// Afficher une notification de succès
		showSuccess("Profil mis à jour avec succès !");

		// Optionnel : désactiver le mode d'édition après la mise à jour
		setIsEditing(false);
	};

	if (loading) {
		return <div>Chargement...</div>;
	}

	// Obtenir les initiales de l'utilisateur
	const userInitials = `${user.prenom.charAt(0)}`;

	const handleEditToggle = () => {
		setIsEditing(!isEditing);
	};

	const handleDeleteUser = () => {
		if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Toutes vos données seront perdues.")) {
			deleteUser();
		}
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
					<div className="d-flex justify-content-center flex-column align-items-center gap-5">
						<Button onClick={handleEditToggle} className="my-3 btn-dark editbutton">
							{isEditing ? "Annuler" : "Modifier"}
						</Button>
						<Button onClick={handleDeleteUser} variant="danger" className="deletebutton">
							Supprimer votre compte
						</Button>
					</div>

					{/* Formulaire d'édition */}
					{isEditing && (
						<Form className="text-left" onSubmit={handleSave}>
							<Form.Group className="mb-3">
								<Form.Label>Prénom :</Form.Label>
								<Form.Control
									type="text"
									placeholder="Prénom"
									value={prenom}
									onChange={(e) => setPrenom(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Nom :</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nom"
									value={nom}
									onChange={(e) => setNom(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Numéro de Téléphone :</Form.Label>
								<Form.Control
									type="tel"
									placeholder="Numéro de Téléphone"
									value={telephone}
									onChange={(e) => setTelephone(e.target.value)}
								/>
							</Form.Group>
							<Button variant="success" type="submit" className="w-100">
								Sauvegarder
							</Button>
						</Form>
					)}
				</Col>
			</Row>

			{/* Boutons de navigation */}
			<Row className="justify-content-center mt-5 flex-column flex-md-row align-content-center">
				<AccountNavButton icon={FaHeart} text="Favoris" size={24} link="/favorites" />
				<AccountNavButton icon={FaBox} text="Commandes" size={24} link="/orders-list" />
				<AccountNavButton icon={HiLocationMarker} text="Adresses" size={24} link="/adresses" />
			</Row>
		</Container>
	);
};

export default ProfilePage;
