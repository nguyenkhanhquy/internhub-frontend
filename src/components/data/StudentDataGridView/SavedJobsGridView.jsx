import { Box, TextField, Typography, Button } from "@mui/material";
import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";
import { useState } from "react";

const SavedeJobsGridView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const totalPages = 20;

    const handlePageChange = (page) => setCurrentPage(page);
    const handleRecordsPerPageChange = (value) => setRecordsPerPage(value);

    return (
        <GridViewLayout
            title="Công việc đã lưu"
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
            actions={
                <>
                    <TextField placeholder="Tìm kiếm công việc" size="small" />
                    <Button variant="outlined" color="error">
                        Xóa tất cả
                    </Button>
                </>
            }
        >
            <Box>
                {/* Nội dung danh sách công việc */}
                <Typography>Danh sách công việc đã lưu sẽ được hiển thị tại đây.</Typography>
            </Box>
        </GridViewLayout>
    );
};

export default SavedeJobsGridView;
