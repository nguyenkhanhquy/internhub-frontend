// Before alias
// import MainLayout from "../../layouts/MainLayout/MainLayout";
// import LoginForm from "../../components/forms/LoginForm/LoginForm";

// After alias
import MainLayout from "@layouts/MainLayout";
import LoginForm from "@components/forms/LoginForm";

const LoginPage = () => {
    return (
        <MainLayout title="Đăng nhập">
            <LoginForm />
        </MainLayout>
    );
};

export default LoginPage;
