import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Unauthorized from '../pages/Auth/Unauthorized/Unhautorized';
import CategoryList from '../pages/Category/components/CategoryList';
import AllElementsOfCategory from '../pages/Category/components/AllElementsOfCategory';
import ProductDetail from '../pages/Product/components/ProductDetails';
import { UserProvider } from "../context/UserContext";
import LoginForm from '../pages/Auth/Login/components/LoginForm';
import RegisterForm from '../pages/Auth/Register/components/RegisterForm';
import ForgotPasswordForm from '../pages/Auth/ForgotPassword/components/ForgotPasswordRequestForm';
import NewPasswordForm from '../pages/Auth/ForgotPassword/components/NewPasswordForm';
import Faq from '../pages/Legal/Faq';
import Cgv from '../pages/Legal/Cgv';
import PrivacyPolicy from '../pages/Legal/PrivacyPolicy';
import LegalNotices from '../pages/Legal/LegalNotices';
import ContactForm from '../pages/Contact/ContactForm';
import ProfilePage from '../pages/Profile/ProfilePage';
import FavoritesPage from '../pages/Favorites/FavoritesPage';
import AdressesPage from '../pages/Adresses/AdressesPage';
import AddAdressePage from '../pages/Adresses/AddAdressePage';
import EditAdressePage from '../pages/Adresses/EditAdressePage';
import CartSummary from '../pages/Commands/CartSummary';
import AddressChoice from '../pages/Commands/AddressChoice';
import CarrierChoice from '../pages/Commands/CarrierChoice';
import OrderSummary from '../pages/Commands/OrderSummary';

export const routes = {
	AUTH: {
		LOGIN: '/login',
		REGISTER: '/register',

		FORGOT_PASSWORD: '/forgot-password',
		NEW_PASSWORD: '/new-password',

		UNAUTHORIZED: '/unauthorized',
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
	},
};

function AppRouter() {
	return (
		<UserProvider> {/* Envelopper toute l'application avec UserProvider */}
			<Router>
				<Routes>
					<Route path={routes.HOME.INDEX} element={<MainLayout />}>
						<Route index element={<Home />} />
						<Route path={routes.AUTH.LOGIN} element={<LoginForm />} />
						<Route path={routes.AUTH.REGISTER} element={<RegisterForm />} />
						<Route path={routes.AUTH.FORGOT_PASSWORD} element={<ForgotPasswordForm />} />
						<Route path={routes.AUTH.NEW_PASSWORD} element={<NewPasswordForm />} />

						<Route path={routes.CATEGORIES.INDEX} element={<CategoryList />} />
						<Route path={routes.CATEGORIES.ALL_ELEMENTS} element={<AllElementsOfCategory />} />
						<Route path={routes.PRODUCT.DETAIL} element={<ProductDetail />} />
						<Route path={routes.LEGAL.FAQ} element={<Faq />} />
						<Route path={routes.LEGAL.CGV} element={<Cgv />} />
						<Route path={routes.LEGAL.PRIVACYPOLICY} element={<PrivacyPolicy />} />
						<Route path={routes.LEGAL.LEGAL} element={<LegalNotices />} />
						<Route path={routes.CONTACT.INDEX} element={<ContactForm />} />
						<Route path={routes.PROFIL.INDEX} element={<ProfilePage />} />
						<Route path={routes.FAVORITES.INDEX} element={<FavoritesPage />} />
						<Route path={routes.ADRESSES.INDEX} element={<AdressesPage />} />
						<Route path={routes.ADRESSES.ADD} element={<AddAdressePage />} />
						<Route path={routes.ADRESSES.EDIT} element={<EditAdressePage />} />
						<Route path={routes.COMMANDS.CART_SUMMARY} element={<CartSummary />} />
						<Route path={routes.COMMANDS.ADDRESS_CHOICE} element={<AddressChoice />} />
						<Route path={routes.COMMANDS.CARRIER_CHOICE} element={<CarrierChoice />} />
						<Route path={routes.COMMANDS.ORDER_SUMMARY} element={<OrderSummary />} />

						<Route
							index
							element={
								// <RoleGuard role="admin">
								<Home />
								// </RoleGuard>
							}
						/>
						<Route path={routes.AUTH.UNAUTHORIZED} element={<Unauthorized />} />
					</Route>
				</Routes>
			</Router>
		</UserProvider>
	);
}

export default AppRouter;
