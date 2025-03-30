import axiosClient from "@api/axiosClient";
import { USERS_API } from "@api/constants";

export const sendOTP = async (email) => {
    return axiosClient.post(USERS_API.SEND_OTP, {
        email: email,
    });
};

export const activateAccount = async (email, otp) => {
    return axiosClient.post(USERS_API.ACTIVATE, {
        email: email,
        otp: otp,
    });
};

export const requestActivateAccount = async (email) => {
    return axiosClient.post(USERS_API.REQUEST_ACTIVATE, {
        email: email,
    });
};

export const resetPassword = async (email, otp, newPassword) => {
    return axiosClient.post(USERS_API.RESET_PASSWORD, {
        email: email,
        otp: otp,
        newPassword: newPassword,
    });
};

export const registerRecruiter = async (recruiter) => {
    return axiosClient.post(USERS_API.REGISTER_RECRUITER, {
        email: recruiter.email,
        password: recruiter.password,
        company: recruiter.company,
        name: recruiter.name,
        position: recruiter.position,
        phone: recruiter.phone,
        recruiterEmail: recruiter.recruiterEmail,
    });
};

export const registerStudent = async (student) => {
    return axiosClient.post(USERS_API.REGISTER_STUDENT, {
        email: student.email,
        password: student.password,
        name: student.name,
        gender: student.gender,
        phone: student.phone,
        address: student.address,
        dob: student.dob,
        expGrad: student.expGrad,
        major: student.major,
        internStatus: student.internStatus,
        studentId: student.email.split("@")[0],
        gpa: student.gpa,
    });
};

export const updatePassword = async (oldPassword, newPassword) => {
    return axiosClient.post(USERS_API.UPDATE_PASSWORD, {
        oldPassword: oldPassword,
        newPassword: newPassword,
    });
};
