import axiosClient from "@api/axiosClient";
import { STUDENTS_API } from "@api/constants";

export const getAllStudents = async () => {
    return axiosClient.get(STUDENTS_API.GET_ALL);
};

export const updateProfile = async (profile) => {
    return axiosClient.post(STUDENTS_API.UPDATE_PROFILE, {
        name: profile.name,
        major: profile.major,
        phone: profile.phone,
        gpa: profile.gpa,
        gender: profile.gender,
        internStatus: profile.internStatus,
        dob: profile.dob,
        expGrad: profile.expGrad,
        address: profile.address,
    });
};

export const getCurrentEnrollment = async () => {
    return axiosClient.get(STUDENTS_API.GET_CURRENT_ENROLLMENT);
};

export const importStudents = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosClient.post(STUDENTS_API.IMPORT, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
