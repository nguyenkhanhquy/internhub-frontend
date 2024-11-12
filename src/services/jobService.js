import axiosClient from "../api/axiosClient";
import { JOBS_API } from "../api/constants";

export const getAllJobPosts = async (page, size, search, order) => {
    return axiosClient.get(JOBS_API.GET_ALL, {
        params: {
            page: page,
            size: size,
            search: search,
            order: order,
        },
    });
};

export const getJobPostById = async (jobPostId) => {
    return axiosClient.get(JOBS_API.GET_BY_ID + jobPostId);
};

export const saveJobPost = async (jobPostId) => {
    return axiosClient.post(JOBS_API.SAVE, {
        id: String(jobPostId),
    });
};

export const getAllSavedJobPosts = async (page, size, search) => {
    return axiosClient.get(JOBS_API.GET_SAVED, {
        params: {
            page: page,
            size: size,
            search: search,
        },
    });
};
