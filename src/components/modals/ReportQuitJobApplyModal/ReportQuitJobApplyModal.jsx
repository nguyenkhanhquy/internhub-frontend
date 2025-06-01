import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Box,
    Typography,
} from "@mui/material";

const defaultReasons = [
    "Tự ý nghỉ không thông báo",
    "Không còn liên lạc được với sinh viên",
    "Từ chối tiếp tục thực tập",
    "Khác",
];

const ReportQuitJobApplyModal = ({ open, onClose, onConfirm }) => {
    const [selectedReason, setSelectedReason] = useState("");
    const [customReason, setCustomReason] = useState("");

    const handleReasonChange = (event) => {
        setSelectedReason(event.target.value);
        if (event.target.value !== "Khác") {
            setCustomReason(""); // Xóa nội dung nhập nếu không chọn "Khác"
        }
    };

    const handleCustomReasonChange = (event) => {
        setCustomReason(event.target.value);
    };

    const handleConfirm = () => {
        const reasonToSubmit = selectedReason === "Khác" ? customReason : selectedReason;
        if (!reasonToSubmit) {
            toast.warning("Vui lòng chọn hoặc nhập lý do báo cáo!");
            return;
        }
        onConfirm(reasonToSubmit);
        onClose();
    };

    return (
        <Dialog open={open} fullWidth maxWidth="sm">
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
                <RadioGroup value={selectedReason} onChange={handleReasonChange}>
                    {defaultReasons.map((reason, index) => (
                        <FormControlLabel key={index} value={reason} control={<Radio />} label={reason} />
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
                        />
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ padding: "16px 24px", gap: 1 }}>
                <Button onClick={onClose} variant="outlined" color="inherit">
                    Hủy
                </Button>
                <Button onClick={handleConfirm} variant="contained" color="primary">
                    Xác nhận
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
