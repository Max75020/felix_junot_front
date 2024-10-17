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

export const routes = {
	AUTH: {
		LOGIN: '/login',
		REGISTER: '/register',
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

						<Route path={routes.CATEGORIES.INDEX} element={<CategoryList />} />
						<Route path={routes.CATEGORIES.ALL_ELEMENTS} element={<AllElementsOfCategory />} />
						<Route path={routes.PRODUCT.DETAIL} element={<ProductDetail />} />

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
