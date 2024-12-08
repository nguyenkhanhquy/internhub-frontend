import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

import EmptyBox from "../../../components/box/EmptyBox";
import SuspenseLoader from "../../../components/loaders/SuspenseLoader/SuspenseLoader";
import RecruiterDetailsModal from "../../modals/RecruiterDetailsModal/RecruiterDetailsModal";
import DashboardSearchBar from "../../search/DashboardSearchBar";
import CustomPagination from "../../pagination/Pagination";

// import { getAllRecruiters } from "../../../services/recruiterService";
import { getAllRecruiters, approveRecruiter } from "../../../services/adminService";

const getStatusStyle = (status) => {
    return status === true
        ? "bg-green-100 text-green-700 px-2 py-1 rounded"
        : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded";
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
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            recruiters.map((recruiter, index) => (
                                <TableRow key={index + 1 + (currentPage - 1) * recordsPerPage}>
                                    <TableCell>{index + 1 + (currentPage - 1) * recordsPerPage}</TableCell>
                                    <TableCell>{recruiter.company.name}</TableCell>
                                    <TableCell>{recruiter.name}</TableCell>
                                    <TableCell>
                                        <span className={getStatusStyle(recruiter.approved)}>
                                            {recruiter.approved ? "Đã duyệt" : "Chưa duyệt"}
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
