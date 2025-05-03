import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import PeopleIcon from "@mui/icons-material/People";
import { IconButton, Tooltip } from "@mui/material";

import EmptyBox from "@components/box/EmptyBox";
import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";
import CourseStudentsModal from "@/components/modals/CourseStudentsModal/CourseStudentsModal";
import DashboardSearchBar from "@components/search/DashboardSearchBar";
import CustomPagination from "@components/pagination/Pagination";

import { getAllYearAndSemester } from "@services/academicService";
// import { getAllCourses, deleteCourse } from "@services/courseService";

const mockCourses = [
    {
        id: 1,
        courseCode: "CS101",
        courseName: "Lập trình cơ bản",
        academicYear: "2023-2024",
        semester: "Học kỳ 1",
        totalStudents: 30,
        courseStatus: "Đang diễn ra",
    },
    {
        id: 2,
        courseCode: "CS102",
        courseName: "Cấu trúc dữ liệu",
        academicYear: "2023-2024",
        semester: "Học kỳ 1",
        totalStudents: 25,
        courseStatus: "Đang diễn ra",
    },
    {
        id: 3,
        courseCode: "CS103",
        courseName: "Thuật toán",
        academicYear: "2023-2024",
        semester: "Học kỳ 2",
        totalStudents: 28,
        courseStatus: "Đã kết thúc",
    },
    {
        id: 4,
        courseCode: "CS104",
        courseName: "Hệ điều hành",
        academicYear: "2024-2025",
        semester: "Học kỳ 1",
        totalStudents: 35,
        courseStatus: "Đang diễn ra",
    },
    {
        id: 5,
        courseCode: "CS105",
        courseName: "Mạng máy tính",
        academicYear: "2024-2025",
        semester: "Học kỳ 1",
        totalStudents: 32,
        courseStatus: "Đang diễn ra",
    },
];

