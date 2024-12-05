import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
    TextField,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

import EmptyBox from "../../../components/box/EmptyBox";
import SuspenseLoader from "../../../components/loaders/SuspenseLoader/SuspenseLoader";
import UpdateTeacherModal from "../../modals/UpdateTeacherModal/UpdateTeacherModal";

import { getAllTeachers, importTeachers } from "../../../services/teacherService";

const TeacherPage = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getAllTeachers();
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setTeachers(data.result);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (teacher) => {
        setSelectedTeacher(teacher);
        setIsUpdateModalOpen(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Vui lòng chọn file để upload.");
            return;
        }

        try {
            const data = await importTeachers(file);

            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setFile(null);
            fetchData();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-4 flex items-center justify-between">
                <Typography variant="h5">GIẢNG VIÊN</Typography>
                <Box display="flex" alignItems="center" gap={2}>
                    <TextField type="file" onChange={handleFileChange} />
                    <Button disabled={!file} variant="contained" onClick={handleUpload}>
                        + Import danh sách giảng viên
                    </Button>
                    <Button onClick={fetchData} variant="contained" color="primary">
                        Làm mới <CachedIcon className="ml-2" fontSize="small" />
                    </Button>
                </Box>
            </div>
            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>HỌ VÀ TÊN</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>HÀNH ĐỘNG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                                    <SuspenseLoader />
                                </TableCell>
                            </TableRow>
                        ) : teachers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            teachers.map((teacher, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{teacher.name}</TableCell>
                                    <TableCell>{teacher.email}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleOpenModal(teacher)} color="warning">
                                            Chỉnh sửa
                                        </Button>
                                        <Button color="error">Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {isUpdateModalOpen && (
                <UpdateTeacherModal
                    teacher={selectedTeacher}
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onSubmit={console.log}
                />
            )}
        </div>
    );
};

export default TeacherPage;
