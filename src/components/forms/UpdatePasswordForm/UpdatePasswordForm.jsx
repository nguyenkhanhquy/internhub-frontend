import { useState } from "react";
import { toast } from "react-toastify";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Loading from "@components/loaders/Loading/Loading";

import { updatePassword } from "@services/userService";
import { removeRememberMe } from "@services/localStorageService";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch } from "react-redux";
import { setAccountDetailsRedux } from "@/store/manufacturerData/manufacturerActions";

const schema = yup.object().shape({
    oldPassword: yup.string().min(8, "Mật khẩu hiện tại phải dài ít nhất 8 ký tự").required("Không được để trống"),
    newPassword: yup.string().min(8, "Mật khẩu mới phải dài ít nhất 8 ký tự").required("Không được để trống"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Xác nhận mật khẩu không khớp")
        .required("Không được để trống"),
});

const UpdatePasswordForm = () => {
    const dispatch = useDispatch();
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
            dispatch(setAccountDetailsRedux(null));

            toast.success("Đổi mật khẩu thành công");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ height: 420, maxWidth: 800, margin: "auto", p: 4 }}
            >
                <Typography variant="h5" fontWeight="bold" mb={1}>
                    Đổi mật khẩu
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={12}>
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
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
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
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
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
                    </Grid>

                    <Grid size={12} display="flex" justifyContent="center" alignItems="center">
                        {loading ? (
                            <Loading />
                        ) : (
                            <Button
                                disabled={loading}
                                variant="contained"
                                type="submit"
                                sx={{
                                    padding: "8px 20px",
                                    backgroundColor: "#2e3090",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#1f2061" },
                                }}
                            >
                                <SaveIcon sx={{ marginRight: 1 }} /> Lưu
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default UpdatePasswordForm;
