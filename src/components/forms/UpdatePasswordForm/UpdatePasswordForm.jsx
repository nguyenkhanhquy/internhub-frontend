import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import Loading from "../../loaders/Loading/Loading";
import { updatePassword } from "../../../services/userService";

import { useForm } from "react-hook-form";
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
        try {
            setLoading(true);
            const data = await updatePassword(dataForm.oldPassword, dataForm.newPassword);
            setLoading(false);
            if (data.success !== true) {
                if (data?.message) throw new Error(data.message);
                else throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
            }

            reset({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            toast.success("Đổi mật khẩu thành công");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Paper>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ minHeight: 412, maxWidth: 400, margin: "auto", p: 4 }}
                >
                    <Typography variant="h5" fontWeight="bold" color="primary" mb={1} textAlign={"center"}>
                        Đổi mật khẩu
                    </Typography>

                    <TextField
                        {...control.register("oldPassword")}
                        label="Mật khẩu hiện tại"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                        onBlur={() => trigger("oldPassword")}
                        slotProps={{
                            inputLabel: { shrink: true },
                        }}
                        error={!!errors.oldPassword}
                        helperText={errors.oldPassword?.message ?? " "}
                    />

                    <TextField
                        {...control.register("newPassword")}
                        label="Mật khẩu mới"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                        onBlur={() => trigger("newPassword")}
                        slotProps={{
                            inputLabel: { shrink: true },
                        }}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message ?? " "}
                    />

                    <TextField
                        {...control.register("confirmPassword")}
                        label="Xác nhận mật khẩu mới"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                        onBlur={() => trigger("confirmPassword")}
                        slotProps={{
                            inputLabel: { shrink: true },
                        }}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message ?? " "}
                    />

                    {loading ? (
                        <Loading />
                    ) : (
                        <Button variant="contained" color="primary" type="submit">
                            Cập nhật
                        </Button>
                    )}
                </Box>
            </Paper>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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
