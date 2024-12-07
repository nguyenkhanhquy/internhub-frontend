import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import JobPostDetailsModal from "../../modals/JobPostDetailsModal/JobPostDetailsModal";
import RejectJobPostModal from "../../modals/RejectJobPostModal/RejectJobPostModal";

import EmptyBox from "../../../components/box/EmptyBox";
import SuspenseLoader from "../../../components/loaders/SuspenseLoader/SuspenseLoader";

import { getAllJobPosts, approveJobPost, deleteJobPost } from "../../../services/adminService";

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

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getAllJobPosts();
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setJobPosts(data.result);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (post) => {
        setSelectedJobPost(post);
        setIsDetailsModalOpen(true);
    };

    const handleApprove = async (id) => {
        try {
            const data = await approveJobPost(id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            fetchData();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
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
    }, []);

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
                <Button onClick={fetchData} variant="contained" color="primary">
                    Làm mới <CachedIcon className="ml-2" fontSize="small" />
                </Button>
            </div>
            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>TÊN VIỆC LÀM</TableCell>
                            <TableCell>TÊN CÔNG TY</TableCell>
                            <TableCell>NGÀY CẬP NHẬT</TableCell>
                            <TableCell>TRẠNG THÁI</TableCell>
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
                        ) : jobPosts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            jobPosts.map((jobPost, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{jobPost.title}</TableCell>
                                    <TableCell>{jobPost.company.name}</TableCell>
                                    <TableCell>{jobPost.updatedDate}</TableCell>
                                    <TableCell>
                                        <span className={getStatusStyle(jobPost.approved, jobPost.deleted)}>
                                            {jobPost.approved
                                                ? "Đã duyệt"
                                                : jobPost.deleted
                                                  ? "Đã từ chối"
                                                  : "Chưa duyệt"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleViewDetails(jobPost)} color="primary">
                                            Chi tiết
                                        </Button>
                                        {!jobPost.approved && !jobPost.deleted ? (
                                            <>
                                                <Button onClick={() => handleApprove(jobPost.id)} color="success">
                                                    Duyệt
                                                </Button>
                                                <Button onClick={() => handleOpenRejectModal(jobPost)} color="error">
                                                    Từ chối
                                                </Button>
                                            </>
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
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
        </div>
    );
};

export default JobPostPage;
