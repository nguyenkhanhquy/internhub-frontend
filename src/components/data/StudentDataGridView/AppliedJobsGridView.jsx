import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Box, Button, Tooltip } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import GridViewLayout from "@layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "@components/data/DataSearchBar";
import AppliedJobsTable from "@components/data/StudentDataGridView/StudentDataTable/AppliedJobsTable";

import { getAllJobApplyByStudent } from "@services/jobApplyService";

const AppliedJobsGridView = () => {
    const [loading, setLoading] = useState(false);
    const [applyJobs, setApplyJobs] = useState([]);
    const [flag, setFlag] = useState(false);

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
        window.open(`/search/${id}`, "_blank");
    };

    useEffect(() => {
        const fetchSavedJobPosts = async () => {
            setLoading(true);
            try {
                const data = await getAllJobApplyByStudent(currentPage, recordsPerPage, search);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setTotalPages(data.pageInfo.totalPages);
                setTotalRecords(data.pageInfo.totalElements);
                setApplyJobs(data.result);
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
            title="CÔNG VIỆC ỨNG TUYỂN"
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

                    {/* Nút Làm mới */}
                    <Tooltip title="Làm mới" arrow>
                        <Button
                            variant="outlined"
                            onClick={() => setFlag((prev) => !prev)}
                            sx={{
                                minWidth: 44,
                                width: 44,
                                height: 44,
                                borderRadius: 2,
                                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                                color: "#2e3090",
                                borderColor: "#2e3090",
                                p: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                    bgcolor: "#1f2061",
                                    color: "white",
                                    borderColor: "#1f2061",
                                },
                                "&:active": {
                                    boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                                },
                            }}
                        >
                            <CachedIcon />
                        </Button>
                    </Tooltip>
                </Box>
            }
        >
            <Box>
                {/* Nội dung danh sách công việc */}
                <AppliedJobsTable
                    loading={loading}
                    applyJobs={applyJobs}
                    handleViewDetailsClick={handleViewDetailsClick}
                    setFlag={setFlag}
                    currentPage={currentPage}
                    recordsPerPage={recordsPerPage}
                />
            </Box>
        </GridViewLayout>
    );
};

export default AppliedJobsGridView;
