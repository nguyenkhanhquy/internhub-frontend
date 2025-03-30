import axiosClient from "@api/axiosClient";
import { NOTIFICATIONS_API } from "@api/constants";

export const getAllNotificationsByUser = async () => {
    return axiosClient.get(NOTIFICATIONS_API.GET_ALL_BY_USER);
};

export const markNotificationAsRead = async (notificationId) => {
    return axiosClient.put(NOTIFICATIONS_API.MARK_AS_READ + notificationId);
};
