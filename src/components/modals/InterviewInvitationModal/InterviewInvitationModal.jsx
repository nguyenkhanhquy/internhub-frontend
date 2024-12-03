import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from "@mui/material";

import { interviewJobApply } from "../../../services/jobApplyService";

const InterviewInvitationModal = ({ open, onClose, application, setFlag }) => {
    const [interviewLetter, setInterviewLetter] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInvite = async () => {
        if (!interviewLetter.trim()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const data = await interviewJobApply(application.id, interviewLetter);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setFlag((prev) => !prev);
            onClose();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLetterChange = (event) => {
        setInterviewLetter(event.target.value);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                Mời phỏng vấn ứng viên <strong className="text-blue-800">{application.name}</strong>
            </DialogTitle>
            <DialogContent sx={{ paddingTop: 3 }}>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
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
                    disabled={!interviewLetter.trim() || isSubmitting}
                    sx={{
                        backgroundColor: "#1976d2",
                        "&:hover": {
                            backgroundColor: "#1565c0",
                        },
                    }}
                >
                    {isSubmitting ? "Đang gửi..." : "Gửi thư mời"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

InterviewInvitationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    application: PropTypes.object.isRequired,
    setFlag: PropTypes.func.isRequired,
};

export default InterviewInvitationModal;
