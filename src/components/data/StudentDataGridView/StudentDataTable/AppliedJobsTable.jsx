import PropTypes from "prop-types";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Typography,
} from "@mui/material";

import SuspenseLoader from "../../../loaders/SuspenseLoader/SuspenseLoader";
import EmptyBox from "../../../box/EmptyBox";
import { formatDate } from "../../../../utils/dateUtil";

// Hàm chuyển đổi status sang tiếng Việt và trả về Chip tương ứng
const renderStatusChip = (status) => {
    let color, label, backgroundColor;

    switch (status) {
        case "PROCESSING":
            color = "warning";
            label = "Đang xử lý";
            backgroundColor = "#fff3e0"; // Màu nền nhạt (light orange)
            break;
        case "INTERVIEW":
            color = "info";
            label = "Phỏng vấn";
            backgroundColor = "#e3f2fd"; // Màu nền nhạt (light blue)
            break;
        case "OFFER":
            color = "info";
            label = "Đề nghị";
            backgroundColor = "#e3f2fd"; // Màu nền nhạt (light blue)
            break;
        case "REJECTED":
            color = "error";
            label = "Đã từ chối";
            backgroundColor = "#ffebee"; // Màu nền nhạt (light red)
            break;
        case "ACCEPTED":
            color = "success";
            label = "Đã nhận";
            backgroundColor = "#e8f5e9"; // Màu nền nhạt (light green)
            break;
        case "REFUSED":
            color = "error";
            label = "Không nhận";
            backgroundColor = "#ffebee"; // Màu nền nhạt (light red)
            break;
        default:
            color = "default";
            label = "";
            backgroundColor = "#f0f0f0"; // Màu nền nhạt mặc định
            break;
    }

    return (
        <Chip
            label={label}
            color={color}
            variant="outlined"
            sx={{
                width: "100%",
                borderRadius: 1,
                borderWidth: "1px",
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                fontWeight: "500",
            }}
        />
    );
};

const AppliedJobsTable = ({ loading, applyJobs }) => {
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
                        <TableCell sx={{ width: "10%" }}>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>

                {/* Nội dung bảng */}
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ padding: "40px 0" }}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="100%"
                                    padding={2}
                                >
                                    <SuspenseLoader />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : applyJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ padding: "40px 0" }}>
                                <EmptyBox />
                            </TableCell>
                        </TableRow>
                    ) : (
                        applyJobs.map((item, index) => (
                            <TableRow
                                key={item.id}
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
                                <TableCell sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {item.title}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                                    {item.jobPosition}
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                                    {item.company.name}
                                </TableCell>
                                <TableCell>{formatDate(item.expiryDate)}</TableCell>
                                <TableCell>{renderStatusChip(item.applyStatus)}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

// Định nghĩa PropTypes
AppliedJobsTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    applyJobs: PropTypes.array.isRequired,
};

export default AppliedJobsTable;
