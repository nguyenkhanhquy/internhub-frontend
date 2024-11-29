import { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Divider } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "../DataSearchBar";
import PostedJobsTable from "./RecruiterDataTable/PostedJobsTable";
import SortBar from "../../../components/sort/SortBar";
import CustomTabPanel from "../../../components/tabs/CustomTabPanel/CustomTabPanel";

const PostedJobsGridView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const totalPages = 20;
    const totalRecords = 0;
    const [selectedMajor, setSelectedMajor] = useState("");
    const [sort, setSort] = useState("default");
    const [value, setValue] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const handlePageChange = (page) => setCurrentPage(page);
    const handleRecordsPerPageChange = (value) => setRecordsPerPage(value);

    // Theo dõi thay đổi của bộ lọc ngành
    useEffect(() => {
        console.log("Ngành đã chọn:", selectedMajor);
        // Logic filter hoặc gọi API
    }, [selectedMajor]);

    // Hàm xử lý tìm kiếm
    const handleSearch = () => {
        console.log("Searching...");
    };

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
                {/* Bộ lọc ngành */}
                <FormControl size="small" sx={{ minWidth: 200, width: "30%" }}>
                    <InputLabel id="major-filter-label">Ngành</InputLabel>
                    <Select
                        labelId="major-filter-label"
                        id="majorFilter"
                        value={selectedMajor} // Thay đổi giá trị state nếu cần quản lý
                        onChange={(e) => setSelectedMajor(e.target.value)}
                        label="Ngành"
                    >
                        <MenuItem value="">Tất cả ngành</MenuItem>
                        <MenuItem value="IT">Công nghệ thông tin</MenuItem>
                        <MenuItem value="DS">Kỹ thuật dữ liệu</MenuItem>
                        <MenuItem value="IS">An toàn thông tin</MenuItem>
                    </Select>
                </FormControl>

                {/* Thanh tìm kiếm */}
                <DataSearchBar placeholder="Tìm kiếm" onSearch={handleSearch} />
            </Box>
            {/* Thanh sắp xếp */}
            <SortBar
                totalRecords={totalRecords}
                sortOption={sort}
                onSortChange={(sortOption) => {
                    setCurrentPage(1);
                    setSort(sortOption);
                }}
            />

            <Divider />

            {/* Tabs */}
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
                        {/* Nội dung danh sách công việc */}
                        <PostedJobsTable
                            loading={false}
                            postedJobPosts={[]}
                            currentPage={currentPage}
                            recordsPerPage={recordsPerPage}
                            handleViewApplicationsClick={() => console.log("View applications")}
                            handleEditPostClick={() => console.log("Edit post")}
                        />
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Box>
                        {/* Nội dung danh sách công việc */}
                        <PostedJobsTable
                            loading={false}
                            postedJobPosts={[]}
                            currentPage={currentPage}
                            recordsPerPage={recordsPerPage}
                            handleViewApplicationsClick={() => console.log("View applications")}
                            handleEditPostClick={() => console.log("Edit post")}
                        />
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Box>
                        {/* Nội dung danh sách công việc */}
                        <PostedJobsTable
                            loading={false}
                            postedJobPosts={[]}
                            currentPage={currentPage}
                            recordsPerPage={recordsPerPage}
                            handleViewApplicationsClick={() => console.log("View applications")}
                            handleEditPostClick={() => console.log("Edit post")}
                        />
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <Box>
                        {/* Nội dung danh sách công việc */}
                        <PostedJobsTable
                            loading={false}
                            postedJobPosts={[]}
                            currentPage={currentPage}
                            recordsPerPage={recordsPerPage}
                            handleViewApplicationsClick={() => console.log("View applications")}
                            handleEditPostClick={() => console.log("Edit post")}
                        />
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <Box>
                        {/* Nội dung danh sách công việc */}
                        <PostedJobsTable
                            loading={false}
                            postedJobPosts={[]}
                            currentPage={currentPage}
                            recordsPerPage={recordsPerPage}
                            handleViewApplicationsClick={() => console.log("View applications")}
                            handleEditPostClick={() => console.log("Edit post")}
                        />
                    </Box>
                </CustomTabPanel>
            </Box>
        </GridViewLayout>
    );
};

export default PostedJobsGridView;
