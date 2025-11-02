// Importation des bibliothèques React et React Router pour la gestion de la navigation et des routes
import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// Importation du layout principal qui englobe les pages
import MainLayout from '../layouts/MainLayout';
// Importation des différentes pages de l'application
import Home from '../pages/Home/Home';
import Unauthorized from '../pages/Auth/Unauthorized/Unhautorized'; // Page d'accès non autorisé
import CategoryList from '../pages/Category/components/CategoryList'; // Liste des catégories
import AllElementsOfCategory from '../pages/Category/components/AllElementsOfCategory'; // Tous les éléments d'une catégorie
import ProductDetail from '../pages/Product/components/ProductDetails'; // Détails d'un produit
import LoginForm from '../pages/Auth/Login/components/LoginForm'; // Formulaire de connexion
import RegisterForm from '../pages/Auth/Register/components/RegisterForm'; // Formulaire d'inscription
import ConfirmSignupPage from '../pages/Auth/Register/components/ConfirmSignupPage'; // Confirmation d'inscription
import ForgotPasswordForm from '../pages/Auth/ForgotPassword/components/ForgotPasswordRequestForm'; // Formulaire de demande de réinitialisation de mot de passe
import NewPasswordForm from '../pages/Auth/ForgotPassword/components/NewPasswordForm'; // Formulaire de création d'un nouveau mot de passe
import Faq from '../pages/Legal/Faq'; // Page FAQ
import Cgv from '../pages/Legal/Cgv'; // Page des CGV
import PrivacyPolicy from '../pages/Legal/PrivacyPolicy'; // Politique de confidentialité
import LegalNotices from '../pages/Legal/LegalNotices'; // Mentions légales
import ContactForm from '../pages/Contact/ContactForm'; // Formulaire de contact
import ProfilePage from '../pages/Profile/ProfilePage'; // Page de profil utilisateur
import FavoritesPage from '../pages/Favorites/FavoritesPage'; // Page des favoris
import AdressesPage from '../pages/Adresses/AdressesPage'; // Liste des adresses de l'utilisateur
import AddAdressePage from '../pages/Adresses/AddAdressePage'; // Ajout d'une adresse
import EditAdressePage from '../pages/Adresses/EditAdressePage'; // Modification d'une adresse
import CartSummary from '../pages/Order/CartSummary'; // Récapitulatif du panier
import AddressChoice from '../pages/Order/AddressChoice'; // Choix de l'adresse
import CarrierChoice from '../pages/Order/CarrierChoice'; // Choix du transporteur
import OrderSummary from '../pages/Order/OrderSummary'; // Récapitulatif de la commande
import OrderSuccess from '../pages/Order/OrderSuccess'; // Succès de la commande
import OrdersList from '../pages/Order/OrdersList'; // Liste des commandes
import OrderDetail from '../pages/Order/OrderDetail'; // Détail d'une commande
import RequireAdmin from '../pages/Auth/RequireAdmin';

// Lazy load de l’admin
const AdminApp = lazy(() => import('../pages/Admin/AdminApp'));

// Définition des routes sous forme d'objet pour une gestion centralisée
export const routes = {
	AUTH: {
		LOGIN: '/login',
		REGISTER: '/register',
		CONFIRM_SIGNUP: '/confirm-signup',
		FORGOT_PASSWORD: '/forgot-password',
		NEW_PASSWORD: '/new-password',
		UNAUTHORIZED: '/unauthorized',
	},
	ADMIN: {
		INDEX: '/admin',
	},
	HOME: {
		INDEX: '/',
	},
	CATEGORIES: {
		INDEX: '/categories',
		ALL_ELEMENTS: '/categories/:id/all',
	},
	PRODUCT: {
		INDEX: '/product',
		DETAIL: '/product/:id',
	},
	CART: {
		INDEX: '/cart',
	},
	CHECKOUT: {
		INDEX: '/checkout',
	},
	LEGAL: {
		FAQ: '/faq',
		LEGAL: '/legal-notices',
		PRIVACYPOLICY: '/privacy-policy',
		CGV: '/cgv',
	},
	CONTACT: {
		INDEX: '/contact',
	},
	PROFIL: {
		INDEX: '/profil',
	},
	FAVORITES: {
		INDEX: '/favorites',
	},
	ADRESSES: {
		INDEX: '/adresses',
		ADD: '/adresses/add',
		EDIT: '/adresses/edit/:id',
	},
	COMMANDS: {
		CART_SUMMARY: '/panier-summary',
		ADDRESS_CHOICE: '/address-choice',
		CARRIER_CHOICE: '/carrier-choice',
		ORDER_SUMMARY: '/order-summary',
		ORDER_SUCCESS: '/order-success',
		ORDERS_LIST: '/orders-list',
		ORDER_DETAIL: '/order-detail/:id',
	},
};

