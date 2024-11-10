import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../loaders/LoadingOverlay/LoadingOverlay";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, TextField, Typography, Stack, Divider, Container } from "@mui/material";
import { sendOTP, activateAccount } from "../../../services/userService";

function VerifyForm({ email, action }) {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 300 giây = 5 phút

    const hasSentOTP = useRef(false);

    const sendFirstTime = async (email) => {
        setLoading(true);
        try {
            const data = await sendOTP(email);

            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            setTimeLeft(300);
        }
    };

    useEffect(() => {
        if (!hasSentOTP.current) {
            if (action !== "activate-account") {
                hasSentOTP.current = true;
            } else {
                sendFirstTime(email);
                hasSentOTP.current = true;
            }
        }
    }, [email, action]);

    // Hàm xử lý khi nhấn nút "Xác thực tài khoản"
    const handleVerify = async () => {
        if (otp === "") {
            setError("Không được bỏ trống");
            return;
        } else if (!/^\d+$/.test(otp)) {
            setError("Mã OTP chỉ được chứa ký tự số");
            return;
        } else if (otp.length !== 6) {
            setError("Mã OTP phải có đúng 6 ký tự số");
            return;
        }

        setLoading(true);
        setIsVerifying(true);
        try {
            if (action === "activate-account" || action === "request-activate-account") {
                const data = await activateAccount(email, otp);

                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }

                toast.success(data.message);
                navigate("/login");
            }
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            setIsVerifying(false);
            setError("");
        }
    };

    // Hàm xử lý khi nhấn nút "Gửi lại mã OTP"
    const handleResendOtp = async () => {
        setOtp("");
        setLoading(true);
        setIsResending(true);
        try {
            const data = await sendOTP(email);

            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            setIsResending(false);
            setTimeLeft(300);
        }
    };

    // Hàm xử lý thay đổi input
    const handleChange = (e) => {
        setOtp(e.target.value);
        setError("");
    };

    // Hàm đếm ngược thời gian
    useEffect(() => {
        if (timeLeft <= 0) return; // Dừng đếm khi hết thời gian
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        // Xóa bộ đếm khi component bị unmount
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Hàm định dạng thời gian hiển thị
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")} phút ${String(remainingSeconds).padStart(2, "0")} giây`;
    };

    return (
        <Container maxWidth="100%" sx={{ mt: 4 }}>
            {/* Tiêu đề bên ngoài Box */}
            <Typography variant="h5" sx={{ color: "#333", fontWeight: 500, textAlign: "center" }}>
                Xác thực tài khoản
            </Typography>

            {/* Divider chạy full chiều ngang */}
            <Divider sx={{ my: 3 }} />

            {/* Nội dung form */}
            <Box
                sx={{
                    maxWidth: 400,
                    minHeight: 320,
                    padding: 3,
                    margin: "0 auto",
                }}
            >
                {!(loading && !isVerifying) && (
                    <>
                        <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                            <span className="font-bold">OTP</span> đã gửi đến <span className="font-bold">{email}</span>
                            <br />
                            Vui lòng kiểm tra hộp thư đến hoặc hộp thư rác
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 2, color: "#ff0000" }}>
                            OTP hiện tại hết hạn sau <span className="font-bold">{formatTime(timeLeft)}</span>
                        </Typography>
                    </>
                )}

                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        label="Nhập mã OTP"
                        variant="outlined"
                        value={otp}
                        onChange={handleChange}
                        error={!!error}
                        helperText={error}
                        inputProps={{
                            maxLength: 6,
                            style: { letterSpacing: "4px", textAlign: "center" },
                        }}
                        placeholder="******"
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleVerify}
                        disabled={isVerifying}
                        sx={{
                            fontWeight: 600,
                            backgroundColor: "#2e3090",
                            "&:hover": { backgroundColor: "#1f2061" },
                        }}
                    >
                        {isVerifying ? "Đang xác thực tài khoản" : "Xác thực tài khoản"}
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={handleResendOtp}
                        disabled={isResending}
                        sx={{
                            fontWeight: 600,
                            borderColor: "#2e3090",
                            color: "#2e3090",
                            "&:hover": {
                                borderColor: "#1f2061",
                                backgroundColor: "#f0f0ff",
                            },
                        }}
                    >
                        {isResending ? "Đang gửi lại mã OTP" : "Gửi lại mã OTP"}
                    </Button>
                </Stack>
            </Box>
            <LoadingOverlay open={loading} />
        </Container>
    );
}

VerifyForm.propTypes = {
    email: PropTypes.string.isRequired,
    action: PropTypes.string,
};

export default VerifyForm;
