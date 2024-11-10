import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../loaders/LoadingOverlay/LoadingOverlay";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, TextField, Typography, Stack, Divider, Container } from "@mui/material";
import { sendOTP, resetPassword } from "../../../services/userService";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    otp: yup
        .string()
        .matches(/^\d+$/, "Mã OTP chỉ được chứa ký tự số")
        .length(6, "Mã OTP phải có đúng 6 ký tự số")
        .required("Không được để trống"),
    newPassword: yup.string().min(8, "Mật khẩu mới phải dài ít nhất 8 ký tự").required("Không được để trống"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Xác nhận mật khẩu mới không khớp")
        .required("Không được để trống"),
});

function ResetPasswordForm({ email }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 300 giây = 5 phút

    const onSubmit = async (dataForm) => {
        setLoading(true);
        setIsVerifying(true);
        try {
            const data = await resetPassword(email, dataForm.otp, dataForm.newPassword);

            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            toast.success(data.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            setIsVerifying(false);
        }
    };

    const handleResendOtp = async () => {
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
                Đặt lại mật khẩu
            </Typography>

            {/* Divider chạy full chiều ngang */}
            <Divider sx={{ my: 3 }} />

            {/* Nội dung form */}
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
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
                        {...control.register("otp")}
                        label={
                            <span>
                                Mã OTP <span style={{ color: "red" }}>*</span>
                            </span>
                        }
                        variant="outlined"
                        fullWidth
                        onBlur={() => trigger("otp")}
                        error={!!errors.otp}
                        helperText={errors.otp?.message}
                        inputProps={{
                            maxLength: 6,
                            style: { letterSpacing: "4px", textAlign: "center" },
                        }}
                        placeholder="******"
                    />

                    <TextField
                        {...control.register("newPassword")}
                        label={
                            <span>
                                Mật khẩu mới <span style={{ color: "red" }}>*</span>
                            </span>
                        }
                        type="password"
                        variant="outlined"
                        fullWidth
                        onBlur={() => trigger("newPassword")}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                    />

                    <TextField
                        {...control.register("confirmPassword")}
                        label={
                            <span>
                                Xác nhận mật khẩu mới <span style={{ color: "red" }}>*</span>
                            </span>
                        }
                        type="password"
                        variant="outlined"
                        fullWidth
                        onBlur={() => trigger("confirmPassword")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isVerifying}
                        sx={{
                            fontWeight: 600,
                            backgroundColor: "#2e3090",
                            "&:hover": { backgroundColor: "#1f2061" },
                        }}
                        type="submit"
                    >
                        {isVerifying ? "Đang xác thực mã OTP" : "Lưu mật khẩu mới"}
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

ResetPasswordForm.propTypes = {
    email: PropTypes.string.isRequired,
};

export default ResetPasswordForm;
