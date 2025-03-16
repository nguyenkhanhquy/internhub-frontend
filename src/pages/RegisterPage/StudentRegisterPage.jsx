import MainLayout from "@layouts/MainLayout";
import StudentRegisterForm from "@components/forms/RegisterForm/Student";

const StudentRegisterPage = () => {
    return (
        <MainLayout title="Đăng ký">
            <StudentRegisterForm />
        </MainLayout>
    );
};

export default StudentRegisterPage;
