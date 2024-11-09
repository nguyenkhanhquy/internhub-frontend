import axiosClient from "../api/axiosClient";
import { USERS_API } from "../api/constants";

export const updatePassword = async (oldPassword, newPassword) => {
    return axiosClient.post(USERS_API.UPDATE_PASSWORD, {
        oldPassword: oldPassword,
        newPassword: newPassword,
    });
};
