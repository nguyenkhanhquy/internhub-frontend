import axiosClient from "../api/axiosClient";
import { AUTH_API } from "../api/constants";

export const login = async (email, password) => {
    return axiosClient.post(AUTH_API.LOGIN, {
        email: email,
        password: password,
    });
};

export const logout = async (accessToken) => {
    return axiosClient.post(AUTH_API.LOGOUT, {
        accessToken: accessToken,
    });
};

export const refresh = async (accessToken) => {
    return axiosClient.post(AUTH_API.REFRESH, {
        accessToken: accessToken,
    });
};

export const getAuthUser = async () => {
    return axiosClient.get(AUTH_API.ME);
};

export const getAuthProfile = async () => {
    return axiosClient.get(AUTH_API.PROFILE);
};
