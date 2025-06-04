import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "@hooks/useAuth";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import MainLayout from "@layouts/MainLayout/MainLayout";
import SliderBanner from "@components/banners/SliderBanner/SliderBanner";
import SearchBar from "@components/search/SearchBar";
import FeaturedCompaniesSection from "@components/section/HomePage/FeaturedCompanysSection/FeaturedCompaniesSection";
import LatestJobsSection from "@components/section/HomePage/LatestJobsSection/LatestJobsSection";
import SuitableJobsSection from "@components/section/HomePage/SuitableJobsSection/SuitableJobsSection";
import AnimatedCounter from "@components/common/AnimatedCounter/AnimatedCounter";

import { getJobPostsSuitableForStudent } from "@services/jobPostService";
import { getAllJobPosts } from "@services/jobPostService";
import { getAllApprovedCompanies } from "@services/companyService";
import { getOverview } from "@services/academicService";

const HomePage = () => {
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [suitableJobList, setSuitableJobList] = useState([]);
    const [latestJobList, setLatestJobList] = useState([]);
    const [featuredCompanies, setFeaturedCompanies] = useState([]);
    const [overview, setOverview] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (isAuthenticated) {
                    const [suitableJobData, latestJobData, featuredCompaniesData, overviewData] =
                        await Promise.allSettled([
                            getJobPostsSuitableForStudent(0, 6),
                            getAllJobPosts(1, 12),
                            getAllApprovedCompanies(1, 5),
                            getOverview(),
                        ]);

                    if (suitableJobData.status === "fulfilled" && suitableJobData.value.success) {
                        setSuitableJobList(suitableJobData.value.result);
                    }
                    if (latestJobData.status === "fulfilled" && latestJobData.value.success) {
                        setLatestJobList(latestJobData.value.result);
                    }
                    if (featuredCompaniesData.status === "fulfilled" && featuredCompaniesData.value.success) {
                        setFeaturedCompanies(featuredCompaniesData.value.result);
                    }
                    if (overviewData.status === "fulfilled" && overviewData.value.success) {
                        setOverview(overviewData.value.result);
                    }
                } else {
                    const [latestJobData, featuredCompaniesData, overviewData] = await Promise.allSettled([
                        getAllJobPosts(1, 12),
                        getAllApprovedCompanies(1, 5),
                        getOverview(),
                    ]);

                    if (latestJobData.status === "fulfilled" && latestJobData.value.success) {
                        setLatestJobList(latestJobData.value.result);
                    }
                    if (featuredCompaniesData.status === "fulfilled" && featuredCompaniesData.value.success) {
                        setFeaturedCompanies(featuredCompaniesData.value.result);
                    }
                    if (overviewData.status === "fulfilled" && overviewData.value.success) {
                        setOverview(overviewData.value.result);
                    }
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isAuthenticated]);

    return (
        <MainLayout title="Trang chủ">
            <Container
                maxWidth="xl"
                sx={{
                    width: "90%",
                    margin: "0 auto",
                }}
            >
                {/* Slider Banner */}
                <SliderBanner />

                {/* Search Bar */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 2,
                        mb: 1,
                        position: "sticky",
                        top: 4,
                        zIndex: 1,
                    }}
                >
                    <Box sx={{ width: "80%" }}>
                        <SearchBar onSearch={(searchText) => navigate("/search", { state: { query: searchText } })} />
                    </Box>
                </Box>

                {/* Overview Statistics */}
                <Box sx={{ width: "80%", margin: "0 auto" }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="stretch">
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: "center",
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <AnimatedCounter
                                    value={overview.totalInternStudents || 0}
                                    color="warning"
                                    duration={2000}
                                />
                                <Typography variant="body1" color="text.secondary">
                                    Sinh viên thực tập
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: "center",
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <AnimatedCounter
                                    value={overview.maxExpectedAcceptances || 0}
                                    color="primary"
                                    duration={1800}
                                />
                                <Typography variant="body1" color="text.secondary">
                                    Vị trí thực tập dự kiến
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: "center",
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <AnimatedCounter
                                    value={overview.acceptedStudents || 0}
                                    color="success"
                                    duration={1600}
                                />
                                <Typography variant="body1" color="text.secondary">
                                    Sinh viên đã được nhận
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                {/* VIỆC LÀM PHÙ HỢP */}
                {isAuthenticated && <SuitableJobsSection loading={loading} jobList={suitableJobList} />}

                {/* VIỆC LÀM MỚI NHẤT */}
                <LatestJobsSection loading={loading} jobList={latestJobList} />

                {/* DOANH NGHIỆP NỔI BẬT */}
                <FeaturedCompaniesSection loading={loading} companies={featuredCompanies} />
            </Container>
        </MainLayout>
    );
};

export default HomePage;
