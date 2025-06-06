import MainLayout from "@layouts/MainLayout/MainLayout";
import AccountLayout from "@layouts/AccountLayout/AccountLayout";
import AccountDetailsForm from "@components/forms/AccountDetailsForm/AccountDetailsForm";
import PageNavigation from "@components/layouts/PageNavigation/PageNavigation";

const AccountDetailsPage = () => {
    return (
        <MainLayout title="Chi tiết tài khoản">
            <PageNavigation pageName="Tài khoản" />
            <AccountLayout>
                <AccountDetailsForm />
            </AccountLayout>
        </MainLayout>
    );
};

export default AccountDetailsPage;
