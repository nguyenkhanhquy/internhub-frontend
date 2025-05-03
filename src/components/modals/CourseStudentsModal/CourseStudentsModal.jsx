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
    Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DashboardSearchBar from "@components/search/DashboardSearchBar";
import ReportDetails from "./ReportDetails";
import ScoreEntry from "./ScoreEntry";

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
            report: null,
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
                evaluationFile: null,
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
            score: null,
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
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedReportStudent, setSelectedReportStudent] = useState(null);
    const [score, setScore] = useState("");
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen && course) {
            const studentsData = mockStudents[course.id] || [];
            setStudents(studentsData);
            setFilteredStudents(studentsData);
            setSearchQuery("");
            setSelectedStudent(null);
            setSelectedReport(null);
            setSelectedReportStudent(null);
            setScore("");
            setComment("");
            setError("");
        }
    }, [isOpen, course]);

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
            setSelectedReportStudent(null);
            setError("");
        }
    };

    const handleOpenReportDetails = (student) => {
        if (student.report) {
            setSelectedReport(student.report);
            setSelectedReportStudent(student);
            setSelectedStudent(null);
            setError("");
        }
    };

    const handleBackToList = () => {
        setSelectedStudent(null);
        setSelectedReport(null);
        setSelectedReportStudent(null);
        setScore("");
        setComment("");
        setError("");
    };

    const handleScoreChange = (newScore) => {
        setScore(newScore);
        setError("");
    };

    const handleCommentChange = (newComment) => {
        setComment(newComment);
        setError("");
    };

    const handleSaveScore = () => {
        // Kiểm tra điểm
        if (score === "" || isNaN(score)) {
            setError("Vui lòng nhập điểm.");
            return;
        }

        const scoreValue = Number(score);
        if (scoreValue < 0 || scoreValue > 10) {
            setError("Điểm không hợp lệ. Điểm phải nằm trong khoảng từ 0 đến 10.");
            return;
        }

        // Kiểm tra nhận xét
        if (!comment.trim()) {
            setError("Vui lòng thêm nhận xét.");
            return;
        }

        // Nếu không có lỗi, tiến hành lưu
        const updatedStudents = students.map((student) =>
            student.id === selectedStudent.id ? { ...student, score: scoreValue } : student,
        );
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
        console.log({
            studentId: selectedStudent.studentId,
            name: selectedStudent.name,
            score: scoreValue,
            comment: comment,
        });
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
                        <TableContainer sx={{ flex: 1, overflowY: "auto", minWidth: "600px" }}>
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
                                        <TableCell align="center" style={{ width: "15%" }}>
                                            ĐIỂM HỆ 10
                                        </TableCell>
                                        <TableCell align="center" style={{ width: "15%" }}>
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
                                                        onClick={() => handleOpenReportDetails(student)}
                                                        disabled={!student.report}
                                                    >
                                                        Chi tiết
                                                    </Button>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{ width: "15%" }}
                                                    sx={{ padding: "8px" }}
                                                >
                                                    {student.score !== null ? student.score : "-"}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{ width: "15%" }}
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
                    <>
                        <ScoreEntry
                            student={selectedStudent}
                            score={score}
                            comment={comment}
                            onScoreChange={handleScoreChange}
                            onCommentChange={handleCommentChange}
                            onSaveScore={handleSaveScore}
                            onBackToList={handleBackToList}
                            onOpenReportDetails={handleOpenReportDetails}
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                    </>
                ) : (
                    <ReportDetails
                        report={selectedReport}
                        student={selectedReportStudent}
                        onDownloadFile={handleDownloadFile}
                        onOpenScoreForm={handleOpenScoreForm}
                        onBackToList={handleBackToList}
                    />
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
