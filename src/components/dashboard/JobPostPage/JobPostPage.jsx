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
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

import JobPostDetailsModal from "@components/modals/JobPostDetailsModal/JobPostDetailsModal";
import RejectJobPostModal from "@components/modals/RejectJobPostModal/RejectJobPostModal";
import ConfirmDialog from "@components/common/ConfirmDialog/ConfirmDialog";

import EmptyBox from "@components/box/EmptyBox";
import DashboardSearchBar from "@components/search/DashboardSearchBar";
import CustomPagination from "@components/pagination/Pagination";

import { formatDate } from "@/utils/dateUtil";

import { getAllJobPosts, approveJobPost, deleteJobPost } from "@services/adminService";

const getStatusStyle = (approved, deleted) => {
    return approved === true
        ? "bg-green-100 text-green-700 px-2 py-1 rounded"
        : deleted === true
          ? "bg-red-100 text-red-700 px-2 py-1 rounded"
          : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded";
};

const JobPostPage = () => {
    const [loading, setLoading] = useState(false);
    const [jobPosts, setJobPosts] = useState([]);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [selectedJobPost, setSelectedJobPost] = useState(null);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    // Confirm Dialog states
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: "",
        message: "",
        onConfirm: null,
        confirmText: "Xác nhận",
        confirmColor: "primary",
        severity: "warning",
        loading: false,
    });

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
            const data = await getAllJobPosts(currentPage, recordsPerPage, search);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setTotalPages(data.pageInfo.totalPages);
            setTotalRecords(data.pageInfo.totalElements);
            setJobPosts(data.result);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [currentPage, recordsPerPage, search]);

    const handleViewDetails = (post) => {
        setSelectedJobPost(post);
        setIsDetailsModalOpen(true);
    };

    const handleApprove = (post) => {
        setConfirmDialog({
            open: true,
            title: "Xác nhận duyệt bài đăng",
            message: `Bạn có chắc chắn muốn duyệt bài đăng "${post.title}" của công ty "${post.company.name}"?`,
            confirmText: "Xác nhận",
            confirmColor: "success",
            severity: "info",
            loading: false,
            onConfirm: () => confirmApprove(post.id),
        });
    };

    const confirmApprove = async (id) => {
        setConfirmDialog((prev) => ({ ...prev, loading: true }));
        try {
            const data = await approveJobPost(id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            fetchData();
            toast.success(data.message);
            setConfirmDialog((prev) => ({ ...prev, open: false, loading: false }));
        } catch (error) {
            toast.error(error.message);
            setConfirmDialog((prev) => ({ ...prev, loading: false }));
        }
    };

    const handleOpenRejectModal = (post) => {
        setSelectedJobPost(post);
        setIsRejectModalOpen(true);
    };

    const handleCloseRejectModal = () => {
        setIsRejectModalOpen(false);
        setSelectedJobPost(null);
    };

    const handleRejectPost = (reason) => {
        handleDelete(selectedJobPost.id, reason);
    };

    const handleDelete = async (id, reason) => {
        try {
            const data = await deleteJobPost(id, reason);
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
                    Bài đăng tuyển dụng
                </Typography>
                <Button
                    onClick={async () => {
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
                    placeholder="Tìm kiếm bài đăng tuyển dụng..."
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
                            <TableCell sx={{ textAlign: "left", width: "25%" }}>TÊN VIỆC LÀM</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "25%" }}>TÊN CÔNG TY</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "20%" }}>NGÀY CẬP NHẬT</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "10%" }}>TRẠNG THÁI</TableCell>
                            <TableCell sx={{ textAlign: "right", width: "15%" }}>HÀNH ĐỘNG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && jobPosts.length === 0 ? (
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
                                        <Skeleton variant="rounded" width={100} height={40} />
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
                        ) : jobPosts.length === 0 && !loading ? (
                            // Hiển thị EmptyBox khi không có dữ liệu và không loading
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", height: "364px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Hiển thị dữ liệu - làm mờ nếu đang loading
                            jobPosts.map((jobPost, index) => (
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
                                    <TableCell>{jobPost.title}</TableCell>
                                    <TableCell>{jobPost.company.name}</TableCell>
                                    <TableCell>{formatDate(jobPost.updatedDate)}</TableCell>
                                    <TableCell>
                                        <span className={getStatusStyle(jobPost.approved, jobPost.deleted)}>
                                            {jobPost.approved
                                                ? "Đã duyệt"
                                                : jobPost.deleted
                                                  ? "Đã từ chối"
                                                  : "Chưa duyệt"}
                                        </span>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        {!jobPost.approved && !jobPost.deleted ? (
                                            <>
                                                <Tooltip title="Duyệt" arrow>
                                                    <IconButton color="success" onClick={() => handleApprove(jobPost)}>
                                                        <CheckCircleIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Từ chối" arrow>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleOpenRejectModal(jobPost)}
                                                    >
                                                        <UnpublishedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        ) : null}
                                        <Tooltip title="Xem chi tiết" arrow>
                                            <IconButton color="primary" onClick={() => handleViewDetails(jobPost)}>
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

            {/* Modal xem chi tiết bài đăng */}
            {isDetailsModalOpen && (
                <JobPostDetailsModal
                    open={isDetailsModalOpen}
                    jobPost={selectedJobPost}
                    onClose={() => {
                        setIsDetailsModalOpen(false);
                        setSelectedJobPost(null);
                    }}
                />
            )}

            {/* Modal từ chối bài đăng */}
            {isRejectModalOpen && (
                <RejectJobPostModal
                    open={isRejectModalOpen}
                    jobPost={selectedJobPost}
                    onClose={handleCloseRejectModal}
                    onConfirm={handleRejectPost}
                />
            )}

            {/* Confirm Dialog */}
            <ConfirmDialog
                open={confirmDialog.open}
                onClose={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
                onConfirm={confirmDialog.onConfirm}
                title={confirmDialog.title}
                message={confirmDialog.message}
                confirmText={confirmDialog.confirmText}
                confirmColor={confirmDialog.confirmColor}
                severity={confirmDialog.severity}
                loading={confirmDialog.loading}
            />
        </div>
    );
};

export default JobPostPage;
