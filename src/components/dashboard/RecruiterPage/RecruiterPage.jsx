import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";

import { getAllRecruiters, approveRecruiter } from "../../../services/recruiterService";

const getStatusStyle = (status) => {
    return status === true
        ? "bg-green-100 text-green-700 px-2 py-1 rounded"
        : "bg-red-100 text-red-700 px-2 py-1 rounded";
};

const RecruiterPage = () => {
    const [recruiters, setRecruiters] = useState([]);

    const handleApprove = async (userId) => {
        try {
            const data = await approveRecruiter(userId);
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
                const data = await getAllRecruiters();
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setRecruiters(data.result);
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-4 flex items-center justify-between">
                <Typography variant="h5">DOANH NGHIỆP</Typography>
                <Button variant="contained" color="primary">
                    + Thêm doanh nghiệp
                </Button>
            </div>
            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>TÊN CÔNG TY</TableCell>
                            <TableCell>NGƯỜI ĐẠI DIỆN</TableCell>
                            <TableCell>TRẠNG THÁI</TableCell>
                            <TableCell>HÀNH ĐỘNG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recruiters.map((recruiter, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{recruiter.company.name}</TableCell>
                                <TableCell>{recruiter.name}</TableCell>
                                <TableCell>
                                    <span className={getStatusStyle(recruiter.approved)}>
                                        {recruiter.approved ? "Đã được duyệt" : "Chưa được duyệt"}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        disabled={recruiter.approved}
                                        onClick={() => handleApprove(recruiter.userId)}
                                        color="primary"
                                    >
                                        {recruiter.approved ? "Đã duyệt" : "Duyệt"}
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

export default RecruiterPage;
