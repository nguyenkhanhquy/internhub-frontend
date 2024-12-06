import axiosClient from "../api/axiosClient";
import { TEACHERS_API } from "../api/constants";

export const getAllTeachers = async () => {
    return axiosClient.get(TEACHERS_API.GET_ALL);
};

export const updateTeacher = async (teacherId, teacherName, teacherEmail) => {
    return axiosClient.put(`${TEACHERS_API.UPDATE}${teacherId}`, {
        name: teacherName,
        email: teacherEmail,
    });
};

export const deleteTeacher = async (teacherId) => {
    return axiosClient.delete(`${TEACHERS_API.DELETE}${teacherId}`);
};

export const importTeachers = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosClient.post(TEACHERS_API.IMPORT, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
