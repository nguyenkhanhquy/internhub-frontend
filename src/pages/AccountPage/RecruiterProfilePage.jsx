import MainLayout from "../../layouts/MainLayout/MainLayout";
import AccountLayout from "../../layouts/AccountLayout/AccountLayout";

const RecruiterProfilePage = () => {
    return (
        <MainLayout title="Chi tiết hồ sơ">
            <AccountLayout>
                <div className="h-screen">
                    <h1 className="text-3xl font-bold underline">Chi tiết hồ sơ nhà tuyển dụng</h1>
                </div>
            </AccountLayout>
        </MainLayout>
    );
};

export default RecruiterProfilePage;
