import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";

import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import EmptyBox from "@components/box/EmptyBox";
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
    const [uploading, setUploading] = useState(false);
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

        setUploading(true);
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
        } finally {
            setUploading(false);
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
                    <Paper
                        elevation={2}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            border: "2px dashed #e0e0e0",
                            backgroundColor: "#fafafa",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                borderColor: "#1976d2",
                                backgroundColor: "#f5f5f5",
                            },
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <input
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                id="file-upload-input"
                            />
                            <label htmlFor="file-upload-input">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<AttachFileIcon />}
                                    sx={{
                                        borderColor: "#1976d2",
                                        color: "#1976d2",
                                        "&:hover": {
                                            borderColor: "#1565c0",
                                            backgroundColor: "#e3f2fd",
                                        },
                                    }}
                                >
                                    Chọn file
                                </Button>
                            </label>

                            {file && (
                                <Chip
                                    icon={<UploadFileIcon />}
                                    label={file.name}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    sx={{ maxWidth: "200px" }}
                                />
                            )}

                            <Button
                                disabled={!file || uploading}
                                variant="contained"
                                onClick={handleUpload}
                                startIcon={
                                    uploading ? <CircularProgress size={16} color="inherit" /> : <CloudUploadIcon />
                                }
                                sx={{
                                    backgroundColor: "#1976d2",
                                    "&:hover": {
                                        backgroundColor: "#1565c0",
                                    },
                                    "&:disabled": {
                                        backgroundColor: "#e0e0e0",
                                    },
                                }}
                            >
                                {uploading ? "Đang import..." : "Import danh sách"}
                            </Button>
                        </Box>
                    </Paper>

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
                        disabled={loading}
                        startIcon={<CachedIcon className={`${loading ? "animate-spin" : ""}`} />}
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

            <TableContainer
                className="rounded bg-white shadow-md"
                sx={{
                    position: "relative",
                    overflowX: "auto",
                    width: "100%",
                }}
            >
                {loading && (
                    <LinearProgress
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: 54,
                            right: 0,
                            zIndex: 1,
                            height: "4px",
                        }}
                    />
                )}
                <Table sx={{ minWidth: 1350 }}>
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
                        {loading && teachers.length === 0 ? (
                            // Hiển thị skeleton khi loading và không có dữ liệu cũ
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={`skeleton-${index}`}>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Skeleton variant="text" width="100%" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width="100%" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width="100%" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width="100%" />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <Skeleton variant="rounded" width={100} height={40} />
                                            <Skeleton variant="rounded" width={100} height={40} />
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                            <Skeleton variant="rounded" width={40} height={40} />
                                            <Skeleton variant="rounded" width={40} height={40} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : teachers.length === 0 && !loading ? (
                            // Hiển thị EmptyBox khi không có dữ liệu và không loading
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", height: "364px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Hiển thị dữ liệu - làm mờ nếu đang loading
                            teachers.map((teacher, index) => (
                                <TableRow
                                    key={index + 1 + (currentPage - 1) * recordsPerPage}
                                    sx={{
                                        opacity: loading ? 0.5 : 1,
                                        pointerEvents: loading ? "none" : "auto",
                                        transition: "opacity 0.3s ease",
                                    }}
                                >
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
                                        {/* <Tooltip title="Xóa" arrow>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDeleteTeacher(teacher.userId)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip> */}
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
