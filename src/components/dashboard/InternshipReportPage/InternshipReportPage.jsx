import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

import EmptyBox from "../../../components/box/EmptyBox";
import SuspenseLoader from "../../../components/loaders/SuspenseLoader/SuspenseLoader";

import { getAllInternshipReports } from "../../../services/adminService";

const InternshipReportPage = () => {
    const [loading, setLoading] = useState(false);
    const [internshipReports, setInternshipReports] = useState([]);

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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-4 flex items-center justify-between">
                <Typography variant="h5">BÁO CÁO THỰC TẬP</Typography>
                <Button onClick={fetchData} variant="contained" color="primary">
                    Làm mới <CachedIcon className="ml-2" fontSize="small" />
                </Button>
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
                                    <TableCell>{report.reportStatus}</TableCell>
                                    <TableCell>...</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default InternshipReportPage;
