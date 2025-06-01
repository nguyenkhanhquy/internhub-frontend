import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid } from "@mui/material";
import { formatDate } from "@utils/dateUtil";

const internLabels = {
    SEARCHING: "Đang tìm nơi thực tập",
    WORKING: "Đang thực tập",
    COMPLETED: "Đã hoàn thành thực tập",
};

const majorLabels = {
    IT: "Công nghệ thông tin",
    DS: "Kỹ thuật dữ liệu",
    IS: "An toàn thông tin  ",
};

const StudentDetailsModal = ({ isOpen, onClose, student }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="lg">
            {/* Tiêu đề Modal */}
            <DialogTitle>
                <Typography component="div" variant="h6" sx={{ fontWeight: "bold" }}>
                    Thông tin sinh viên
                </Typography>
            </DialogTitle>

            {/* Nội dung Modal */}
            <DialogContent dividers>
                <Grid container spacing={2}>
                    {/* Cột trái */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box mb={2}>
                            <Typography variant="subtitle1" color="blue" sx={{ fontWeight: "bold", mb: 1 }}>
                                Thông tin cá nhân
                            </Typography>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "150px", fontWeight: "bold" }}>Họ và tên:</Typography>

                                <Typography>{student.name || "Chưa cập nhật"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "150px", fontWeight: "bold" }}>Mã sinh viên:</Typography>
                                <Typography>{student.studentId || "Chưa cập nhật"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "150px", fontWeight: "bold" }}>Email:</Typography>
                                <Typography>{student.user.email || "Chưa cập nhật"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "150px", fontWeight: "bold" }}>Số điện thoại:</Typography>
                                <Typography>{student.phone || "Chưa cập nhật"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "150px", fontWeight: "bold" }}>Giới tính:</Typography>
                                <Typography>{student.gender || "Chưa cập nhật"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "150px", fontWeight: "bold" }}>Ngày sinh:</Typography>
                                <Typography>{formatDate(student.dob) || "Chưa cập nhật"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "150px", fontWeight: "bold" }}>Địa chỉ:</Typography>
                                <Typography>{student.address || "Chưa cập nhật"}</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Cột phải */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box mb={2}>
                            <Typography variant="subtitle1" color="blue" sx={{ fontWeight: "bold", mb: 1 }}>
                                Thông tin học tập
                            </Typography>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "170px", fontWeight: "bold" }}>Ngành học:</Typography>
                                <Typography>{majorLabels[student.major] || "Chưa cập nhật"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "170px", fontWeight: "bold" }}>GPA:</Typography>
                                <Typography>{student.gpa || "Chưa cập nhật"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "170px", fontWeight: "bold" }}>
                                    Trạng thái thực tập:
                                </Typography>
                                <Typography>{internLabels[student.internStatus] || "Chưa cập nhật"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "170px", fontWeight: "bold" }}>Dự kiến tốt nghiệp:</Typography>
                                <Typography>{formatDate(student.expGrad) || "Chưa cập nhật"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "170px", fontWeight: "bold" }}>Báo cáo thực tập:</Typography>
                                <Typography>{student.reported ? "Đã hoàn thành" : "Chưa hoàn thành"}</Typography>
                            </Box>
                        </Box>
                        <Box mb={2}>
                            <Typography variant="subtitle1" color="blue" sx={{ fontWeight: "bold", mb: 1 }}>
                                Trạng thái tài khoản
                            </Typography>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "170px", fontWeight: "bold" }}>
                                    Trạng thái kích hoạt:
                                </Typography>
                                <Typography>{student.user.active ? "Đã kích hoạt" : "Chưa kích hoạt"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "170px", fontWeight: "bold" }}>Trạng thái khoá:</Typography>
                                <Typography>{student.user.locked ? "Đã khóa" : "Không bị khóa"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "170px", fontWeight: "bold" }}>Ngày tạo:</Typography>
                                <Typography>{formatDate(student.user.createdDate) || "Chưa cập nhật"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography sx={{ width: "170px", fontWeight: "bold" }}>Cập nhật gần nhất:</Typography>
                                <Typography>{formatDate(student.user.updatedDate) || "Chưa cập nhật"}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            {/* Nút đóng */}
            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

StudentDetailsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
};

export default StudentDetailsModal;
