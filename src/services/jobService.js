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

export const getJobPostById = async (jobId) => {
    return axiosClient.get(JOBS_API.GET_BY_ID + jobId);
};
