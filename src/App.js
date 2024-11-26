// Importation des fournisseurs de contexte nécessaires pour l'application
import { CartProvider } from "./context/CartContext"; // Contexte pour gérer le panier
import { UserProvider } from "./context/UserContext"; // Contexte pour gérer les informations utilisateur
import { OrderProvider } from "./context/OrderContext"; // Contexte pour gérer les commandes
// Importation du routeur principal pour la navigation dans l'application
import AppRouter from "./routes/AppRouter";
// Importation du service de notifications pour afficher les pop-ups
import PopupService from "./services/popupService";

// Composant principal de l'application
function App() {
	return (
		// Fournisseur du contexte utilisateur
		<UserProvider>
			{/* Fournisseur du contexte panier */}
			<CartProvider>
				{/* Fournisseur du contexte commandes */}
				<OrderProvider>
					{/* Composant pour gérer les notifications (toasts) */}
					<PopupService />
					{/* Routeur principal pour gérer les différentes pages */}
					<AppRouter />
				</OrderProvider>
			</CartProvider>
		</UserProvider>
	);
}

// Exportation du composant App pour utilisation dans l'application React
export default App;
