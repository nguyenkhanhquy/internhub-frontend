import axiosClient from "../api/axiosClient";
import { ADMIN_API } from "../api/constants";

export const getOverview = async () => {
    return axiosClient.get(ADMIN_API.GET_OVERVIEW);
};

export const getAllJobPosts = async () => {
    return axiosClient.get(ADMIN_API.GET_ALL_JOB_POSTS);
};

export const approveJobPost = async (id) => {
    return axiosClient.post(ADMIN_API.APPROVE_JOB_POST + id);
};

export const deleteJobPost = async (id) => {
    return axiosClient.post(ADMIN_API.DELETE_JOB_POST + id);
};

export const getAllRecruiters = async (page, size, search) => {
    return axiosClient.get(ADMIN_API.GET_ALL_RECRUITERS, {
        params: {
            page: page,
            size: size,
            search: search,
        },
    });
};

export const approveRecruiter = async (userId) => {
    return axiosClient.post(ADMIN_API.APPROVE_RECRUITER + userId);
};

export const getAllInternshipReports = async () => {
    return axiosClient.get(ADMIN_API.GET_ALL_INTERNSHIP_REPORTS);
};

export const approveInternshipReport = async (id) => {
    return axiosClient.post(ADMIN_API.APPROVE_INTERNSHIP_REPORT + id);
};

export const rejectInternshipReport = async (id) => {
    return axiosClient.post(ADMIN_API.REJECT_INTERNSHIP_REPORT + id);
};
