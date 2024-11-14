import PropTypes from "prop-types";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const ConfirmModal = ({ isOpen, loading, title, onConfirm, onCancel }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onCancel}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            {/* Tiêu đề của Modal */}
            <DialogTitle id="confirm-dialog-title">
                <strong>{title}</strong>
            </DialogTitle>

            {/* Nội dung của Modal */}
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    Bạn có chắc chắn muốn thực hiện hành động này không?
                </DialogContentText>
            </DialogContent>

            {/* Các nút hành động */}
            <DialogActions>
                <Button onClick={onCancel} disabled={loading} color="inherit">
                    Hủy
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={loading}
                    variant="contained"
                    sx={{
                        padding: "8px 10px",
                        backgroundColor: "#2e3090",
                        color: "white",
                        "&:hover": { backgroundColor: "#1f2061" },
                    }}
                >
                    {loading ? "Đang xử lý..." : "Xác nhận"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ConfirmModal;
