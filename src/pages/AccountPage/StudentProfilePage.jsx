import MainLayout from "../../layouts/MainLayout/MainLayout";
import AccountLayout from "../../layouts/AccountLayout/AccountLayout";
import StudentProfileForm from "../../components/forms/ProfileForm/StudentProfileForm";
import PageNavigation from "../../components/layouts/PageNavigation/PageNavigation";

const StudentProfilePage = () => {
    return (
        <MainLayout title="Chi tiết hồ sơ">
            <PageNavigation pageName="Tài khoản" />
            <AccountLayout>
                <StudentProfileForm />
            </AccountLayout>
        </MainLayout>
    );
};

export default StudentProfilePage;
