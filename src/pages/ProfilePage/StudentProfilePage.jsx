import MainLayout from "../../layouts/MainLayout/MainLayout";
import StudentProfileForm from "../../components/forms/ProfileForm/StudentProfileForm";

const StudentProfilePage = () => {
    return (
        <MainLayout title="Hồ sơ">
            <StudentProfileForm />
        </MainLayout>
    );
};

export default StudentProfilePage;
