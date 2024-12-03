import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";

import EmptryBox from "../../../components/box/EmptyBox";

import { getAllJobPosts, approveJobPost, deleteJobPost } from "../../../services/adminService";

const getStatusStyle = (approved, deleted) => {
    return approved === true
        ? "bg-green-100 text-green-700 px-2 py-1 rounded"
        : deleted === true
          ? "bg-red-100 text-red-700 px-2 py-1 rounded"
          : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded";
};

const JobPostPage = () => {
    const [jobPosts, setJobPosts] = useState([]);

    const fetchData = async () => {
        try {
            const data = await getAllJobPosts();
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setJobPosts(data.result);
        } catch (error) {
            toast.error(error.message);
        }
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

    const handleDelete = async (id) => {
        try {
            const data = await deleteJobPost(id);
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
                <Typography variant="h5">BÀI ĐĂNG TUYỂN DỤNG</Typography>
                <Button variant="contained" color="primary">
                    + Thêm bài đăng
                </Button>
            </div>
            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>TÊN VIỆC LÀM</TableCell>
                            <TableCell>VỊ TRÍ CÔNG VIỆC</TableCell>
                            <TableCell>TÊN CÔNG TY</TableCell>
                            <TableCell>NGÀY CẬP NHẬT</TableCell>
                            <TableCell>TRẠNG THÁI</TableCell>
                            <TableCell>HÀNH ĐỘNG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobPosts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                                    <EmptryBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            jobPosts.map((jobPost, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{jobPost.title}</TableCell>
                                    <TableCell>{jobPost.jobPosition}</TableCell>
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
                                        {!jobPost.approved && !jobPost.deleted ? (
                                            <>
                                                <Button onClick={() => handleApprove(jobPost.id)} color="success">
                                                    Duyệt
                                                </Button>
                                                <Button onClick={() => handleDelete(jobPost.id)} color="error">
                                                    Từ chối
                                                </Button>
                                            </>
                                        ) : jobPost.approved ? (
                                            <>Đã duyệt</>
                                        ) : (
                                            <>Đã từ chối</>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default JobPostPage;
