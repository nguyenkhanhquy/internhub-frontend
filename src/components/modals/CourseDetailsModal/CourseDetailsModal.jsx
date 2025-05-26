import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from "@mui/material";

const CourseDetailsModal = ({ open, onClose, selectedCourse }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Chi tiết thông tin học phần</DialogTitle>
            <DialogContent>
                {selectedCourse && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                            Thông tin cơ bản
                        </Typography>

                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 3 }}>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                                    Mã học phần:
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {selectedCourse.courseCode}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                                    Năm học:
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {selectedCourse.academicYear}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                                    Học kỳ:
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {selectedCourse.semester}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                                    Giảng viên:
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {selectedCourse.teacherName}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                                    Điểm hệ 10:
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {selectedCourse.finalScore ?? "Chưa có điểm"}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                                    Trạng thái:
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {selectedCourse.enrollmentStatus === "NOT_SUBMITTED" && "Chưa nộp báo cáo"}
                                    {selectedCourse.enrollmentStatus === "SUBMITTED" && "Đã nộp báo cáo"}
                                    {selectedCourse.enrollmentStatus === "COMPLETED" && "Hoàn thành"}
                                    {selectedCourse.enrollmentStatus === "FAILED" && "Không đạt"}
                                </Typography>
                            </Box>
                        </Box>

                        <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                            Phản hồi từ giảng viên
                        </Typography>
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: "grey.50",
                                borderRadius: 1,
                                border: "1px solid",
                                borderColor: "grey.200",
                            }}
                        >
                            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                                {selectedCourse.feedback || "Chưa có phản hồi từ giảng viên"}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CourseDetailsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedCourse: PropTypes.object,
};

export default CourseDetailsModal;
