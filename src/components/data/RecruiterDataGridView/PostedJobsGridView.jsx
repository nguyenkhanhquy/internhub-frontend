import { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Divider } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "../DataSearchBar";
import PostedJobsTable from "./RecruiterDataTable/PostedJobsTable";
import SortBar from "../../../components/sort/SortBar";
import CustomTabPanel from "../../../components/tabs/CustomTabPanel/CustomTabPanel";
import UpdateJobPostModal from "../../modals/UpdateJobPostModal/UpdateJobPostModal";

const PostedJobsGridView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const totalPages = 20;
    const totalRecords = 0;
    const [selectedMajor, setSelectedMajor] = useState("");
    const [sort, setSort] = useState("default");
    const [value, setValue] = useState(0);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedJobPost, setSelectedJobPost] = useState(null); // Dữ liệu bài đăng tuyển dụng

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const handlePageChange = (page) => setCurrentPage(page);
    const handleRecordsPerPageChange = (value) => setRecordsPerPage(value);

    // useEffect(() => {
    //     console.log("Ngành đã chọn:", selectedMajor);
    // }, [selectedMajor]);

    // Hàm xử lý khi nhấn nút tìm kiếm
    const handleSearch = () => {
        console.log("Searching...");
    };

    // Mở modal
    const handleEditPostClick = (jobId) => {
        const job = sampleJobPosts.find((post) => post.id === jobId); // Tìm bài đăng cần sửa
        if (job) {
            setSelectedJobPost(job);
            setIsUpdateModalOpen(true);
        }
    };

    // Đóng Modal
    const handleCloseModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedJobPost(null);
    };

    const sampleJobPosts = [
        {
            id: 1,
            title: "Lập trình viên Frontend",
            jobPosition: "Frontend Developer",
            salary: "20-30 triệu",
            quantity: 2,
            type: "Toàn thời gian",
            remote: "Kết hợp",
            description: "Phát triển giao diện web...",
            requirements: "Thành thạo React.js...",
            benefits: "Lương thưởng hấp dẫn...",
            address: "Hà Nội",
            expiryDate: "2024-12-31",
            majors: ["IT"],
            jobApplyCount: 10,
        },
        {
            id: 2,
            title: "Kỹ sư dữ liệu",
            jobPosition: "Data Scientist",
            salary: "Thỏa thuận",
            quantity: 2,
            type: "Toàn thời gian",
            remote: "Kết hợp",
            description: "Phát triển giao diện web...",
            requirements: "Thành thạo React.js...",
            benefits: "Lương thưởng hấp dẫn...",
            address: "Hà Nội",
            expiryDate: "2024-12-31",
            majors: ["DS"],
            jobApplyCount: 2,
        },
    ];

    return (
        <GridViewLayout
            title="DANH SÁCH VIỆC LÀM ĐÃ ĐĂNG TUYỂN"
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
        >
            <Box className="mb-4 flex justify-between space-x-4">
                <FormControl size="small" sx={{ minWidth: 200, width: "30%" }}>
                    <InputLabel id="major-filter-label">Ngành</InputLabel>
                    <Select
                        labelId="major-filter-label"
                        id="majorFilter"
                        value={selectedMajor}
                        onChange={(e) => setSelectedMajor(e.target.value)}
                        label="Ngành"
                    >
                        <MenuItem value="">Tất cả ngành</MenuItem>
                        <MenuItem value="IT">Công nghệ thông tin</MenuItem>
                        <MenuItem value="DS">Kỹ thuật dữ liệu</MenuItem>
                        <MenuItem value="IS">An toàn thông tin</MenuItem>
                    </Select>
                </FormControl>

                <DataSearchBar placeholder="Tìm kiếm" onSearch={handleSearch} />
            </Box>

            <SortBar
                totalRecords={totalRecords}
                sortOption={sort}
                onSortChange={(sortOption) => {
                    setCurrentPage(1);
                    setSort(sortOption);
                }}
            />

            <Divider />

            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChangeTab}
                        variant="scrollable"
                        scrollButtons={false}
                        selectionFollowsFocus
                    >
                        <Tab label="Việc làm đang hiển thị" />
                        <Tab label="Việc làm chưa duyệt" />
                        <Tab label="Việc làm không duyệt" />
                        <Tab label="Việc làm sắp hết hạn" />
                        <Tab label="Việc làm đã hết hạn" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Box>
                        <PostedJobsTable
                            loading={false}
                            postedJobPosts={sampleJobPosts}
                            currentPage={currentPage}
                            recordsPerPage={recordsPerPage}
                            handleViewApplicationsClick={() => console.log("View applications")}
                            handleEditPostClick={handleEditPostClick} // Gọi hàm mở modal
                        />
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}></CustomTabPanel>
                <CustomTabPanel value={value} index={2}></CustomTabPanel>
                <CustomTabPanel value={value} index={3}></CustomTabPanel>
                <CustomTabPanel value={value} index={4}></CustomTabPanel>
            </Box>

            {/* Modal chỉnh sửa bài đăng */}
            <UpdateJobPostModal
                isOpen={isUpdateModalOpen}
                jobPostData={selectedJobPost || {}}
                onClose={handleCloseModal}
            />
        </GridViewLayout>
    );
};

export default PostedJobsGridView;
