import { useState } from "react";
import { Box } from "@mui/material";
import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "../DataSearchBar";
import AppliedJobsTable from "./StudentDataTable/AppliedJobsTable";

const AppliedJobsGridView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const totalPages = 20;
    const totalRecords = 0;

    const handlePageChange = (page) => setCurrentPage(page);
    const handleRecordsPerPageChange = (value) => setRecordsPerPage(value);

    // Hàm xử lý tìm kiếm
    const handleSearch = () => {
        console.log("Searching...");
    };

    return (
        <GridViewLayout
            title="CÔNG VIỆC ỨNG TUYỂN"
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
            actions={<DataSearchBar placeholder="Tìm kiếm" onSearch={handleSearch} />}
        >
            <Box>
                {/* Nội dung danh sách công việc */}
                <AppliedJobsTable />
            </Box>
        </GridViewLayout>
    );
};

export default AppliedJobsGridView;
