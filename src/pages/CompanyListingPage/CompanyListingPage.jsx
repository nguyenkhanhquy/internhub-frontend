import Box from "@mui/material/Box";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import PageNavigation from "../../components/layouts/PageNavigation/PageNavigation";
import CompanyCard from "../../components/card/CompanyCard/CompanyCard";
import CompanyListingPagination from "../../components/pagination/CompanyListingPagination/CompanyListingPagination";
import EmptyBox from "../../components/box/EmptyBox";
import { Grid } from "@mui/material";

const companies = [
    {
        name: "CÔNG TY TNHH FPT",
        logo: "https://innhanhhcm.vn/wp-content/uploads/2023/11/logo-fpt-01-1024x774.jpg",
    },
    {
        name: "CÔNG TY TNHH UPS",
        logo: "https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/7e55eb3d6a1a096058955ae7d64ee9d5.png",
    },
    {
        name: "CÔNG TY TNHH Microsoft",
        logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/corporate-company-logo-design-template-2402e0689677112e3b2b6e0f399d7dc3_screen.jpg?ts=1561532453",
    },
    {
        name: "CÔNG TY TNHH Intel CÔNG TY TNHH Intel CÔNG TY TNHH Intel",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvOxGk8wETYE81jnavmfte1QHKW_dKwCbJw&s",
    },
    {
        name: "CÔNG TY TNHH Google",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZR8CHybxqJgeBeRMzg_Aiw8IBnepueWNnNg&s",
    },
    {
        name: "CÔNG TY TNHH Apple",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUeBAsfDaHdh9qDS9dF8IpCaAC1l7yDjJUeg&s",
    },
];

import { useState } from "react";

const CompanyListingPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(4);
    const [totalRecords, setTotalRecords] = useState(0);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <MainLayout title="Danh sách công ty">
            <PageNavigation pageName="Danh sách công ty" />
            <Box
                sx={{
                    margin: {
                        xs: "10px 10px", // Dành cho màn hình nhỏ hơn 600px
                        sm: "10px 40px", // Dành cho màn hình từ 600px đến dưới 900px
                        md: "15px 80px", // Dành cho màn hình từ 900px đến dưới 1200px
                        lg: "20px 120px", // Dành cho màn hình từ 1200px đến dưới 1536px
                    },
                    minHeight: 400,
                }}
            >
                {/* Hiển thị danh sách các công ty */}
                <Grid container spacing={4} sx={{ justifyContent: "center", mb: 4 }}>
                    {companies.length > 0 ? (
                        companies.map((company, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <CompanyCard company={company} />
                            </Grid>
                        ))
                    ) : (
                        <EmptyBox />
                    )}
                </Grid>
                {/* Phân trang */}
                <CompanyListingPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRecords={totalRecords}
                    onPageChange={handlePageChange}
                />
            </Box>
        </MainLayout>
    );
};

export default CompanyListingPage;
