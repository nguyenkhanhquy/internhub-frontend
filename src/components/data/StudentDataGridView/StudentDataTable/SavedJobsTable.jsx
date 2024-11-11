import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    IconButton,
    Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import EmptyBox from "../../../box/EmptyBox";

// Dữ liệu mẫu
const sampleData = [
    // {
    //     id: 1,
    //     title: "Frontend Developer - Phát triển giao diện người dùng cho ứng dụng web hiện đại",
    //     jobPosition: "Junior",
    //     companyName: "ABC Corp - Công ty hàng đầu về công nghệ",
    //     expiryDate: new Date("2024-11-30"),
    // },
    // {
    //     id: 2,
    //     title: "Backend Developer",
    //     jobPosition: "Senior",
    //     companyName: "XYZ Ltd",
    //     expiryDate: new Date("2024-12-10"),
    // },
    // {
    //     id: 3,
    //     title: "UI/UX Designer",
    //     jobPosition: "Middle",
    //     companyName: "Creative Studio",
    //     expiryDate: new Date("2024-11-20"),
    // },
    // {
    //     id: 4,
    //     title: "Fullstack Developer",
    //     jobPosition: "Senior",
    //     companyName: "Tech Solutions",
    //     expiryDate: new Date("2024-11-25"),
    // },
];

const SavedJobsTable = ({ jobsData, onDeleteJob, onViewDetails }) => {
    const [data] = useState(jobsData || sampleData);

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
            <Table>
                {/* Tiêu đề bảng */}
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: "#f5f5f5",
                            "& th": {
                                fontWeight: "bold",
                                fontSize: "0.875rem",
                                padding: "12px 16px",
                                borderBottom: "1px solid #ddd",
                            },
                        }}
                    >
                        <TableCell align="center" sx={{ width: "5%" }}>
                            STT
                        </TableCell>
                        <TableCell sx={{ width: "30%" }}>Tên công việc</TableCell>
                        <TableCell sx={{ width: "20%" }}>Vị trí công việc</TableCell>
                        <TableCell sx={{ width: "20%" }}>Tên công ty</TableCell>
                        <TableCell sx={{ width: "15%" }}>Ngày hết hạn</TableCell>
                        <TableCell sx={{ width: "10%" }} align="center">
                            <SettingsIcon />
                        </TableCell>
                    </TableRow>
                </TableHead>

                {/* Nội dung bảng */}
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ padding: "40px 0" }}>
                                <EmptyBox />
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((job, index) => (
                            <TableRow
                                key={job.id}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#f9f9f9",
                                    },
                                    "& td": {
                                        padding: "10px 16px",
                                        fontSize: "0.875rem",
                                        borderBottom: "1px solid #e0e0e0",
                                    },
                                }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell
                                    sx={{
                                        whiteSpace: "normal",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {job.title}
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        whiteSpace: "normal",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {job.jobPosition}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        whiteSpace: "normal",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {job.companyName}
                                </TableCell>
                                <TableCell>
                                    {/* Hiển thị ngày hết hạn dưới dạng "dd/mm/yyyy" */}
                                    {job.expiryDate.toLocaleDateString("vi-VN")}
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            color="primary"
                                            onClick={() => onViewDetails(job.id)} // Hàm đi đến trang chi tiết công việc
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => onDeleteJob(job.id)} // Hàm xóa công việc
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

// Định nghĩa PropTypes
SavedJobsTable.propTypes = {
    jobsData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            jobPosition: PropTypes.string.isRequired,
            companyName: PropTypes.string.isRequired,
            expiryDate: PropTypes.instanceOf(Date).isRequired,
        }),
    ),
    onDeleteJob: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default SavedJobsTable;
