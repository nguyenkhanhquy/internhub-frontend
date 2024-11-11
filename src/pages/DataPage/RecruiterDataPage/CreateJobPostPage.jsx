import MainLayout from "../../../layouts/MainLayout/MainLayout";
import RecruiterDataLayout from "../../../layouts/DataLayout/RecruiterDataLayout";
import PageNavigation from "../../../components/layouts/PageNavigation/PageNavigation";
import CreateJobPostForm from "../../../components/forms/CreateJobPostForm/CreateJobPostForm";

const CreateJobPostPage = () => {
    return (
        <MainLayout title="Thêm bài đăng">
            <PageNavigation pageName="Nhà tuyển dụng" />
            <RecruiterDataLayout>
                <CreateJobPostForm />
            </RecruiterDataLayout>
        </MainLayout>
    );
};

export default CreateJobPostPage;
