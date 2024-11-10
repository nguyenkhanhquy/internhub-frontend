import { Navigate, useLocation } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm/ResetPasswordForm";

const ResetPasswordPage = () => {
    const location = useLocation();

    const email = location.state?.email;

    return email ? (
        <MainLayout title="Đặt lại mật khẩu">
            <ResetPasswordForm email={email} />
        </MainLayout>
    ) : (
        <Navigate to="/" />
    );
};

export default ResetPasswordPage;
