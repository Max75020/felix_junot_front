import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { OrderProvider } from "./context/OrderContext";
import AppRouter from "./routes/AppRouter";
import PopupService from "./services/popupService";
function App() {
	return (
		<UserProvider>
			<CartProvider>
				<OrderProvider>
					<PopupService />
					<AppRouter />
				</OrderProvider>
			</CartProvider>
		</UserProvider>
	);
}

export default App;
