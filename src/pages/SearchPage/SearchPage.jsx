import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SearchBar from "../../components/search/SearchBar";
import SortBar from "../../components/SortBar/SortBar";
import JobCardSearch from "../../components/job/JobCard/JobCardSearch";
import CustomPagination from "../../components/pagination/Pagination";
import Box from "@mui/material/Box";

const SearchPage = () => {
    const [isSaved, setIsSaved] = useState(false);

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
            logo: "https://www.example.com/logo2.png",
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
            logo: "https://www.example.com/logo3.png",
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
            logo: "https://www.example.com/logo4.png",
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
            logo: "https://www.example.com/logo5.png",
            title: "Thực tập sinh Marketing",
            companyName: "Công ty Tiếp thị GHI",
            address: "Hải Phòng",
            jobPosition: "Marketing",
            type: "Thực tập",
            salary: "3,500,000 VND/tháng",
            updateDate: new Date("2024-11-12"),
            expiryDate: new Date("2024-12-30"),
        },
    ];

    const toggleSaveJob = () => {
        setIsSaved((prev) => !prev);
        toast.success("Đã lưu công việc thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const totalPages = 20; // Số trang tổng cộng

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setRecordsPerPage(value);
    };

    return (
        <MainLayout title="Việc làm">
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
                        saved={isSaved} // Trạng thái lưu công việc
                        onToggleSave={toggleSaveJob} // Hàm bật/tắt lưu công việc
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
            <ToastContainer />
        </MainLayout>
    );
};

export default SearchPage;
