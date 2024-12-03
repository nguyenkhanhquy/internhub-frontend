import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Box, Typography, Container, Button } from "@mui/material";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SliderBanner from "../../components/banners/SliderBanner/SliderBanner";
import SearchBar from "../../components/search/SearchBar";
import JobCardBasic from "../../components/job/JobCard/JobCardBasic";
import FeaturedCompaniesSection from "../../components/section/HomePage/FeaturedCompanysSection/FeaturedCompaniesSection";

import { getAllApprovedCompanies } from "../../services/companyService";

const jobList = [
    {
        id: "01d903ce-793e-44ec-be3f-6364d3828783",
        logo: "https://innhanhhcm.vn/wp-content/uploads/2023/11/logo-fpt-01-1024x774.jpg",
        title: "Thực tập sinh Frontend",
        companyName: "Công ty Cổ phần Viễn thông FPT",
        address: "Thành phố Hồ Chí Minh",
        jobPosition: "IT Phần mềm",
        type: "Toàn thời gian",
        remote: "Trực tiếp",
    },
    {
        id: "01d903ce-793e-44ec-be3f-6364d3828783",
        logo: "https://marketplace.canva.com/EAE0rNNM2Fg/1/0/1600w/canva-letter-c-trade-marketing-logo-design-template-r9VFYrbB35Y.jpg",
        title: "Thực tập sinh Backend",
        companyName: "CÔNG TY TNHH CÔNG NGHỆ - DỊCH VỤ SMART SERVICES",
        address: "Hà Nội",
        jobPosition: "Phát triển phần mềm",
        type: "Bán thời gian",
        remote: "Trực tiếp",
    },
    {
        id: "01d903ce-793e-44ec-be3f-6364d3828783",
        logo: "https://dynamic.brandcrowd.com/asset/logo/aa3b9817-26ca-40d0-8c59-b4a8d149bda2/logo-search-grid-2x?logoTemplateVersion=1&v=638550553385470000",
        title: "Thực tập sinh UI/UX",
        companyName: "Công ty Thiết kế XYZ",
        address: "Đà Nẵng",
        jobPosition: "Thiết kế giao diện",
        type: "Toàn thời gian",
        remote: "Trực tiếp",
    },
    {
        id: "01d903ce-793e-44ec-be3f-6364d3828783",
        logo: "https://bcassetcdn.com/public/blog/wp-content/uploads/2021/10/07203359/australia-tech-map-by-jimjemr-brandcrowd.png",
        title: "Thực tập sinh Data Analyst",
        companyName: "Công ty Phân tích số liệu DEF",
        address: "Cần Thơ",
        jobPosition: "Phân tích dữ liệu",
        type: "Toàn thời gian",
        remote: "Trực tiếp",
    },
    {
        id: "01d903ce-793e-44ec-be3f-6364d3828783",
        logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/corporate-company-logo-design-template-2402e0689677112e3b2b6e0f399d7dc3_screen.jpg?ts=1561532453",
        title: "Thực tập sinh Marketing",
        companyName: "Công ty Tiếp thị GHI",
        address: "Hải Phòng",
        jobPosition: "Marketing",
        type: "Bán thời gian",
        remote: "Trực tiếp",
    },
    {
        id: "01d903ce-793e-44ec-be3f-6364d3828783",
        logo: "https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/7e55eb3d6a1a096058955ae7d64ee9d5.png",
        title: "Thực tập sinh Web",
        companyName: "Công ty NEVERLINE",
        address: "Hải Phòng",
        jobPosition: "Lập trình Web",
        type: "Toàn thời gian",
        remote: "Trực tiếp",
    },
    {
        id: "01d903ce-793e-44ec-be3f-6364d3828783",
        logo: "https://innhanhhcm.vn/wp-content/uploads/2023/11/logo-fpt-01-1024x774.jpg",
        title: "Thực tập sinh Frontend",
        companyName: "Công ty Cổ phần Viễn thông FPT",
        address: "Thành phố Hồ Chí Minh",
        jobPosition: "IT Phần mềm",
        type: "Toàn thời gian",
        remote: "Trực tiếp",
    },
    {
        id: "01d903ce-793e-44ec-be3f-6364d3828783",
        logo: "https://marketplace.canva.com/EAE0rNNM2Fg/1/0/1600w/canva-letter-c-trade-marketing-logo-design-template-r9VFYrbB35Y.jpg",
        title: "Thực tập sinh Backend",
        companyName: "CÔNG TY TNHH CÔNG NGHỆ - DỊCH VỤ SMART SERVICES",
        address: "Hà Nội",
        jobPosition: "Phát triển phần mềm",
        type: "Bán thời gian",
        remote: "Trực tiếp",
    },
    {
        id: "01d903ce-793e-44ec-be3f-6364d3828783",
        logo: "https://dynamic.brandcrowd.com/asset/logo/aa3b9817-26ca-40d0-8c59-b4a8d149bda2/logo-search-grid-2x?logoTemplateVersion=1&v=638550553385470000",
        title: "Thực tập sinh UI/UX",
        companyName: "Công ty Thiết kế XYZ",
        address: "Đà Nẵng",
        jobPosition: "Thiết kế giao diện",
        type: "Toàn thời gian",
        remote: "Trực tiếp",
    },
];

const HomePage = () => {
    const navigate = useNavigate();
    const [featuredCompanies, setFeaturedCompanies] = useState([]);

    useEffect(() => {
        const fetchFeaturedCompanies = async () => {
            try {
                const data = await getAllApprovedCompanies(1, 5);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setFeaturedCompanies(data.result);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchFeaturedCompanies();
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
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Box sx={{ width: "70%" }}>
                        <SearchBar onSearch={(searchText) => navigate("/search", { state: { query: searchText } })} />
                    </Box>
                </Box>

                {/* VIỆC LÀM MỚI NHẤT */}
                <Box
                    sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: "50vh",
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
                        VIỆC LÀM MỚI NHẤT
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 2,
                            "@media (max-width: 900px)": {
                                gridTemplateColumns: "repeat(2, 1fr)",
                            },
                            "@media (max-width: 600px)": {
                                gridTemplateColumns: "1fr",
                            },
                        }}
                    >
                        {jobList.map((job, index) => (
                            <JobCardBasic
                                key={index}
                                id={job.id}
                                logo={job.logo}
                                title={job.title}
                                companyName={job.companyName}
                                address={job.address}
                                remote={job.remote}
                                type={job.type}
                            />
                        ))}
                    </Box>

                    {/* Button Xem thêm */}
                    <Button
                        variant="container"
                        sx={{
                            padding: "8px 16px",
                            backgroundColor: "#2e3090",
                            color: "white",
                            "&:hover": { backgroundColor: "#1f2061" },
                        }}
                        onClick={() => navigate("/search")}
                    >
                        Xem thêm
                    </Button>
                </Box>

                {/* DOANH NGHIỆP NỔI BẬT */}
                <FeaturedCompaniesSection companies={featuredCompanies} />
            </Container>
        </MainLayout>
    );
};

export default HomePage;
