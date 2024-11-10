import MainLayout from "../../../layouts/MainLayout/MainLayout";
import StudentDataLayout from "../../../layouts/DataLayout/StudentDataLayout";
import PageNavigation from "../../../components/layouts/PageNavigation/PageNavigation";

const InternShipApplicationsPage = () => {
    return (
        <MainLayout title="Đơn thực tập">
            <PageNavigation pageName="Sinh viên" />
            <StudentDataLayout>
                <h1 className="text-3xl font-bold underline">Đơn đăng ký thực tập</h1>
            </StudentDataLayout>
        </MainLayout>
    );
};

export default InternShipApplicationsPage;
