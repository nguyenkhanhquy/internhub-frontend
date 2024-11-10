import MainLayout from "../../../layouts/MainLayout/MainLayout";
import StudentDataLayout from "../../../layouts/DataLayout/StudentDataLayout";
import PageNavigation from "../../../components/layouts/PageNavigation/PageNavigation";
import AppliedJobsGridView from "../../../components/data/StudentDataGridView/AppliedJobsGridView";

const AppliedJobsPage = () => {
    return (
        <MainLayout title="Công việc ứng tuyển">
            <PageNavigation pageName="Sinh viên" />
            <StudentDataLayout>
                <AppliedJobsGridView />
            </StudentDataLayout>
        </MainLayout>
    );
};

export default AppliedJobsPage;
