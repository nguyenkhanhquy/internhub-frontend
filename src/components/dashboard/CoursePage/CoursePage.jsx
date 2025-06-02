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
    IconButton,
    Tooltip,
    LinearProgress,
    Skeleton,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PeopleIcon from "@mui/icons-material/People";

import EmptyBox from "@components/box/EmptyBox";
import CourseStudentsModal from "@components/modals/CourseStudentsModal/CourseStudentsModal";
import ImportFromExcelModal from "@components/modals/ImportFromExcelModal/ImportFromExcelModal";
import CreateCourseModal from "@components/modals/CreateCourseModal/CreateCourseModal";
import UpdateCourseModal from "@components/modals/UpdateCourseModal/UpdateCourseModal";
import AssignStudentsToCourse from "@components/modals/AssignStudentsToCourseModal/AssignStudentsToCourseModal";
import DashboardSearchBar from "@components/search/DashboardSearchBar";
import CustomPagination from "@components/pagination/Pagination";
import ConfirmDialog from "@components/common/ConfirmDialog/ConfirmDialog";

import { getAllYearAndSemester } from "@services/academicService";
import { getAllCourses, deleteCourse } from "@services/courseService";
import { updateCourseStatus } from "@services/courseService";

const CoursePage = () => {
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(false);
    const [courses, setCourses] = useState([]);
    const [openImportModal, setOpenImportModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openAssignModal, setOpenAssignModal] = useState(false);
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
    const [selectedYear, setSelectedYear] = useState("Tất cả năm học");
    const [selectedSemester, setSelectedSemester] = useState("ALL");

    const [currentAcademicYear, setCurrentAcademicYear] = useState(null);
    const [currentSemester, setCurrentSemester] = useState(null);

    // Confirm Dialog states
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: "",
        message: "",
        onConfirm: null,
        confirmText: "Xác nhận",
        confirmColor: "primary",
        severity: "warning",
        loading: false,
    });

    const handleUpdateCourse = async (course) => {
        setSelectedCourse(course);
        setOpenUpdateModal(true);
    };

    const handleAssignStudents = (course) => {
        setSelectedCourse(course);
        setOpenAssignModal(true);
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
            const yearParam = selectedYear === "Tất cả năm học" ? null : selectedYear;
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

    const handleChangeStatusToGrading = async (course) => {
        setConfirmDialog({
            open: true,
            title: "Xác nhận chuyển trạng thái",
            message: `Bạn có chắc chắn muốn chuyển trạng thái lớp ${course.courseCode} từ "Đang điều chỉnh" sang "Đang nhập điểm"?`,
            confirmText: "Chuyển trạng thái",
            confirmColor: "success",
            severity: "info",
            loading: false,
            onConfirm: () => confirmChangeStatus(course.id),
        });
    };

    const confirmChangeStatus = async (courseId) => {
        setConfirmDialog((prev) => ({ ...prev, loading: true }));
        try {
            const data = await updateCourseStatus(courseId, "GRADING");
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setFlag((prev) => !prev);
            toast.success(data.message);
            setConfirmDialog((prev) => ({ ...prev, open: false, loading: false }));
        } catch (error) {
            toast.error(error.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            setConfirmDialog((prev) => ({ ...prev, loading: false }));
        }
    };

    const handleDeleteCourse = async (courseId, courseCode) => {
        setConfirmDialog({
            open: true,
            title: "Xác nhận xóa lớp học",
            message: `Bạn có chắc chắn muốn xóa lớp học ${courseCode}? Hành động này không thể hoàn tác.`,
            confirmText: "Xóa",
            confirmColor: "error",
            severity: "error",
            loading: false,
            onConfirm: () => confirmDeleteCourse(courseId),
        });
    };

    const confirmDeleteCourse = async (courseId) => {
        setConfirmDialog((prev) => ({ ...prev, loading: true }));
        try {
            await deleteCourse(courseId);
            setFlag((prev) => !prev);
            toast.success("Xóa lớp học thành công!");
            setConfirmDialog((prev) => ({ ...prev, open: false, loading: false }));
        } catch (error) {
            toast.error(error.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            setConfirmDialog((prev) => ({ ...prev, loading: false }));
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

                setCurrentAcademicYear(data.result.currentAcademicYear);
                setCurrentSemester(data.result.currentSemester);

                setSelectedYear(data.result.currentAcademicYear?.name || "ALL");
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
                        disabled={loading}
                        startIcon={<CachedIcon className={`${loading ? "animate-spin" : ""}`} />}
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
                            <MenuItem key={option.id} value={option.name}>
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

            <TableContainer
                className="rounded bg-white shadow-md"
                sx={{
                    position: "relative",
                    overflowX: "auto",
                    width: "100%",
                }}
            >
                {loading && (
                    <LinearProgress
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: 54,
                            right: 0,
                            zIndex: 1,
                            height: "4px",
                        }}
                    />
                )}
                <Table sx={{ minWidth: 1350 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: "center", width: "5%" }}>STT</TableCell>
                            <TableCell style={{ textAlign: "center", width: "20%" }}>MÃ LỚP HỌC PHẦN</TableCell>
                            {/* <TableCell style={{ textAlign: "center", width: "10%" }}>TÊN HỌC PHẦN</TableCell> */}
                            <TableCell style={{ textAlign: "center", width: "10%" }}>NĂM HỌC</TableCell>
                            <TableCell style={{ textAlign: "center", width: "10%" }}>HỌC KỲ</TableCell>
                            <TableCell style={{ textAlign: "center", width: "15%" }}>GIẢNG VIÊN</TableCell>
                            <TableCell style={{ textAlign: "center", width: "10%" }}>SĨ SỐ</TableCell>
                            <TableCell style={{ textAlign: "center", width: "15%" }}>TRẠNG THÁI</TableCell>
                            <TableCell style={{ textAlign: "center", width: "15%" }}>HÀNH ĐỘNG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && courses.length === 0 ? (
                            // Hiển thị skeleton khi loading và không có dữ liệu cũ
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={`skeleton-${index}`}>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <Skeleton variant="text" width="100%" />
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <Skeleton variant="text" width="100%" />
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <Skeleton variant="text" width="100%" />
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <Skeleton variant="text" width="100%" />
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <Skeleton variant="text" width="100%" />
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <Skeleton variant="text" width="100%" />
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <Skeleton variant="text" width="100%" />
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                                            <Skeleton variant="rounded" width={40} height={40} />
                                            <Skeleton variant="rounded" width={40} height={40} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : courses.length === 0 && !loading ? (
                            // Hiển thị EmptyBox khi không có dữ liệu và không loading
                            <TableRow>
                                <TableCell colSpan={8} style={{ textAlign: "center", height: "364px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Hiển thị dữ liệu - làm mờ nếu đang loading
                            courses.map((course, index) => (
                                <TableRow
                                    key={index + 1 + (currentPage - 1) * recordsPerPage}
                                    sx={{
                                        opacity: loading ? 0.5 : 1,
                                        pointerEvents: loading ? "none" : "auto",
                                        transition: "opacity 0.3s ease",
                                    }}
                                >
                                    <TableCell style={{ textAlign: "center" }}>
                                        {index + 1 + (currentPage - 1) * recordsPerPage}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{course.courseCode}</TableCell>
                                    {/* <TableCell style={{ textAlign: "center" }}>{course.courseName}</TableCell> */}
                                    <TableCell style={{ textAlign: "center" }}>{course.academicYear}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{course.semester}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{course.teacherName}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{course.totalStudents}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{course.courseStatus}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        {course.courseStatus === "Đang điều chỉnh" ? (
                                            <>
                                                <Tooltip title="Xác nhận" arrow>
                                                    <IconButton
                                                        color="success"
                                                        onClick={() => handleChangeStatusToGrading(course)}
                                                    >
                                                        <PlayArrowIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Chỉnh sửa" arrow>
                                                    <IconButton
                                                        color="warning"
                                                        onClick={() => handleUpdateCourse(course)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Gán sinh viên" arrow>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleAssignStudents(course)}
                                                    >
                                                        <PersonAddIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xóa" arrow>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDeleteCourse(course.id, course.courseCode)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        ) : (
                                            <Tooltip title="Xem danh sách sinh viên" arrow>
                                                <IconButton
                                                    color="info"
                                                    onClick={() => handleOpenStudentsModal(course)}
                                                >
                                                    <PeopleIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
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
                    academicYear={academicYears.find((year) => year.id === currentAcademicYear.id)}
                    semester={semesters.find((sem) => sem.id === currentSemester.id)}
                    setFlag={setFlag}
                />
            )}

            {openUpdateModal && (
                <UpdateCourseModal
                    isOpen={openUpdateModal}
                    onClose={() => setOpenUpdateModal(false)}
                    academicYear={academicYears.find((year) => year.name === selectedCourse.academicYear)}
                    semester={semesters.find((sem) => sem.name === selectedCourse.semester)}
                    course={selectedCourse}
                    setFlag={setFlag}
                />
            )}

            {openAssignModal && (
                <AssignStudentsToCourse
                    isOpen={openAssignModal}
                    onClose={() => setOpenAssignModal(false)}
                    course={selectedCourse}
                    setFlag={setFlag}
                />
            )}

            {openStudentsModal && (
                <CourseStudentsModal
                    isOpen={openStudentsModal}
                    onClose={handleCloseStudentsModal}
                    course={selectedCourse}
                />
            )}

            <ConfirmDialog
                open={confirmDialog.open}
                onClose={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
                onConfirm={confirmDialog.onConfirm}
                title={confirmDialog.title}
                message={confirmDialog.message}
                confirmText={confirmDialog.confirmText}
                confirmColor={confirmDialog.confirmColor}
                severity={confirmDialog.severity}
                loading={confirmDialog.loading}
            />
        </div>
    );
};

export default CoursePage;
