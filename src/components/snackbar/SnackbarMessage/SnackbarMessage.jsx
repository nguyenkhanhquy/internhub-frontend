import { Snackbar, Alert } from "@mui/material";
import PropTypes from "prop-types";

const SnackbarMessage = ({ open, message, onClose, severity }) => {
    return (
        <Snackbar
            open={open}
            onClose={onClose}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

SnackbarMessage.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    severity: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired,
};

export default SnackbarMessage;
