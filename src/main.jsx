import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Redux
import { Provider as ReduxProvider } from "react-redux";
import store from "@store/store";

import AuthProvider from "@providers/AuthProvider.jsx";
import ToastProvider from "@providers/ToastProvider";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ReduxProvider store={store}>
            <AuthProvider>
                <App />
                <ToastProvider />
            </AuthProvider>
        </ReduxProvider>
    </StrictMode>,
);
