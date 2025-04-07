import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    server: {
        port: 3000,
        // open: true,
    },
    resolve: {
        alias: {
            "@": "/src",
            "@api": "/src/api",
            "@components": "/src/components",
            "@config": "/src/config",
            "@contexts": "/src/contexts",
            "@hooks": "/src/hooks",
            "@layouts": "/src/layouts",
            "@pages": "/src/pages",
            "@providers": "/src/providers",
            "@routes": "/src/routes",
            "@services": "/src/services",
            "@store": "/src/store",
        },
    },
});
