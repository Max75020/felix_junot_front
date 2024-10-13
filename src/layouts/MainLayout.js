import React from 'react';
import { Outlet } from 'react-router-dom';
import MyNavbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';


function MainLayout() {
	return (
		<div>
			<MyNavbar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default MainLayout;
