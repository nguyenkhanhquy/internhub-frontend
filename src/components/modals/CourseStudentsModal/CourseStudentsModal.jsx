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
    TextField,
    Box,
    TableContainer,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Mock data danh sách sinh viên cho từng lớp (dựa trên course.id)
const mockStudents = {
    1: [
        { id: 1, studentId: "SV001", name: "Nguyen Van A", report: "file" },
        { id: 2, studentId: "SV002", name: "Tran Thi B", report: "Chưa nộp" },
        { id: 3, studentId: "SV003", name: "Le Van C", report: "file" },
    ],
    2: [
        { id: 4, studentId: "SV004", name: "Pham Thi D", report: "Chưa nộp" },
        { id: 5, studentId: "SV005", name: "Hoang Van E", report: "file" },
    ],
    3: [
        { id: 6, studentId: "SV006", name: "Do Thi F", report: "file" },
        { id: 7, studentId: "SV007", name: "Vu Van G", report: "Chưa nộp" },
        { id: 8, studentId: "SV008", name: "Ngo Thi H", report: "file" },
    ],
    4: [
        { id: 9, studentId: "SV009", name: "Bui Van I", report: "Chưa nộp" },
        { id: 10, studentId: "SV010", name: "Dang Thi K", report: "file" },
        { id: 11, studentId: "SV011", name: "Trinh Van L", report: "Chưa nộp" },
    ],
    5: [
        { id: 12, studentId: "SV012", name: "Pham Van M", report: "file" },
        { id: 13, studentId: "Nguyen Thi N", report: "Chưa nộp" },
        { id: 14, studentId: "Ho Van O", report: "file" },
    ],
};

const CourseStudentsModal = ({ isOpen, onClose, course }) => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Load danh sách sinh viên khi modal mở
    useEffect(() => {
        if (isOpen && course) {
            const studentsData = mockStudents[course.id] || [];
            setStudents(studentsData);
            setFilteredStudents(studentsData);
            setSearchQuery(""); // Reset tìm kiếm khi mở modal
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
                <Typography fontWeight="bold">Danh sách sinh viên - {course?.courseName}</Typography>
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Tìm kiếm sinh viên"
                        placeholder="Nhập tên hoặc MSSV..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        variant="outlined"
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
                                <TableCell style={{ width: "30%" }}>BÁO CÁO THỰC TẬP</TableCell>
                                <TableCell align="center" style={{ width: "20%" }}>
                                    HÀNH ĐỘNG
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStudents.length === 0 ? (
                                <TableRow sx={{ height: "auto" }}>
                                    <TableCell colSpan={5} align="center" sx={{ padding: "8px", height: "auto" }}>
                                        <Typography color="textSecondary">
                                            {searchQuery ? "Không tìm thấy sinh viên nào." : "Không có sinh viên nào."}
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
                                        <TableCell style={{ width: "30%" }} sx={{ padding: "8px" }}>
                                            {student.report}
                                        </TableCell>
                                        <TableCell align="center" style={{ width: "20%" }} sx={{ padding: "8px" }}>
                                            <Typography color="textSecondary">Chưa có hành động</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
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
