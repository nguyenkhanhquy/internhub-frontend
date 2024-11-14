export const AUTH_API = {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    PROFILE: "/auth/profile",
};

export const USERS_API = {
    SEND_OTP: "/users/verify/send-otp",
    ACTIVATE: "/users/verify/activate-account",
    REQUEST_ACTIVATE: "/users/verify/request-activate-account",
    RESET_PASSWORD: "/users/verify/reset-password",
    REGISTER_RECRUITER: "/users/register/recruiter",
    REGISTER_STUDENT: "/users/register/student",
    UPDATE_PASSWORD: "/users/update-password",
};

export const RECRUITERS_API = {
    UPDATE_PROFILE: "/recruiters/update-profile",
};

export const STUDENTS_API = {
    UPDATE_PROFILE: "/students/update-profile",
};

export const JOBS_API = {
    GET_ALL: "/jobs",
    GET_BY_ID: "/jobs/",
    SAVE: "/jobs/save",
};

export const JOBS_SAVED_API = {
    GET_ALL: "/jobs/saved",
    DELETE_ALL: "/jobs/saved",
};
