import MainLayout from "@layouts/MainLayout/MainLayout";
import RecruiterRegisterForm from "@components/forms/RegisterForm/Recruiter";

const RecruiterRegisterPage = () => {
    return (
        <MainLayout title="Đăng ký">
            <RecruiterRegisterForm />
        </MainLayout>
    );
};

export default RecruiterRegisterPage;
