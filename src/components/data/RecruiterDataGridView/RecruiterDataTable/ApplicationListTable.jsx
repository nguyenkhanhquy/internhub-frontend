import PropTypes from "prop-types";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Typography,
    Stack,
    IconButton,
    Tooltip,
    Paper,
} from "@mui/material";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import EmptyBox from "../../../box/EmptyBox";
import SuspenseLoader from "../../../loaders/SuspenseLoader/SuspenseLoader";

import { formatDate } from "../../../../utils/dateUtil";

const ApplicationListTable = ({ loading, applications, currentPage, recordsPerPage, handleAction }) => {
    const renderActions = (status, id) => {
        switch (status) {
            case "PROCESSING":
                return (
                    <Stack spacing={1}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#1e40af", ":hover": { backgroundColor: "#1e3a8a" } }}
                            size="small"
                            onClick={() => handleAction(id, "INTERVIEW")}
                        >
                            Mời phỏng vấn
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleAction(id, "REJECTED")}
                        >
                            Từ chối
                        </Button>
                    </Stack>
                );
            case "INTERVIEW":
                return (
                    <Stack spacing={1}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#16a34a", ":hover": { backgroundColor: "#15803d" } }}
                            size="small"
                            onClick={() => handleAction(id, "OFFER")}
                        >
                            Chấp nhận
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleAction(id, "REJECTED")}
                        >
                            Từ chối
                        </Button>
                    </Stack>
                );
            default:
                return (
                    <Stack spacing={1}>
                        <Button disabled variant="contained">
                            Đã xử lý
                        </Button>
                    </Stack>
                );
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "PROCESSING":
                return "Chờ xử lý";
            case "INTERVIEW":
                return "Chờ phỏng vấn";
            case "OFFER":
                return "Chờ nhận việc";
            case "REJECTED":
                return "Đã từ chối";
            case "ACCEPTED":
                return "Đã nhận việc";
            case "REFUSED":
                return "Không nhận việc";
            default:
                return "Không xác định";
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
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
                        <TableCell sx={{ width: "20%" }}>Ứng viên</TableCell>
                        <TableCell sx={{ width: "18%" }}>Ngày ứng tuyển</TableCell>
                        <TableCell sx={{ width: "15%" }}>Thư giới thiệu</TableCell>
                        <TableCell align="center" sx={{ width: "5%" }}>
                            CV
                        </TableCell>
                        <TableCell sx={{ width: "17%" }}>Trạng thái</TableCell>
                        <TableCell align="center" sx={{ width: "20%" }}>
                            Xử lý hồ sơ
                        </TableCell>
                    </TableRow>
                </TableHead>
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
                    ) : applications.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ padding: "40px 0" }}>
                                <EmptyBox />
                            </TableCell>
                        </TableRow>
                    ) : (
                        applications.map((application, index) => (
                            <TableRow
                                key={index}
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
                                <TableCell align="center">{index + 1 + (currentPage - 1) * recordsPerPage}</TableCell>
                                <TableCell
                                    sx={{
                                        whiteSpace: "normal",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {application.name}
                                </TableCell>
                                <TableCell>{formatDate(application.applyDate)}</TableCell>
                                <TableCell>
                                    <Tooltip
                                        title={
                                            <Typography
                                                sx={{
                                                    fontSize: "1rem",
                                                    lineHeight: "1.5",
                                                    color: "#fff",
                                                    padding: "8px 12px",
                                                }}
                                            >
                                                {application.coverLetter || "Không có thư giới thiệu"}
                                            </Typography>
                                        }
                                        arrow
                                        sx={{
                                            "& .MuiTooltip-tooltip": {
                                                maxWidth: "400px", // Độ rộng tối đa của tooltip
                                                backgroundColor: "#333", // Màu nền tooltip
                                                color: "#fff", // Màu chữ trong tooltip
                                                padding: "10px 15px", // Padding bên trong tooltip
                                                fontSize: "0.875rem", // Kích thước chữ mặc định
                                            },
                                            "& .MuiTooltip-arrow": {
                                                color: "#333", // Màu của mũi tên tooltip
                                            },
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                maxWidth: 200,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {application.coverLetter || "Không được cung cấp"}
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Xem CV" arrow>
                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                if (application?.cv) {
                                                    window.open(application.cv, "_blank");
                                                } else {
                                                    alert("CV không tồn tại!");
                                                }
                                            }}
                                        >
                                            <ContactPageOutlinedIcon className="text-green-600" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color:
                                                application.applyStatus === "PROCESSING"
                                                    ? "orange"
                                                    : application.applyStatus === "INTERVIEW"
                                                      ? "blue"
                                                      : application.applyStatus === "OFFER"
                                                        ? "green"
                                                        : application.applyStatus === "REJECTED"
                                                          ? "red"
                                                          : "gray",
                                        }}
                                    >
                                        {getStatusLabel(application.applyStatus)}
                                    </Typography>
                                </TableCell>
                                <TableCell>{renderActions(application.applyStatus, application.id)}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

ApplicationListTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    applications: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    recordsPerPage: PropTypes.number.isRequired,
    handleAction: PropTypes.func.isRequired,
};

export default ApplicationListTable;
