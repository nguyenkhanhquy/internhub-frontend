import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
} from "@mui/material";

// Mock data cho sinh viên
const mockStudents = [
    { id: 1, studentId: "SV001", name: "Nguyễn Văn A" },
    { id: 2, studentId: "SV002", name: "Trần Thị B" },
    { id: 3, studentId: "SV003", name: "Lê Văn C" },
    { id: 4, studentId: "SV004", name: "Phạm Thị D" },
    { id: 5, studentId: "SV005", name: "Hoàng Văn E" },
];

const AssignStudentsToCourse = ({ isOpen, onClose, course, onSave }) => {
    const [allStudents, setAllStudents] = useState(mockStudents);
    const [assignedStudents, setAssignedStudents] = useState(mockStudents.slice(0, 2));
    const [searchAll, setSearchAll] = useState("");
    const [searchAssigned, setSearchAssigned] = useState("");

    // Lọc danh sách sinh viên theo tìm kiếm
    const filteredAllStudents = allStudents.filter(
        (student) =>
            student.studentId.toLowerCase().includes(searchAll.toLowerCase()) ||
            student.name.toLowerCase().includes(searchAll.toLowerCase()),
    );

    const filteredAssignedStudents = assignedStudents.filter(
        (student) =>
            student.studentId.toLowerCase().includes(searchAssigned.toLowerCase()) ||
            student.name.toLowerCase().includes(searchAssigned.toLowerCase()),
    );

    // Xử lý khi chọn/bỏ chọn sinh viên
    const handleCheckboxChange = (student) => {
        if (assignedStudents.some((s) => s.id === student.id)) {
            // Bỏ chọn: xóa khỏi danh sách đã gán
            setAssignedStudents(assignedStudents.filter((s) => s.id !== student.id));
        } else {
            // Chọn: thêm vào danh sách đã gán
            setAssignedStudents([...assignedStudents, student]);
        }
    };

    // Xử lý lưu
    const handleSave = async () => {
        try {
            // Gọi hàm onSave với danh sách sinh viên đã gán
            await onSave(assignedStudents);
            toast.success("Gán sinh viên thành công!");
            handleClose();
        } catch (error) {
            console.error("Error saving assigned students:", error);
            toast.error("Gán sinh viên thất bại!");
        }
    };

    // Xử lý đóng modal
    const handleClose = () => {
        setSearchAll("");
        setSearchAssigned("");
        setAssignedStudents([]);
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: { xs: "90%", sm: "80%", md: "1200px" }, // Responsive width
                    height: "85vh",
                    maxWidth: "100%", // Đảm bảo không vượt quá màn hình
                    maxHeight: "100%", // Đảm bảo không vượt quá màn hình
                    margin: { xs: 1, sm: 2 }, // Giảm margin trên mobile
                },
            }}
            disableEnforceFocus
        >
            <DialogTitle>
                <Typography fontWeight="bold">{course?.courseCode}</Typography>
            </DialogTitle>

            <DialogContent
                dividers
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    overflowY: "auto",
                }}
            >
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }} // Một cột trên mobile, hai cột trên desktop
                    gap={2}
                    flex={1}
                >
                    {/* Danh sách sinh viên trong hệ thống */}
                    <Box flex={1}>
                        <Typography mb={1}>Sinh viên trong hệ thống</Typography>
                        <TextField
                            label="Tìm kiếm theo mssv hoặc tên"
                            variant="outlined"
                            fullWidth
                            value={searchAll}
                            onChange={(e) => setSearchAll(e.target.value)}
                            sx={{ mb: 1 }}
                        />
                        <TableContainer sx={{ maxHeight: { xs: "300px", md: "400px" }, overflowY: "auto" }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: { xs: "15%", md: "10%" } }}></TableCell>
                                        <TableCell sx={{ width: { xs: "35%", md: "30%" } }}>MSSV</TableCell>
                                        <TableCell sx={{ width: { xs: "50%", md: "60%" } }}>Họ và tên</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredAllStudents.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={assignedStudents.some((s) => s.id === student.id)}
                                                    onChange={() => handleCheckboxChange(student)}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                                                {student.studentId}
                                            </TableCell>
                                            <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                                                {student.name}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {/* Danh sách sinh viên đã gán */}
                    <Box flex={1}>
                        <Typography mb={1}>Sinh viên thuộc lớp</Typography>
                        <TextField
                            label="Tìm kiếm theo mssv hoặc tên"
                            variant="outlined"
                            fullWidth
                            value={searchAssigned}
                            onChange={(e) => setSearchAssigned(e.target.value)}
                            sx={{ mb: 1 }}
                        />
                        <TableContainer sx={{ maxHeight: { xs: "300px", md: "400px" }, overflowY: "auto" }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: { xs: "15%", md: "10%" } }}></TableCell>
                                        <TableCell sx={{ width: { xs: "35%", md: "30%" } }}>MSSV</TableCell>
                                        <TableCell sx={{ width: { xs: "50%", md: "60%" } }}>Họ và tên</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredAssignedStudents.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={assignedStudents.some((s) => s.id === student.id)}
                                                    onChange={() => handleCheckboxChange(student)}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                                                {student.studentId}
                                            </TableCell>
                                            <TableCell sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                                                {student.name}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 2, py: 1 }}>
                <Button onClick={handleClose} variant="outlined">
                    Hủy
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AssignStudentsToCourse.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default AssignStudentsToCourse;
