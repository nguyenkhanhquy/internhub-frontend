import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "@hooks/useAuth";

import { Box, Container } from "@mui/material";
import MainLayout from "@layouts/MainLayout/MainLayout";
import SliderBanner from "@components/banners/SliderBanner/SliderBanner";
import SearchBar from "@components/search/SearchBar";
import FeaturedCompaniesSection from "@components/section/HomePage/FeaturedCompanysSection/FeaturedCompaniesSection";
import LatestJobsSection from "@components/section/HomePage/LatestJobsSection/LatestJobsSection";
import SuitableJobsSection from "@components/section/HomePage/SuitableJobsSection/SuitableJobsSection";

import { getJobPostsSuitableForStudent } from "@services/jobPostService";
import { getAllJobPosts } from "@services/jobPostService";
import { getAllApprovedCompanies } from "@services/companyService";

const HomePage = () => {
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [suitableJobList, setSuitableJobList] = useState([]);
    const [latestJobList, setLatestJobList] = useState([]);
    const [featuredCompanies, setFeaturedCompanies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (isAuthenticated) {
                    const [suitableJobData, latestJobData, featuredCompaniesData] = await Promise.allSettled([
                        getJobPostsSuitableForStudent(0, 6),
                        getAllJobPosts(1, 12),
                        getAllApprovedCompanies(1, 5),
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
                } else {
                    const [latestJobData, featuredCompaniesData] = await Promise.allSettled([
                        getAllJobPosts(1, 12),
                        getAllApprovedCompanies(1, 5),
                    ]);

                    if (latestJobData.status === "fulfilled" && latestJobData.value.success) {
                        setLatestJobList(latestJobData.value.result);
                    }
                    if (featuredCompaniesData.status === "fulfilled" && featuredCompaniesData.value.success) {
                        setFeaturedCompanies(featuredCompaniesData.value.result);
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

                {/* Search Bar, căn giữa */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 4,
                        position: "sticky",
                        top: 4,
                        zIndex: 1,
                    }}
                >
                    <Box sx={{ width: "80%" }}>
                        <SearchBar onSearch={(searchText) => navigate("/search", { state: { query: searchText } })} />
                    </Box>
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
