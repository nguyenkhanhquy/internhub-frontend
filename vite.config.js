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
            "@utils": "/src/utils",
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ["react", "react-dom"],
                    router: ["react-router-dom"],
                    redux: ["@reduxjs/toolkit", "react-redux"],

                    mui: ["@mui/material"],
                    muiIcons: ["@mui/icons-material"],
                    muiCharts: ["@mui/x-charts"],

                    ckeditor: ["@ckeditor/ckeditor5-react", "ckeditor5"],

                    form: ["react-hook-form", "@hookform/resolvers", "yup"],
                    toast: ["react-toastify"],
                },
            },
        },
    },
});
