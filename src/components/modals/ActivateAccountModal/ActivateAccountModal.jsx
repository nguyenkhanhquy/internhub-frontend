import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "../../loaders/LoadingOverlay/LoadingOverlay";
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
import { sendOTP } from "../../../services/userService";

const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ActivateAccountModal = ({ open, handleClose }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
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

    const handleRequestReset = async () => {
        if (email.trim() === "") {
            setError("Email không được để trống");
        } else if (!regexEmail.test(email)) {
            setError("Email không hợp lệ");
        } else {
            setError("");
            setLoading(true);
            try {
                const data = await sendOTP(email);

                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                closeModal();
                navigate("/verify", { state: { email: email, action: "request-activate-account" } });
                toast.success(data.message);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Dialog open={open} onClose={closeModal} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: "#e6f0ff" }}>
                    <Typography color="primary" fontWeight="bold">
                        KÍCH HOẠT TÀI KHOẢN
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
                        Yêu cầu kích hoạt tài khoản
                    </Button>
                </DialogActions>
                <LoadingOverlay open={loading} />
            </Dialog>
        </>
    );
};

ActivateAccountModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default ActivateAccountModal;
