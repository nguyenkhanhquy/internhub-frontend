import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

import EmptyBox from "../../../components/box/EmptyBox";
import SuspenseLoader from "../../../components/loaders/SuspenseLoader/SuspenseLoader";
import InternshipReportDetailsModal from "../../modals/InternshipReportDetailsModal/InternshipReportDetailsModal";
import DashboardSearchBar from "../../search/DashboardSearchBar";
import CustomPagination from "../../pagination/Pagination";

import {
    getAllInternshipReports,
    approveInternshipReport,
    rejectInternshipReport,
} from "../../../services/adminService";

const reportStatusLabels = {
    PROCESSING: "Chờ duyệt",
    ACCEPTED: "Đã duyệt",
    REJECTED: "Đã từ chối",
};

const getStatusStyle = (status) => {
    return status === "ACCEPTED"
        ? "bg-green-100 text-green-700 px-2 py-1 rounded"
        : status === "REJECTED"
          ? "bg-red-100 text-red-700 px-2 py-1 rounded"
          : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded";
};

const InternshipReportPage = () => {
    const [loading, setLoading] = useState(false);
    const [internshipReports, setInternshipReports] = useState([]);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

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

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getAllInternshipReports();
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setInternshipReports(data.result);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (report) => {
        setSelectedReport(report);
        setIsDetailsModalOpen(true);
    };

    const handleApprove = async (id) => {
        try {
            const data = await approveInternshipReport(id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            fetchData();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleReject = async (id) => {
        try {
            const data = await rejectInternshipReport(id);
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
                    Báo cáo thực tập
                </Typography>
                <Button onClick={fetchData} variant="contained" color="primary">
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
                    placeholder="Tìm kiếm báo cáo thực tập..."
                />
            </div>

            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>MSSV</TableCell>
                            <TableCell>HỌ VÀ TÊN</TableCell>
                            <TableCell>CÔNG TY THỰC TẬP</TableCell>
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
                        ) : internshipReports.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                                    <EmptyBox />
                                </TableCell>
                            </TableRow>
                        ) : (
                            internshipReports.map((report, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{report.student.studentId}</TableCell>
                                    <TableCell>{report.student.name}</TableCell>
                                    <TableCell>{report.companyName}</TableCell>
                                    <TableCell>
                                        <span className={getStatusStyle(report.reportStatus)}>
                                            {reportStatusLabels[report.reportStatus]}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleViewDetails(report)} color="primary">
                                            Chi tiết
                                        </Button>
                                        {report.reportStatus === "PROCESSING" && (
                                            <>
                                                <Button onClick={() => handleApprove(report.id)} color="success">
                                                    Duyệt
                                                </Button>
                                                <Button onClick={() => handleReject(report.id)} color="error">
                                                    Từ chối
                                                </Button>
                                            </>
                                        )}
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
                <InternshipReportDetailsModal
                    open={isDetailsModalOpen}
                    onClose={() => setIsDetailsModalOpen(false)}
                    report={selectedReport}
                    onDownloadFile={(file) => {
                        if (file) {
                            window.open(file, "_blank");
                        }
                    }}
                />
            )}
        </div>
    );
};

export default InternshipReportPage;
