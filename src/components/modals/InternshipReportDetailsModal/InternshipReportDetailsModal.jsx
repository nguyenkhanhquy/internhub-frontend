import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Button,
    IconButton,
    Paper,
    Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import { formatDate } from "../../../utils/dateUtil";

const majorLabels = {
    IT: "Công nghệ thông tin",
    DS: "Kỹ thuật dữ liệu",
    IS: "An toàn thông tin",
};

const InternshipReportDetailsModal = ({ open, onClose, report, onDownloadFile }) => {
    return (
        <Dialog open={open} fullWidth maxWidth="md">
            <DialogTitle>
                Chi tiết báo cáo thực tập
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2 }}>
                    {/* Ngày tạo và trạng thái đơn */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="caption" color="text.secondary">
                            Ngày tạo: {report?.createdDate ? formatDate(report.createdDate) : "N/A"}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 500,
                                padding: "4px 8px",
                                borderRadius: 1,
                                color:
                                    report?.reportStatus === "PROCESSING"
                                        ? "orange"
                                        : report?.reportStatus === "ACCEPTED"
                                          ? "green"
                                          : "red",
                                backgroundColor:
                                    report?.reportStatus === "PROCESSING"
                                        ? "rgba(255, 165, 0, 0.1)"
                                        : report?.reportStatus === "ACCEPTED"
                                          ? "rgba(0, 128, 0, 0.1)"
                                          : "rgba(255, 0, 0, 0.1)",
                            }}
                        >
                            {report?.reportStatus === "PROCESSING"
                                ? "Chờ duyệt"
                                : report?.reportStatus === "ACCEPTED"
                                  ? "Đã được duyệt"
                                  : "Không được duyệt"}
                        </Typography>
                    </Box>

                    {/* Thông tin chính */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Thông tin sinh viên
                        </Typography>
                        <Divider />
                        <Box mt={2} display="flex" flexDirection="column" gap={1}>
                            <Typography variant="body1">
                                <strong>Sinh Viên:</strong> {report?.student?.name || "N/A"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>MSSV:</strong> {report?.student?.studentId || "N/A"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Chuyên ngành:</strong>{" "}
                                {majorLabels[report?.student?.major] || report?.student?.major || "N/A"}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Thông tin thực tập */}
                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>
                            Thông tin thực tập
                        </Typography>
                        <Divider />
                        <Box mt={2} display="flex" flexDirection="column" gap={1}>
                            <Typography variant="body1">
                                <strong>Giảng viên hướng dẫn:</strong> {report?.teacherName || "N/A"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Công ty thực tập:</strong> {report?.companyName || "N/A"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Người hướng dẫn:</strong> {report?.instructorName || "N/A"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Email người hướng dẫn:</strong> {report?.instructorEmail || "N/A"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Ngày bắt đầu:</strong>{" "}
                                {report?.startDate ? formatDate(report.startDate) : "N/A"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Ngày kết thúc:</strong> {report?.endDate ? formatDate(report.endDate) : "N/A"}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Nút hành động */}
                    <Box mt={4} display="flex" justifyContent="center" gap={2}>
                        <Button
                            variant="contained"
                            startIcon={<DescriptionIcon />}
                            sx={{
                                backgroundColor: "#1e40af",
                                color: "white",
                                "&:hover": { backgroundColor: "#1e3a8a" },
                            }}
                            onClick={() => onDownloadFile(report?.reportFile)}
                            disabled={!report?.reportFile}
                        >
                            File báo cáo
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<DescriptionIcon />}
                            sx={{
                                backgroundColor: "#1e40af",
                                color: "white",
                                "&:hover": { backgroundColor: "#1e3a8a" },
                            }}
                            onClick={() => onDownloadFile(report?.evaluationFile)}
                            disabled={!report?.evaluationFile}
                        >
                            Phiếu đánh giá
                        </Button>
                    </Box>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

InternshipReportDetailsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    report: PropTypes.object,
    onDownloadFile: PropTypes.func.isRequired,
};

export default InternshipReportDetailsModal;
