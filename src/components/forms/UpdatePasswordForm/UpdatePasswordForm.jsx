import { useState } from "react";
import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";
import SnackbarMessage from "../../snackbar/SnackbarMessage/SnackbarMessage";
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
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackBarOpen(false);
    };

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

            if (data.success === false) {
                throw new Error(data.message);
            }

            setSnackBarMessage("Đổi mật khẩu thành công");
            setSnackBarSeverity("success");
            setSnackBarOpen(true);
        } catch (error) {
            setSnackBarMessage(error.message);
            setSnackBarSeverity("error");
            setSnackBarOpen(true);
        }
    };

    return (
        <Paper>
            <SnackbarMessage
                open={snackBarOpen}
                message={snackBarMessage}
                onClose={handleCloseSnackBar}
                severity={snackBarSeverity}
            />
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
    );
};

export default UpdatePasswordForm;
