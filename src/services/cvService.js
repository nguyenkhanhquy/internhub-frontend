import axiosClient from "@api/axiosClient";
import { CV_API } from "@api/constants";

export const createCV = async (data) => {
    return axiosClient.post(CV_API.CREATE, {
        title: data.title,
        filePath: data.filePath,
    });
};

export const getAllCVsByStudent = async (page, size, search) => {
    return axiosClient.get(CV_API.GET_ALL_BY_STUDENT, {
        params: {
            page: page,
            size: size,
            search: search,
        },
    });
};

export const deleteCV = async (id) => {
    return axiosClient.delete(CV_API.DELETE(id));
};
