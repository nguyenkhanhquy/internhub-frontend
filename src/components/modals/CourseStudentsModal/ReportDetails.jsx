import PropTypes from "prop-types";
import { Box, Paper, Typography, Divider, Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { formatDate } from "../../../utils/dateUtil";

const majorLabels = {
    IT: "Công nghệ thông tin",
    DS: "Kỹ thuật dữ liệu",
    IS: "An toàn thông tin",
};

const ReportDetails = ({ report, enrollment, onDownloadFile, onOpenScoreForm, onBackToList }) => {
    return (
        <Box sx={{ padding: 2 }}>
            <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2 }}>
                {/* Ngày tạo và trạng thái báo cáo */}
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

                {/* Thông tin sinh viên và thông tin thực tập */}
                <Box
                    mt={2}
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }} // Chiều dọc trên màn hình nhỏ, ngang trên màn hình lớn
                    gap={4}
                >
                    {/* Thông tin sinh viên */}
                    <Box flex={{ xs: "none", md: 1 }} width={{ xs: "100%", md: "auto" }}>
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
                    <Box flex={{ xs: "none", md: 1 }} width={{ xs: "100%", md: "auto" }}>
                        <Typography variant="h6" gutterBottom>
                            Thông tin thực tập
                        </Typography>
                        <Divider />
                        <Box mt={2} display="flex" flexDirection="column" gap={1}>
                            <Typography variant="body1">
                                <strong>Giảng viên hướng dẫn:</strong> {report?.teacherName || "N/A"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Công ty thực tập:</strong> {report?.companyName || "N/A"}{" "}
                                {report?.systemCompany ? " - (Hệ thống)" : " - (Ngoài hệ thống)"}
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
                </Box>

                {/* Nút hành động */}
                <Box
                    mt={4}
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }} // Nút theo chiều dọc trên màn hình rất nhỏ
                    justifyContent="center"
                    gap={2}
                >
                    <Button
                        variant="contained"
                        startIcon={<DescriptionIcon />}
                        sx={{
                            backgroundColor: "#1e40af",
                            color: "white",
                            "&:hover": { backgroundColor: "#1e3a8a" },
                            width: { xs: "100%", sm: "auto" }, // Nút full width trên màn hình nhỏ
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
                            width: { xs: "100%", sm: "auto" }, // Nút full width trên màn hình nhỏ
                        }}
                        onClick={() => onDownloadFile(report?.evaluationFile)}
                        disabled={!report?.evaluationFile}
                    >
                        Phiếu đánh giá
                    </Button>
                </Box>
            </Paper>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "flex-end",
                    mt: 2,
                    flexDirection: { xs: "column", sm: "row" }, // Nút theo chiều dọc trên màn hình rất nhỏ
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => onOpenScoreForm(enrollment)}
                    disabled={enrollment.finalScore}
                    sx={{ width: { xs: "100%", sm: "auto" } }} // Nút full width trên màn hình nhỏ
                >
                    Nhập điểm
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={onBackToList}
                    sx={{ width: { xs: "100%", sm: "auto" } }} // Nút full width trên màn hình nhỏ
                >
                    Quay lại
                </Button>
            </Box>
        </Box>
    );
};

ReportDetails.propTypes = {
    report: PropTypes.object.isRequired,
    enrollment: PropTypes.object.isRequired,
    onDownloadFile: PropTypes.func.isRequired,
    onOpenScoreForm: PropTypes.func.isRequired,
    onBackToList: PropTypes.func.isRequired,
};

export default ReportDetails;
