import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

import EmptryBox from "../../../components/box/EmptyBox";
import SuspenseLoader from "../../../components/loaders/SuspenseLoader/SuspenseLoader";
import RecruiterDetailsModal from "../../modals/RecruiterDetailsModal/RecruiterDetailsModal";

import { getAllRecruiters } from "../../../services/recruiterService";
import { approveRecruiter } from "../../../services/adminService";

const getStatusStyle = (status) => {
    return status === true
        ? "bg-green-100 text-green-700 px-2 py-1 rounded"
        : "bg-red-100 text-red-700 px-2 py-1 rounded";
};

const RecruiterPage = () => {
    const [loading, setLoading] = useState(false);
    const [recruiters, setRecruiters] = useState([]);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedRecruiter, setSelectedRecruiter] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getAllRecruiters();
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setRecruiters(data.result);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (recruiter) => {
        setSelectedRecruiter(recruiter);
        setIsDetailsModalOpen(true);
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
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-4 flex items-center justify-between">
                <Typography variant="h5">DOANH NGHIỆP</Typography>
                <Button onClick={fetchData} variant="contained" color="primary">
                    Làm mới <CachedIcon className="ml-2" fontSize="small" />
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
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                                    <SuspenseLoader />
                                </TableCell>
                            </TableRow>
                        ) : recruiters.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                                    <EmptryBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            recruiters.map((recruiter, index) => (
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
                                        <Button onClick={() => handleViewDetails(recruiter)} color="primary">
                                            Chi tiết
                                        </Button>

                                        {!recruiter.approved ? (
                                            <Button onClick={() => handleApprove(recruiter.userId)} color="success">
                                                Duyệt
                                            </Button>
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
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
