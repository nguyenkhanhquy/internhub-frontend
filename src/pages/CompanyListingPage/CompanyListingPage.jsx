import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import MainLayout from "@layouts/MainLayout/MainLayout";

import PageNavigation from "@components/layouts/PageNavigation/PageNavigation";
import CompanyCard from "@components/card/CompanyCard/CompanyCard";
import CompanyListingPagination from "@components/pagination/CompanyListingPagination/CompanyListingPagination";
import EmptyBox from "@components/box/EmptyBox";
import CompanyCardSkeleton from "@components/skeletons/CompanyCardSkeleton";

import { getAllApprovedCompanies } from "@services/companyService";

const CompanyListingPage = () => {
    const [companies, setCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["companies", currentPage],
        queryFn: () => getAllApprovedCompanies(currentPage, 6),
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        if (data?.success) {
            setTotalPages(data.pageInfo.totalPages);
            setTotalRecords(data.pageInfo.totalElements);
            setCompanies(data.result);
        } else if (data) {
            toast.error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
        }
    }, [data]);

    useEffect(() => {
        if (isError) {
            toast.error("Lỗi máy chủ, vui lòng thử lại sau!");
        }
    }, [isError]);

    return (
        <MainLayout title="Danh sách doanh nghiệp">
            <PageNavigation pageName="Danh sách doanh nghiệp" />
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
                    {isLoading ? (
                        // Hiển thị 6 skeleton cards trong khi loading
                        Array.from({ length: 6 }).map((_, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`skeleton-${index}`}>
                                <CompanyCardSkeleton />
                            </Grid>
                        ))
                    ) : companies.length > 0 ? (
                        companies.map((company, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                <CompanyCard company={company} />
                            </Grid>
                        ))
                    ) : (
                        <div style={{ minHeight: 350 }}>
                            <EmptyBox />
                        </div>
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
