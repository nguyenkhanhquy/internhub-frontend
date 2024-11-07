import { ToastContainer, toast } from "react-toastify";
import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";
import { updatePassword } from "../../../services/userService";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    oldPassword: yup.string().min(8, "Mật khẩu phải dài ít nhất 8 kí tự.").required("Mật khẩu hiện tại là bắt buộc."),
    newPassword: yup.string().min(8, "Mật khẩu phải dài ít nhất 8 kí tự.").required("Mật khẩu mới là bắt buộc."),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Xác nhận mật khẩu không khớp.")
        .required("Xác nhận mật khẩu là bắt buộc."),
});

const UpdatePasswordForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (dataForm) => {
        try {
            const data = await updatePassword(dataForm.oldPassword, dataForm.newPassword);

            if (data.success !== true) {
                if (data?.message) throw new Error(data.message);
                else throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
            }

            toast.success("Đổi mật khẩu thành công");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Paper>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: "auto", p: 3 }}>
                    <Typography variant="h5" fontWeight="bold" color="primary" mb={1}>
                        Đổi mật khẩu
                    </Typography>

                    <Grid container spacing={2} mt={0.5}>
                        {/* Mật khẩu hiện tại */}
                        <Grid item xs={12}>
                            <Controller
                                name="oldPassword"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Mật khẩu hiện tại"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        onBlur={() => trigger("oldPassword")}
                                        error={!!errors.oldPassword}
                                        helperText={errors.oldPassword?.message}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Mật khẩu mới */}
                        <Grid item xs={12}>
                            <Controller
                                name="newPassword"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Mật khẩu mới"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        onBlur={() => trigger("newPassword")}
                                        error={!!errors.newPassword}
                                        helperText={errors.newPassword?.message}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Xác nhận mật khẩu mới */}
                        <Grid item xs={12}>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Xác nhận mật khẩu mới"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        onBlur={() => trigger("confirmPassword")}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Button Đặt lại mật khẩu */}
                        <Grid item xs={12} textAlign="center" mt={3}>
                            <Button variant="contained" color="primary" type="submit">
                                Cập nhật
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick={false}
                pauseOnHover={true}
                draggable={true}
                theme="light"
            />
        </>
    );
};

export default UpdatePasswordForm;
