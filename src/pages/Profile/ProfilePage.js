// Importation des bibliothèques nécessaires pour ce composant
import React, { useContext, useState, useEffect } from "react"; // React pour la création de composants et les hooks
import { Container, Row, Col, Button, Form } from "react-bootstrap"; // Composants Bootstrap pour la mise en page et les styles
import { UserContext } from "../../context/UserContext"; // Contexte utilisateur pour récupérer les données de l'utilisateur
import "../../assets/styles/Profile/Profile.css"; // Fichier CSS personnalisé pour styliser la page
import { FaHeart } from "react-icons/fa6"; // Icône Favoris
import { FaBox } from "react-icons/fa"; // Icône Commandes
import { HiLocationMarker } from "react-icons/hi"; // Icône Adresses
import UserAvatar from "../../components/UserAvatar/UserAvatar"; // Composant pour afficher l'avatar utilisateur
import AccountNavButton from "./components/AccountNavButton"; // Boutons de navigation utilisateur
import { showSuccess } from "../../services/popupService"; // Service pour afficher des notifications

// Composant principal : ProfilePage
const ProfilePage = () => {
	// Récupération des données utilisateur depuis le contexte UserContext
	const { user, loading, updateUser } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false); // État pour activer ou désactiver le mode édition
	const { deleteUser } = useContext(UserContext); // Fonction pour supprimer l'utilisateur
	const [prenom, setPrenom] = useState(user?.prenom || ""); // État pour le prénom
	const [nom, setNom] = useState(user?.nom || ""); // État pour le nom
	const [telephone, setTelephone] = useState(user?.telephone || ""); // État pour le téléphone

	// Effet pour synchroniser les données utilisateur avec les champs d'édition
	useEffect(() => {
		if (user) {
			setPrenom(user.prenom || "");
			setNom(user.nom || "");
			setTelephone(user.telephone || "");
		}
	}, [user]);

	// Fonction pour sauvegarder les modifications apportées au profil
	const handleSave = (e) => {
		e.preventDefault();

		// Préparer les nouvelles données
		const updatedData = {
			prenom,
			nom,
			telephone,
		};

		// Appeler la méthode updateUser avec les nouvelles données
		updateUser(updatedData);

		// Afficher une notification de succès
		showSuccess("Profil mis à jour avec succès !");

		// Sortir du mode édition
		setIsEditing(false);
	};

	// Si les données utilisateur sont en cours de chargement
	if (loading) {
		return <div>Chargement...</div>;
	}

	// Obtenir les initiales pour l'avatar utilisateur
	const userInitials = `${user.prenom.charAt(0)}`;

	// Fonction pour activer/désactiver le mode édition
	const handleEditToggle = () => {
		setIsEditing(!isEditing);
	};

	// Fonction pour supprimer l'utilisateur avec confirmation
	const handleDeleteUser = () => {
		if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Toutes vos données seront perdues.")) {
			deleteUser();
		}
	};

	// Structure du composant
	return (
		<Container className="my-5 profile-page-container">
			<Row className="justify-content-center">
				{/* Carte de profil utilisateur */}
				<Col md={6} className="text-center profile-card">
					<div className="profile-avatar mb-3 d-flex justify-content-center">
						{/* Avatar utilisateur avec les initiales */}
						<UserAvatar initials={userInitials} />
					</div>
					{/* Nom, email et téléphone de l'utilisateur */}
					<h3>{`${user.prenom} ${user.nom}`}</h3>
					<p className="text-muted">{user.email}</p>
					<p className="text-muted mb-1">{user.telephone}</p>
					<div className="d-flex flex-column align-items-center gap-4">
						{/* Bouton pour activer ou désactiver le mode édition */}
						<Button onClick={handleEditToggle} className="btn-dark editbutton">
							{isEditing ? "Annuler" : "Modifier"}
						</Button>

						{/* Formulaire d'édition affiché uniquement en mode édition */}
						{isEditing && (
							<Form className="w-100 px-3" onSubmit={handleSave}>
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

						{/* Bouton pour supprimer le compte utilisateur */}
						<Button onClick={handleDeleteUser} variant="danger" className="deletebutton">
							Supprimer votre compte
						</Button>
					</div>
				</Col>
			</Row>

			{/* Boutons de navigation pour les favoris, commandes et adresses */}
			<Row className="justify-content-center mt-5 flex-column flex-md-row align-content-center">
				<AccountNavButton icon={FaHeart} text="Favoris" size={24} link="/favorites" />
				<AccountNavButton icon={FaBox} text="Commandes" size={24} link="/orders-list" />
				<AccountNavButton icon={HiLocationMarker} text="Adresses" size={24} link="/adresses" />
			</Row>
		</Container>
	);
};

// Exportation du composant pour l'utiliser dans d'autres fichiers
export default ProfilePage;
