import { useEffect } from "react";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import PageNavigation from "../../components/layouts/PageNavigation/PageNavigation";
import JobDetailHeader from "../../components/job/JobDetail/JobDetailHeader";
import JobDetailBody from "../../components/job/JobDetail/JobDetailBody";
import JobDetailSummary from "../../components/job/JobDetail/JobDetailSummary";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";

// Dữ liệu của công việc
const jobData = {
    logo: "https://innhanhhcm.vn/wp-content/uploads/2023/11/logo-fpt-01-1024x774.jpg",
    title: "Senior Frontend Developer",
    companyName: "Axon Active Vietnam",
    address: "Tòa nhà Sunwah, 115 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    jobPosition: "Senior Frontend Developer",
    type: "Full-time",
    salary: "1000 - 2000 USD",
    createdDate: new Date("2024-11-01"),
    expiryDate: new Date("2024-12-31"),
    quantity: 3,
    remote: "Hybrid",
    major: ["Công nghệ thông tin", "Khoa học máy tính", "Kỹ thuật phần mềm"],
    description: [
        "Phát triển và duy trì các ứng dụng frontend bằng React.",
        "Đảm bảo mã nguồn sạch, hiệu quả và có thể tái sử dụng.",
        "Phối hợp với các nhóm thiết kế để tối ưu trải nghiệm người dùng.",
    ],
    benefits: [
        "Bảo hiểm xã hội và y tế theo quy định của pháp luật",
        "Thưởng hiệu suất và thưởng dự án",
        "Cơ hội thăng tiến và phát triển nghề nghiệp",
    ],
    requirements: [
        "Có kinh nghiệm làm việc với React ít nhất 2 năm",
        "Hiểu biết về HTML, CSS, JavaScript",
        "Kỹ năng giải quyết vấn đề tốt",
        "Có khả năng làm việc độc lập và theo nhóm",
    ],
};

const JobDetailsPage = () => {
    // Cuộn lên đầu trang khi load component
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    // Kiểm tra kích thước màn hình
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const isMediumScreen = useMediaQuery("(max-width: 960px)");

    // Xác định giá trị margin dựa trên kích thước màn hình
    const marginValue = isSmallScreen ? "0px" : isMediumScreen ? "20px 40px" : "20px 80px";

    // Các hàm xử lý sự kiện
    const handleSaveJob = () => {
        alert("Công việc đã được lưu!");
    };

    const handleApplyJob = () => {
        alert("Bạn đã nộp đơn thành công!");
    };

    return (
        <MainLayout title="Chi tiết công việc">
            {/* Thanh điều hướng */}
            <PageNavigation pageName="Chi tiết công việc" />
            <div style={{ margin: marginValue }}>
                {/* Header tóm tắt thông tin */}
                <Box sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
                    <JobDetailHeader
                        logo={jobData.logo}
                        title={jobData.title}
                        companyName={jobData.companyName}
                        address={jobData.address}
                        jobPosition={jobData.jobPosition}
                        type={jobData.type}
                        salary={jobData.salary}
                        updateDate={jobData.createdDate}
                        expiryDate={jobData.expiryDate}
                        onSaveJob={handleSaveJob}
                        onApplyJob={handleApplyJob}
                    />
                </Box>

                {/* Chia layout thành 2 phần: Body và Summary */}
                <Grid container spacing={4}>
                    {/* Phần Body nằm bên trái, chiếm 2/3 */}
                    <Grid item xs={12} md={8}>
                        <JobDetailBody jobData={jobData} />
                    </Grid>

                    {/* Phần Summary nằm bên phải, chiếm 1/3 */}
                    <Grid item xs={12} md={4}>
                        <JobDetailSummary
                            salary={jobData.salary}
                            quantity={jobData.quantity}
                            remote={jobData.remote}
                            type={jobData.type}
                            createdDate={jobData.createdDate}
                            expiryDate={jobData.expiryDate}
                            jobPosition={jobData.jobPosition}
                            major={jobData.major}
                        />
                    </Grid>
                </Grid>
            </div>
        </MainLayout>
    );
};

export default JobDetailsPage;
