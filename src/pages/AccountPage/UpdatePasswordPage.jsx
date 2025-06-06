import MainLayout from "@layouts/MainLayout/MainLayout";
import AccountLayout from "@layouts/AccountLayout/AccountLayout";
import UpdatePasswordForm from "@components/forms/UpdatePasswordForm/UpdatePasswordForm";
import PageNavigation from "@components/layouts/PageNavigation/PageNavigation";

const UpdatePasswordPage = () => {
    return (
        <MainLayout title="Đổi mật khẩu">
            <PageNavigation pageName="Tài khoản" />
            <AccountLayout>
                <UpdatePasswordForm />
            </AccountLayout>
        </MainLayout>
    );
};

export default UpdatePasswordPage;
