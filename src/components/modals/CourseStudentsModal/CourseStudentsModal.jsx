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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DashboardSearchBar from "@components/search/DashboardSearchBar";

const mockStudents = {
    1: [
        { id: 1, studentId: "SV001", name: "Nguyen Van A", report: "file", score: 8.5 },
        { id: 2, studentId: "SV002", name: "Tran Thi B", report: "Chưa nộp", score: null },
        { id: 3, studentId: "SV003", name: "Le Van C", report: "file", score: 7.0 },
        { id: 4, studentId: "SV004", name: "Pham Thi D", report: "file", score: 9.0 },
        { id: 5, studentId: "SV005", name: "Hoang Van E", report: "Chưa nộp", score: null },
        { id: 6, studentId: "SV006", name: "Do Thi F", report: "file", score: 6.5 },
        { id: 7, studentId: "SV007", name: "Vu Van G", report: "Chưa nộp", score: null },
        { id: 8, studentId: "SV008", name: "Ngo Thi H", report: "file", score: 8.0 },
        { id: 9, studentId: "SV009", name: "Bui Van I", report: "Chưa nộp", score: null },
        { id: 10, studentId: "SV010", name: "Dang Thi K", report: "file", score: 7.5 },
        { id: 11, studentId: "SV011", name: "Trinh Van L", report: "Chưa nộp", score: null },
        { id: 12, studentId: "SV012", name: "Pham Van M", report: "file", score: 9.5 },
        { id: 13, studentId: "SV013", name: "Nguyen Thi N", report: "Chưa nộp", score: null },
        { id: 14, studentId: "SV014", name: "Ho Van O", report: "file", score: 6.0 },
        { id: 15, studentId: "SV015", name: "Nguyen Van P", report: "Chưa nộp", score: null },
        { id: 16, studentId: "SV016", name: "Tran Thi Q", report: "file", score: 8.5 },
        { id: 17, studentId: "SV017", name: "Le Van R", report: "Chưa nộp", score: null },
        { id: 18, studentId: "SV018", name: "Pham Thi S", report: "file", score: 7.0 },
        { id: 19, studentId: "SV019", name: "Hoang Van T", report: "Chưa nộp", score: null },
        { id: 20, studentId: "SV020", name: "Do Thi U", report: "file", score: 9.0 },
        { id: 21, studentId: "SV021", name: "Vu Van V", report: "Chưa nộp", score: null },
        { id: 22, studentId: "SV022", name: "Ngo Thi W", report: "file", score: 6.5 },
        { id: 23, studentId: "SV023", name: "Bui Van X", report: "Chưa nộp", score: null },
        { id: 24, studentId: "SV024", name: "Dang Thi Y", report: "file", score: 8.0 },
        { id: 25, studentId: "SV025", name: "Trinh Van Z", report: "Chưa nộp", score: null },
        { id: 26, studentId: "SV026", name: "Pham Van AA", report: "file", score: 7.5 },
        { id: 27, studentId: "SV027", name: "Nguyen Thi AB", report: "Chưa nộp", score: null },
        { id: 28, studentId: "SV028", name: "Ho Van AC", report: "file", score: 9.5 },
        { id: 29, studentId: "SV029", name: "Nguyen Van AD", report: "Chưa nộp", score: null },
        { id: 30, studentId: "SV030", name: "Tran Thi AE", report: "file", score: 6.0 },
    ],
    2: [
        { id: 4, studentId: "SV004", name: "Pham Thi D", report: "Chưa nộp", score: null },
        { id: 5, studentId: "SV005", name: "Hoang Van E", report: "file", score: 8.5 },
    ],
    3: [
        { id: 6, studentId: "SV006", name: "Do Thi F", report: "file", score: 7.0 },
        { id: 7, studentId: "SV007", name: "Vu Van G", report: "Chưa nộp", score: null },
        { id: 8, studentId: "SV008", name: "Ngo Thi H", report: "file", score: 9.0 },
    ],
    4: [
        { id: 9, studentId: "SV009", name: "Bui Van I", report: "Chưa nộp", score: null },
        { id: 10, studentId: "SV010", name: "Dang Thi K", report: "file", score: 6.5 },
        { id: 11, studentId: "SV011", name: "Trinh Van L", report: "Chưa nộp", score: null },
    ],
    5: [
        { id: 12, studentId: "SV012", name: "Pham Van M", report: "file", score: 8.0 },
        { id: 13, studentId: "SV013", name: "Nguyen Thi N", report: "Chưa nộp", score: null },
        { id: 14, studentId: "SV014", name: "Ho Van O", report: "file", score: 7.5 },
    ],
};

const CourseStudentsModal = ({ isOpen, onClose, course }) => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [score, setScore] = useState("");
    const [comment, setComment] = useState("");

    // Load danh sách sinh viên khi modal mở
    useEffect(() => {
        if (isOpen && course) {
            const studentsData = mockStudents[course.id] || [];
            setStudents(studentsData);
            setFilteredStudents(studentsData);
            setSearchQuery("");
            setSelectedStudent(null); // Reset khi mở modal
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
        }
    };

    const handleBackToList = () => {
        setSelectedStudent(null);
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
        handleBackToList(); // Quay lại danh sách sau khi lưu
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
                        : `Danh sách sinh viên - ${course?.courseName}`}
                </Typography>
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {!selectedStudent ? (
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
                                        <TableCell style={{ width: "20%" }}>MSSV</TableCell>
                                        <TableCell style={{ width: "20%" }}>BÁO CÁO THỰC TẬP</TableCell>
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
                                                <TableCell style={{ width: "20%" }} sx={{ padding: "8px" }}>
                                                    {student.studentId}
                                                </TableCell>
                                                <TableCell style={{ width: "20%" }} sx={{ padding: "8px" }}>
                                                    {student.report}
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
                ) : (
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
