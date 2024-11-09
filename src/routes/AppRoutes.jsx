import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppWrapper from "../layouts/AppWrapper";
import Loading from "../components/loaders/Loading/Loading";
import useAuth from "../hooks/useAuth";

import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import StudentRegisterPage from "../pages/RegisterPage/StudentRegisterPage";
import RecruiterRegisterPage from "../pages/RegisterPage/RecruiterRegisterPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import JobDetailsPage from "../pages/JobDetailsPage/JobDetailsPage";

import StudentProfilePage from "../pages/AccountPage/StudentProfilePage";
import UpdatePasswordPage from "../pages/AccountPage/UpdatePasswordPage";
import AccountDetailsPage from "../pages/AccountPage/AccountDetailsPage";

import StudentDataPage from "../pages/DataPage/StudentDataPage/StudentDataPage";

const AppRoutes = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <Loading />
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppWrapper />}>
                    <Route index element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/search/*" element={<JobDetailsPage />} />

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

                            <Route path="/student" element={<StudentDataPage />} />
                        </>
                    ) : (
                        <>
                            {/* Chỉ định trang khi chưa xác thực */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register-student" element={<StudentRegisterPage />} />
                            <Route path="/register-recruiter" element={<RecruiterRegisterPage />} />

                            <Route path="/account/*" element={<Navigate to="/" replace />} />
                            <Route path="/student/*" element={<Navigate to="/" replace />} />
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
