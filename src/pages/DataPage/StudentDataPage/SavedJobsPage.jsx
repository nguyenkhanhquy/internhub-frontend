import MainLayout from "@layouts/MainLayout/MainLayout";
import StudentDataLayout from "@layouts/DataLayout/StudentDataLayout";
import PageNavigation from "@components/layouts/PageNavigation/PageNavigation";
import SavedeJobsGridView from "@components/data/StudentDataGridView/SavedJobsGridView";

const SavedJobsPage = () => {
    return (
        <MainLayout title="Công việc đã lưu">
            <PageNavigation pageName="Sinh viên" />
            <StudentDataLayout>
                <SavedeJobsGridView />
            </StudentDataLayout>
        </MainLayout>
    );
};

export default SavedJobsPage;
