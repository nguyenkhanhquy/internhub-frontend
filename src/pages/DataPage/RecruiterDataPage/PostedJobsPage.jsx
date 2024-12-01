import { useState } from "react";
import MainLayout from "../../../layouts/MainLayout/MainLayout";
import RecruiterDataLayout from "../../../layouts/DataLayout/RecruiterDataLayout";
import PageNavigation from "../../../components/layouts/PageNavigation/PageNavigation";
import PostedJobsGridView from "../../../components/data/RecruiterDataGridView/PostedJobsGridView";
import ApplicationListGridView from "../../../components/data/RecruiterDataGridView/ApplicationListGridView";

const MocPost = {
    id: 1,
    title: "Nhân viên kinh doanh",
    applications: [
        {
            id: 1,
            name: "Nguyễn Văn A",
            applyDate: "2022-01-01",
            coverLetter: "Tôi muốn ứng tuyển vào vị trí này",
            status: "PROCESSING",
        },
        {
            id: 2,
            name: "Nguyễn Văn B",
            applyDate: "2022-01-02",
            coverLetter: "Tôi muốn ứng tuyển vào vị trí này",
            status: "INTERVIEW",
        },
        {
            id: 3,
            name: "Nguyễn Văn C",
            applyDate: "2022-01-03",
            coverLetter: "Tôi muốn ứng tuyển vào vị trí này",
            status: "REJECTED",
        },
        {
            id: 4,
            name: "Nguyễn Văn D",
            applyDate: "2022-01-04",
            coverLetter: "Tôi muốn ứng tuyển vào vị trí này",
            status: "REFUSED",
        },
        {
            id: 5,
            name: "Nguyễn Văn E",
            applyDate: "2022-01-05",
            coverLetter: "Tôi muốn ứng tuyển vào vị trí này",
            status: "OFFER",
        },
        {
            id: 6,
            name: "Nguyễn Văn F",
            applyDate: "2022-01-06",
            coverLetter: "Tôi muốn ứng tuyển vào vị trí này",
            status: "ACCEPTED",
        },
    ],
};

const PostedJobsPage = () => {
    const [currentView, setCurrentView] = useState("PostedJobs"); // Quản lý trạng thái giữa 2 component
    const [selectedPost, setSelectedPost] = useState(null); // Lưu thông tin công việc đã chọn

    // Xử lý khi nhấn "Xem hồ sơ ứng tuyển"
    const handleViewApplications = (post) => {
        setSelectedPost(MocPost); // Lưu thông tin công việc
        // Xử lý api ở đây được không, haizzz, code khá xấu nhưng tôi đã cố gắng hết sức
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
                        title={selectedPost?.title || ""}
                        applications={selectedPost?.applications || []}
                        onBack={handleBackToJobs} // Xử lý quay lại danh sách công việc
                    />
                )}
            </RecruiterDataLayout>
        </MainLayout>
    );
};

export default PostedJobsPage;
