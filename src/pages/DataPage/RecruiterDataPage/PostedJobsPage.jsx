import { useState } from "react";
import MainLayout from "../../../layouts/MainLayout/MainLayout";
import RecruiterDataLayout from "../../../layouts/DataLayout/RecruiterDataLayout";
import PageNavigation from "../../../components/layouts/PageNavigation/PageNavigation";
import PostedJobsGridView from "../../../components/data/RecruiterDataGridView/PostedJobsGridView";
import ApplicationListGridView from "../../../components/data/RecruiterDataGridView/ApplicationListGridView";

const PostedJobsPage = () => {
    const [currentView, setCurrentView] = useState("PostedJobs"); // Quản lý trạng thái giữa 2 component
    const [selectedPost, setSelectedPost] = useState(null); // Lưu thông tin công việc đã chọn

    // Xử lý khi nhấn "Xem hồ sơ ứng tuyển"
    const handleViewApplications = (post) => {
        setSelectedPost(post);
        setCurrentView("Applications"); // Chuyển sang giao diện ứng tuyển
    };

    // Xử lý quay lại danh sách công việc
    const handleBackToJobs = () => {
        setSelectedPost(null);
        setCurrentView("PostedJobs");
    };

    return (
        <MainLayout title="Việc làm đã đăng">
            <PageNavigation pageName="Nhà tuyển dụng" />
            <RecruiterDataLayout>
                {currentView === "PostedJobs" ? (
                    <PostedJobsGridView onViewApplications={handleViewApplications} />
                ) : (
                    <ApplicationListGridView
                        title={selectedPost.title}
                        jobPostId={selectedPost.id}
                        onBack={handleBackToJobs} // Xử lý quay lại danh sách công việc
                    />
                )}
            </RecruiterDataLayout>
        </MainLayout>
    );
};

export default PostedJobsPage;
