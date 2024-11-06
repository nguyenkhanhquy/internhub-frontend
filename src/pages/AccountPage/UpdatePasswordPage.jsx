import MainLayout from "../../layouts/MainLayout/MainLayout";
import AccountLayout from "../../layouts/AccountLayout/AccountLayout";
import UpdatePasswordForm from "../../components/forms/UpdatePasswordForm/UpdatePasswordForm";

const UpdatePasswordPage = () => {
    return (
        <MainLayout title="Đổi mật khẩu">
            <AccountLayout>
                <UpdatePasswordForm />
            </AccountLayout>
        </MainLayout>
    );
};

export default UpdatePasswordPage;
