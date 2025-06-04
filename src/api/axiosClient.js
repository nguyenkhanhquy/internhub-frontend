import axios from "axios";
import { getToken, removeToken } from "@services/localStorageService";

const isDevelopment = import.meta.env.MODE === "development";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    async (config) => {
        if (isDevelopment) {
            await new Promise((resolve) => setTimeout(resolve, 500));
        }

        const accessToken = getToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response) => response?.data,
    (error) => {
        if (error?.response?.status === 401 && error?.response?.data?.message === "Chưa được xác thực") {
            removeToken();
            setTimeout(() => {
                window.location.href = "/login";
            }, 500);
        }
        return Promise.reject(error?.response?.data);
    },
);

export default axiosClient;
