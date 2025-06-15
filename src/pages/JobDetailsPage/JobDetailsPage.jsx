import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MainLayout from "@layouts/MainLayout/MainLayout";
import PageNavigation from "@components/layouts/PageNavigation/PageNavigation";
import JobDetailHeader from "@components/job/JobDetail/JobDetailHeader";
import JobDetailBody from "@components/job/JobDetail/JobDetailBody";
import JobDetailSummary from "@components/job/JobDetail/JobDetailSummary";
import CompanyDetailsContact from "@components/section/CompanyDetailsPage/CompanyDetailsContact";
import JobApplicationModal from "@components/modals/JobApplicationModal/JobApplicationModal";

import JobDetailHeaderSkeleton from "@components/skeletons/JobDetailHeaderSkeleton";
import JobDetailBodySkeleton from "@components/skeletons/JobDetailBodySkeleton";
import JobDetailSummarySkeleton from "@components/skeletons/JobDetailSummarySkeleton";
import CompanyDetailsContactSkeleton from "@components/skeletons/CompanyDetailsContactSkeleton";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            try {
                setLoading(true);

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
            }
        };

        fetchJobPostsDetails();
    }, [id, navigate]);

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
                <Box sx={{ m: { xs: "0px", sm: "20px 40px", md: "20px 80px" } }}>
                    {/* Header skeleton */}
                    <Box sx={{ position: "sticky", top: 0, zIndex: 10 }}>
                        <JobDetailHeaderSkeleton />
                    </Box>

                    {/* Chia layout thành 2 phần: Body và Summary skeleton */}
                    <Grid container spacing={4}>
                        {/* Phần Body skeleton nằm bên trái, chiếm 2/3 */}
                        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                            <JobDetailBodySkeleton />
                        </Grid>

                        {/* Phần Summary skeleton nằm bên phải, chiếm 1/3 */}
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <JobDetailSummarySkeleton />
                            <CompanyDetailsContactSkeleton />
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <Box sx={{ m: { xs: "0px", sm: "20px 40px", md: "20px 80px" } }}>
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
                    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                        {/* Phần Body nằm bên trái, chiếm 2/3 */}
                        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                            <JobDetailBody jobData={jobData} />
                        </Grid>

                        {/* Phần Summary nằm bên phải, chiếm 1/3 */}
                        <Grid
                            size={{ xs: 12, md: 6, lg: 4 }}
                            sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, sm: 1.5, md: 2 } }}
                        >
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
                            <CompanyDetailsContact
                                companyName={jobData.company.name}
                                address={jobData.company.address}
                            />
                        </Grid>
                    </Grid>
                    {/* Modal ứng tuyển */}
                    {isModalOpen && (
                        <JobApplicationModal
                            jobPostId={jobData.id}
                            jobTitle={jobData.title}
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}
                </Box>
            )}
        </MainLayout>
    );
};

export default JobDetailsPage;
