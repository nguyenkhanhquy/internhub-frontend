import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Box, Button, Tooltip } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import GridViewLayout from "@layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "@components/data/DataSearchBar";
import CoursesTable from "@components/data/StudentDataGridView/StudentDataTable/CoursesTable";
import CourseDetailsModal from "@components/modals/CourseDetailsModal/CourseDetailsModal";

import { getAllEnrollmentsByStudent } from "@services/enrollmentService";

const CoursesGridView = () => {
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [flag, setFlag] = useState(false);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    // State cho dialog chi tiết
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setCurrentPage(1);
        setRecordsPerPage(value);
    };

    const handleViewDetailsClick = (course) => {
        setSelectedCourse(course);
        setOpenDetailsDialog(true);
    };

    const handleCloseDetailsDialog = () => {
        setOpenDetailsDialog(false);
        setSelectedCourse(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getAllEnrollmentsByStudent(currentPage - 1, recordsPerPage, search);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }

                setTotalPages(data.pageInfo.totalPages);
                setTotalRecords(data.pageInfo.totalElements);
                setCourses(data.result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [search, currentPage, recordsPerPage, flag]);

    return (
        <GridViewLayout
            title="LỚP THỰC TẬP"
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
                <CoursesTable
                    loading={loading}
                    courses={courses}
                    handleViewDetailsClick={handleViewDetailsClick}
                    setFlag={setFlag}
                />
            </Box>

            <CourseDetailsModal
                open={openDetailsDialog}
                onClose={handleCloseDetailsDialog}
                selectedCourse={selectedCourse}
            />
        </GridViewLayout>
    );
};

export default CoursesGridView;
