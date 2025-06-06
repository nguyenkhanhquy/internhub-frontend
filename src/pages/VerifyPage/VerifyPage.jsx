import { Navigate, useLocation } from "react-router-dom";

import MainLayout from "@layouts/MainLayout/MainLayout";
import VerifyForm from "@components/forms/VerifyForm/VerifyForm";

const VerifyPage = () => {
    const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const email = queryParams.get("email");

    // navigate("/verify", { state: { email: formData.email } });
    const email = location.state?.email;
    const action = location.state?.action;

    return email ? (
        <MainLayout title="Xác thực tài khoản">
            <VerifyForm email={email} action={action} />
        </MainLayout>
    ) : (
        <Navigate to="/" />
    );
};

export default VerifyPage;
