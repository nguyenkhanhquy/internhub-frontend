import PropTypes from "prop-types";
import { Modal, Box, Typography, Button } from "@mui/material";

const InterviewLetterModal = ({ open, onClose, interviewLetter }) => {
    return (
        <Modal open={open} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: "4px", // Bo góc tròn hơn
                    p: 2,
                    background: "linear-gradient(145deg, #ffffff, #f1f2f6)", // Gradient nhẹ
                    border: "1px solid #e0e0e0", // Border mềm mại
                }}
            >
                {/* Tiêu đề */}
                <Typography
                    id="modal-title"
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#1e40af", // Màu xanh nổi bật
                        borderBottom: "2px solid #1e40af",
                        paddingBottom: 1,
                        mb: 2,
                    }}
                >
                    📧 Thư mời phỏng vấn
                </Typography>

                {/* Nội dung */}
                <Typography
                    id="modal-description"
                    variant="body1"
                    sx={{
                        mt: 2,
                        fontSize: "1rem",
                        color: "#4a4a4a",
                        lineHeight: 1.6,
                        minHeight: "100px",
                        whiteSpace: "pre-line", // Hỗ trợ xuống dòng nếu có nhiều nội dung
                    }}
                >
                    {interviewLetter || "Không có thông tin thư phỏng vấn."}
                </Typography>

                {/* Footer */}
                <Box sx={{ textAlign: "right", mt: 3 }}>
                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{
                            bgcolor: "#1e40af", // Màu xanh cho nút
                            ":hover": {
                                bgcolor: "#1e3a8a", // Màu xanh đậm khi hover
                            },
                            px: 3, // Padding ngang
                            py: 1.2, // Padding dọc
                            borderRadius: "8px", // Bo góc nhẹ
                            fontWeight: "bold",
                        }}
                    >
                        Đóng
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

InterviewLetterModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    interviewLetter: PropTypes.string,
};

export default InterviewLetterModal;
