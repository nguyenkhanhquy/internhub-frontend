import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import PageNavigation from "../../components/layouts/PageNavigation/PageNavigation";
import CompanyDetailsHeader from "../../components/section/CompanyDetailsPage/CompanyDetailsHeader";
import CompanyDetailsBody from "../../components/section/CompanyDetailsPage/CompanyDetailsBody";
import SuspenseLoader from "../../components/loaders/SuspenseLoader/SuspenseLoader";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";

import { getCompanyById } from "../../services/companyService";
import { getJobPostsByCompanyId } from "../../services/jobPostService";

const CompanyDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [companyData, setCompanyData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getCompanyById(id);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }

                setCompanyData(data.result);

                const dataJobPosts = await getJobPostsByCompanyId(id);
                if (!dataJobPosts.success) {
                    throw new Error(dataJobPosts.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }

                setCompanyData((prevData) => ({
                    ...prevData,
                    jobs: dataJobPosts.result,
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

        fetchData();
    }, [id, navigate]);

    // Kiểm tra kích thước màn hình
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const isMediumScreen = useMediaQuery("(max-width: 960px)");

    // Xác định giá trị margin dựa trên kích thước màn hình
    const marginValue = isSmallScreen ? "0px" : isMediumScreen ? "20px 40px" : "20px 80px";

    return (
        <MainLayout title="Chi tiết doanh nghiệp">
            {/* Thanh điều hướng */}
            <PageNavigation pageName="Chi tiết doanh nghiệp" />
            {loading ? (
                <SuspenseLoader />
            ) : (
                <div style={{ margin: marginValue }}>
                    {/* Header tóm tắt thông tin */}
                    <Box sx={{ position: "sticky", top: 0, zIndex: 10 }}>
                        <CompanyDetailsHeader
                            logo={companyData.logo}
                            name={companyData.name}
                            website={companyData.website}
                            address={companyData.address}
                        />
                    </Box>
                    <Grid item xs={12} md={8}>
                        <CompanyDetailsBody
                            description={companyData.description}
                            address={companyData.address}
                            jobs={companyData.jobs}
                        />
                    </Grid>
                </div>
            )}
        </MainLayout>
    );
};

export default CompanyDetailsPage;
