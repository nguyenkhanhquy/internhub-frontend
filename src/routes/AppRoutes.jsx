import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppWrapper from "../layouts/AppWrapper";
import useAuth from "../hooks/useAuth";

import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import StudentRegisterPage from "../pages/RegisterPage/StudentRegisterPage";
import RecruiterRegisterPage from "../pages/RegisterPage/RecruiterRegisterPage";
import StudentProfilePage from "../pages/AccountPage/StudentProfilePage";
import UpdatePasswordPage from "../pages/AccountPage/UpdatePasswordPage";
import SearchPage from "../pages/SearchPage/SearchPage";

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <BrowserRouter>
            {isAuthenticated ? (
                <Routes>
                    <Route path="/" element={<AppWrapper />}>
                        <Route index element={<HomePage />} />
                        <Route path="/login" element={<Navigate to="/" />} />
                        <Route path="/register-student" element={<Navigate to="/" />} />
                        <Route path="/register-recruiter" element={<Navigate to="/" />} />

                        <Route path="/account" element={<Navigate to="/account/profile" replace />} />
                        <Route path="/account/profile" element={<StudentProfilePage />} />
                        <Route path="/account/update-password" element={<UpdatePasswordPage />} />
                    </Route>
                </Routes>
            ) : (
                <Routes>
                    <Route path="/" element={<AppWrapper />}>
                        <Route index element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register-student" element={<StudentRegisterPage />} />
                        <Route path="/register-recruiter" element={<RecruiterRegisterPage />} />
                        <Route path="/get-jobs" element={<SearchPage />} />

                        <Route path="/account" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
            )}
        </BrowserRouter>
    );
};

export default AppRoutes;