// Composant principal pour définir les routes de l'application
function AppRouter() {
	return (
		<Router>
			<Routes>
				{/* Définition de la route principale avec le layout global */}
				<Route path={routes.HOME.INDEX} element={<MainLayout />}>
					{/* Route pour la page d'accueil */}
					<Route index element={<Home />} />

					{/* Routes liées à l'authentification */}
					<Route path={routes.AUTH.LOGIN} element={<LoginForm />} />
					<Route path={routes.AUTH.REGISTER} element={<RegisterForm />} />
					<Route path={routes.AUTH.CONFIRM_SIGNUP} element={<ConfirmSignupPage />} />
					<Route path={routes.AUTH.FORGOT_PASSWORD} element={<ForgotPasswordForm />} />
					<Route path={routes.AUTH.NEW_PASSWORD} element={<NewPasswordForm />} />

					{/* Routes pour les catégories */}
					<Route path={routes.CATEGORIES.INDEX} element={<CategoryList />} />
					<Route path={routes.CATEGORIES.ALL_ELEMENTS} element={<AllElementsOfCategory />} />

					{/* Route pour les produits */}
					<Route path={routes.PRODUCT.DETAIL} element={<ProductDetail />} />

					{/* Routes pour les pages légales */}
					<Route path={routes.LEGAL.FAQ} element={<Faq />} />
					<Route path={routes.LEGAL.CGV} element={<Cgv />} />
					<Route path={routes.LEGAL.PRIVACYPOLICY} element={<PrivacyPolicy />} />
					<Route path={routes.LEGAL.LEGAL} element={<LegalNotices />} />

					{/* Route pour le formulaire de contact */}
					<Route path={routes.CONTACT.INDEX} element={<ContactForm />} />

					{/* Route pour le profil utilisateur */}
					<Route path={routes.PROFIL.INDEX} element={<ProfilePage />} />

					{/* Route pour les favoris */}
					<Route path={routes.FAVORITES.INDEX} element={<FavoritesPage />} />

					{/* Routes pour la gestion des adresses */}
					<Route path={routes.ADRESSES.INDEX} element={<AdressesPage />} />
					<Route path={routes.ADRESSES.ADD} element={<AddAdressePage />} />
					<Route path={routes.ADRESSES.EDIT} element={<EditAdressePage />} />

					{/* Routes pour le processus de commande */}
					<Route path={routes.COMMANDS.CART_SUMMARY} element={<CartSummary />} />
					<Route path={routes.COMMANDS.ADDRESS_CHOICE} element={<AddressChoice />} />
					<Route path={routes.COMMANDS.CARRIER_CHOICE} element={<CarrierChoice />} />
					<Route path={routes.COMMANDS.ORDER_SUMMARY} element={<OrderSummary />} />
					<Route path={routes.COMMANDS.ORDER_SUCCESS} element={<OrderSuccess />} />
					<Route path={routes.COMMANDS.ORDERS_LIST} element={<OrdersList />} />
					<Route path={routes.COMMANDS.ORDER_DETAIL} element={<OrderDetail />} />

					{/* Route pour l'accès non autorisé */}
					<Route path={routes.AUTH.UNAUTHORIZED} element={<Unauthorized />} />
				</Route>

				{/* admin en lazy + wildcard pour /admin/#/xxx */}
				<Route
					path="/admin/*"
					element={
						<RequireAdmin>
							<Suspense fallback={<div style={{ padding: 20 }}>Chargement de l’admin…</div>}>
								<AdminApp />
							</Suspense>
						</RequireAdmin>
					}
				/>
			</Routes>
		</Router>
	);
}

// Exportation du composant AppRouter pour être utilisé dans l'application
export default AppRouter;
