import PropTypes from "prop-types";
import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    Divider,
    Chip,
} from "@mui/material";

import { formatDate } from "../../../utils/dateUtil";

const formatMajors = (majors) => {
    if (!majors || !majors.length) return "Không cung cấp";
    const majorMap = {
        IT: "Công nghệ thông tin",
        DS: "Kỹ thuật dữ liệu",
        IS: "An toàn thông tin",
    };
    return majors.map((major) => majorMap[major] || major).join(", ");
};

const JobPostDetailsModal = ({ open, onClose, jobPost }) => {
    if (!jobPost) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    backgroundColor: "#f0f5ff",
                    color: "#1d39c4",
                    fontSize: "1.5rem",
                    padding: "16px",
                }}
            >
                Chi tiết bài đăng
            </DialogTitle>
            <DialogContent
                dividers
                sx={{
                    backgroundColor: "#fafafa",
                    padding: "24px",
                }}
            >
                <Box sx={{ padding: 2 }}>
                    {/* Tiêu đề và trạng thái */}
                    <Stack direction="row" justifyContent="space-between" mb={3}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                color: "#2f54eb",
                                fontSize: "1.4rem",
                            }}
                        >
                            {jobPost.title}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip
                                label={jobPost.approved ? "Đã được duyệt" : "Chưa được duyệt"}
                                color={jobPost.approved ? "success" : "warning"}
                                sx={{ fontSize: "0.9rem" }}
                            />
                            <Chip
                                label={jobPost.hidden ? "Đang ẩn" : "Đang hiển thị"}
                                color={jobPost.hidden ? "warning" : "success"}
                                sx={{ fontSize: "0.9rem" }}
                            />
                        </Stack>
                    </Stack>

                    <Divider sx={{ mb: 2 }} />

                    {/* Công ty */}
                    <Stack spacing={1} mb={3}>
                        <Typography>
                            <b style={{ color: "#595959" }}>Công ty:</b>{" "}
                            <span style={{ color: "#1d39c4" }}>{jobPost.company.name}</span>
                        </Typography>
                        <Typography>
                            <b style={{ color: "#595959" }}>Vị trí tuyển dụng:</b>{" "}
                            <span style={{ color: "#1d39c4" }}>{jobPost.jobPosition}</span>
                        </Typography>
                    </Stack>

                    {/* Thông tin chi tiết */}
                    <Stack spacing={1} mb={3}>
                        <Typography>
                            <b style={{ color: "#595959" }}>Ngành đào tạo:</b>{" "}
                            <span style={{ color: "#1d39c4" }}>{formatMajors(jobPost.majors)}</span>
                        </Typography>
                        <Typography>
                            <b style={{ color: "#595959" }}>Mức lương:</b>{" "}
                            <span style={{ color: "#1d39c4" }}>{jobPost.salary || "Thỏa thuận"}</span>
                        </Typography>
                        <Typography>
                            <b style={{ color: "#595959" }}>Số lượng tuyển dụng:</b>{" "}
                            <span style={{ color: "#1d39c4" }}>{jobPost.quantity || "Không giới hạn"}</span>
                        </Typography>
                        <Typography>
                            <b style={{ color: "#595959" }}>Loại hợp đồng:</b>{" "}
                            <span style={{ color: "#1d39c4" }}>{jobPost.type || "Không xác định"}</span>
                        </Typography>
                        <Typography>
                            <b style={{ color: "#595959" }}>Hình thức làm việc:</b>{" "}
                            <span style={{ color: "#1d39c4" }}>
                                {jobPost.remote ? "Làm việc từ xa" : "Làm việc tại chỗ"}
                            </span>
                        </Typography>
                        <Typography>
                            <b style={{ color: "#595959" }}>Địa điểm làm việc:</b>{" "}
                            <span style={{ color: "#1d39c4" }}>{jobPost.address || "Không cung cấp"}</span>
                        </Typography>
                    </Stack>

                    <Divider sx={{ mb: 2 }} />

                    {/* Mô tả công việc */}
                    <Stack spacing={1} mb={3}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                color: "#1d39c4",
                                fontSize: "1.2rem",
                            }}
                        >
                            Mô tả công việc:
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                whiteSpace: "pre-line",
                                color: "#595959",
                                fontSize: "1rem",
                            }}
                        >
                            {jobPost.description || "Chưa có thông tin"}
                        </Typography>
                    </Stack>

                    {/* Yêu cầu ứng viên */}
                    <Stack spacing={1} mb={3}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                color: "#1d39c4",
                                fontSize: "1.2rem",
                            }}
                        >
                            Yêu cầu ứng viên:
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                whiteSpace: "pre-line",
                                color: "#595959",
                                fontSize: "1rem",
                            }}
                        >
                            {jobPost.requirements || "Chưa có thông tin"}
                        </Typography>
                    </Stack>

                    {/* Quyền lợi */}
                    <Stack spacing={1} mb={3}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                color: "#1d39c4",
                                fontSize: "1.2rem",
                            }}
                        >
                            Quyền lợi:
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                whiteSpace: "pre-line",
                                color: "#595959",
                                fontSize: "1rem",
                            }}
                        >
                            {jobPost.benefits || "Chưa có thông tin"}
                        </Typography>
                    </Stack>

                    <Divider sx={{ mb: 2 }} />

                    {/* Ngày tháng */}
                    <Stack spacing={1}>
                        <Typography>
                            <b style={{ color: "#595959" }}>Ngày đăng:</b>{" "}
                            <span style={{ color: "#1d39c4" }}>{formatDate(jobPost.createdDate)}</span>
                        </Typography>
                        <Typography>
                            <b style={{ color: "#595959" }}>Ngày cập nhật:</b>{" "}
                            <span style={{ color: "#1d39c4" }}>{formatDate(jobPost.updatedDate)}</span>
                        </Typography>
                        <Typography>
                            <b style={{ color: "#595959" }}>Thời hạn ứng tuyển:</b>{" "}
                            <span style={{ color: "#1d39c4" }}>{formatDate(jobPost.expiryDate)}</span>
                        </Typography>
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    backgroundColor: "#f0f5ff",
                    padding: "16px",
                    justifyContent: "right",
                }}
            >
                <button
                    onClick={onClose}
                    className="rounded bg-blue-800 px-5 py-2 text-white shadow-md transition-all hover:bg-blue-900"
                    style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                    }}
                >
                    Đóng
                </button>
            </DialogActions>
        </Dialog>
    );
};

JobPostDetailsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    jobPost: PropTypes.object.isRequired,
};

export default JobPostDetailsModal;
