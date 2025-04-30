export const AUTH_API = {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    PROFILE: "/auth/profile",

    GOOGLE: "/auth/outbound/authentication",
};

export const ADMIN_API = {
    GET_OVERVIEW: "/admin/overview",
    GET_ALL_JOB_POSTS: "/admin/jobs",
    APPROVE_JOB_POST: "/admin/jobs/approve/",
    DELETE_JOB_POST: "/admin/jobs/delete/",

    GET_ALL_RECRUITERS: "/admin/recruiters",
    APPROVE_RECRUITER: "/admin/recruiters/approve/",

    GET_ALL_INTERNSHIP_REPORTS: "/admin/internship-reports",
    APPROVE_INTERNSHIP_REPORT: "/admin/internship-reports/approve/",
    REJECT_INTERNSHIP_REPORT: "/admin/internship-reports/reject/",

    GET_ALL_STUDENTS: "/admin/students",

    GET_ALL_TEACHERS: "/admin/teachers",
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

export const NOTIFICATIONS_API = {
    GET_ALL_BY_USER: "/notifications/user",
    MARK_AS_READ: "/notifications/mark-as-read/",
};

export const RECRUITERS_API = {
    GET_ALL: "/recruiters",
    UPDATE_PROFILE: "/recruiters/update-profile",
};

export const COMPANIES_API = {
    GET_ALL_APPROVED: "/companies/approved",
    GET_BY_ID: "/companies/",
};

export const STUDENTS_API = {
    GET_ALL: "/students",
    UPDATE_PROFILE: "/students/update-profile",
};

export const TEACHERS_API = {
    GET_ALL: "/teachers",
    UPDATE: "/teachers/",
    DELETE: "/teachers/",
    IMPORT: "/users/import/teachers",
};

export const JOBS_API = {
    CREATE: "/jobs",
    GET_ALL: "/jobs",
    GET_BY_ID: "/jobs/",
    UPDATE: "/jobs/",
    SAVE: "/jobs/save",
    HIDDEN: "/jobs/hidden/",

    GET_ALL_BY_RECRUITER: "/jobs/recruiter",
    GET_ALL_BY_COMPANY_ID: "/jobs/company/",
};

export const JOBS_SAVED_API = {
    GET_ALL: "/jobs/saved",
    DELETE_ALL: "/jobs/saved",
};

export const JOB_APPLY_API = {
    APPLY: "/jobs/apply",
    GET_ALL_BY_STUDENT: "/jobs/apply/student",
    GET_ALL_BY_JOB_POST_ID: "/jobs/apply/post/",
    REJECT: "/jobs/apply/reject/",
    INTERVIEW: "/jobs/apply/interview",
    OFFER: "/jobs/apply/offer/",
    ACCEPT_OFFER: "/jobs/apply/offer/accept/",
    REFUSE_OFFER: "/jobs/apply/offer/refuse/",
};

export const INTERNSHIP_REPORTS_API = {
    CREATE: "/internship-reports",
    GET_ALL_BY_STUDENT: "/internship-reports/student",
};

export const FILES_API = {
    UPLOAD_IMAGE: "/files/upload/image",
    UPLOAD_RAW: "/files/upload/raw",
};

export const ACADEMIC_API = {
    GET_ALL_YEAR_AND_SEMESTER: "/academic/year-and-semester",
};

export const COURSES_API = {
    GET_ALL: "/courses",
    DELETE: "/courses/",
};
