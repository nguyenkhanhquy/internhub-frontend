import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const defaultReasons = [
    "Tự ý nghỉ không thông báo",
    "Không còn liên lạc được với sinh viên",
    "Từ chối tiếp tục thực tập",
    "Khác",
];

const ReportQuitJobApplyModal = ({ open, onClose, onConfirm }) => {
    const [selectedReason, setSelectedReason] = useState("");
    const [customReason, setCustomReason] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleReasonChange = (event) => {
        setSelectedReason(event.target.value);
        if (event.target.value !== "Khác") {
            setCustomReason(""); // Xóa nội dung nhập nếu không chọn "Khác"
        }
    };

    const handleCustomReasonChange = (event) => {
        setCustomReason(event.target.value);
    };

    const handleConfirm = async () => {
        const reasonToSubmit = selectedReason === "Khác" ? customReason : selectedReason;
        if (!reasonToSubmit) {
            toast.warning("Vui lòng chọn hoặc nhập lý do báo cáo!");
            return;
        }

        try {
            setIsLoading(true);
            await onConfirm(reasonToSubmit);
            onClose();
        } catch (error) {
            toast.error(error.message || "Có lỗi xảy ra khi báo cáo. Vui lòng thử lại!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            onClose();
        }
    };

    return (
        <Dialog open={open} fullWidth maxWidth="sm" onClose={handleClose}>
            <DialogTitle
                sx={{
                    fontWeight: "bold",
                    fontSize: "1.25rem", // Điều chỉnh kích thước chữ
                }}
            >
                Xác nhận báo cáo bỏ việc
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Vui lòng chọn hoặc nhập lý do báo cáo:
                </Typography>
                <RadioGroup value={selectedReason} onChange={handleReasonChange} disabled={isLoading}>
                    {defaultReasons.map((reason, index) => (
                        <FormControlLabel
                            key={index}
                            value={reason}
                            control={<Radio />}
                            label={reason}
                            disabled={isLoading}
                        />
                    ))}
                </RadioGroup>
                {selectedReason === "Khác" && (
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Nhập lý do báo cáo"
                            value={customReason}
                            onChange={handleCustomReasonChange}
                            disabled={isLoading}
                        />
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ padding: "16px 24px", gap: 1 }}>
                <Button onClick={handleClose} variant="outlined" color="inherit" disabled={isLoading}>
                    Hủy
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={16} /> : null}
                >
                    {isLoading ? "Đang xử lý..." : "Xác nhận"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ReportQuitJobApplyModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default ReportQuitJobApplyModal;
