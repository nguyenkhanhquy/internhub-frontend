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
    Tooltip,
    IconButton,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import EmptyBox from "@components/box/EmptyBox";
import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";
import UpdateTeacherModal from "@components/modals/UpdateTeacherModal/UpdateTeacherModal";
import DashboardSearchBar from "@components/search/DashboardSearchBar";
import CustomPagination from "@components/pagination/Pagination";
import ConfirmDialog from "@components/common/ConfirmDialog/ConfirmDialog";

import { importTeachers, deleteTeacher } from "@services/teacherService";
import { getAllTeachers } from "@services/adminService";
import { lockUser } from "@services/userService";

const getStatusStyle = (status) => {
    return status === true
        ? "bg-green-100 text-green-700 px-2 py-1 rounded"
        : "bg-red-100 text-red-700 px-2 py-1 rounded";
};

const getStatusStyleLocked = (status) => {
    return status === true
        ? "bg-red-100 text-red-700 px-2 py-1 rounded"
        : "bg-green-100 text-green-700 px-2 py-1 rounded";
};

const TeacherPage = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [flag, setFlag] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    // Dialog states
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const handleLockAccount = async (teacher) => {
        try {
            const data = await lockUser(teacher.user.id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setTeachers(
                teachers.map((t) => (t.user.id === teacher.user.id ? { ...t, user: { ...t.user, locked: true } } : t)),
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleUnlockAccount = async (teacher) => {
        try {
            const data = await lockUser(teacher.user.id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setTeachers(
                teachers.map((t) => (t.user.id === teacher.user.id ? { ...t, user: { ...t.user, locked: false } } : t)),
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDeleteTeacher = (teacherId) => {
        setTeacherToDelete(teacherId);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            const data = await deleteTeacher(teacherToDelete);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setFlag((prev) => !prev);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
            setTeacherToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setTeacherToDelete(null);
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
                        startIcon={<CachedIcon />}
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
                    placeholder="Tìm kiếm giảng viên..."
                />
            </div>

            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center", width: "5%" }}>STT</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "10%" }}>MÃ GV</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "25%" }}>HỌ VÀ TÊN</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "25%" }}>EMAIL</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "20%" }}>TRẠNG THÁI TÀI KHOẢN</TableCell>
                            <TableCell sx={{ textAlign: "right", width: "15%" }}>HÀNH ĐỘNG</TableCell>
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
                                <TableRow key={index + 1 + (currentPage - 1) * recordsPerPage}>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {index + 1 + (currentPage - 1) * recordsPerPage}
                                    </TableCell>
                                    <TableCell>{teacher.teacherId}</TableCell>
                                    <TableCell>{teacher.name}</TableCell>
                                    <TableCell>{teacher.user.email}</TableCell>
                                    <TableCell>
                                        <span
                                            className={getStatusStyle(teacher.user.active)}
                                            style={{ marginRight: "5px" }}
                                        >
                                            {teacher.user.active ? "Đã kích hoạt" : "Chưa kích hoạt"}
                                        </span>
                                        <span className={getStatusStyleLocked(teacher.user.locked)}>
                                            {teacher.user.locked ? "Đã khóa" : "Không bị khóa"}
                                        </span>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        <Tooltip title="Chỉnh sửa" arrow>
                                            <IconButton color="warning" onClick={() => handleOpenModal(teacher)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {teacher.user.locked ? (
                                            <Tooltip title="Mở khóa tài khoản" arrow>
                                                <IconButton
                                                    color="success"
                                                    onClick={() => handleUnlockAccount(teacher)}
                                                >
                                                    <LockOpenIcon />
                                                </IconButton>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="Khoá tài khoản" arrow>
                                                <IconButton color="error" onClick={() => handleLockAccount(teacher)}>
                                                    <LockOutlineIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Tooltip title="Xóa" arrow>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDeleteTeacher(teacher.userId)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
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

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={isDeleteDialogOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Xác nhận xóa giảng viên"
                message="Bạn có chắc chắn muốn xóa giảng viên này không?"
                confirmText="Xóa"
                cancelText="Hủy"
                confirmColor="error"
                severity="error"
                loading={isDeleting}
            />
        </div>
    );
};

export default TeacherPage;
