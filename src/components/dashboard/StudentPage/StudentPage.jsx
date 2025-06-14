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
import InfoIcon from "@mui/icons-material/Info";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import EmptyBox from "@components/box/EmptyBox";
import StudentDetailsModal from "@components/modals/StudentDetailsModal/StudentDetailsModal";
import DashboardSearchBar from "@components/search/DashboardSearchBar";
import CustomPagination from "@components/pagination/Pagination";

import { importStudents } from "@services/studentService";
import { getAllStudents } from "@services/adminService";
import { lockUser } from "@services/userService";

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

const getStatusStyleLocked = (status) => {
    return status === true
        ? "bg-red-100 text-red-700 px-2 py-1 rounded"
        : "bg-green-100 text-green-700 px-2 py-1 rounded";
};

const StudentPage = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [students, setStudents] = useState([]);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

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
            const data = await getAllStudents(currentPage, recordsPerPage, search);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setTotalPages(data.pageInfo.totalPages);
            setTotalRecords(data.pageInfo.totalElements);
            setStudents(data.result);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [currentPage, recordsPerPage, search]);

    const handleViewDetails = (student) => {
        setSelectedStudent(student);
        setIsDetailsModalOpen(true);
    };

    const handleLockAccount = async (student) => {
        try {
            const data = await lockUser(student.user.id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setStudents(
                students.map((s) => (s.user.id === student.user.id ? { ...s, user: { ...s.user, locked: true } } : s)),
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleUnlockAccount = async (student) => {
        try {
            const data = await lockUser(student.user.id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setStudents(
                students.map((s) => (s.user.id === student.user.id ? { ...s, user: { ...s.user, locked: false } } : s)),
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
            const data = await importStudents(file);

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
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
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
                    Sinh viên
                </Typography>
                <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
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
                                id="file-upload-input-student"
                            />
                            <label htmlFor="file-upload-input-student">
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
                    placeholder="Tìm kiếm sinh viên..."
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
                            <TableCell sx={{ textAlign: "left", width: "20%" }}>HỌ VÀ TÊN</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "20%" }}>MSSV</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "20%" }}>TRẠNG THÁI THỰC TẬP</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "20%" }}>TRẠNG THÁI TÀI KHOẢN</TableCell>
                            <TableCell sx={{ textAlign: "right", width: "15%" }}>HÀNH ĐỘNG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && students.length === 0 ? (
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
                        ) : students.length === 0 && !loading ? (
                            // Hiển thị EmptyBox khi không có dữ liệu và không loading
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", height: "364px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Hiển thị dữ liệu - làm mờ nếu đang loading
                            students.map((student, index) => (
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
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.studentId}</TableCell>
                                    <TableCell>{internLabels[student.internStatus] || student.internStatus}</TableCell>
                                    <TableCell>
                                        <span
                                            className={getStatusStyle(student.user.active)}
                                            style={{ marginRight: "5px" }}
                                        >
                                            {student.user.active ? "Đã kích hoạt" : "Chưa kích hoạt"}
                                        </span>
                                        <span className={getStatusStyleLocked(student.user.locked)}>
                                            {student.user.locked ? "Đã khóa" : "Không bị khóa"}
                                        </span>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        {student.user.locked ? (
                                            <Tooltip title="Mở khóa tài khoản" arrow>
                                                <IconButton
                                                    color="success"
                                                    onClick={() => handleUnlockAccount(student)}
                                                >
                                                    <LockOpenIcon />
                                                </IconButton>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="Khoá tài khoản" arrow>
                                                <IconButton color="error" onClick={() => handleLockAccount(student)}>
                                                    <LockOutlineIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Tooltip title="Xem chi tiết" arrow>
                                            <IconButton color="primary" onClick={() => handleViewDetails(student)}>
                                                <InfoIcon />
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
