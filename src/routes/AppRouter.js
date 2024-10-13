import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import LoginForm from '../pages/Login/components/LoginForm';
import Unauthorized from '../pages/Auth/Unauthorized/Unhautorized';
export const routes = {
	AUTH: {
		LOGIN: '/login',
		REGISTER: '/register',
		UNAUTHORIZED: '/unauthorized',
	},
	HOME: {
		INDEX: '/',
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
		<Router>
			<Routes>
				<Route path={routes.HOME.INDEX} element={<MainLayout />}>
					<Route index element={<Home />} />

					<Route path={routes.AUTH.LOGIN} element={<LoginForm />} />
					<Route
						index
						element={
							// <RoleGuard role="admin">
							<Home />
							// </RoleGuard>
						}
					/>
					<Route path={routes.AUTH.UNAUTHORIZED} element={<Unauthorized />} />

					{/* <Route path={routes.AUTH.REGISTER} element={<RegisterForm />} />
          <Route path={routes.CART.INDEX} element={<Cart />} />
          <Route path={routes.PRODUCT.DETAIL} element={<Product />} />
          <Route path={routes.CHECKOUT.INDEX} element={<Checkout />} /> */}
				</Route>
			</Routes>
		</Router>
	);
}

export default AppRouter;
