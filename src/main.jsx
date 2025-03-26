import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "@providers/AuthProvider.jsx";
import ToastProvider from "@providers/ToastProvider";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <App />
            <ToastProvider />
        </AuthProvider>
    </StrictMode>,
);
