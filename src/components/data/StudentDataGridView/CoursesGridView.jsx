import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "../DataSearchBar";
import CoursesTable from "./StudentDataTable/CoursesTable";

const CoursesGridView = () => {
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
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

    // Data mẫu
    const mockData = [
        {
            courseId: 1,
            courseCode: "INT101",
            academicYear: "2023-2024",
            semester: "HK 1",
            teacherName: "Nguyễn Văn A",
            finalScore: 8.5,
            enrollmentStatus: "COMPLETED",
        },
        {
            courseId: 2,
            courseCode: "INT102",
            academicYear: "2023-2024",
            semester: "HK 2",
            teacherName: "Trần Thị B",
            finalScore: null,
            enrollmentStatus: "SUBMITTED",
        },
        {
            courseId: 3,
            courseCode: "INT103",
            academicYear: "2022-2023",
            semester: "HK 1",
            teacherName: "Trần Thị B",
            finalScore: null,
            enrollmentStatus: "NOT_SUBMITTED",
        },
        {
            courseId: 4,
            courseCode: "INT104",
            academicYear: "2022-2023",
            semester: "HK 2",
            teacherName: "Nguyễn Văn A",
            finalScore: 4.0,
            enrollmentStatus: "FAILED",
        },
    ];

    // useEffect(() => {
    //     const fetchSavedJobPosts = async () => {
    //         setLoading(true);
    //         try {
    //             const data = await getAllJobApplyByStudent(currentPage, recordsPerPage, search);
    //             if (!data.success) {
    //                 throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
    //             }
    //             setTotalPages(data.pageInfo.totalPages);
    //             setTotalRecords(data.pageInfo.totalElements);
    //             setCourses(data.result);
    //         } catch (error) {
    //             toast.error(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchSavedJobPosts();
    // }, [search, currentPage, recordsPerPage, flag]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const filtered = mockData.filter((course) =>
                course.courseCode.toLowerCase().includes(search.toLowerCase()),
            );
            setCourses(filtered);
            setTotalRecords(filtered.length);
            setTotalPages(Math.ceil(filtered.length / recordsPerPage));
            setLoading(false);
        }, 500);
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
                    <Button
                        variant="contained"
                        endIcon={<CachedIcon />}
                        onClick={() => setFlag((prev) => !prev)}
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
                        Làm mới
                    </Button>
                </Box>
            }
        >
            <Box>
                {/* Nội dung danh sách công việc */}
                <CoursesTable
                    loading={loading}
                    courses={courses}
                    handleViewDetailsClick={handleViewDetailsClick}
                    setFlag={setFlag}
                />
            </Box>
        </GridViewLayout>
    );
};

export default CoursesGridView;
