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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Tooltip } from "@mui/material";

import EmptyBox from "@components/box/EmptyBox";
import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";
import ImportFromExcelModal from "@/components/modals/ImportFromExcelModal/ImportFromExcelModal";
import CreateCourseModal from "@/components/modals/CreateCourseModal/CreateCourseModal";
import UpdateCourseModal from "@/components/modals/UpdateCourseModal/UpdateCourseModal";
import AssignStudentsToCourse from "@/components/modals/AssignStudentsToCourseModal/AssignStudentsToCourseModal";
import DashboardSearchBar from "@components/search/DashboardSearchBar";
import CustomPagination from "@components/pagination/Pagination";

import { getAllYearAndSemester } from "@services/academicService";
import { getAllCourses, deleteCourse } from "@services/courseService";

const CoursePage = () => {
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(false);
    const [courses, setCourses] = useState([]);
    const [openImportModal, setOpenImportModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openAssignModal, setOpenAssignModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

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

    const handleUpdateCourse = async (course) => {
        setSelectedCourse(course);
        setOpenUpdateModal(true);
    };

    const handleAssignStudents = (course) => {
        setSelectedCourse(course);
        setOpenAssignModal(true);
    };

    const handleUpdateSubmit = async (formData) => {
        // Logic cập nhật lớp học ở đây
        console.log("Cập nhật lớp học với dữ liệu:", formData);
        setFlag((prev) => !prev); // Cập nhật lại danh sách lớp học
    };

    const handleAssignSubmit = async (assignedStudents) => {
        // Logic gán sinh viên vào lớp ở đây
        console.log("Gán sinh viên cho lớp:", selectedCourse.courseCode, assignedStudents);
        setFlag((prev) => !prev); // Cập nhật lại danh sách lớp học
    };

    const handleImportSubmit = async (file) => {
        console.log(`Import danh sách lớp thành công`, file);
        setFlag((prev) => !prev);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setCurrentPage(1);
        setRecordsPerPage(value);
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const yearParam = selectedYear === "ALL" ? null : selectedYear;
            const semesterParam = selectedSemester === "ALL" ? null : selectedSemester;
            const data = await getAllCourses(currentPage - 1, recordsPerPage, search, yearParam, semesterParam);
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
    }, [currentPage, recordsPerPage, search, selectedYear, selectedSemester]);

    const handleDeleteCourse = async (courseId) => {
        try {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa lớp học này?");
            if (!isConfirm) {
                return;
            }

            try {
                await deleteCourse(courseId);
            } catch (error) {
                toast.error(error.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                return;
            }

            setFlag((prev) => !prev);
            toast.success("Xóa lớp học thành công!");
        } catch (error) {
            toast.error(error.message);
        }
    };

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
                        onClick={() => setOpenImportModal(true)}
                        variant="outlined"
                        color="primary"
                        startIcon={<UploadFileIcon />}
                    >
                        Import
                    </Button>
                    <Button
                        onClick={() => setOpenCreateModal(true)}
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                    >
                        Tạo lớp
                    </Button>
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
                            <TableCell style={{ width: "2%" }}>STT</TableCell>
                            <TableCell style={{ width: "10%" }}>MÃ HỌC PHẦN</TableCell>
                            <TableCell style={{ width: "15%" }}>TÊN HỌC PHẦN</TableCell>
                            <TableCell style={{ width: "10%" }}>NĂM HỌC</TableCell>
                            <TableCell style={{ width: "10%" }}>HỌC KỲ</TableCell>
                            <TableCell style={{ width: "15%" }}>GIẢNG VIÊN</TableCell>
                            <TableCell style={{ width: "10%" }}>SĨ SỐ</TableCell>
                            <TableCell style={{ width: "15%" }}>TRẠNG THÁI</TableCell>
                            <TableCell style={{ width: "23%" }}>HÀNH ĐỘNG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} style={{ textAlign: "center", padding: "20px" }}>
                                    <SuspenseLoader />
                                </TableCell>
                            </TableRow>
                        ) : courses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} style={{ textAlign: "center", padding: "20px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            courses.map((course, index) => (
                                <TableRow key={index + 1 + (currentPage - 1) * recordsPerPage}>
                                    <TableCell style={{ width: "2%" }}>
                                        {index + 1 + (currentPage - 1) * recordsPerPage}
                                    </TableCell>
                                    <TableCell style={{ width: "10%" }}>{course.courseCode}</TableCell>
                                    <TableCell style={{ width: "15%" }}>{course.courseName}</TableCell>
                                    <TableCell style={{ width: "10%" }}>{course.academicYear}</TableCell>
                                    <TableCell style={{ width: "10%" }}>{course.semester}</TableCell>
                                    <TableCell style={{ width: "15%" }}>{course.teacherName}</TableCell>
                                    <TableCell style={{ width: "10%" }}>{course.totalStudents}</TableCell>
                                    <TableCell style={{ width: "15%" }}>{course.courseStatus}</TableCell>
                                    <TableCell style={{ width: "23%" }}>
                                        <Tooltip title="Chỉnh sửa">
                                            <IconButton color="primary" onClick={() => handleUpdateCourse(course)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Gán sinh viên">
                                            <IconButton color="primary" onClick={() => handleAssignStudents(course)}>
                                                <PersonAddIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Xóa">
                                            <IconButton color="error" onClick={() => handleDeleteCourse(course.id)}>
                                                <DeleteIcon />
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

            {openImportModal && (
                <ImportFromExcelModal
                    isOpen={openImportModal}
                    onClose={() => setOpenImportModal(false)}
                    entityName="lớp"
                    templateUrl="/templates/course-template.xlsx"
                    onImport={handleImportSubmit}
                />
            )}

            {openCreateModal && (
                <CreateCourseModal
                    isOpen={openCreateModal}
                    onClose={() => setOpenCreateModal(false)}
                    academicYear={academicYears.find((year) => year.id === selectedYear)}
                    semester={semesters.find((sem) => sem.id === selectedSemester)}
                    setFlag={setFlag}
                />
            )}

            {openUpdateModal && (
                <UpdateCourseModal
                    isOpen={openUpdateModal}
                    onClose={() => setOpenUpdateModal(false)}
                    course={selectedCourse}
                    onUpdate={handleUpdateSubmit}
                />
            )}

            {openAssignModal && (
                <AssignStudentsToCourse
                    isOpen={openAssignModal}
                    onClose={() => setOpenAssignModal(false)}
                    course={selectedCourse}
                    onSave={handleAssignSubmit}
                />
            )}
        </div>
    );
};

export default CoursePage;
