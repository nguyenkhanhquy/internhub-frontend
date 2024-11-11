import MainLayout from "../../layouts/MainLayout/MainLayout";
import AccountLayout from "../../layouts/AccountLayout/AccountLayout";
import PageNavigation from "../../components/layouts/PageNavigation/PageNavigation";
import RecruiterProfileForm from "../../components/forms/ProfileForm/RecruiterProfileForm";

const RecruiterProfilePage = () => {
    return (
        <MainLayout title="Chi tiết hồ sơ">
            <PageNavigation pageName="Tài khoản" />
            <AccountLayout>
                <RecruiterProfileForm />
            </AccountLayout>
        </MainLayout>
    );
};

export default RecruiterProfilePage;
