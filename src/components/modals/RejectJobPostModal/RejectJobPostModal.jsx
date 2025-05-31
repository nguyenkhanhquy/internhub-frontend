import PropTypes from "prop-types";
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
import { useState } from "react";

const defaultReasons = [
    "Nội dung bài đăng không phù hợp",
    "Thông tin bài tuyển dụng không rõ ràng",
    "Vị trí tuyển dụng không phù hợp với lĩnh vực CNTT",
    "Khác",
];

const RejectJobPostModal = ({ open, onClose, onConfirm, jobPost }) => {
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
            alert("Vui lòng chọn hoặc nhập lý do từ chối!");
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
                Xác nhận từ chối bài đăng
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Bài đăng &quot;{jobPost?.title}&quot; của công ty &quot;{jobPost?.company?.name}&quot;
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Vui lòng chọn hoặc nhập lý do từ chối bài đăng tuyển dụng:
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
                            label="Nhập lý do từ chối"
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
                <Button onClick={handleConfirm} variant="contained" color="error">
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
};

RejectJobPostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    jobPost: PropTypes.object,
};

export default RejectJobPostModal;
