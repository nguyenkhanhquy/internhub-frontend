import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        setLoading(true);
        try {
            const data = await updatePassword(dataForm.oldPassword, dataForm.newPassword);

            if (!data.success) {
                if (data?.message) throw new Error(data.message);
                else throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
            }

            reset();
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
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ height: 420, maxWidth: 400, margin: "auto", p: 4 }}
                >
                    <Typography variant="h5" fontWeight="bold" color="primary" mb={1} textAlign={"center"}>
                        Đổi mật khẩu
                    </Typography>

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
                        sx={{ mt: 1.5 }}
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
                        sx={{ mt: 1.5 }}
                        onBlur={() => trigger("confirmPassword")}
                        slotProps={{
                            inputLabel: { shrink: true },
                        }}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message ?? " "}
                    />

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                        {loading ? (
                            <Loading />
                        ) : (
                            <Button disabled={loading} variant="contained" color="primary" type="submit">
                                Cập nhật
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default UpdatePasswordForm;
