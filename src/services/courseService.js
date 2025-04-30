import axiosClient from "@api/axiosClient";
import { COURSES_API } from "@api/constants";

export const getAllCourses = async (page, size, search, year, semester) => {
    return axiosClient.get(COURSES_API.GET_ALL, {
        params: {
            page: page,
            size: size,
            search: search,
            year: year,
            semester: semester,
        },
    });
};

export const deleteCourse = async (courseId) => {
    return axiosClient.delete(COURSES_API.DELETE + courseId);
};
