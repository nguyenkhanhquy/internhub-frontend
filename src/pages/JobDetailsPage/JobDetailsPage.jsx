import MainLayout from "../../layouts/MainLayout/MainLayout";
import PageNavigation from "../../components/layouts/PageNavigation/PageNavigation";
import JobDetailHeader from "../../components/job/JobDetail/JobDetailHeader";

const JobDetailsPage = () => {
    const handleSaveJob = () => {
        alert("Công việc đã được lưu!");
    };

    const handleApplyJob = () => {
        alert("Bạn đã nộp đơn thành công!");
    };

    return (
        <MainLayout title="Chi tiết công việc">
            <PageNavigation pageName="Chi tiết công việc" />
            <div style={{ margin: "20px 160px" }}>
                <JobDetailHeader
                    logo="https://innhanhhcm.vn/wp-content/uploads/2023/11/logo-fpt-01-1024x774.jpg"
                    title="Senior Frontend Developer"
                    companyName="Axon Active Vietnam"
                    address="Tòa nhà Sunwah, 115 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh"
                    jobPosition="Frontend Developer"
                    type="Full-time"
                    salary="1000 - 2000 USD"
                    updateDate={new Date("2024-11-05")}
                    expiryDate={new Date("2024-12-31")}
                    onSaveJob={handleSaveJob}
                    onApplyJob={handleApplyJob}
                />
            </div>
        </MainLayout>
    );
};

export default JobDetailsPage;
