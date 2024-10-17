//import { useState } from 'react';

import { UserProvider } from "./context/UserContext";
import AppRouter from "./routes/AppRouter";
import PopupService from "./services/popupService";
function App() {
    return (
        <div>
            <UserProvider>
                <PopupService />
                <AppRouter />
            </UserProvider>
        </div>
    );
}

export default App;
