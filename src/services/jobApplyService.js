import axiosClient from "../api/axiosClient";
import { JOB_APPLY_API } from "../api/constants";

export const applyJob = async (jobPostId, coverLetter, cv) => {
    return axiosClient.post(JOB_APPLY_API.APPLY, {
        jobPostId: jobPostId,
        coverLetter: coverLetter,
        cv: cv,
    });
};

export const getAllJobApplyByStudent = async (page, size, search) => {
    return axiosClient.get(JOB_APPLY_API.GET_ALL_BY_STUDENT, {
        params: {
            page: page,
            size: size,
            search: search,
        },
    });
};

export const getAllJobApplyByJobPostId = async (jobPostId, page, size) => {
    return axiosClient.get(JOB_APPLY_API.GET_ALL_BY_JOB_POST_ID + jobPostId, {
        params: {
            page: page,
            size: size,
        },
    });
};

export const rejectJobApply = async (jobApplyId) => {
    return axiosClient.put(JOB_APPLY_API.REJECT + jobApplyId);
};

export const interviewJobApply = async (jobApplyId, interviewLetter) => {
    return axiosClient.put(JOB_APPLY_API.INTERVIEW, {
        jobApplyId: jobApplyId,
        interviewLetter: interviewLetter,
    });
};

export const offerJobApply = async (jobApplyId) => {
    return axiosClient.put(JOB_APPLY_API.OFFER + jobApplyId);
};

export const acceptOfferJobApply = async (jobApplyId) => {
    return axiosClient.put(JOB_APPLY_API.ACCEPT_OFFER + jobApplyId);
};

export const refuseOfferJobApply = async (jobApplyId) => {
    return axiosClient.put(JOB_APPLY_API.REFUSE_OFFER + jobApplyId);
};
