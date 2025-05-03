import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Box,
    TableContainer,
    Button,
    TextField,
    TextareaAutosize,
    Paper,
    Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import DashboardSearchBar from "@components/search/DashboardSearchBar";
import { formatDate } from "../../../utils/dateUtil";

// Nhãn chuyên ngành
const majorLabels = {
    IT: "Công nghệ thông tin",
    DS: "Kỹ thuật dữ liệu",
    IS: "An toàn thông tin",
};

const mockStudents = {
    1: [
        {
            id: 1,
            studentId: "SV001",
            name: "Nguyen Van A",
            report: {
                createdDate: "2025-04-01",
                reportStatus: "ACCEPTED",
                student: { name: "Nguyen Van A", studentId: "SV001", major: "IT" },
                teacherName: "Dr. Tran Van X",
                companyName: "Tech Corp",
                systemCompany: true,
                instructorName: "Mr. Le Van Y",
                instructorEmail: "le.van.y@techcorp.com",
                startDate: "2025-01-15",
                endDate: "2025-03-15",
                reportFile: "report_sv001.pdf",
                evaluationFile: "evaluation_sv001.pdf",
            },
            score: 8.5,
        },
        {
            id: 2,
            studentId: "SV002",
            name: "Tran Thi B",
            report: null, // Chưa nộp báo cáo
            score: null,
        },
        {
            id: 3,
            studentId: "SV003",
            name: "Le Van C",
            report: {
                createdDate: "2025-04-02",
                reportStatus: "PROCESSING",
                student: { name: "Le Van C", studentId: "SV003", major: "DS" },
                teacherName: "Dr. Pham Thi Z",
                companyName: "Data Inc",
                systemCompany: false,
                instructorName: "Ms. Nguyen Thi W",
                instructorEmail: "nguyen.thi.w@datainc.com",
                startDate: "2025-01-10",
                endDate: "2025-03-10",
                reportFile: "report_sv003.pdf",
                evaluationFile: null, // Không có phiếu đánh giá
            },
            score: 7.0,
        },
    ],
    2: [
        {
            id: 4,
            studentId: "SV004",
            name: "Pham Thi D",
            report: null,
            score: null,
        },
        {
            id: 5,
            studentId: "SV005",
            name: "Hoang Van E",
            report: {
                createdDate: "2025-04-03",
                reportStatus: "REJECTED",
                student: { name: "Hoang Van E", studentId: "SV005", major: "IS" },
                teacherName: "Dr. Vu Van T",
                companyName: "Secure Ltd",
                systemCompany: true,
                instructorName: "Mr. Bui Van U",
                instructorEmail: "bui.van.u@secureltd.com",
                startDate: "2025-01-20",
                endDate: "2025-03-20",
                reportFile: "report_sv005.pdf",
                evaluationFile: "evaluation_sv005.pdf",
            },
            score: 8.5,
        },
    ],
    3: [
        {
            id: 6,
            studentId: "SV006",
            name: "Do Thi F",
            report: {
                createdDate: "2025-04-04",
                reportStatus: "ACCEPTED",
                student: { name: "Do Thi F", studentId: "SV006", major: "IT" },
                teacherName: "Dr. Ngo Thi V",
                companyName: "Tech Solutions",
                systemCompany: false,
                instructorName: "Ms. Tran Thi Q",
                instructorEmail: "tran.thi.q@techsolutions.com",
                startDate: "2025-01-25",
                endDate: "2025-03-25",
                reportFile: "report_sv006.pdf",
                evaluationFile: "evaluation_sv006.pdf",
            },
            score: 7.0,
        },
        {
            id: 7,
            studentId: "SV007",
            name: "Vu Van G",
            report: null,
            score: null,
        },
        {
            id: 8,
            studentId: "SV008",
            name: "Ngo Thi H",
            report: {
                createdDate: "2025-04-05",
                reportStatus: "PROCESSING",
                student: { name: "Ngo Thi H", studentId: "SV008", major: "DS" },
                teacherName: "Dr. Le Van R",
                companyName: "Data Solutions",
                systemCompany: true,
                instructorName: "Mr. Pham Van S",
                instructorEmail: "pham.van.s@datasolutions.com",
                startDate: "2025-01-30",
                endDate: "2025-03-30",
                reportFile: "report_sv008.pdf",
                evaluationFile: null,
            },
            score: 9.0,
        },
    ],
    4: [
        {
            id: 9,
            studentId: "SV009",
            name: "Bui Van I",
            report: null,
            score: null,
        },
        {
            id: 10,
            studentId: "SV010",
            name: "Dang Thi K",
            report: {
                createdDate: "2025-04-06",
                reportStatus: "ACCEPTED",
                student: { name: "Dang Thi K", studentId: "SV010", major: "IS" },
                teacherName: "Dr. Hoang Van P",
                companyName: "Secure Tech",
                systemCompany: false,
                instructorName: "Ms. Nguyen Thi T",
                instructorEmail: "nguyen.thi.t@securetech.com",
                startDate: "2025-02-01",
                endDate: "2025-04-01",
                reportFile: "report_sv010.pdf",
                evaluationFile: "evaluation_sv010.pdf",
            },
            score: 6.5,
        },
        {
            id: 11,
            studentId: "SV011",
            name: "Trinh Van L",
            report: null,
            score: null,
        },
    ],
    5: [
        {
            id: 12,
            studentId: "SV012",
            name: "Pham Van M",
            report: {
                createdDate: "2025-04-07",
                reportStatus: "REJECTED",
                student: { name: "Pham Van M", studentId: "SV012", major: "IT" },
                teacherName: "Dr. Tran Thi U",
                companyName: "Tech Innovations",
                systemCompany: true,
                instructorName: "Mr. Le Van V",
                instructorEmail: "le.van.v@techinnovations.com",
                startDate: "2025-02-05",
                endDate: "2025-04-05",
                reportFile: "report_sv012.pdf",
                evaluationFile: null,
            },
            score: 8.0,
        },
        {
            id: 13,
            studentId: "SV013",
            name: "Nguyen Thi N",
            report: null,
            score: null,
        },
        {
            id: 14,
            studentId: "SV014",
            name: "Ho Van O",
            report: {
                createdDate: "2025-04-08",
                reportStatus: "ACCEPTED",
                student: { name: "Ho Van O", studentId: "SV014", major: "DS" },
                teacherName: "Dr. Bui Thi W",
                companyName: "Data Tech",
                systemCompany: false,
                instructorName: "Ms. Pham Thi X",
                instructorEmail: "pham.thi.x@datatech.com",
                startDate: "2025-02-10",
                endDate: "2025-04-10",
                reportFile: "report_sv014.pdf",
                evaluationFile: "evaluation_sv014.pdf",
            },
            score: 7.5,
        },
    ],
};

