import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, TextField, Typography, Paper, Divider } from "@mui/material";
import Loading from "../../loaders/Loading/Loading";
import { updatePassword } from "../../../services/userService";
import { removeRememberMe } from "../../../services/localStorageService";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    oldPassword: yup.string().min(8, "Mật khẩu hiện tại phải dài ít nhất 8 ký tự").required("Không được để trống"),
    newPassword: yup.string().min(8, "Mật khẩu mới phải dài ít nhất 8 ký tự").required("Không được để trống"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Xác nhận mật khẩu không khớp")
        .required("Không được để trống"),
});

const DashboardUpdatePasswordForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (dataForm) => {
        setLoading(true);
        try {
            const data = await updatePassword(dataForm.oldPassword, dataForm.newPassword);

            if (!data.success) {
                if (data?.message) throw new Error(data.message);
                else throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
            }

            reset();
            removeRememberMe();
            toast.success("Đổi mật khẩu thành công");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Paper>
                <Typography variant="h5" px={4} py={2}>
                    Đổi mật khẩu
                </Typography>

                <Divider />

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, px: 4, py: 2 }}>
                    <TextField
                        {...control.register("oldPassword")}
                        label={
                            <span>
                                Mật khẩu hiện tại <span style={{ color: "red" }}>*</span>
                            </span>
                        }
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1.5 }}
                        onBlur={() => trigger("oldPassword")}
                        slotProps={{
                            inputLabel: { shrink: true },
                        }}
                        error={!!errors.oldPassword}
                        helperText={errors.oldPassword?.message ?? " "}
                    />

                    {/* Hàng chứa "Mật khẩu mới" và "Xác nhận mật khẩu mới" */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2, // Khoảng cách giữa các trường
                            mt: 1.5,
                        }}
                    >
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
                            slotProps={{
                                inputLabel: { shrink: true },
                            }}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword?.message ?? " "}
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
                            slotProps={{
                                inputLabel: { shrink: true },
                            }}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message ?? " "}
                        />
                    </Box>
                </Box>

                <Divider />

                <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Button disabled={loading} variant="contained" type="submit">
                            Lưu
                        </Button>
                    )}
                </Box>
            </Paper>
        </>
    );
};

export default DashboardUpdatePasswordForm;
