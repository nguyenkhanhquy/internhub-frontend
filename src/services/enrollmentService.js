import axiosClient from "@api/axiosClient";
import { ENROLLMENT_API } from "@api/constants";

export const getAllEnrollmentsByStudent = async (page, size, search) => {
    return axiosClient.get(ENROLLMENT_API.GET_ALL_BY_STUDENT, {
        params: {
            page: page,
            size: size,
            search: search,
        },
    });
};
