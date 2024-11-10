import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SliderBanner from "../../components/banners/SliderBanner/SliderBanner";
import SearchBar from "../../components/search/SearchBar";
import JobCardBasic from "../../components/job/JobCard/JobCardBasic";

const jobList = [
    {
        logo: "https://innhanhhcm.vn/wp-content/uploads/2023/11/logo-fpt-01-1024x774.jpg",
        title: "Thực tập sinh Frontend",
        companyName: "Công ty Cổ phần Viễn thông FPT",
        address: "Thành phố Hồ Chí Minh",
        jobPosition: "IT Phần mềm",
        type: "Toàn thời gian",
        salary: "Thỏa thuận",
        updateDate: new Date("2024-11-07"),
        expiryDate: new Date("2024-12-31"),
    },
    {
        logo: "https://marketplace.canva.com/EAE0rNNM2Fg/1/0/1600w/canva-letter-c-trade-marketing-logo-design-template-r9VFYrbB35Y.jpg",
        title: "Thực tập sinh Backend",
        companyName: "Công ty ABC",
        address: "Hà Nội",
        jobPosition: "Phát triển phần mềm",
        type: "Bán thời gian",
        salary: "5,000,000 VND/tháng",
        updateDate: new Date("2024-11-05"),
        expiryDate: new Date("2024-12-20"),
    },
    {
        logo: "https://dynamic.brandcrowd.com/asset/logo/aa3b9817-26ca-40d0-8c59-b4a8d149bda2/logo-search-grid-2x?logoTemplateVersion=1&v=638550553385470000",
        title: "Thực tập sinh UI/UX",
        companyName: "Công ty Thiết kế XYZ",
        address: "Đà Nẵng",
        jobPosition: "Thiết kế giao diện",
        type: "Thực tập",
        salary: "4,000,000 VND/tháng",
        updateDate: new Date("2024-11-01"),
        expiryDate: new Date("2024-12-15"),
    },
    {
        logo: "https://bcassetcdn.com/public/blog/wp-content/uploads/2021/10/07203359/australia-tech-map-by-jimjemr-brandcrowd.png",
        title: "Thực tập sinh Data Analyst",
        companyName: "Công ty Phân tích số liệu DEF",
        address: "Cần Thơ",
        jobPosition: "Phân tích dữ liệu",
        type: "Toàn thời gian",
        salary: "6,000,000 VND/tháng",
        updateDate: new Date("2024-11-10"),
        expiryDate: new Date("2024-12-25"),
    },
    {
        logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/corporate-company-logo-design-template-2402e0689677112e3b2b6e0f399d7dc3_screen.jpg?ts=1561532453",
        title: "Thực tập sinh Marketing",
        companyName: "Công ty Tiếp thị GHI",
        address: "Hải Phòng",
        jobPosition: "Marketing",
        type: "Thực tập",
        salary: "3,500,000 VND/tháng",
        updateDate: new Date("2024-11-12"),
        expiryDate: new Date("2024-12-30"),
    },
    {
        logo: "https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/7e55eb3d6a1a096058955ae7d64ee9d5.png",
        title: "Thực tập sinh Web",
        companyName: "Công ty NEVERLINE",
        address: "Hải Phòng",
        jobPosition: "Lập trình Web",
        type: "Thực tập",
        salary: "3,000,000 VND/tháng",
        updateDate: new Date("2024-11-12"),
        expiryDate: new Date("2024-12-30"),
    },
];

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <MainLayout title="Trang chủ">
            <div className="m-auto mt-4 flex max-w-screen-xl flex-wrap items-center justify-center">
                <SliderBanner />
                <SearchBar onSearch={(searchText) => navigate("/search", { state: { query: searchText } })} />
                <Box
                    sx={{
                        display: "grid", // Sử dụng Grid
                        gridTemplateColumns: "repeat(4, 1fr)", // 4 cột, mỗi cột chiếm 1 phần tư chiều rộng
                        gap: 2, // Khoảng cách giữa các thẻ
                        "@media (max-width: 900px)": {
                            // Đối với màn hình nhỏ hơn 900px
                            gridTemplateColumns: "repeat(2, 1fr)", // Chỉ hiển thị 2 thẻ trong mỗi hàng
                        },
                        "@media (max-width: 600px)": {
                            // Đối với màn hình nhỏ hơn 600px
                            gridTemplateColumns: "repeat(1, 1fr)", // Hiển thị 1 thẻ trong mỗi hàng
                        },
                    }}
                >
                    {jobList.map((job, index) => (
                        <JobCardBasic
                            key={index}
                            logo={job.logo}
                            title={job.title}
                            companyName={job.companyName}
                            remote={job.address}
                            type={job.type}
                            saved={true}
                        />
                    ))}
                </Box>
            </div>
        </MainLayout>
    );
};

export default HomePage;
