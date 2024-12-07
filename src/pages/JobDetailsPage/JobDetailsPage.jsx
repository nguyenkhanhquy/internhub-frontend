import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import PageNavigation from "../../components/layouts/PageNavigation/PageNavigation";
import JobDetailHeader from "../../components/job/JobDetail/JobDetailHeader";
import JobDetailBody from "../../components/job/JobDetail/JobDetailBody";
import JobDetailSummary from "../../components/job/JobDetail/JobDetailSummary";
import SuspenseLoader from "../../components/loaders/SuspenseLoader/SuspenseLoader";
import JobApplicationModal from "../../components/modals/JobApplicationModal/JobApplicationModal";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";

import useAuth from "../../hooks/useAuth";
import { getJobPostById, getJobPostsByCompanyId, getAllJobPosts } from "../../services/jobPostService";

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
                const data = await getJobPostById(id);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setJobData(data.result);

                const dataJobPosts = await getJobPostsByCompanyId(data.result.company.id);
                if (!dataJobPosts.success) {
                    throw new Error(dataJobPosts.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }

                const relatedJobs = await getAllJobPosts(1, 10, data.result.jobPosition, "default");
                if (!relatedJobs.success) {
                    throw new Error(relatedJobs.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }

                setJobData((prevData) => ({
                    ...prevData,
                    jobs: dataJobPosts.result.filter((job) => job.id !== id),
                    relatedJobs: relatedJobs.result.filter((job) => job.id !== id),
                }));
            } catch (error) {
                if (error?.statusCode === 404) navigate("/404");
                else toast.error(error.message);
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
                            updateDate={jobData.createdDate}
                            expiryDate={jobData.expiryDate}
                            saved={jobData.saved}
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
