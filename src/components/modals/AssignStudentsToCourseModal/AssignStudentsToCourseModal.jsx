import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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

import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";

import { getAllStudentsByCourseId, assignStudentsToCourse } from "@services/courseService";
import { getAllStudentsNotEnrolledInSemester } from "@services/adminService";

const AssignStudentsToCourse = ({ isOpen, onClose, course, setFlag }) => {
    const [allStudents, setAllStudents] = useState([]);
    const [assignedStudents, setAssignedStudents] = useState([]);
    const [searchAll, setSearchAll] = useState("");
    const [searchAssigned, setSearchAssigned] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [studentsRes, assignedRes] = await Promise.all([
                    getAllStudentsNotEnrolledInSemester(),
                    getAllStudentsByCourseId(course.id),
                ]);

                if (!studentsRes.success || !assignedRes.success) {
                    throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
                }

                setAllStudents(studentsRes.result);
                setAssignedStudents(assignedRes.result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) fetchData();
    }, [isOpen, course.id]);

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
        if (assignedStudents.some((s) => s.userId === student.userId)) {
            // Bỏ chọn: xóa khỏi danh sách đã gán
            setAssignedStudents(assignedStudents.filter((s) => s.userId !== student.userId));

            // Nếu sinh viên không có trong allStudents, thêm vào
            if (!allStudents.some((s) => s.userId === student.userId)) {
                setAllStudents([...allStudents, student]);
            }
        } else {
            // Chọn: thêm vào danh sách đã gán
            setAssignedStudents([...assignedStudents, student]);
        }
    };

    // Xử lý chọn tất cả sinh viên từ danh sách allStudents
    const handleSelectAllStudents = () => {
        const allStudentsSelected = filteredAllStudents.every((student) =>
            assignedStudents.some((s) => s.userId === student.userId),
        );

        if (allStudentsSelected) {
            // Bỏ chọn tất cả: xóa tất cả sinh viên trong filteredAllStudents khỏi assignedStudents
            const studentsToRemove = filteredAllStudents.map((s) => s.userId);
            setAssignedStudents(assignedStudents.filter((s) => !studentsToRemove.includes(s.userId)));
        } else {
            // Chọn tất cả: thêm tất cả sinh viên chưa được chọn vào assignedStudents
            const studentsToAdd = filteredAllStudents.filter(
                (student) => !assignedStudents.some((s) => s.userId === student.userId),
            );
            setAssignedStudents([...assignedStudents, ...studentsToAdd]);
        }
    };

    // Xử lý bỏ chọn tất cả sinh viên từ danh sách assignedStudents
    const handleDeselectAllAssigned = () => {
        const assignedStudentsInFilter = filteredAssignedStudents.filter((s) =>
            assignedStudents.some((assigned) => assigned.userId === s.userId),
        );

        if (assignedStudentsInFilter.length > 0) {
            // Bỏ chọn tất cả sinh viên trong filteredAssignedStudents
            const studentsToRemove = assignedStudentsInFilter.map((s) => s.userId);
            const remainingAssigned = assignedStudents.filter((s) => !studentsToRemove.includes(s.userId));
            setAssignedStudents(remainingAssigned);

            // Thêm các sinh viên bị bỏ chọn vào allStudents nếu chưa có
            const studentsToAddBack = assignedStudentsInFilter.filter(
                (student) => !allStudents.some((s) => s.userId === student.userId),
            );
            if (studentsToAddBack.length > 0) {
                setAllStudents([...allStudents, ...studentsToAddBack]);
            }
        }
    };

    // Kiểm tra trạng thái checkbox "chọn tất cả" cho allStudents
    const isAllStudentsSelected =
        filteredAllStudents.length > 0 &&
        filteredAllStudents.every((student) => assignedStudents.some((s) => s.userId === student.userId));

    const isSomeStudentsSelected = filteredAllStudents.some((student) =>
        assignedStudents.some((s) => s.userId === student.userId),
    );

    // Kiểm tra trạng thái checkbox "bỏ chọn tất cả" cho assignedStudents
    const hasAssignedStudentsInFilter = filteredAssignedStudents.length > 0;

    // Xử lý lưu
    const handleSave = async () => {
        setLoading(true);
        try {
            const studentIds = assignedStudents.map((student) => student.studentId);
            const data = await assignStudentsToCourse(course.id, studentIds);
            if (!data.success) {
                throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setFlag((prev) => !prev);
            handleClose();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
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
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <SuspenseLoader />
                    </Box>
                ) : (
                    <Box
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }} // Một cột trên mobile, hai cột trên desktop
                        gap={2}
                        flex={1}
                    >
                        {/* Danh sách sinh viên trong hệ thống */}
                        <Box flex={1}>
                            <Typography mb={1}>
                                Sinh viên chưa được gán lớp trong kỳ này ({allStudents.length} sinh viên)
                            </Typography>
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
                                            <TableCell sx={{ width: { xs: "15%", md: "10%" } }}>
                                                <Checkbox
                                                    checked={isAllStudentsSelected}
                                                    indeterminate={!isAllStudentsSelected && isSomeStudentsSelected}
                                                    onChange={handleSelectAllStudents}
                                                    disabled={filteredAllStudents.length === 0}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ width: { xs: "35%", md: "30%" } }}>MSSV</TableCell>
                                            <TableCell sx={{ width: { xs: "50%", md: "60%" } }}>Họ và tên</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredAllStudents.map((student) => (
                                            <TableRow key={student.userId}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={assignedStudents.some(
                                                            (s) => s.userId === student.userId,
                                                        )}
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
                            <Typography mb={1}>
                                Sinh viên đã được gán vào lớp ({assignedStudents.length} sinh viên)
                            </Typography>
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
                                            <TableCell sx={{ width: { xs: "15%", md: "10%" } }}>
                                                <Checkbox
                                                    checked={hasAssignedStudentsInFilter}
                                                    onChange={handleDeselectAllAssigned}
                                                    disabled={filteredAssignedStudents.length === 0}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ width: { xs: "35%", md: "30%" } }}>MSSV</TableCell>
                                            <TableCell sx={{ width: { xs: "50%", md: "60%" } }}>Họ và tên</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredAssignedStudents.map((student) => (
                                            <TableRow key={student.userId}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={assignedStudents.some(
                                                            (s) => s.userId === student.userId,
                                                        )}
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
                )}
            </DialogContent>

            <DialogActions sx={{ px: 2, py: 1 }}>
                <Button onClick={handleClose} variant="outlined">
                    Hủy
                </Button>
                <Button disabled={loading} onClick={handleSave} variant="contained" color="primary">
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
    setFlag: PropTypes.func.isRequired,
};

export default AssignStudentsToCourse;
