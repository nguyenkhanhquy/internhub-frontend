import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useAuth from "@hooks/useAuth";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import MainLayout from "@layouts/MainLayout/MainLayout";
import SliderBanner from "@components/banners/SliderBanner/SliderBanner";
import SearchBar from "@components/search/SearchBar";
import FeaturedCompaniesSection from "@components/section/HomePage/FeaturedCompanysSection/FeaturedCompaniesSection";
import LatestJobsSection from "@components/section/HomePage/LatestJobsSection/LatestJobsSection";
import SuitableJobsSection from "@components/section/HomePage/SuitableJobsSection/SuitableJobsSection";
import OverviewStatistics from "@components/section/HomePage/OverviewStatistics/OverviewStatistics";

import { getJobPostsSuitableForStudent } from "@services/jobPostService";
import { getAllJobPosts } from "@services/jobPostService";
import { getAllApprovedCompanies } from "@services/companyService";
import { getOverview } from "@services/academicService";

const HomePage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Suitable jobs - chỉ gọi khi đã đăng nhập
    const suitableJobsQuery = useQuery({
        queryKey: ["suitable-jobs"],
        queryFn: () => getJobPostsSuitableForStudent(0, 6),
        enabled: isAuthenticated,
        select: (data) => (data.success ? data.result : []),
    });

    // Latest jobs
    const latestJobsQuery = useQuery({
        queryKey: ["latest-jobs"],
        queryFn: () => getAllJobPosts(1, 12),
        select: (data) => (data.success ? data.result : []),
    });

    // Featured companies
    const featuredCompaniesQuery = useQuery({
        queryKey: ["featured-companies"],
        queryFn: () => getAllApprovedCompanies(1, 5),
        select: (data) => (data.success ? data.result : []),
    });

    // Overview Statistics
    const overviewQuery = useQuery({
        queryKey: ["overview-homepage"],
        queryFn: () => getOverview(),
        select: (data) => (data.success ? data.result : {}),
    });

    // Lấy dữ liệu đã xử lý qua select
    const suitableJobList = suitableJobsQuery.data ?? [];
    const latestJobList = latestJobsQuery.data ?? [];
    const featuredCompanies = featuredCompaniesQuery.data ?? [];
    const overview = overviewQuery.data ?? {};

    return (
        <MainLayout title="Trang chủ">
            <Container
                maxWidth="xl"
                sx={{
                    width: { xs: "100%", sm: "95%", md: "90%" },
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
                        my: 2,
                        position: "sticky",
                        top: 4,
                        zIndex: 1,
                    }}
                >
                    <Box sx={{ width: { xs: "100%", sm: "80%" } }}>
                        <SearchBar onSearch={(searchText) => navigate("/search", { state: { query: searchText } })} />
                    </Box>
                </Box>

                {/* Overview Statistics */}
                <OverviewStatistics overview={overview} />

                {/* VIỆC LÀM PHÙ HỢP */}
                {isAuthenticated && (
                    <SuitableJobsSection loading={suitableJobsQuery.isLoading} jobList={suitableJobList} />
                )}

                {/* VIỆC LÀM MỚI NHẤT */}
                <LatestJobsSection loading={latestJobsQuery.isLoading} jobList={latestJobList} />

                {/* DOANH NGHIỆP NỔI BẬT */}
                <FeaturedCompaniesSection loading={featuredCompaniesQuery.isLoading} companies={featuredCompanies} />
            </Container>
        </MainLayout>
    );
};

export default HomePage;
