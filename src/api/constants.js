export const AUTH_API = {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    PROFILE: "/auth/profile",
};

export const ADMIN_API = {
    GET_ALL_JOB_POSTS: "/admin/jobs",
    APPROVE_JOB_POST: "/admin/jobs/approve/",
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
    GET_ALL: "/recruiters",
    UPDATE_PROFILE: "/recruiters/update-profile",
    APPROVE: "/recruiters/approve/",
};

export const STUDENTS_API = {
    GET_ALL: "/students",
    UPDATE_PROFILE: "/students/update-profile",
};

export const TEACHERS_API = {
    GET_ALL: "/teachers",
    IMPORT: "/teachers/import",
};

export const JOBS_API = {
    CREATE: "/jobs",
    GET_ALL: "/jobs",
    GET_BY_ID: "/jobs/",
    UPDATE: "/jobs/",
    SAVE: "/jobs/save",
    HIDDEN: "/jobs/hidden/",

    GET_ALL_BY_RECRUITER: "/jobs/recruiter",
};

export const JOBS_SAVED_API = {
    GET_ALL: "/jobs/saved",
    DELETE_ALL: "/jobs/saved",
};

export const JOB_APPLY_API = {
    APPLY: "/jobs/apply",
    GET_ALL_BY_STUDENT: "/jobs/apply/student",
};

export const FILES_API = {
    UPLOAD_IMAGE: "/files/upload/image",
    UPLOAD_RAW: "/files/upload/raw",
};
