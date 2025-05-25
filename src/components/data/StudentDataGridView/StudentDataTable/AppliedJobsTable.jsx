import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    Tooltip,
    Button,
    IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import SuspenseLoader from "../../../loaders/SuspenseLoader/SuspenseLoader";
import EmptyBox from "../../../box/EmptyBox";
import { formatDate } from "../../../../utils/dateUtil";
import OfferConfirmModal from "../../../modals/OfferConfirmModal/OfferConfirmModal";
import InterviewLetterModal from "../../../modals/InterviewLetterModal/InterviewLetterModal";

import { acceptOfferJobApply, refuseOfferJobApply } from "../../../../services/jobApplyService";

// Hàm chuyển đổi status sang tiếng Việt và trả về Chip tương ứng
const renderStatusChip = (status) => {
    let color, label, backgroundColor;

    switch (status) {
        case "PROCESSING":
            color = "warning";
            label = "Chờ xử lý";
            backgroundColor = "#fff3e0"; // Màu nền nhạt (light orange)
            break;
        case "INTERVIEW":
            color = "info";
            label = "Chờ phỏng vấn";
            backgroundColor = "#e3f2fd"; // Màu nền nhạt (light blue)
            break;
        case "OFFER":
            color = "info";
            label = "Được đề nghị";
            backgroundColor = "#e3f2fd"; // Màu nền nhạt (light blue)
            break;
        case "REJECTED":
            color = "error";
            label = "Đã bị từ chối";
            backgroundColor = "#ffebee"; // Màu nền nhạt (light red)
            break;
        case "ACCEPTED":
            color = "success";
            label = "Đã nhận việc";
            backgroundColor = "#e8f5e9"; // Màu nền nhạt (light green)
            break;
        case "REFUSED":
            color = "error";
            label = "Không nhận việc";
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

const AppliedJobsTable = ({ loading, applyJobs, handleViewDetailsClick, setFlag }) => {
    const [offerModalOpen, setOfferModalOpen] = useState(false);
    const [selectedJobApply, setSelectedJobApply] = useState(null);
    const [interviewModalOpen, setInterviewModalOpen] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState("");

    const handleinterviewModalOpen = (letter) => {
        setSelectedLetter(letter);
        setInterviewModalOpen(true);
    };

    const handleModalClose = () => {
        setInterviewModalOpen(false);
        setSelectedLetter("");
    };

    const handleOfferModalOpen = (job) => {
        setSelectedJobApply(job);
        setOfferModalOpen(true);
    };

    const handleOfferModalClose = () => {
        setOfferModalOpen(false);
        setSelectedJobApply(null);
    };

    const handleAcceptOffer = async (jobApplyId) => {
        try {
            const data = await acceptOfferJobApply(jobApplyId);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setFlag((prev) => !prev);
            handleOfferModalClose();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleRefuseOffer = async (jobApplyId) => {
        try {
            const data = await refuseOfferJobApply(jobApplyId);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setFlag((prev) => !prev);
            handleOfferModalClose();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
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
                            <TableCell sx={{ width: "25%" }}>Tên công việc</TableCell>
                            <TableCell sx={{ width: "20%" }}>Vị trí công việc</TableCell>
                            <TableCell sx={{ width: "20%" }}>Tên công ty</TableCell>
                            <TableCell sx={{ width: "15%" }}>Ngày hết hạn</TableCell>
                            <TableCell sx={{ width: "14%" }}>Trạng thái</TableCell>
                            <TableCell sx={{ width: "1%" }} align="center">
                                <SettingsIcon />
                            </TableCell>
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
                                        height="200px"
                                    >
                                        <SuspenseLoader />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : applyJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ padding: "40px 0" }}>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        height="200px"
                                    >
                                        <EmptyBox />
                                    </Box>
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
                                        <Tooltip title={item.title} arrow>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {item.title}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                                        <Tooltip title={item.jobPosition} arrow>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {item.jobPosition}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                                        <Tooltip title={item.company.name} arrow>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {item.company.name}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>{formatDate(item.expiryDate)}</TableCell>
                                    <TableCell>
                                        {item.applyStatus === "INTERVIEW" ? (
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    width: "100%",
                                                    bgcolor: "#1e40af",
                                                    ":hover": { bgcolor: "#1e3a8a" },
                                                    fontSize: "0.75rem",
                                                    padding: "4px 8px",
                                                    textTransform: "none",
                                                }}
                                                onClick={() => handleinterviewModalOpen(item.interviewLetter)}
                                            >
                                                Chờ phỏng vấn
                                            </Button>
                                        ) : item.applyStatus === "OFFER" ? (
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="success"
                                                sx={{
                                                    width: "100%",
                                                    fontSize: "0.75rem",
                                                    padding: "4px 8px",
                                                    textTransform: "none",
                                                }}
                                                onClick={() => handleOfferModalOpen(item)}
                                            >
                                                Được đề nghị
                                            </Button>
                                        ) : (
                                            renderStatusChip(item.applyStatus)
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Xem chi tiết" arrow>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleViewDetailsClick(item.jobPostId)}
                                            >
                                                <InfoOutlinedIcon className="text-blue-800 hover:text-blue-900" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Modal hiển thị thư phỏng vấn */}
            <InterviewLetterModal
                open={interviewModalOpen}
                onClose={handleModalClose}
                interviewLetter={selectedLetter}
            />

            {/* Modal cho offer */}
            {selectedJobApply && (
                <OfferConfirmModal
                    open={offerModalOpen}
                    onClose={handleOfferModalClose}
                    onAccept={handleAcceptOffer}
                    onRefuse={handleRefuseOffer}
                    selectedJobApply={selectedJobApply}
                />
            )}
        </>
    );
};

// Định nghĩa PropTypes
AppliedJobsTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    applyJobs: PropTypes.array.isRequired,
    handleViewDetailsClick: PropTypes.func.isRequired,
    setFlag: PropTypes.func.isRequired,
};

export default AppliedJobsTable;
