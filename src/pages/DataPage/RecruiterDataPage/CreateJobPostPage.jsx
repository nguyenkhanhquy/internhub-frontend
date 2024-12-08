import MainLayout from "../../../layouts/MainLayout/MainLayout";
import RecruiterDataLayout from "../../../layouts/DataLayout/RecruiterDataLayout";
import PageNavigation from "../../../components/layouts/PageNavigation/PageNavigation";
import CreateJobPostForm from "../../../components/forms/CreateJobPostForm/CreateJobPostForm";

const CreateJobPostPage = () => {
    return (
        <MainLayout title="Tạo bài đăng">
            <PageNavigation pageName="Nhà tuyển dụng" />
            <RecruiterDataLayout>
                <div className="max-w-5xl rounded-lg shadow-lg">
                    <CreateJobPostForm />
                </div>
            </RecruiterDataLayout>
        </MainLayout>
    );
};

export default CreateJobPostPage;
