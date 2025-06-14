import MainLayout from "@layouts/MainLayout/MainLayout";
import StudentDataLayout from "@layouts/DataLayout/StudentDataLayout";
import PageNavigation from "@components/layouts/PageNavigation/PageNavigation";
import CoursesGridView from "@components/data/StudentDataGridView/CoursesGridView";

const SavedJobsPage = () => {
    return (
        <MainLayout title="Lớp thực tập">
            <PageNavigation pageName="Sinh viên" />
            <StudentDataLayout>
                <CoursesGridView />
            </StudentDataLayout>
        </MainLayout>
    );
};

export default SavedJobsPage;
