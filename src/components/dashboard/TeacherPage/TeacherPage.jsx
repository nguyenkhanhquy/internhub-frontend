import { useState, useEffect, useCallback } from "react";
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
import DashboardSearchBar from "../../search/DashboardSearchBar";
import CustomPagination from "../../pagination/Pagination";

import { importTeachers, deleteTeacher } from "../../../services/teacherService";
import { getAllTeachers } from "../../../services/adminService";

const TeacherPage = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [flag, setFlag] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

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
            const data = await getAllTeachers(currentPage, recordsPerPage, search);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setTotalPages(data.pageInfo.totalPages);
            setTotalRecords(data.pageInfo.totalElements);
            setTeachers(data.result);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [currentPage, recordsPerPage, search]);

    const handleOpenModal = (teacher) => {
        setSelectedTeacher(teacher);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteTeacher = async (teacherId) => {
        try {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa giảng viên này?");
            if (!isConfirm) {
                return;
            }
            const data = await deleteTeacher(teacherId);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setFlag((prev) => !prev);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData, flag]);

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
            document.querySelector('input[type="file"]').value = "";
            fetchData();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

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
                    Giảng viên
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                    <TextField type="file" onChange={handleFileChange} />
                    <Button disabled={!file} variant="contained" onClick={handleUpload}>
                        + Import danh sách giảng viên
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
                    >
                        Làm mới <CachedIcon className="ml-2" fontSize="small" />
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
                    placeholder="Tìm kiếm giảng viên..."
                />
            </div>

            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: "10%" }}>STT</TableCell>
                            <TableCell style={{ width: "15%" }}>MÃ GV</TableCell>
                            <TableCell style={{ width: "20%" }}>HỌ VÀ TÊN</TableCell>
                            <TableCell style={{ width: "30%" }}>EMAIL</TableCell>
                            <TableCell style={{ width: "25%", textAlign: "right" }}>HÀNH ĐỘNG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                                    <SuspenseLoader />
                                </TableCell>
                            </TableRow>
                        ) : teachers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            teachers.map((teacher, index) => (
                                <TableRow key={index + 1 + (currentPage - 1) * recordsPerPage}>
                                    <TableCell style={{ width: "10%" }}>
                                        {index + 1 + (currentPage - 1) * recordsPerPage}
                                    </TableCell>
                                    <TableCell style={{ width: "15%" }}>{teacher.teacherId}</TableCell>
                                    <TableCell style={{ width: "20%" }}>{teacher.name}</TableCell>
                                    <TableCell style={{ width: "30%" }}>{teacher.user.email}</TableCell>
                                    <TableCell style={{ width: "25%", textAlign: "right" }}>
                                        <Button onClick={() => handleOpenModal(teacher)} color="warning">
                                            Chỉnh sửa
                                        </Button>
                                        <Button onClick={() => handleDeleteTeacher(teacher.userId)} color="error">
                                            Xóa
                                        </Button>
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

            {isUpdateModalOpen && (
                <UpdateTeacherModal
                    teacher={selectedTeacher}
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    setFlag={setFlag}
                />
            )}
        </div>
    );
};

export default TeacherPage;
