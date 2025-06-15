import PropTypes from "prop-types";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

const NotificationModal = ({ open, onClose, notification }) => {
    if (!notification) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: { xs: "90%", sm: "70%" },
                    maxWidth: 800,
                    minHeight: 200,
                    margin: "auto",
                    marginTop: "20vh",
                    backgroundColor: "white",
                    borderRadius: 1,
                    padding: 2,
                    boxShadow: 3,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="bold" color="#2e3090">
                        {notification.title}
                    </Typography>
                    <IconButton onClick={onClose} color="primary">
                        <CloseIcon className="text-blue-900" />
                    </IconButton>
                </Box>
                <Typography variant="body2" color="#888" sx={{ marginBottom: 2 }}>
                    {new Date(notification.createdDate).toLocaleString()}
                </Typography>
                <Typography variant="body1">{notification.content}</Typography>
            </Box>
        </Modal>
    );
};

NotificationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    notification: PropTypes.object,
};

export default NotificationModal;