const CourseStudentsModal = ({ isOpen, onClose, course }) => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null); // Sinh viên được chọn để nhập điểm
    const [selectedReport, setSelectedReport] = useState(null); // Báo cáo được chọn để xem chi tiết
    const [score, setScore] = useState("");
    const [comment, setComment] = useState("");

    // Load danh sách sinh viên khi modal mở
    useEffect(() => {
        if (isOpen && course) {
            const studentsData = mockStudents[course.id] || [];
            setStudents(studentsData);
            setFilteredStudents(studentsData);
            setSearchQuery("");
            setSelectedStudent(null);
            setSelectedReport(null);
            setScore("");
            setComment("");
        }
    }, [isOpen, course]);

    // Lọc sinh viên khi thay đổi từ khóa tìm kiếm
    useEffect(() => {
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            const filtered = students.filter(
                (student) =>
                    student.name.toLowerCase().includes(searchLower) ||
                    student.studentId.toLowerCase().includes(searchLower),
            );
            setFilteredStudents(filtered);
        } else {
            setFilteredStudents(students);
        }
    }, [searchQuery, students]);

    const handleSearch = (searchText) => {
        setSearchQuery(searchText);
    };

    const handleOpenScoreForm = (student) => {
        if (!student.score) {
            setSelectedStudent(student);
            setSelectedReport(null);
        }
    };

    const handleOpenReportDetails = (report) => {
        if (report) {
            setSelectedReport(report);
            setSelectedStudent(null);
        }
    };

    const handleBackToList = () => {
        setSelectedStudent(null);
        setSelectedReport(null);
        setScore("");
        setComment("");
    };

    const handleSaveScore = () => {
        if (selectedStudent && score !== "" && !isNaN(score)) {
            const updatedStudents = students.map((student) =>
                student.id === selectedStudent.id ? { ...student, score: Number(score) } : student,
            );
            setStudents(updatedStudents);
            setFilteredStudents(updatedStudents);
            console.log({
                studentId: selectedStudent.studentId,
                name: selectedStudent.name,
                score: score,
                comment: comment,
            });
        }
        handleBackToList();
    };

    const handleDownloadFile = (file) => {
        console.log(`Downloading file: ${file}`);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "1200px",
                    maxWidth: "90%",
                    height: "85vh",
                    maxHeight: "85vh",
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography fontWeight="bold">
                    {selectedStudent
                        ? `Nhập điểm - ${selectedStudent.name}`
                        : selectedReport
                          ? `Chi tiết báo cáo thực tập - ${selectedReport.student.name}`
                          : `Danh sách sinh viên - ${course?.courseName}`}
                </Typography>
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {!selectedStudent && !selectedReport ? (
                    <>
                        <Box className="sticky top-0 z-10 bg-white">
                            <DashboardSearchBar
                                onSearch={handleSearch}
                                query={searchQuery}
                                placeholder="Tìm kiếm sinh viên..."
                            />
                        </Box>
                        <TableContainer sx={{ flex: 1, overflowY: "auto" }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ width: "5%" }}>
                                            STT
                                        </TableCell>
                                        <TableCell style={{ width: "25%" }}>HỌ VÀ TÊN</TableCell>
                                        <TableCell style={{ width: "15%" }} align="center">
                                            MSSV
                                        </TableCell>
                                        <TableCell align="center" style={{ width: "25%" }}>
                                            BÁO CÁO THỰC TẬP
                                        </TableCell>
                                        <TableCell align="center" style={{ width: "10%" }}>
                                            ĐIỂM HỆ 10
                                        </TableCell>
                                        <TableCell align="center" style={{ width: "20%" }}>
                                            HÀNH ĐỘNG
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredStudents.length === 0 ? (
                                        <TableRow sx={{ height: "auto" }}>
                                            <TableCell
                                                colSpan={6}
                                                align="center"
                                                sx={{ padding: "8px", height: "auto" }}
                                            >
                                                <Typography color="textSecondary">
                                                    {searchQuery
                                                        ? "Không tìm thấy sinh viên nào."
                                                        : "Không có sinh viên nào."}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredStudents.map((student, index) => (
                                            <TableRow key={student.id} sx={{ height: "48px" }}>
                                                <TableCell
                                                    align="center"
                                                    style={{ width: "5%" }}
                                                    sx={{ padding: "8px", height: "48px" }}
                                                >
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell style={{ width: "25%" }} sx={{ padding: "8px" }}>
                                                    {student.name}
                                                </TableCell>
                                                <TableCell
                                                    style={{ width: "15%" }}
                                                    sx={{ padding: "8px" }}
                                                    align="center"
                                                >
                                                    {student.studentId}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{ width: "25%" }}
                                                    sx={{ padding: "8px" }}
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleOpenReportDetails(student.report)}
                                                        disabled={!student.report}
                                                    >
                                                        Chi tiết
                                                    </Button>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{ width: "10%" }}
                                                    sx={{ padding: "8px" }}
                                                >
                                                    {student.score !== null ? student.score : "-"}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{ width: "20%" }}
                                                    sx={{ padding: "8px" }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleOpenScoreForm(student)}
                                                        disabled={student.score !== null}
                                                    >
                                                        Nhập điểm
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : selectedStudent ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}>
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                Điểm
                            </Typography>
                            <TextField
                                type="number"
                                label="Nhập điểm"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                variant="outlined"
                                fullWidth
                                inputProps={{ min: 0, max: 10, step: 0.1 }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                Nhận xét chung
                            </Typography>
                            <TextareaAutosize
                                minRows={5}
                                placeholder="Nhập nhận xét..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                    resize: "vertical",
                                }}
                            />
                        </Box>
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                            <Button variant="outlined" color="primary" onClick={handleBackToList}>
                                Quay lại
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSaveScore}>
                                Lưu
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ padding: 2 }}>
                        <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2 }}>
                            {/* Ngày tạo và trạng thái báo cáo */}
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="caption" color="text.secondary">
                                    Ngày tạo:{" "}
                                    {selectedReport?.createdDate ? formatDate(selectedReport.createdDate) : "N/A"}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 500,
                                        padding: "4px 8px",
                                        borderRadius: 1,
                                        color:
                                            selectedReport?.reportStatus === "PROCESSING"
                                                ? "orange"
                                                : selectedReport?.reportStatus === "ACCEPTED"
                                                  ? "green"
                                                  : "red",
                                        backgroundColor:
                                            selectedReport?.reportStatus === "PROCESSING"
                                                ? "rgba(255, 165, 0, 0.1)"
                                                : selectedReport?.reportStatus === "ACCEPTED"
                                                  ? "rgba(0, 128, 0, 0.1)"
                                                  : "rgba(255, 0, 0, 0.1)",
                                    }}
                                >
                                    {selectedReport?.reportStatus === "PROCESSING"
                                        ? "Chờ duyệt"
                                        : selectedReport?.reportStatus === "ACCEPTED"
                                          ? "Đã được duyệt"
                                          : "Không được duyệt"}
                                </Typography>
                            </Box>

                            {/* Thông tin sinh viên và thông tin thực tập theo chiều ngang */}
                            <Box mt={2} display="flex" gap={4}>
                                {/* Thông tin sinh viên */}
                                <Box flex={1}>
                                    <Typography variant="h6" gutterBottom>
                                        Thông tin sinh viên
                                    </Typography>
                                    <Divider />
                                    <Box mt={2} display="flex" flexDirection="column" gap={1}>
                                        <Typography variant="body1">
                                            <strong>Sinh Viên:</strong> {selectedReport?.student?.name || "N/A"}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>MSSV:</strong> {selectedReport?.student?.studentId || "N/A"}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Chuyên ngành:</strong>{" "}
                                            {majorLabels[selectedReport?.student?.major] ||
                                                selectedReport?.student?.major ||
                                                "N/A"}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Thông tin thực tập */}
                                <Box flex={1}>
                                    <Typography variant="h6" gutterBottom>
                                        Thông tin thực tập
                                    </Typography>
                                    <Divider />
                                    <Box mt={2} display="flex" flexDirection="column" gap={1}>
                                        <Typography variant="body1">
                                            <strong>Giảng viên hướng dẫn:</strong>{" "}
                                            {selectedReport?.teacherName || "N/A"}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Công ty thực tập:</strong> {selectedReport?.companyName || "N/A"}{" "}
                                            {selectedReport?.systemCompany ? " - (Hệ thống)" : " - (Ngoài hệ thống)"}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Người hướng dẫn:</strong> {selectedReport?.instructorName || "N/A"}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Email người hướng dẫn:</strong>{" "}
                                            {selectedReport?.instructorEmail || "N/A"}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Ngày bắt đầu:</strong>{" "}
                                            {selectedReport?.startDate ? formatDate(selectedReport.startDate) : "N/A"}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Ngày kết thúc:</strong>{" "}
                                            {selectedReport?.endDate ? formatDate(selectedReport.endDate) : "N/A"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Nút hành động */}
                            <Box mt={4} display="flex" justifyContent="center" gap={2}>
                                <Button
                                    variant="contained"
                                    startIcon={<DescriptionIcon />}
                                    sx={{
                                        backgroundColor: "#1e40af",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#1e3a8a" },
                                    }}
                                    onClick={() => handleDownloadFile(selectedReport?.reportFile)}
                                    disabled={!selectedReport?.reportFile}
                                >
                                    File báo cáo
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<DescriptionIcon />}
                                    sx={{
                                        backgroundColor: "#1e40af",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#1e3a8a" },
                                    }}
                                    onClick={() => handleDownloadFile(selectedReport?.evaluationFile)}
                                    disabled={!selectedReport?.evaluationFile}
                                >
                                    Phiếu đánh giá
                                </Button>
                            </Box>
                        </Paper>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <Button variant="outlined" color="primary" onClick={handleBackToList}>
                                Quay lại
                            </Button>
                        </Box>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

CourseStudentsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
};

export default CourseStudentsModal;
