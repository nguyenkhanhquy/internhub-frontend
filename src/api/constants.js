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
    GET_ALL_STUDENTS_NOT_ENROLLED_IN_SEMESTER: "/admin/students/not-enrolled",

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
    LOCK_USER: (id) => `/users/${id}/lock`,
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
    GET_CURRENT_ENROLLMENT: "/students/current-enrollment",
    IMPORT: "/students/import",
};

export const TEACHERS_API = {
    GET_ALL: "/teachers",
    UPDATE: "/teachers/",
    DELETE: "/teachers/",

    GET_ALL_COURSES: "/teachers/courses",
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
    GET_ALL_BY_EXPIRED_RECRUITER: "/jobs/recruiter/expired",
    GET_ALL_BY_COMPANY_ID: "/jobs/company/",

    GET_ALL_SUITABLE_FOR_STUDENT: "/jobs/suitable",
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
    REPORT_QUIT: (id) => `/jobs/apply/report-quit/${id}`,
};

export const INTERNSHIP_REPORTS_API = {
    CREATE: "/internship-reports",
    GET_ALL_BY_STUDENT: "/internship-reports/student",

    SUBMIT: "/internship-reports/submit",
};

export const FILES_API = {
    UPLOAD_IMAGE: "/files/upload/image",
    UPLOAD_RAW: "/files/upload/raw",
};

export const ACADEMIC_API = {
    GET_ALL_YEAR_AND_SEMESTER: "/academic/year-and-semester",
    GET_OVERVIEW: "/academic/overview",
};

export const COURSES_API = {
    CREATE: "/courses",
    GET_ALL: "/courses",
    UPDATE: (id) => `/courses/${id}`,
    DELETE: (id) => `/courses/${id}`,
    GET_STUDENTS: (id) => `/courses/${id}/students`,
    ASSIGN_STUDENTS: (id) => `/courses/${id}/students/assign`,
    GET_ENROLLMENTS: (id) => `/courses/${id}/enrollments`,
    UPDATE_STATUS: (id) => `/courses/${id}/status`,
};

export const ENROLLMENT_API = {
    GET_ALL_BY_STUDENT: "/enrollments/student",
    UPDATE_FINAL_SCORE: (id) => `/enrollments/${id}/final-score`,
};

export const CV_API = {
    CREATE: "/curriculum-vitae",
    GET_ALL_BY_STUDENT: "/curriculum-vitae/student",
    DELETE: (id) => `/curriculum-vitae/${id}`,
};
