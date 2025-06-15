import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

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
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [id]);

    const jobDataQuery = useQuery({
        queryKey: ["job-data", id],
        queryFn: async () => {
            try {
                // Bước 1: Lấy thông tin job trước
                const jobDetailRes = await getJobPostById(id);
                if (!jobDetailRes.success) {
                    throw new Error(jobDetailRes);
                }

                const jobDetail = jobDetailRes.result;

                // Bước 2: Gọi đồng thời 2 API còn lại để tối ưu performance
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

                return {
                    jobDetail,
                    companyJobs,
                    relatedJobs,
                };
            } catch (error) {
                toast.error(error.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                throw error;
            }
        },
        retry: false,
    });

    // Lấy dữ liệu đã được tối ưu
    const jobDetail = jobDataQuery.data?.jobDetail ?? {};
    const companyJobs = jobDataQuery.data?.companyJobs ?? [];
    const relatedJobs = jobDataQuery.data?.relatedJobs ?? [];

    if (jobDataQuery.isError) {
        if (jobDataQuery.error.statusCode === 404) {
            return <Navigate to="/404" replace />;
        }
    }

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
            {jobDataQuery.isLoading ? (
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
                            id={jobDetail.id}
                            logo={jobDetail.company.logo}
                            title={jobDetail.title}
                            companyName={jobDetail.company.name}
                            website={jobDetail.company.website}
                            address={jobDetail.address}
                            jobPosition={jobDetail.jobPosition}
                            type={jobDetail.type}
                            salary={jobDetail.salary}
                            updateDate={jobDetail.updatedDate}
                            expiryDate={jobDetail.expiryDate}
                            saved={jobDetail.saved}
                            onApplyJob={handleApplyJob}
                        />
                    </Box>

                    {/* Chia layout thành 2 phần: Body và Summary */}
                    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                        {/* Phần Body nằm bên trái, chiếm 2/3 */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <JobDetailBody jobDetail={jobDetail} companyJobs={companyJobs} relatedJobs={relatedJobs} />
                        </Grid>

                        {/* Phần Summary nằm bên phải, chiếm 1/3 */}
                        <Grid
                            size={{ xs: 12, md: 4 }}
                            sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, sm: 1.5, md: 2 } }}
                        >
                            <JobDetailSummary
                                salary={jobDetail.salary}
                                quantity={jobDetail.quantity}
                                remote={jobDetail.remote}
                                type={jobDetail.type}
                                createdDate={jobDetail.createdDate}
                                expiryDate={jobDetail.expiryDate}
                                jobPosition={jobDetail.jobPosition}
                                majors={jobDetail.majors}
                            />
                            <CompanyDetailsContact
                                companyName={jobDetail.company.name}
                                address={jobDetail.company.address}
                            />
                        </Grid>
                    </Grid>
                    {/* Modal ứng tuyển */}
                    {isModalOpen && (
                        <JobApplicationModal
                            jobPostId={jobDetail.id}
                            jobTitle={jobDetail.title}
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}
                </Box>
            )}
        </MainLayout>
    );
};

export default JobDetailsPage;
