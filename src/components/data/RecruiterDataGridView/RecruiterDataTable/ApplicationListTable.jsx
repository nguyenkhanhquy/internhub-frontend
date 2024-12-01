import PropTypes from "prop-types";
import {
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
    Paper,
} from "@mui/material";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import EmptyBox from "../../../box/EmptyBox";

const ApplicationListTable = ({ applications, currentPage, recordsPerPage, handleAction }) => {
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
                return null;
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
                        <TableCell sx={{ width: "15%" }}>Ứng viên</TableCell>
                        <TableCell sx={{ width: "10%" }}>Ngày</TableCell>
                        <TableCell sx={{ width: "30%" }}>Thư giới thiệu</TableCell>
                        <TableCell align="center" sx={{ width: "5%" }}>
                            CV
                        </TableCell>
                        <TableCell sx={{ width: "15%" }}>Trạng thái</TableCell>
                        <TableCell align="center" sx={{ width: "20%" }}>
                            Xử lý hồ sơ
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {applications.length === 0 ? (
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
                                <TableCell>{new Date(application.applyDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            maxWidth: 300,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {application.coverLetter || "Không cung cấp"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            if (application?.cv) {
                                                window.location.href = application.cv;
                                            } else {
                                                alert("Cv không tồn tại!");
                                            }
                                        }}
                                    >
                                        <ContactPageOutlinedIcon className="text-green-600" />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color:
                                                application.status === "PROCESSING"
                                                    ? "orange"
                                                    : application.status === "INTERVIEW"
                                                      ? "blue"
                                                      : application.status === "OFFER"
                                                        ? "green"
                                                        : application.status === "REJECTED"
                                                          ? "red"
                                                          : "gray",
                                        }}
                                    >
                                        {getStatusLabel(application.status)}
                                    </Typography>
                                </TableCell>
                                <TableCell>{renderActions(application.status, application.id)}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

ApplicationListTable.propTypes = {
    applications: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    recordsPerPage: PropTypes.number.isRequired,
    handleAction: PropTypes.func.isRequired,
};

export default ApplicationListTable;
