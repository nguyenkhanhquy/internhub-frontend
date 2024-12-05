import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";

import { getAllStudents } from "../../../services/studentService";
import EmptyBox from "../../../components/box/EmptyBox";
import StudentDetailsModal from "../../modals/StudentDetailsModal/StudentDetailsModal";

// const majorLabels = {
//     IT: "Công nghệ thông tin",
//     DS: "Kỹ thuật dữ liệu",
//     IS: "An toàn thông tin",
// };

const internLabels = {
    SEARCHING: "Đang tìm nơi thực tập",
    WORKING: "Đang thực tập",
    COMPLETED: "Đã hoàn thành thực tập",
};

const getStatusStyle = (status) => {
    return status === true
        ? "bg-green-100 text-green-700 px-2 py-1 rounded"
        : "bg-red-100 text-red-700 px-2 py-1 rounded";
};

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const fetchData = async () => {
        try {
            const data = await getAllStudents();
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setStudents(data.result);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleViewDetails = (student) => {
        setSelectedStudent(student);
        setIsDetailsModalOpen(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-4 flex items-center justify-between">
                <Typography variant="h5">SINH VIÊN</Typography>
                <Button variant="contained" color="primary">
                    + Thêm sinh viên
                </Button>
            </div>
            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>HỌ VÀ TÊN</TableCell>
                            <TableCell>MSSV</TableCell>
                            <TableCell>TRẠNG THÁI THỰC TẬP</TableCell>
                            <TableCell>TRẠNG THÁI TÀI KHOẢN</TableCell>
                            <TableCell>HÀNH ĐỘNG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            students.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.studentId}</TableCell>
                                    <TableCell>{internLabels[student.internStatus] || student.internStatus}</TableCell>
                                    <TableCell>
                                        <span className={getStatusStyle(student.user.active)}>
                                            {student.user.active ? "Đã kích hoạt" : "Chưa kích hoạt"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleViewDetails(student)} color="primary">
                                            Chi tiết
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {isDetailsModalOpen && (
                <StudentDetailsModal
                    isOpen={isDetailsModalOpen}
                    onClose={() => setIsDetailsModalOpen(false)}
                    student={selectedStudent}
                />
            )}
        </div>
    );
};

export default StudentPage;
