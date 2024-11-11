import MainLayout from "../../../layouts/MainLayout/MainLayout";
import RecruiterDataLayout from "../../../layouts/DataLayout/RecruiterDataLayout";
import PageNavigation from "../../../components/layouts/PageNavigation/PageNavigation";
import PostedJobsGridView from "../../../components/data/RecruiterDataGridView/PostedJobsGridView";

const PostedJobsPage = () => {
    return (
        <MainLayout title="Việc làm đã đăng">
            <PageNavigation pageName="Nhà tuyển dụng" />
            <RecruiterDataLayout>
                <PostedJobsGridView />
            </RecruiterDataLayout>
        </MainLayout>
    );
};

export default PostedJobsPage;
