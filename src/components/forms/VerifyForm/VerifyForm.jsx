import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Stack, Divider, Container } from "@mui/material";

function VerifyForm() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [isResending, setIsResending] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 300 giây = 5 phút

    // Hàm xử lý khi nhấn nút "Xác thực tài khoản"
    const handleVerify = () => {
        if (otp === "") {
            setError("Không được bỏ trống");
            return;
        } else if (!/^\d+$/.test(otp)) {
            setError("Chỉ được nhập số");
            return;
        } else if (otp.length !== 6) {
            setError("OTP phải có đúng 6 ký tự");
            return;
        }

        setError("");
        alert("Xác thực thành công");
    };

    // Hàm xử lý khi nhấn nút "Gửi lại mã OTP"
    const handleResendOtp = () => {
        setIsResending(true);
        setTimeLeft(300); // Reset lại thời gian đếm ngược khi gửi lại OTP
        setTimeout(() => {
            setIsResending(false);
            alert("Mã OTP đã được gửi lại!");
        }, 1500);
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
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
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
                <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                    Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra và nhập mã bên dưới để hoàn tất xác thực.
                </Typography>

                <Typography variant="body2" sx={{ mb: 2, color: "#ff0000" }}>
                    Mã OTP sẽ hết hạn sau {formatTime(timeLeft)}
                </Typography>

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
                        sx={{
                            fontWeight: 600,
                            backgroundColor: "#2e3090",
                            "&:hover": { backgroundColor: "#1f2061" },
                        }}
                    >
                        Xác thực tài khoản
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
                        {isResending ? "Đang gửi lại..." : "Gửi lại mã OTP"}
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}

export default VerifyForm;
