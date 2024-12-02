import { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from "@mui/material";

const InterviewInvitationModal = ({ open, onClose, application }) => {
    const [interviewLetter, setInterviewLetter] = useState(""); // State for interview letter
    const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status

    const handleInvite = () => {
        if (!interviewLetter.trim()) {
            return; // Nếu thư mời trống, không làm gì
        }
        setIsSubmitting(true);
        console.log("Mời phỏng vấn ứng viên:", application.name);
        console.log("Nội dung thư mời:", interviewLetter);
        // Giả sử bạn sẽ gửi thư mời phỏng vấn ở đây (API call)

        // Sau khi gửi xong, đóng modal
        setIsSubmitting(false);
        onClose();
    };

    const handleLetterChange = (event) => {
        setInterviewLetter(event.target.value); // Cập nhật thư mời
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                Mời phỏng vấn ứng viên <strong className="text-blue-800">{application.name}</strong>
            </DialogTitle>
            <DialogContent sx={{ paddingTop: 3 }}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    Vui lòng nhập nội dung thư mời phỏng vấn dưới đây:
                </Typography>
                <TextField
                    label="Thư mời phỏng vấn"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={interviewLetter}
                    onChange={handleLetterChange}
                    helperText="Vui lòng nhập thư mời phỏng vấn."
                    error={!interviewLetter.trim() && open} // Nếu thư mời trống thì hiển thị lỗi
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                        },
                        "& .MuiFormLabel-root": {
                            fontSize: "0.95rem",
                        },
                    }}
                />
            </DialogContent>
            <DialogActions sx={{ padding: "16px 24px" }}>
                <Button onClick={onClose} color="error" disabled={isSubmitting}>
                    Hủy
                </Button>
                <Button
                    onClick={handleInvite}
                    color="primary"
                    variant="contained"
                    disabled={!interviewLetter.trim() || isSubmitting} // Disable nếu thư mời trống hoặc đang gửi
                    sx={{
                        backgroundColor: "#1976d2",
                        "&:hover": {
                            backgroundColor: "#1565c0",
                        },
                    }}
                >
                    {isSubmitting ? "Đang gửi..." : "Xác nhận"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

InterviewInvitationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    application: PropTypes.object.isRequired,
};

export default InterviewInvitationModal;
