import axiosClient from "../api/axiosClient";
import { JOB_APPLY_API } from "../api/constants";

export const applyJob = async (jobPostId, coverLetter, cv) => {
    return axiosClient.post(JOB_APPLY_API.APPLY, {
        jobPostId: jobPostId,
        coverLetter: coverLetter,
        cv: cv,
    });
};
