import { lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AppWrapper from "@layouts/AppWrapper";
import Loading from "@components/loaders/Loading/Loading";
import useAuth from "@hooks/useAuth";

import NotFoundPage from "@pages/ErrorPage/404/NotFoundPage";

import HomePage from "@pages/HomePage/HomePage";
import SearchPage from "@pages/SearchPage/SearchPage";
import JobDetailsPage from "@pages/JobDetailsPage/JobDetailsPage";
import CompanyListingPage from "@pages/CompanyListingPage/CompanyListingPage";
import CompanyDetailsPage from "@pages/CompanyDetailsPage/CompanyDetailsPage";

import LoginPage from "@pages/LoginPage/LoginPage";
import LogoutPage from "@pages/LogoutPage/LogoutPage";
import StudentRegisterPage from "@pages/RegisterPage/StudentRegisterPage";
import RecruiterRegisterPage from "@pages/RegisterPage/RecruiterRegisterPage";
// import VerifyPage from "@pages/VerifyPage/VerifyPage";
const VerifyPage = lazy(() => import("@pages/VerifyPage/VerifyPage"));
// import ResetPasswordPage from "@pages/ResetPasswordPage/ResetPasswordPage";
const ResetPasswordPage = lazy(() => import("@pages/ResetPasswordPage/ResetPasswordPage"));

// import RecruiterProfilePage from "@pages/AccountPage/RecruiterProfilePage";
const RecruiterProfilePage = lazy(() => import("@pages/AccountPage/RecruiterProfilePage"));
// import StudentProfilePage from "@pages/AccountPage/StudentProfilePage";
const StudentProfilePage = lazy(() => import("@pages/AccountPage/StudentProfilePage"));
// import UpdatePasswordPage from "@pages/AccountPage/UpdatePasswordPage";
const UpdatePasswordPage = lazy(() => import("@pages/AccountPage/UpdatePasswordPage"));
// import AccountDetailsPage from "@pages/AccountPage/AccountDetailsPage";
const AccountDetailsPage = lazy(() => import("@pages/AccountPage/AccountDetailsPage"));

// import AppliedJobsPage from "@pages/DataPage/StudentDataPage/AppliedJobsPage";
const AppliedJobsPage = lazy(() => import("@pages/DataPage/StudentDataPage/AppliedJobsPage"));
// import SavedJobsPage from "@pages/DataPage/StudentDataPage/SavedJobsPage";
const SavedJobsPage = lazy(() => import("@pages/DataPage/StudentDataPage/SavedJobsPage"));
// import InternshipApplicationsPage from "@pages/DataPage/StudentDataPage/InternshipApplicationsPage";
const InternshipApplicationsPage = lazy(() => import("@pages/DataPage/StudentDataPage/InternshipApplicationsPage"));

// import PostedJobsPage from "@pages/DataPage/RecruiterDataPage/PostedJobsPage";
const PostedJobsPage = lazy(() => import("@pages/DataPage/RecruiterDataPage/PostedJobsPage"));
// import CreateJobPostPage from "@pages/DataPage/RecruiterDataPage/CreateJobPostPage";
const CreateJobPostPage = lazy(() => import("@pages/DataPage/RecruiterDataPage/CreateJobPostPage"));

// import DashboardPage from "@pages/DashboardPage/Admin/DashboardPage";
const DashboardPage = lazy(() => import("@pages/DashboardPage/Admin/DashboardPage"));

import ReduxToolkitPage from "@/pages/ReduxToolkitPage";

const AppRoutes = () => {
    const { user, isAuthenticated, loading } = useAuth();

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
                    {/* Redux Toolkit Page */}
                    <Route path="/redux-toolkit" element={<ReduxToolkitPage />} />

                    {/* Public Routes - Accessible by everyone */}
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="/logout" element={<LogoutPage />} />

                    {/* FIT Admin Routes */}
                    {user?.role === "FIT" && (
                        <>
                            <Route index element={<DashboardPage />} />
                            <Route path="/*" element={<Navigate to="/" replace />} />
                        </>
                    )}

                    {/* Student/Recruiter Routes */}
                    {user?.role !== "FIT" && (
                        <>
                            {user?.role === "RECRUITER" && (
                                <>
                                    {user?.approved ? (
                                        <Route index element={<Navigate to="/recruiter/posted-jobs" replace />} />
                                    ) : (
                                        <Route index element={<Navigate to="/account/profile" replace />} />
                                    )}

                                    <Route path="/search" element={<Navigate to="/" replace />} />
                                    <Route path="/search/:id" element={<Navigate to="/" replace />} />
                                    <Route path="/companies" element={<Navigate to="/" replace />} />
                                    <Route path="/companies/:id" element={<Navigate to="/" replace />} />
                                </>
                            )}

                            {/* Public Routes for non-FIT users */}
                            <Route index element={<HomePage />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route path="/search/:id" element={<JobDetailsPage />} />
                            <Route path="/companies" element={<CompanyListingPage />} />
                            <Route path="/companies/:id" element={<CompanyDetailsPage />} />

                            {isAuthenticated ? (
                                <>
                                    {/* Authenticated User Routes */}
                                    {/* Account Routes */}
                                    <Route path="/account">
                                        <Route index element={<Navigate to="/account/profile" replace />} />
                                        <Route
                                            path="profile"
                                            element={(() => {
                                                switch (user?.role) {
                                                    case "STUDENT":
                                                        return <StudentProfilePage />;
                                                    case "RECRUITER":
                                                        return <RecruiterProfilePage />;
                                                    default:
                                                        return <Navigate to="/" replace />;
                                                }
                                            })()}
                                        />
                                        <Route path="update-password" element={<UpdatePasswordPage />} />
                                        <Route path="details" element={<AccountDetailsPage />} />
                                    </Route>

                                    {/* Student Specific Routes */}
                                    {user?.role === "STUDENT" && (
                                        <Route path="/student">
                                            <Route index element={<Navigate to="/student/applied-jobs" replace />} />
                                            <Route path="applied-jobs" element={<AppliedJobsPage />} />
                                            <Route path="saved-jobs" element={<SavedJobsPage />} />
                                            <Route path="internship-reports" element={<InternshipApplicationsPage />} />
                                        </Route>
                                    )}

                                    {/* Recruiter Specific Routes */}
                                    {user?.role === "RECRUITER" && user?.approved && (
                                        <Route path="/recruiter">
                                            <Route index element={<Navigate to="/recruiter/posted-jobs" replace />} />
                                            <Route path="posted-jobs" element={<PostedJobsPage />} />
                                            <Route path="create-job-post" element={<CreateJobPostPage />} />
                                        </Route>
                                    )}

                                    {/* Redirect authenticated users from auth pages */}
                                    <Route path="/login" element={<Navigate to="/" replace />} />
                                    <Route path="/register-student" element={<Navigate to="/" replace />} />
                                    <Route path="/register-recruiter" element={<Navigate to="/" replace />} />
                                </>
                            ) : (
                                <>
                                    {/* Non-authenticated Routes */}
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register-student" element={<StudentRegisterPage />} />
                                    <Route path="/register-recruiter" element={<RecruiterRegisterPage />} />
                                    <Route path="/verify" element={<VerifyPage />} />
                                    <Route path="/reset-password" element={<ResetPasswordPage />} />

                                    {/* Protect authenticated routes */}
                                    <Route path="/account/*" element={<Navigate to="/" replace />} />
                                    <Route path="/student/*" element={<Navigate to="/" replace />} />
                                    <Route path="/recruiter/*" element={<Navigate to="/" replace />} />
                                </>
                            )}
                        </>
                    )}

                    {/* Catch all unmatched routes */}
                    <Route path="/*" element={<Navigate to="/404" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
