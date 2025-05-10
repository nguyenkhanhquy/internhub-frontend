import axiosClient from "@api/axiosClient";
import { COURSES_API } from "@api/constants";

export const createCourse = async (course) => {
    return axiosClient.post(COURSES_API.CREATE, course);
};

export const getAllCourses = async (page, size, search, year, semester) => {
    const params = {
        page,
        size,
        ...(search && { search }),
        ...(year && { year }),
        ...(semester && { semester }),
    };

    return axiosClient.get(COURSES_API.GET_ALL, { params });
};

export const updateCourse = async (courseId, course) => {
    return axiosClient.put(COURSES_API.UPDATE(courseId), course);
};

export const deleteCourse = async (courseId) => {
    return axiosClient.delete(COURSES_API.DELETE(courseId));
};

export const getAllStudentsByCourseId = async (courseId) => {
    return axiosClient.get(COURSES_API.GET_STUDENTS(courseId));
};

export const assignStudentsToCourse = async (courseId, studentIds) => {
    return axiosClient.post(COURSES_API.ASSIGN_STUDENTS(courseId), {
        studentIds: studentIds,
    });
};
