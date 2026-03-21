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
            "@assets": "/src/assets",
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
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        if (id.includes("react")) return "react";
                        if (id.includes("react-router")) return "router";
                        if (id.includes("@reduxjs") || id.includes("react-redux")) return "redux";
                        if (id.includes("@mui")) return "mui";
                        if (id.includes("@ckeditor")) return "ckeditor";
                        if (id.includes("react-hook-form") || id.includes("yup")) return "form";
                        if (id.includes("react-toastify")) return "toast";
                        if (id.includes("@fortawesome")) return "fontawesome";
                        if (id.includes("react-markdown") || id.includes("remark-gfm")) return "markdown";
                        if (id.includes("@stomp") || id.includes("sockjs")) return "websocket";
                        if (id.includes("html2pdf")) return "html2pdf";
                        if (id.includes("@tanstack")) return "query";
                        if (id.includes("exceljs") || id.includes("file-saver")) return "exceljs";

                        return "vendor";
                    }
                },
            },
        },
    },
});
