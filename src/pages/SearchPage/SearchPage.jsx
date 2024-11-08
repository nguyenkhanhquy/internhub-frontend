import { useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import NavigationPage from "../../components/layouts/NavigationPage/NavigationPage";
import SearchBar from "../../components/search/SearchBar";
import SortBar from "../../components/sort/SortBar";
import JobCardSearch from "../../components/job/JobCard/JobCardSearch";
import CustomPagination from "../../components/pagination/Pagination";
import Box from "@mui/material/Box";

const SearchPage = () => {
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

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const totalPages = 20; // Số trang tổng cộng

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setRecordsPerPage(value);
    };

    const notifySaveJob = (isSaved) => {
        if (isSaved) {
            toast.success("Lưu công việc thành công");
        } else {
            toast.info("Bỏ lưu công việc thành công");
        }
    };

    return (
        <>
            <MainLayout title="Việc làm">
                <NavigationPage pageName="Việc làm" />
                <div style={{ margin: "20px 160px" }}>
                    <Box sx={{ position: "sticky", top: 4, zIndex: 1000 }}>
                        <SearchBar onSearch={(searchText) => console.log(searchText)} />
                    </Box>

                    <SortBar
                        totalJobs={jobList.length}
                        sortOption="default"
                        onSortChange={(sortOption) => console.log(sortOption)}
                    />

                    {/* Danh sách công việc */}
                    {jobList.map((job, index) => (
                        <JobCardSearch
                            key={index}
                            logo={job.logo}
                            title={job.title}
                            companyName={job.companyName}
                            address={job.address}
                            jobPosition={job.jobPosition}
                            type={job.type}
                            salary={job.salary}
                            updateDate={job.updateDate}
                            expiryDate={job.expiryDate}
                            saved={false}
                            notifySaveJob={notifySaveJob}
                        />
                    ))}

                    <CustomPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        recordsPerPage={recordsPerPage}
                        onPageChange={handlePageChange}
                        onRecordsPerPageChange={handleRecordsPerPageChange}
                    />
                </div>
            </MainLayout>
        </>
    );
};

export default SearchPage;
