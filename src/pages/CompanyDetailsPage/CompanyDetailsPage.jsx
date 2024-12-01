import MainLayout from "../../layouts/MainLayout/MainLayout";
import PageNavigation from "../../components/layouts/PageNavigation/PageNavigation";
import CompanyDetailsHeader from "../../components/section/CompanyDetailsPage/CompanyDetailsHeader";
import CompanyDetailsBody from "../../components/section/CompanyDetailsPage/CompanyDetailsBody";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";

const CompanyDetailsPage = () => {
    // Kiểm tra kích thước màn hình
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const isMediumScreen = useMediaQuery("(max-width: 960px)");

    // Xác định giá trị margin dựa trên kích thước màn hình
    const marginValue = isSmallScreen ? "0px" : isMediumScreen ? "20px 40px" : "20px 80px";

    return (
        <MainLayout title="Chi tiết công ty">
            {/* Thanh điều hướng */}
            <PageNavigation pageName="Chi tiết công ty" />
            <div style={{ margin: marginValue }}>
                {/* Header tóm tắt thông tin */}
                <Box sx={{ position: "sticky", top: 0, zIndex: 10 }}>
                    <CompanyDetailsHeader
                        logo="https://innhanhhcm.vn/wp-content/uploads/2023/11/logo-fpt-01-1024x774.jpg"
                        name="Axon Active Vietnam"
                        website="https://www.axonactive.com/"
                        address="Tầng 3, Tòa nhà H3, 384 Hoàng Diệu, Hải Châu, Đà Nẵng"
                    />
                </Box>
                <Grid item xs={12} md={8}>
                    <CompanyDetailsBody
                        companyData={{
                            description:
                                "Axon Active Vietnam is a Swiss company specializing in Agile software development and testing. We are one of the leading offshore software development and testing service providers in Vietnam. Our mission is to help customers reduce their time to market and lower development costs while maintaining the highest quality of software products.",
                            address: "Tầng 3, Tòa nhà H3, 384 Hoàng Diệu, Hải Châu, Đà Nẵng",
                        }}
                    />
                </Grid>
            </div>
        </MainLayout>
    );
};

export default CompanyDetailsPage;
