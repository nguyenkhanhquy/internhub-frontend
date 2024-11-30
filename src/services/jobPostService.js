import axiosClient from "../api/axiosClient";
import { JOBS_API } from "../api/constants";

export const createJobPost = async (jobPost) => {
    return axiosClient.post(JOBS_API.CREATE, {
        title: jobPost.title,
        type: jobPost.type,
        remote: jobPost.remote,
        description: jobPost.description,
        salary: jobPost.salary,
        quantity: jobPost.quantity,
        expiryDate: jobPost.expiryDate,
        jobPosition: jobPost.jobPosition,
        requirements: jobPost.requirements,
        benefits: jobPost.benefits,
        majors: jobPost.majors,
        address: jobPost.address,
    });
};

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
        id: jobPostId,
    });
};

export const getJobPostsByRecruiter = async (page, size, search, order, isApproved, isHidden, isDeleted) => {
    return axiosClient.get(JOBS_API.GET_ALL_BY_RECRUITER, {
        params: {
            page: page,
            size: size,
            search: search,
            order: order,
            isApproved: isApproved,
            isHidden: isHidden,
            isDeleted: isDeleted,
        },
    });
};
