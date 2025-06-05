import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import Delete from "@mui/icons-material/Delete";
import GridViewLayout from "@layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "@components/data/DataSearchBar";
import SavedJobsTable from "./StudentDataTable/SavedJobsTable";
import ConfirmModal from "@components/modals/ConfirmModal/ConfirmModal";

import { saveJobPost } from "@services/jobPostService";
import { getAllJobSaved, deleteAllJobSaved } from "@services/jobSavedService";

const SavedJobsGridView = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const [savedJobPosts, setSavedJobPosts] = useState([]);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setCurrentPage(1);
        setRecordsPerPage(value);
    };

    const handleViewDetailsClick = (id) => {
        navigate(`/search/${id}`);
    };

    // const handleViewDetailsClick = (id) => {
    //     window.open(`/search/${id}`, "_blank");
    // };

    const handleDeleteClick = async (id) => {
        try {
            const data = await saveJobPost(id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setFlag(!flag);
        }
    };

    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // Trạng thái mở Modal
    const [loadingConfirm, setLoadingConfirm] = useState(false);

    // Hàm xử lý mở/đóng Modal
    const handleOpenConfirmModal = () => setConfirmModalOpen(true);
    const handleCloseConfirmModal = () => setConfirmModalOpen(false);

    // Hàm xử lý khi xác nhận xóa tất cả
    const handleConfirmDeleteAll = async () => {
        setLoadingConfirm(true);
        try {
            await deleteAllJobSaved();
            toast.success("Đã xóa tất cả công việc đã lưu");
        } catch (error) {
            toast.error(error?.message || "Lỗi máy chủ, vui lòng thử lại sau!");
        } finally {
            setLoadingConfirm(false);
            setFlag(!flag);
        }
        handleCloseConfirmModal(); // Đóng Modal sau khi xác nhận
    };

    useEffect(() => {
        const fetchSavedJobPosts = async () => {
            setLoading(true);
            try {
                const data = await getAllJobSaved(currentPage, recordsPerPage, search);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setTotalPages(data.pageInfo.totalPages);
                setTotalRecords(data.pageInfo.totalElements);
                setSavedJobPosts(data.result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedJobPosts();
    }, [search, currentPage, recordsPerPage, flag]);

    return (
        <GridViewLayout
            title="CÔNG VIỆC ĐÃ LƯU"
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
            actions={
                <Box sx={{ display: "flex", gap: 2 }}>
                    <DataSearchBar
                        placeholder="Tìm kiếm"
                        onSearch={(searchText) => setSearch(searchText)}
                        query={search}
                    />

                    {/* Nút Xóa tất cả */}
                    <Tooltip title="Xóa tất cả" arrow>
                        <Button
                            variant="contained"
                            sx={{
                                minWidth: 44,
                                width: 44,
                                height: 44,
                                borderRadius: 2,
                                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                                bgcolor: "#2e3090",
                                color: "white",
                                p: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                    bgcolor: "#1f2061",
                                },
                                "&:active": {
                                    boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                                },
                            }}
                            onClick={handleOpenConfirmModal} // Mở Modal xác nhận
                        >
                            <Delete />
                        </Button>
                    </Tooltip>
                </Box>
            }
        >
            <Box>
                {/* Nội dung danh sách công việc */}
                <SavedJobsTable
                    loading={loading}
                    savedJobPosts={savedJobPosts}
                    currentPage={currentPage}
                    recordsPerPage={recordsPerPage}
                    handleViewDetailsClick={handleViewDetailsClick}
                    handleDeleteClick={handleDeleteClick}
                />
            </Box>

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                loading={loadingConfirm}
                title="Xác nhận xóa tất cả"
                onConfirm={handleConfirmDeleteAll}
                onCancel={handleCloseConfirmModal}
            />
        </GridViewLayout>
    );
};

export default SavedJobsGridView;
