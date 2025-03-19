import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            "@": "/src",
            "@components": "/src/components",
            "@config": "/src/config",
            "@hooks": "/src/hooks",
            "@layouts": "/src/layouts",
            "@services": "/src/services",
        },
    },
});
