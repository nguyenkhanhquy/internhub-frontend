import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Box, Container } from "@mui/material";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SliderBanner from "../../components/banners/SliderBanner/SliderBanner";
import SearchBar from "../../components/search/SearchBar";
import FeaturedCompaniesSection from "../../components/section/HomePage/FeaturedCompanysSection/FeaturedCompaniesSection";
import LatestJobsSection from "../../components/section/HomePage/LatestJobsSection/LatestJobsSection";

import { getAllApprovedCompanies } from "../../services/companyService";
import { getAllJobPosts } from "../../services/jobPostService";

const HomePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [jobList, setJobList] = useState([]);
    const [featuredCompanies, setFeaturedCompanies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const jobData = await getAllJobPosts(1, 12);
                if (!jobData.success) {
                    throw new Error(jobData.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setJobList(jobData.result);

                const data = await getAllApprovedCompanies(1, 5);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setFeaturedCompanies(data.result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                        zIndex: 1000,
                    }}
                >
                    <Box sx={{ width: "80%" }}>
                        <SearchBar onSearch={(searchText) => navigate("/search", { state: { query: searchText } })} />
                    </Box>
                </Box>

                {/* VIỆC LÀM MỚI NHẤT */}
                <LatestJobsSection loading={loading} jobList={jobList} />

                {/* DOANH NGHIỆP NỔI BẬT */}
                <FeaturedCompaniesSection loading={loading} companies={featuredCompanies} />
            </Container>
        </MainLayout>
    );
};

export default HomePage;
