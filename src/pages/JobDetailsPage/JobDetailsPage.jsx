import MainLayout from "../../layouts/MainLayout/MainLayout";
import PageNavigation from "../../components/layouts/PageNavigation/PageNavigation";
import JobDetailHeader from "../../components/job/JobDetail/JobDetailHeader";
import JobDetailBody from "../../components/job/JobDetail/JobDetailBody";
import Box from "@mui/material/Box";

const JobDetailsPage = () => {
    const handleSaveJob = () => {
        alert("Công việc đã được lưu!");
    };

    const handleApplyJob = () => {
        alert("Bạn đã nộp đơn thành công!");
    };

    const jobDescription = [
        "Phát triển và duy trì các ứng dụng frontend bằng React.",
        "Đảm bảo mã nguồn sạch, hiệu quả và có thể tái sử dụng.",
        "Phối hợp với các nhóm thiết kế để tối ưu trải nghiệm người dùng.",
    ];
    const jobBenefits = [
        "Bảo hiểm xã hội và y tế theo quy định của pháp luật",
        "Thưởng hiệu suất và thưởng dự án",
        "Cơ hội thăng tiến và phát triển nghề nghiệp",
    ];
    const jobRequirements = [
        "Có kinh nghiệm làm việc với React ít nhất 2 năm",
        "Hiểu biết về HTML, CSS, JavaScript",
        "Kỹ năng giải quyết vấn đề tốt",
        "Có khả năng làm việc độc lập và theo nhóm",
    ];

    const jobAddress = "Tòa nhà Sunwah, 115 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh";

    return (
        <MainLayout title="Chi tiết công việc">
            <PageNavigation pageName="Chi tiết công việc" />
            <div style={{ margin: "20px 160px" }}>
                <Box sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
                    <JobDetailHeader
                        logo="https://innhanhhcm.vn/wp-content/uploads/2023/11/logo-fpt-01-1024x774.jpg"
                        title="Senior Frontend Developer"
                        companyName="Axon Active Vietnam"
                        address="TP. Hồ Chí Minh"
                        jobPosition="Frontend Developer"
                        type="Full-time"
                        salary="1000 - 2000 USD"
                        updateDate={new Date("2024-11-05")}
                        expiryDate={new Date("2024-12-31")}
                        onSaveJob={handleSaveJob}
                        onApplyJob={handleApplyJob}
                    />
                </Box>
                <JobDetailBody
                    description={jobDescription}
                    benefits={jobBenefits}
                    requirements={jobRequirements}
                    address={jobAddress}
                />
            </div>
        </MainLayout>
    );
};

export default JobDetailsPage;
