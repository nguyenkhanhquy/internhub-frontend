import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppWrapper from "../layouts/AppWrapper";
import useAuth from "../hooks/useAuth";

import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import StudentRegisterPage from "../pages/RegisterPage/StudentRegisterPage";
import RecruiterRegisterPage from "../pages/RegisterPage/RecruiterRegisterPage";
import SearchPage from "../pages/SearchPage/SearchPage";

import StudentProfilePage from "../pages/AccountPage/StudentProfilePage";
import UpdatePasswordPage from "../pages/AccountPage/UpdatePasswordPage";
import AccountDetailsPage from "../pages/AccountPage/AccountDetailsPage";

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppWrapper />}>
                    <Route index element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />

                    {isAuthenticated ? (
                        <>
                            {/* Chỉ định trang khi đã xác thực */}
                            <Route path="/login" element={<Navigate to="/" replace />} />
                            <Route path="/register-student" element={<Navigate to="/" replace />} />
                            <Route path="/register-recruiter" element={<Navigate to="/" replace />} />

                            <Route path="/account" element={<Navigate to="/account/profile" replace />} />
                            <Route path="/account/profile" element={<StudentProfilePage />} />
                            <Route path="/account/update-password" element={<UpdatePasswordPage />} />
                            <Route path="/account/details" element={<AccountDetailsPage />} />
                        </>
                    ) : (
                        <>
                            {/* Chỉ định trang khi chưa xác thực */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register-student" element={<StudentRegisterPage />} />
                            <Route path="/register-recruiter" element={<RecruiterRegisterPage />} />

                            <Route path="/account/*" element={<Navigate to="/" replace />} />
                        </>
                    )}

                    {/* Điều hướng về trang chủ cho tất cả các URL không được định nghĩa */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
