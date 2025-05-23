import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ViewCvModal = ({ isOpen, onClose, cvUrl, title }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography fontWeight="bold">{title}</Typography>
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                dividers
                sx={{
                    height: "80vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {cvUrl ? (
                    <iframe
                        src={cvUrl}
                        title="CV Viewer"
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                        onError={() => {
                            alert("Không thể tải CV. Vui lòng kiểm tra liên kết!");
                        }}
                    />
                ) : (
                    <Typography color="textSecondary">Không có CV để hiển thị.</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

ViewCvModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    cvUrl: PropTypes.string,
    title: PropTypes.number.isRequired,
};

export default ViewCvModal;
