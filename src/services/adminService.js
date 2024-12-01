import axiosClient from "../api/axiosClient";
import { ADMIN_API } from "../api/constants";

export const getAllJobPosts = async () => {
    return axiosClient.get(ADMIN_API.GET_ALL_JOB_POSTS);
};

export const approveJobPost = async (id) => {
    return axiosClient.post(ADMIN_API.APPROVE_JOB_POST + id);
};

export const approveRecruiter = async (userId) => {
    return axiosClient.post(ADMIN_API.APPROVE_RECRUITER + userId);
};
