import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

import {
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
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import EmptyBox from "@components/box/EmptyBox";
import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";
import RecruiterDetailsModal from "@components/modals/RecruiterDetailsModal/RecruiterDetailsModal";
import DashboardSearchBar from "@components/search/DashboardSearchBar";
import CustomPagination from "@components/pagination/Pagination";

// import { getAllRecruiters } from "../../../services/recruiterService";
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
                >
                    Làm mới <CachedIcon className="ml-2" fontSize="small" />
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
            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center", width: "5%" }}>STT</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "20%" }}>TÊN CÔNG TY</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "20%" }}>NGƯỜI ĐẠI DIỆN</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "20%" }}>EMAIL NGƯỜI ĐẠI DIỆN</TableCell>
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
                        ) : recruiters.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            recruiters.map((recruiter, index) => (
                                <TableRow key={index + 1 + (currentPage - 1) * recordsPerPage}>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {index + 1 + (currentPage - 1) * recordsPerPage}
                                    </TableCell>
                                    <TableCell>{recruiter.company.name}</TableCell>
                                    <TableCell>{recruiter.name}</TableCell>
                                    <TableCell>{recruiter.recruiterEmail}</TableCell>
                                    <TableCell>
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
