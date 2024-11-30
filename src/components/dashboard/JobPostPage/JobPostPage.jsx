import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";

import { getAllJobPosts, approveJobPost } from "../../../services/adminService";

const getStatusStyle = (status) => {
    return status === true
        ? "bg-green-100 text-green-700 px-2 py-1 rounded"
        : "bg-red-100 text-red-700 px-2 py-1 rounded";
};

const JobPostPage = () => {
    const [jobPosts, setJobPosts] = useState([]);

    const handleApprove = async (id) => {
        try {
            const data = await approveJobPost(id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
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
                        {jobPosts.map((jobPost, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{jobPost.title}</TableCell>
                                <TableCell>{jobPost.jobPosition}</TableCell>
                                <TableCell>{jobPost.company.name}</TableCell>
                                <TableCell>{jobPost.updatedDate}</TableCell>
                                <TableCell>
                                    <span className={getStatusStyle(jobPost.approved)}>
                                        {jobPost.approved ? "Đã được duyệt" : "Chưa được duyệt"}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        disabled={jobPost.approved}
                                        onClick={() => handleApprove(jobPost.id)}
                                        color="primary"
                                    >
                                        {jobPost.approved ? "Đã duyệt" : "Duyệt"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default JobPostPage;
