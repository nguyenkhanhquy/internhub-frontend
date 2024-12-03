import PropTypes from "prop-types";
import { Modal, Box, Typography, Button, Divider } from "@mui/material";
import { useState } from "react";

const OfferConfirmModal = ({ open, onClose, onAccept, onRefuse, selectedJobApply }) => {
    const [confirmationState, setConfirmationState] = useState(null); // Trạng thái xác nhận

    const handleAccept = () => setConfirmationState("accept");
    const handleReject = () => setConfirmationState("reject");
    const handleCancel = () => setConfirmationState(null);

    const handleConfirmAction = () => {
        if (confirmationState === "accept") {
            onAccept(selectedJobApply.id); // Gọi hàm xử lý nhận việc
        } else if (confirmationState === "reject") {
            onRefuse(selectedJobApply.id); // Gọi hàm xử lý từ chối
        }
        setConfirmationState(null); // Reset trạng thái sau khi xử lý
        onClose(); // Đóng modal
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="offer-modal-title"
            aria-describedby="offer-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: 350, sm: 400 },
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 2,
                    borderRadius: 1,
                    border: "1px solid #ddd",
                }}
            >
                {/* Tiêu đề modal */}
                <Typography
                    id="offer-modal-title"
                    variant="h6"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#1e40af",
                    }}
                >
                    {confirmationState === null
                        ? "Phỏng vấn thành công!"
                        : confirmationState === "accept"
                          ? "Xác nhận nhận việc"
                          : "Xác nhận từ chối việc"}
                </Typography>

                {/* Nội dung cố định */}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ minHeight: 80 }}>
                    {confirmationState === null ? (
                        <Typography variant="body1">
                            Bạn đã được nhận vào vị trí <strong>{selectedJobApply.jobPosition}</strong> tại công ty{" "}
                            <strong>{selectedJobApply.companyName}</strong>.
                        </Typography>
                    ) : (
                        <Typography variant="body1">
                            {confirmationState === "accept"
                                ? "Bạn chắc chắn muốn nhận công việc này?"
                                : "Bạn chắc chắn muốn từ chối công việc này?"}
                        </Typography>
                    )}
                </Box>

                {/* Nút điều khiển */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                        mt: 3,
                    }}
                >
                    {confirmationState === null ? (
                        <>
                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                sx={{ textTransform: "none", fontWeight: 500 }}
                                onClick={handleReject}
                            >
                                Không nhận
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 500,
                                    bgcolor: "#1e40af",
                                    ":hover": { bgcolor: "#1e3a8a" },
                                }}
                                onClick={handleAccept}
                            >
                                Nhận việc
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 500,
                                    bgcolor: "#1e40af",
                                    ":hover": { bgcolor: "#1e3a8a" },
                                }}
                                onClick={handleConfirmAction}
                            >
                                Xác nhận
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 500,
                                    color: "#1e40af",
                                    borderColor: "#1e40af",
                                    ":hover": { color: "#1e3a8a", borderColor: "#1e3a8a" },
                                }}
                                onClick={handleCancel}
                            >
                                Hủy
                            </Button>
                        </>
                    )}
                </Box>
                {/* Nút đóng */}
                <Button
                    fullWidth
                    variant="text"
                    color="inherit"
                    sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        mt: 2,
                        color: "text.secondary",
                    }}
                    onClick={onClose}
                >
                    Đóng
                </Button>
            </Box>
        </Modal>
    );
};

OfferConfirmModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    onRefuse: PropTypes.func.isRequired,
    selectedJobApply: PropTypes.object.isRequired,
};

export default OfferConfirmModal;
