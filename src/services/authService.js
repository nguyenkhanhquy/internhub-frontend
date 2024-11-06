import axiosClient from "../api/axiosClient";
import { AUTH_API } from "../api/constants";

export const login = async (email, password) => {
    return axiosClient
        .post(AUTH_API.LOGIN, {
            email: email,
            password: password,
        })
        .then((response) => response?.data)
        .catch((error) => error?.response?.data);
};

export const logout = async (accessToken) => {
    return axiosClient
        .post(AUTH_API.LOGOUT, {
            accessToken: accessToken,
        })
        .then((response) => response?.data)
        .catch((error) => error?.response?.data);
};

export const getAuthUser = async () => {
    return axiosClient
        .get(AUTH_API.ME)
        .then((response) => response?.data)
        .catch((error) => error?.response?.data);
};
