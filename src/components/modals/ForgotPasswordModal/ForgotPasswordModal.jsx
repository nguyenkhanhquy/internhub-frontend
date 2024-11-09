import { useState } from "react";
import PropTypes from "prop-types";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    InputAdornment,
} from "@mui/material";
import { Email } from "@mui/icons-material";

const ForgotPasswordModal = ({ open, handleClose }) => {
    const regexEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const closeModal = () => {
        handleClose();
        setError("");
        setEmail("");
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);

        if (newEmail.trim() === "") {
            setError("Email không được để trống");
        } else if (!regexEmail.test(newEmail)) {
            setError("Email không hợp lệ");
        } else {
            setError("");
        }
    };

    const handleRequestReset = () => {
        if (email.trim() === "") {
            setError("Email không được để trống");
        } else if (!regexEmail.test(email)) {
            setError("Email không hợp lệ");
        } else {
            setError("");
            console.log("Yêu cầu cấp lại mật khẩu cho email:", email);
            closeModal();
        }
    };

    return (
        <Dialog open={open} onClose={closeModal} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ bgcolor: "#e6f0ff" }}>
                <Typography color="primary" fontWeight="bold">
                    QUÊN MẬT KHẨU?
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2, px: 1 }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={handleEmailChange}
                        error={!!error}
                        helperText={error}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="primary" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                            },
                            "& .MuiFormHelperText-root": {
                                color: "error.main",
                            },
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "flex-end", px: 4, pb: 2 }}>
                <Button
                    variant="outlined"
                    sx={{ mr: 1, color: "#000000", borderColor: "#000000" }}
                    onClick={closeModal}
                >
                    Hủy
                </Button>
                <Button variant="contained" color="primary" onClick={handleRequestReset}>
                    Yêu cầu cấp lại mật khẩu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ForgotPasswordModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default ForgotPasswordModal;
