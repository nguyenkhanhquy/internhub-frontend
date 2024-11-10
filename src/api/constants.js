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
    REGISTER_STUDENT: "/users/register/student",
    UPDATE_PASSWORD: "/users/update-password",
};

export const STUDENTS_API = {
    UPDATE_PROFILE: "/students/update-profile",
};
