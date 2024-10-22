import React from 'react';
import { Outlet } from 'react-router-dom';
import MyNavbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';


function MainLayout() {
	return (
		<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
			<MyNavbar />
			<main style={{ flex: 1 }}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default MainLayout;
