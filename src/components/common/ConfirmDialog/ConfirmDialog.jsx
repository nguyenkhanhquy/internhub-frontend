import PropTypes from "prop-types";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    title = "Xác nhận",
    message = "Bạn có chắc chắn muốn thực hiện hành động này?",
    confirmText = "Xác nhận",
    cancelText = "Hủy",
    confirmColor = "primary",
    severity = "warning", // warning, error, info
    loading = false,
}) => {
    const getTitleColor = () => {
        switch (severity) {
            case "error":
                return "error.main";
            case "warning":
                return "warning.main";
            case "info":
                return "info.main";
            default:
                return "primary.main";
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
            maxWidth="md"
            fullWidth
        >
            <DialogTitle
                id="confirm-dialog-title"
                sx={{
                    color: getTitleColor(),
                    fontWeight: "bold",
                    paddingBottom: 1,
                }}
            >
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="confirm-dialog-description"
                    sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                    }}
                >
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: "16px 24px", gap: 1 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    color="inherit"
                    disabled={loading}
                    sx={{
                        minWidth: "80px",
                        textTransform: "none",
                    }}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color={confirmColor}
                    disabled={loading}
                    autoFocus
                    sx={{
                        minWidth: "80px",
                        textTransform: "none",
                    }}
                >
                    {loading ? "Đang xử lý..." : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    confirmColor: PropTypes.oneOf(["primary", "secondary", "success", "error", "info", "warning"]),
    severity: PropTypes.oneOf(["warning", "error", "info"]),
    loading: PropTypes.bool,
};

export default ConfirmDialog;
