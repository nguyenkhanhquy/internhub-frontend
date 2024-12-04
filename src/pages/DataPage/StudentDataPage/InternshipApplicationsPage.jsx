import MainLayout from "../../../layouts/MainLayout/MainLayout";
import StudentDataLayout from "../../../layouts/DataLayout/StudentDataLayout";
import PageNavigation from "../../../components/layouts/PageNavigation/PageNavigation";
import InternshipApplicationsGridView from "../../../components/data/StudentDataGridView/InternshipApplicationsGridView";

const InternshipApplicationsPage = () => {
    return (
        <MainLayout title="Đơn đăng ký thực tập">
            <PageNavigation pageName="Sinh viên" />
            <StudentDataLayout>
                <InternshipApplicationsGridView />
            </StudentDataLayout>
        </MainLayout>
    );
};

export default InternshipApplicationsPage;
