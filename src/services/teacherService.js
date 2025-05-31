import axiosClient from "@api/axiosClient";
import { TEACHERS_API } from "@api/constants";

export const getAllTeachers = async () => {
    return axiosClient.get(TEACHERS_API.GET_ALL);
};

export const updateTeacher = async (userId, teacherName, teacherId) => {
    return axiosClient.put(`${TEACHERS_API.UPDATE}${userId}`, {
        name: teacherName,
        teacherId: teacherId,
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

export const getAllCoursesByTeacher = async (page, size, search, year, semester) => {
    const params = {
        page,
        size,
        ...(search && { search }),
        ...(year && { year }),
        ...(semester && { semester }),
    };

    return axiosClient.get(TEACHERS_API.GET_ALL_COURSES, { params });
};
