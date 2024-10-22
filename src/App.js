//import { useState } from 'react';

import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import AppRouter from "./routes/AppRouter";
import PopupService from "./services/popupService";
function App() {
	return (
		<UserProvider>
			<CartProvider>
				<PopupService />
				<AppRouter />
			</CartProvider>
		</UserProvider>
	);
}

export default App;
