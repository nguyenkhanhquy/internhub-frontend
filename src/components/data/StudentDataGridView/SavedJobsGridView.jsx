import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Delete } from "@mui/icons-material"; // Thêm icon Delete
import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "../DataSearchBar";
import SavedJobsTable from "./StudentDataTable/SavedJobsTable";
import ConfirmModal from "../../modals/ConfirmModal/ConfirmModal";

const SavedJobsGridView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // Trạng thái mở Modal
    const totalPages = 20;

    // Hàm xử lý mở/đóng Modal
    const handleOpenConfirmModal = () => setConfirmModalOpen(true);
    const handleCloseConfirmModal = () => setConfirmModalOpen(false);

    // Hàm xử lý khi xác nhận xóa tất cả
    const handleConfirmDeleteAll = () => {
        console.log("Xóa tất cả công việc đã lưu");
        handleCloseConfirmModal(); // Đóng Modal sau khi xác nhận
    };

    const handlePageChange = (page) => setCurrentPage(page);
    const handleRecordsPerPageChange = (value) => setRecordsPerPage(value);

    return (
        <GridViewLayout
            title="CÔNG VIỆC ĐÃ LƯU"
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
            actions={
                <Box sx={{ display: "flex", gap: 2 }}>
                    <DataSearchBar placeholder="Tìm kiếm" onSearch={() => console.log("Searching...")} />

                    {/* Nút Xóa tất cả */}
                    <Button
                        variant="contained"
                        startIcon={<Delete />}
                        onClick={handleOpenConfirmModal} // Mở Modal xác nhận
                        sx={{
                            padding: "5px 10px",
                            width: "50%",
                            minWidth: 130,
                            borderRadius: 2,
                            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                            bgcolor: "#2e3090",
                            color: "white",
                            "&:hover": {
                                bgcolor: "#1f2061",
                            },
                            "&:active": {
                                boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                            },
                        }}
                    >
                        Xóa tất cả
                    </Button>
                </Box>
            }
        >
            <Box>
                {/* Nội dung danh sách công việc */}
                <SavedJobsTable
                    onDeleteJob={(jobId) => console.log(`Deleting job ${jobId}`)}
                    onViewDetails={(jobId) => console.log(`Viewing details of job ${jobId}`)}
                />
            </Box>

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                title="Xác nhận xóa tất cả"
                onConfirm={handleConfirmDeleteAll}
                onCancel={handleCloseConfirmModal}
            />
        </GridViewLayout>
    );
};

export default SavedJobsGridView;
