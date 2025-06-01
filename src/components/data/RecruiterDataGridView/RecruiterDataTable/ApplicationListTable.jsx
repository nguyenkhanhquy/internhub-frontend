import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

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
import EmptyBox from "@components/box/EmptyBox";
import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";
import ViewCvModal from "@components/modals/ViewCVModal/ViewCVModal";

import { formatDate } from "@utils/dateUtil";

const statusStyles = {
    PROCESSING: "bg-orange-100 text-orange-700",
    INTERVIEW: "bg-blue-100 text-blue-700",
    OFFER: "bg-purple-100 text-purple-700",
    REJECTED: "bg-red-100 text-red-700",
    ACCEPTED: "bg-green-100 text-green-700",
    REFUSED: "bg-red-100 text-red-700",
};

const getStatusStyle = (status) => `${statusStyles[status] || "bg-gray-100 text-gray-700"} px-2 py-1 rounded`;

const ApplicationListTable = ({ loading, applications, currentPage, recordsPerPage, handleAction }) => {
    const [openCvModal, setOpenCvModal] = useState(false);
    const [cvUrl, setCvUrl] = useState(null);
    const [stt, setStt] = useState(null);

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
            case "ACCEPTED":
                return (
                    <Stack spacing={1}>
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            onClick={() => toast.info("Chức năng đang được phát triển")}
                        >
                            Báo cáo bỏ việc
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

    const handleViewCv = (url, stt) => {
        setCvUrl(url);
        setStt(stt);
        setOpenCvModal(true);
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
                        <TableCell sx={{ textAlign: "center", width: "5%" }}>STT</TableCell>
                        <TableCell sx={{ width: "20%" }}>Ứng viên</TableCell>
                        <TableCell sx={{ width: "15%" }}>Ngày ứng tuyển</TableCell>
                        <TableCell sx={{ width: "15%" }}>Thư giới thiệu</TableCell>
                        <TableCell sx={{ textAlign: "center", width: "5%" }}>CV</TableCell>
                        <TableCell sx={{ textAlign: "center", width: "20%" }}>Trạng thái</TableCell>
                        <TableCell sx={{ textAlign: "center", width: "20%" }}>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ padding: "40px 0" }}>
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
                                                maxWidth: "400px",
                                                backgroundColor: "#333",
                                                color: "#fff",
                                                padding: "10px 15px",
                                                fontSize: "0.875rem",
                                            },
                                            "& .MuiTooltip-arrow": {
                                                color: "#333",
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
                                            onClick={() =>
                                                handleViewCv(
                                                    application?.cv,
                                                    index + 1 + (currentPage - 1) * recordsPerPage,
                                                )
                                            }
                                            disabled={!application?.cv}
                                        >
                                            <ContactPageOutlinedIcon className="text-green-600" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <span className={getStatusStyle(application.applyStatus)}>
                                        {getStatusLabel(application.applyStatus)}
                                    </span>
                                </TableCell>
                                <TableCell>{renderActions(application.applyStatus, application.id)}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {openCvModal && (
                <ViewCvModal
                    isOpen={openCvModal}
                    onClose={() => setOpenCvModal(false)}
                    cvUrl={cvUrl}
                    title={"Hồ sơ ứng viên số " + stt}
                />
            )}
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
