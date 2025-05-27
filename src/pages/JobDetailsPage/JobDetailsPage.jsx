import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MainLayout from "@layouts/MainLayout/MainLayout";
import PageNavigation from "@components/layouts/PageNavigation/PageNavigation";
import JobDetailHeader from "@components/job/JobDetail/JobDetailHeader";
import JobDetailBody from "@components/job/JobDetail/JobDetailBody";
import JobDetailSummary from "@components/job/JobDetail/JobDetailSummary";
import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";
import JobApplicationModal from "@components/modals/JobApplicationModal/JobApplicationModal";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";

import useAuth from "@hooks/useAuth";
import { getJobPostById, getJobPostsByCompanyId, getAllJobPosts } from "@services/jobPostService";

const JobDetailsPage = () => {
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [jobData, setJobData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchJobPostsDetails = async () => {
            setLoading(true);
            try {
                // Bước 1: Lấy thông tin job trước
                const jobDetailData = await getJobPostById(id);
                if (!jobDetailData.success) {
                    throw new Error(jobDetailData.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }

                const jobDetail = jobDetailData.result;
                setJobData(jobDetail);

                // Bước 2: Chạy đồng thời 2 API còn lại
                const [companyJobsResult, relatedJobsResult] = await Promise.allSettled([
                    getJobPostsByCompanyId(jobDetail.company.id),
                    getAllJobPosts(1, 10, jobDetail.jobPosition, "default"),
                ]);

                // Xử lý kết quả company jobs
                let companyJobs = [];
                if (companyJobsResult.status === "fulfilled" && companyJobsResult.value.success) {
                    companyJobs = companyJobsResult.value.result.filter((job) => job.id !== id);
                }

                // Xử lý kết quả related jobs
                let relatedJobs = [];
                if (relatedJobsResult.status === "fulfilled" && relatedJobsResult.value.success) {
                    relatedJobs = relatedJobsResult.value.result.filter((job) => job.id !== id);
                }

                // Cập nhật state một lần cuối
                setJobData((prevData) => ({
                    ...prevData,
                    jobs: companyJobs,
                    relatedJobs: relatedJobs,
                }));
            } catch (error) {
                if (error?.statusCode === 404) {
                    navigate("/404");
                } else {
                    toast.error(error.message);
                }
            } finally {
                setLoading(false);
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
        };

        fetchJobPostsDetails();
    }, [id, navigate]);

    // Kiểm tra kích thước màn hình
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const isMediumScreen = useMediaQuery("(max-width: 960px)");

    // Xác định giá trị margin dựa trên kích thước màn hình
    const marginValue = isSmallScreen ? "0px" : isMediumScreen ? "20px 40px" : "20px 80px";

    const handleApplyJob = () => {
        if (isAuthenticated) {
            setIsModalOpen(true);
        } else {
            toast.info("Vui lòng đăng nhập để ứng tuyển");
        }
    };

    return (
        <MainLayout title="Chi tiết công việc">
            {/* Thanh điều hướng */}
            <PageNavigation pageName="Chi tiết công việc" />
            {loading ? (
                <SuspenseLoader />
            ) : (
                <div style={{ margin: marginValue }}>
                    {/* Header tóm tắt thông tin */}
                    <Box sx={{ position: "sticky", top: 0, zIndex: 10 }}>
                        <JobDetailHeader
                            id={jobData.id}
                            logo={jobData.company.logo}
                            title={jobData.title}
                            companyName={jobData.company.name}
                            website={jobData.company.website}
                            address={jobData.address}
                            jobPosition={jobData.jobPosition}
                            type={jobData.type}
                            salary={jobData.salary}
                            updateDate={jobData.updatedDate}
                            expiryDate={jobData.expiryDate}
                            saved={jobData.saved}
                            onApplyJob={handleApplyJob}
                        />
                    </Box>

                    {/* Chia layout thành 2 phần: Body và Summary */}
                    <Grid container spacing={4}>
                        {/* Phần Body nằm bên trái, chiếm 2/3 */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <JobDetailBody jobData={jobData} />
                        </Grid>

                        {/* Phần Summary nằm bên phải, chiếm 1/3 */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <JobDetailSummary
                                salary={jobData.salary}
                                quantity={jobData.quantity}
                                remote={jobData.remote}
                                type={jobData.type}
                                createdDate={jobData.createdDate}
                                expiryDate={jobData.expiryDate}
                                jobPosition={jobData.jobPosition}
                                majors={jobData.majors}
                            />
                        </Grid>
                    </Grid>
                    {/* Modal ứng tuyển */}
                    {isModalOpen && (
                        <JobApplicationModal
                            jobPostId={jobData.id} // Truyền id công việc vào modal
                            jobTitle={jobData.title} // Truyền tiêu đề công việc vào modal
                            onClose={() => setIsModalOpen(false)} // Đóng modal
                        />
                    )}
                </div>
            )}
        </MainLayout>
    );
};

export default JobDetailsPage;
