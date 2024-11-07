import MainLayout from "../../layouts/MainLayout/MainLayout";
import AccountLayout from "../../layouts/AccountLayout/AccountLayout";
import StudentProfileForm from "../../components/forms/ProfileForm/StudentProfileForm";

const StudentProfilePage = () => {
    return (
        <MainLayout title="Chi tiết hồ sơ">
            <AccountLayout>
                <StudentProfileForm />
            </AccountLayout>
        </MainLayout>
    );
};

export default StudentProfilePage;
