import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import MainLayout from "@layouts/MainLayout/MainLayout";
import PageNavigation from "@components/layouts/PageNavigation/PageNavigation";
import CompanyDetailsHeader from "@components/section/CompanyDetailsPage/CompanyDetailsHeader";
import CompanyDetailsBody from "@components/section/CompanyDetailsPage/CompanyDetailsBody";
import CompanyDetailsContact from "@components/section/CompanyDetailsPage/CompanyDetailsContact";
import CompanyDetailsHeaderSkeleton from "@components/skeletons/CompanyDetailsHeaderSkeleton";
import CompanyDetailsBodySkeleton from "@components/skeletons/CompanyDetailsBodySkeleton";
import CompanyDetailsContactSkeleton from "@components/skeletons/CompanyDetailsContactSkeleton";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { getCompanyById } from "@services/companyService";
import { getJobPostsByCompanyId } from "@services/jobPostService";

const CompanyDetailsPage = () => {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [id]);

    const companyQuery = useQuery({
        queryKey: ["company-data", id],
        queryFn: async () => {
            try {
                const companyData = await getCompanyById(id);
                if (!companyData.success) {
                    throw new Error(companyData);
                }
                const companyDetails = companyData.result;

                const jobPostsData = await getJobPostsByCompanyId(id);
                if (!jobPostsData.success) {
                    throw new Error(jobPostsData);
                }
                const jobPostsByCompany = jobPostsData.result;

                return { companyDetails, jobPostsByCompany };
            } catch (error) {
                toast.error(error.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                throw error;
            }
        },
        retry: false,
    });

    const companyDetails = companyQuery.data?.companyDetails ?? {};
    const jobPostsByCompany = companyQuery.data?.jobPostsByCompany ?? [];

    if (companyQuery.isError) {
        if (companyQuery.error.statusCode === 404) {
            return <Navigate to="/404" replace />;
        }
    }

    return (
        <MainLayout title="Chi tiết doanh nghiệp">
            {/* Thanh điều hướng */}
            <PageNavigation pageName="Chi tiết doanh nghiệp" />

            <Box sx={{ m: { xs: "0px", sm: "20px 40px", md: "20px 80px" } }}>
                {/* Header tóm tắt thông tin */}
                <Box sx={{ position: "sticky", top: 0, zIndex: 10 }}>
                    {companyQuery.isLoading ? (
                        <CompanyDetailsHeaderSkeleton />
                    ) : (
                        <CompanyDetailsHeader
                            logo={companyDetails.logo}
                            name={companyDetails.name}
                            website={companyDetails.website}
                            address={companyDetails.address}
                        />
                    )}
                </Box>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        {companyQuery.isLoading ? (
                            <CompanyDetailsBodySkeleton />
                        ) : (
                            <CompanyDetailsBody description={companyDetails.description} jobs={jobPostsByCompany} />
                        )}
                    </Grid>
                    <Grid size={{ xs: 12, lg: 4 }}>
                        {companyQuery.isLoading ? (
                            <CompanyDetailsContactSkeleton />
                        ) : (
                            <CompanyDetailsContact companyName={companyDetails.name} address={companyDetails.address} />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </MainLayout>
    );
};

export default CompanyDetailsPage;
