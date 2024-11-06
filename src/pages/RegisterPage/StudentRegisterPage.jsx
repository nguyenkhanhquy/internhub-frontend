import MainLayout from "../../layouts/MainLayout/MainLayout";
import StudentRegisterForm from "../../components/forms/RegisterForm/Student/StudentRegisterForm";

const StudentRegisterPage = () => {
    return (
        <MainLayout title="Đăng ký">
            <StudentRegisterForm />
        </MainLayout>
    );
};

export default StudentRegisterPage;
