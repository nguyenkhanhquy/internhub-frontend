import { useEffect, useState, useCallback } from "react";
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

import CachedIcon from "@mui/icons-material/Cached";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import EmptyBox from "@components/box/EmptyBox";
import RecruiterDetailsModal from "@components/modals/RecruiterDetailsModal/RecruiterDetailsModal";
import DashboardSearchBar from "@components/search/DashboardSearchBar";
import CustomPagination from "@components/pagination/Pagination";

import { getAllRecruiters, approveRecruiter } from "@services/adminService";
import { lockUser } from "@services/userService";

const getStatusStyle = (status) => {
    return status === true
        ? "bg-green-100 text-green-700 px-2 py-1 rounded"
        : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded";
};

const getStatusStyleLocked = (status) => {
    return status === true
        ? "bg-red-100 text-red-700 px-2 py-1 rounded"
        : "bg-green-100 text-green-700 px-2 py-1 rounded";
};

const RecruiterPage = () => {
    const [loading, setLoading] = useState(false);
    const [recruiters, setRecruiters] = useState([]);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedRecruiter, setSelectedRecruiter] = useState(null);

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
            const data = await getAllRecruiters(currentPage, recordsPerPage, search);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setTotalPages(data.pageInfo.totalPages);
            setTotalRecords(data.pageInfo.totalElements);
            setRecruiters(data.result);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [currentPage, recordsPerPage, search]);

    const handleViewDetails = (recruiter) => {
        setSelectedRecruiter(recruiter);
        setIsDetailsModalOpen(true);
    };

    const handleLockAccount = async (recruiter) => {
        try {
            const data = await lockUser(recruiter.user.id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setRecruiters(
                recruiters.map((r) =>
                    r.user.id === recruiter.user.id ? { ...r, user: { ...r.user, locked: true } } : r,
                ),
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleUnlockAccount = async (recruiter) => {
        try {
            const data = await lockUser(recruiter.user.id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setRecruiters(
                recruiters.map((r) =>
                    r.user.id === recruiter.user.id ? { ...r, user: { ...r.user, locked: false } } : r,
                ),
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleApprove = async (userId) => {
        try {
            const data = await approveRecruiter(userId);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            fetchData();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
                    Doanh nghiệp
                </Typography>
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
            </div>
            <div className="sticky top-2 z-10 mb-4">
                <DashboardSearchBar
                    onSearch={(searchText) => {
                        setCurrentPage(1);
                        setSearch(searchText);
                    }}
                    query={search}
                    placeholder="Tìm kiếm doanh nghiệp..."
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
                            <TableCell sx={{ textAlign: "left", width: "20%" }}>TÊN CÔNG TY</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "20%" }}>NGƯỜI ĐẠI DIỆN</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "15%" }}>EMAIL NGƯỜI ĐẠI DIỆN</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "25%" }}>TRẠNG THÁI TÀI KHOẢN</TableCell>
                            <TableCell sx={{ textAlign: "right", width: "15%" }}>HÀNH ĐỘNG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && recruiters.length === 0 ? (
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
                                            <Skeleton variant="rounded" width={100} height={40} />
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                            <Skeleton variant="rounded" width={40} height={40} />
                                            <Skeleton variant="rounded" width={40} height={40} />
                                            <Skeleton variant="rounded" width={40} height={40} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : recruiters.length === 0 && !loading ? (
                            // Hiển thị EmptyBox khi không có dữ liệu và không loading
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", height: "364px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Hiển thị dữ liệu - làm mờ nếu đang loading
                            recruiters.map((recruiter, index) => (
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
                                    <TableCell>{recruiter.company.name}</TableCell>
                                    <TableCell>{recruiter.name}</TableCell>
                                    <TableCell>{recruiter.recruiterEmail}</TableCell>
                                    <TableCell>
                                        <span
                                            className={getStatusStyle(recruiter.user.active)}
                                            style={{ marginRight: "5px" }}
                                        >
                                            {recruiter.user.active ? "Đã kích hoạt" : "Chưa kích hoạt"}
                                        </span>
                                        <span
                                            className={getStatusStyle(recruiter.approved)}
                                            style={{ marginRight: "5px" }}
                                        >
                                            {recruiter.approved ? "Đã duyệt" : "Chưa duyệt"}
                                        </span>
                                        <span className={getStatusStyleLocked(recruiter.user.locked)}>
                                            {recruiter.user.locked ? "Đã khóa" : "Không bị khóa"}
                                        </span>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        {!recruiter.approved ? (
                                            <Tooltip title="Duyệt" arrow>
                                                <IconButton
                                                    color="success"
                                                    onClick={() => handleApprove(recruiter.userId)}
                                                >
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </Tooltip>
                                        ) : null}
                                        {recruiter.user.locked ? (
                                            <Tooltip title="Mở khóa tài khoản" arrow>
                                                <IconButton
                                                    color="success"
                                                    onClick={() => handleUnlockAccount(recruiter)}
                                                >
                                                    <LockOpenIcon />
                                                </IconButton>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="Khoá tài khoản" arrow>
                                                <IconButton color="error" onClick={() => handleLockAccount(recruiter)}>
                                                    <LockOutlineIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Tooltip title="Xem chi tiết" arrow>
                                            <IconButton color="primary" onClick={() => handleViewDetails(recruiter)}>
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
                <RecruiterDetailsModal
                    isOpen={isDetailsModalOpen}
                    recruiter={selectedRecruiter}
                    onClose={() => setIsDetailsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default RecruiterPage;