const CoursePage = () => {
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [openStudentsModal, setOpenStudentsModal] = useState(false);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const [filtersLoaded, setFiltersLoaded] = useState(false);
    const [academicYears, setAcademicYears] = useState([{ id: "ALL", name: "Tất cả năm học" }]);
    const [semesters, setSemesters] = useState([{ id: "ALL", name: "Tất cả học kỳ" }]);
    const [selectedYear, setSelectedYear] = useState("ALL");
    const [selectedSemester, setSelectedSemester] = useState("ALL");

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setCurrentPage(1);
        setRecordsPerPage(value);
    };

    const handleOpenStudentsModal = (course) => {
        setSelectedCourse(course);
        setOpenStudentsModal(true);
    };

    const handleCloseStudentsModal = () => {
        setOpenStudentsModal(false);
        setSelectedCourse(null);
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            //     const yearParam = selectedYear === "ALL" ? null : selectedYear;
            //     const semesterParam = selectedSemester === "ALL" ? null : selectedSemester;
            //     const data = await getAllCourses(currentPage - 1, recordsPerPage, search, yearParam, semesterParam);
            //     if (!data.success) {
            //         throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            //     }
            //     setTotalPages(data.pageInfo.totalPages);
            //     setTotalRecords(data.pageInfo.totalElements);
            //     setCourses(data.result);
            // Sử dụng mock data thay vì gọi API
            let filteredCourses = mockCourses;

            // Lọc theo năm học
            if (selectedYear !== "ALL") {
                filteredCourses = filteredCourses.filter((course) => course.academicYear === selectedYear);
            }

            // Lọc theo học kỳ
            if (selectedSemester !== "ALL") {
                filteredCourses = filteredCourses.filter((course) => course.semester === selectedSemester);
            }

            // Tìm kiếm
            if (search) {
                const searchLower = search.toLowerCase();
                filteredCourses = filteredCourses.filter(
                    (course) =>
                        course.courseCode.toLowerCase().includes(searchLower) ||
                        course.courseName.toLowerCase().includes(searchLower),
                );
            }

            // Tính toán phân trang
            const totalFilteredRecords = filteredCourses.length;
            const totalFilteredPages = Math.ceil(totalFilteredRecords / recordsPerPage);
            const startIndex = (currentPage - 1) * recordsPerPage;
            const paginatedCourses = filteredCourses.slice(startIndex, startIndex + recordsPerPage);
            setTotalPages(totalFilteredPages);
            setTotalRecords(totalFilteredRecords);
            setCourses(paginatedCourses);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [currentPage, recordsPerPage, search, selectedYear, selectedSemester]);

    useEffect(() => {
        const fetchAcademicYearsAndSemesters = async () => {
            try {
                const data = await getAllYearAndSemester();
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }

                setAcademicYears([{ id: "ALL", name: "Tất cả năm học" }, ...(data.result.academicYears || [])]);
                setSemesters([{ id: "ALL", name: "Tất cả học kỳ" }, ...(data.result.semesters || [])]);
                setSelectedYear(data.result.currentAcademicYear?.id || "ALL");
                setSelectedSemester(data.result.currentSemester?.id || "ALL");
            } catch (error) {
                toast.error(error.message);
            } finally {
                setFiltersLoaded(true);
            }
        };
        fetchAcademicYearsAndSemesters();
    }, []);

    useEffect(() => {
        if (filtersLoaded) {
            fetchData();
        }
    }, [fetchData, flag, filtersLoaded]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-4 flex items-center justify-between">
                <Typography
                    variant="h5"
                    gutterBottom
                    color="primary"
                    sx={{
                        fontWeight: "bold",
                        fontSize: "2rem",
                        color: "linear-gradient(to right, #1976d2, #42a5f5)", // Gradient màu xanh
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Bóng chữ
                        letterSpacing: "0.05em", // Khoảng cách chữ nhẹ
                    }}
                >
                    Lớp thực tập
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                    <Button
                        onClick={() => {
                            if (search === "" && currentPage === 1 && recordsPerPage === 10) {
                                fetchData();
                            } else {
                                setSearch("");
                                setCurrentPage(1);
                                setRecordsPerPage(10);
                            }
                        }}
                        variant="contained"
                        color="primary"
                        startIcon={<CachedIcon />}
                    >
                        Làm mới
                    </Button>
                </Box>
            </div>

            <div className="sticky top-2 z-10 mb-4">
                <DashboardSearchBar
                    onSearch={(searchText) => {
                        setCurrentPage(1);
                        setSearch(searchText);
                    }}
                    query={search}
                    placeholder="Tìm kiếm lớp thực tập..."
                />
            </div>

            <Box className="mb-4" sx={{ display: "flex", gap: 2 }}>
                <FormControl sx={{ minWidth: 200 }} disabled={!filtersLoaded}>
                    <InputLabel id="academic-year-select-label">Năm học</InputLabel>
                    <Select
                        labelId="academic-year-select-label"
                        id="academic-year-select"
                        value={selectedYear}
                        label="Năm học"
                        onChange={(event) => {
                            setCurrentPage(1);
                            setSelectedYear(event.target.value);
                        }}
                    >
                        {academicYears.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 200 }} disabled={!filtersLoaded}>
                    <InputLabel id="semester-select-label">Học kỳ</InputLabel>
                    <Select
                        labelId="semester-select-label"
                        id="semester-select"
                        value={selectedSemester}
                        label="Học kỳ"
                        onChange={(event) => {
                            setCurrentPage(1);
                            setSelectedSemester(event.target.value);
                        }}
                    >
                        {semesters.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: "5%" }} align="center">
                                STT
                            </TableCell>
                            <TableCell style={{ width: "15%" }}>MÃ HỌC PHẦN</TableCell>
                            <TableCell style={{ width: "15%" }}>TÊN HỌC PHẦN</TableCell>
                            <TableCell style={{ width: "15%" }}>NĂM HỌC</TableCell>
                            <TableCell style={{ width: "10%" }}>HỌC KỲ</TableCell>
                            <TableCell style={{ width: "10%" }} align="center">
                                SĨ SỐ
                            </TableCell>
                            <TableCell style={{ width: "20%" }} align="center">
                                TRẠNG THÁI
                            </TableCell>
                            <TableCell style={{ width: "10%" }} align="center">
                                HÀNH ĐỘNG
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} style={{ textAlign: "center", padding: "20px" }}>
                                    <SuspenseLoader />
                                </TableCell>
                            </TableRow>
                        ) : courses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} style={{ textAlign: "center", padding: "20px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            courses.map((course, index) => (
                                <TableRow key={index + 1 + (currentPage - 1) * recordsPerPage}>
                                    <TableCell style={{ width: "5%" }} align="center">
                                        {index + 1 + (currentPage - 1) * recordsPerPage}
                                    </TableCell>
                                    <TableCell style={{ width: "15%" }}>{course.courseCode}</TableCell>
                                    <TableCell style={{ width: "15%" }}>{course.courseName}</TableCell>
                                    <TableCell style={{ width: "15%" }}>{course.academicYear}</TableCell>
                                    <TableCell style={{ width: "10%" }}>{course.semester}</TableCell>
                                    <TableCell style={{ width: "10%" }} align="center">
                                        {course.totalStudents}
                                    </TableCell>
                                    <TableCell style={{ width: "20%" }} align="center">
                                        {course.courseStatus}
                                    </TableCell>
                                    <TableCell style={{ width: "10%" }} align="center">
                                        <Tooltip title="Xem danh sách sinh viên">
                                            <IconButton color="primary" onClick={() => handleOpenStudentsModal(course)}>
                                                <PeopleIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="mt-4 pb-4">
                {/* Phân trang */}
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    recordsPerPage={recordsPerPage}
                    totalRecords={totalRecords}
                    onPageChange={handlePageChange}
                    onRecordsPerPageChange={handleRecordsPerPageChange}
                />
            </div>

            {openStudentsModal && (
                <CourseStudentsModal
                    isOpen={openStudentsModal}
                    onClose={handleCloseStudentsModal}
                    course={selectedCourse}
                />
            )}
        </div>
    );
};

export default CoursePage;
