import MainLayout from "../../../layouts/MainLayout/MainLayout";
import StudentDataLayout from "../../../layouts/DataLayout/StudentDataLayout";
import PageNavigation from "../../../components/layouts/PageNavigation/PageNavigation";

const AppliedJobPage = () => {
    return (
        <MainLayout title="Công việc ứng tuyển">
            <PageNavigation pageName="Sinh viên" />
            <StudentDataLayout>
                <h1 className="text-3xl font-bold underline">Công việc ứng tuyển</h1>
            </StudentDataLayout>
        </MainLayout>
    );
};

export default AppliedJobPage;
