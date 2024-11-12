import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "../DataSearchBar";
import SavedJobsTable from "./StudentDataTable/SavedJobsTable";

import { getAllSavedJobPosts, saveJobPost } from "../../../services/jobService";

const SavedJobsGridView = () => {
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const [savedJobPosts, setSavedJobPosts] = useState([]);

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
        window.open(`/search/${id}`, "_blank");
    };

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

    useEffect(() => {
        const fetchSavedJobPosts = async () => {
            setLoading(true);
            try {
                const data = await getAllSavedJobPosts(currentPage, recordsPerPage, "");
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
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
        };

        fetchSavedJobPosts();
    }, [currentPage, recordsPerPage, flag]);

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
                    <DataSearchBar placeholder="Tìm kiếm" onSearch={() => console.log("Searching...")} />
                    {/* Nút Xóa tất cả */}
                    <Button
                        variant="contained"
                        startIcon={<Delete />}
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
                    loading={loading}
                    savedJobPosts={savedJobPosts}
                    handleViewDetailsClick={handleViewDetailsClick}
                    handleDeleteClick={handleDeleteClick}
                />
            </Box>
        </GridViewLayout>
    );
};

export default SavedJobsGridView;
