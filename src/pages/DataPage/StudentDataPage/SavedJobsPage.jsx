import MainLayout from "../../../layouts/MainLayout/MainLayout";
import StudentDataLayout from "../../../layouts/DataLayout/StudentDataLayout";
import PageNavigation from "../../../components/layouts/PageNavigation/PageNavigation";

const SavedJobsPage = () => {
    return (
        <MainLayout title="Công việc đã lưu">
            <PageNavigation pageName="Sinh viên" />
            <StudentDataLayout>
                <h1 className="text-3xl font-bold underline">Công việc đã lưu</h1>
            </StudentDataLayout>
        </MainLayout>
    );
};

export default SavedJobsPage;
