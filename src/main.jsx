import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Redux
import { Provider as ReduxProvider } from "react-redux";
import store from "@store/store";

import AuthProvider from "@providers/AuthProvider.jsx";
import ToastProvider from "@providers/ToastProvider";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const SECOND = 1000;
const MINUTE = SECOND * 60;

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10 * SECOND,
            gcTime: 5 * MINUTE,
            retry: 1,
        },
    },
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ReduxProvider store={store}>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                    <ToastProvider />
                    <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
                </QueryClientProvider>
            </AuthProvider>
        </ReduxProvider>
    </StrictMode>,
);
