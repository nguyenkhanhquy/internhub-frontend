import { toast } from "react-toastify";
import { Box, Button, Grid, MenuItem, TextField, Typography, Paper } from "@mui/material";
import SuspenseLoader from "../../loaders/SuspenseLoader/SuspenseLoader";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useEffect, useState } from "react";
import { getAuthProfile } from "../../../services/authService";
import { updateProfile } from "../../../services/studentService";

const defaultValues = {
    name: "",
    studentId: "",
    email: "",
    dob: "",
    phone: "",
    gender: "",
    address: "",
    internStatus: "",
    major: "",
    expGrad: "",
    gpa: null,
};

const schema = yup
    .object({
        name: yup.string().required("Họ và tên là bắt buộc"),
        studentId: yup.string().required("Mã sinh viên là bắt buộc"),
        email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
        dob: yup.string().required("Ngày sinh là bắt buộc"),
        phone: yup
            .string()
            .required("Không được để trống")
            .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
        gender: yup.string().required("Giới tính là bắt buộc"),
        address: yup.string().required("Địa chỉ là bắt buộc"),
        internStatus: yup.string().required("Trạng thái thực tập là bắt buộc"),
        major: yup.string().required("Chuyên ngành là bắt buộc"),
        expGrad: yup.string().required("Thời gian tốt nghiệp dự kiến là bắt buộc"),
        gpa: yup
            .number()
            .nullable()
            .transform((curr, originalValue) => (originalValue === "" ? null : curr))
            .min(0, "GPA phải lớn hơn hoặc bằng 0")
            .max(4, "GPA phải nhỏ hơn hoặc bằng 4")
            .required("Không được để trống"),
    })
    .required();

const StudentProfileForm = () => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await getAuthProfile();
            setProfile(data?.result);
            setLoading(false);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (profile) {
            setValue("name", profile.name);
            setValue("studentId", profile.studentId);
            setValue("email", profile.studentId + "@student.hcmute.edu.vn");
            setValue("major", profile.major);
            setValue("phone", profile.phone);
            setValue("gpa", profile.gpa);
            setValue("gender", profile.gender);
            setValue("internStatus", profile.internStatus);
            setValue("dob", profile.dob);
            setValue("expGrad", profile.expGrad);
            setValue("address", profile.address);
        }
    }, [profile, setValue]);

    const onSubmit = async (formData) => {
        console.log("Dữ liệu người dùng:", formData);
        try {
            setLoading(true);
            const data = await updateProfile(formData);
            setLoading(false);

            if (data.success !== true) {
                if (data?.message) throw new Error(data.message);
                else throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setProfile(formData);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Paper>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                style={{ height: 560, maxWidth: 800, margin: "auto", padding: 16 }}
            >
                <Typography variant="h5" fontWeight="bold" color="primary" marginBottom={3}>
                    Chi tiết hồ sơ
                </Typography>
                {loading ? (
                    <SuspenseLoader />
                ) : (
                    <Grid container spacing={2}>
                        {/* Họ và tên */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                {...control.register("name")}
                                label="Họ và tên"
                                variant="outlined"
                                fullWidth
                                slotProps={{
                                    inputLabel: { shrink: true },
                                }}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>

                        {/* Mã sinh viên */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                {...control.register("studentId")}
                                label="Mã sinh viên"
                                disabled
                                variant="outlined"
                                fullWidth
                                slotProps={{
                                    inputLabel: { shrink: true },
                                }}
                                error={!!errors.studentId}
                                helperText={errors.studentId?.message}
                                style={{ backgroundColor: "#f5f5f5" }}
                            />
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                {...control.register("email")}
                                label="Email"
                                disabled
                                variant="outlined"
                                fullWidth
                                slotProps={{
                                    inputLabel: { shrink: true },
                                }}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                style={{ backgroundColor: "#f5f5f5" }}
                            />
                        </Grid>

                        {/* Chuyên ngành */}
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="major"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Ngành"
                                        variant="outlined"
                                        fullWidth
                                        select
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                        }}
                                        error={!!errors.major}
                                        helperText={errors.major?.message}
                                    >
                                        <MenuItem value="IT">Công nghệ thông tin</MenuItem>
                                        <MenuItem value="DS">Kỹ thuật dữ liệu</MenuItem>
                                        <MenuItem value="IS">An toàn thông tin</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        {/* Số điện thoại */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Số điện thoại"
                                variant="outlined"
                                fullWidth
                                slotProps={{
                                    inputLabel: { shrink: true },
                                }}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                {...control.register("phone")}
                            />
                        </Grid>

                        {/* GPA */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                {...control.register("gpa")}
                                label="GPA"
                                variant="outlined"
                                fullWidth
                                type="number"
                                slotProps={{
                                    inputLabel: { shrink: true },
                                }}
                                inputProps={{
                                    step: "any", // Cho phép nhập số thực
                                }}
                                error={!!errors.gpa}
                                helperText={errors.gpa?.message}
                            />
                        </Grid>

                        {/* Giới tính */}
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Giới tính"
                                        variant="outlined"
                                        fullWidth
                                        select
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                        }}
                                        error={!!errors.gender}
                                        helperText={errors.gender?.message}
                                    >
                                        <MenuItem value="Nam">Nam</MenuItem>
                                        <MenuItem value="Nữ">Nữ</MenuItem>
                                        <MenuItem value="Khác">Khác</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        {/* Trạng thái thực tập */}
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="internStatus"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Trạng thái thực tập"
                                        variant="outlined"
                                        fullWidth
                                        select
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                        }}
                                        error={!!errors.internStatus}
                                        helperText={errors.internStatus?.message}
                                    >
                                        <MenuItem value="SEARCHING">Đang tìm nơi thực tập</MenuItem>
                                        <MenuItem value="WORKING">Đang thực tập</MenuItem>
                                        <MenuItem value="COMPLETED">Đã hoàn thành thực tập</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        {/* Ngày sinh */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                {...control.register("dob")}
                                label="Ngày sinh"
                                variant="outlined"
                                fullWidth
                                type="date"
                                slotProps={{
                                    inputLabel: { shrink: true },
                                }}
                                error={!!errors.dob}
                                helperText={errors.dob?.message}
                            />
                        </Grid>

                        {/* Thời gian tốt nghiệp dự kiến */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                {...control.register("expGrad")}
                                label="Thời gian tốt nghiệp dự kiến"
                                variant="outlined"
                                fullWidth
                                type="date"
                                slotProps={{
                                    inputLabel: { shrink: true },
                                }}
                                error={!!errors.expGrad}
                                helperText={errors.expGrad?.message}
                            />
                        </Grid>

                        {/* Địa chỉ */}
                        <Grid item xs={12} md={12}>
                            <TextField
                                {...control.register("address")}
                                label="Địa chỉ"
                                variant="outlined"
                                fullWidth
                                slotProps={{
                                    inputLabel: { shrink: true },
                                }}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />
                        </Grid>

                        {/* Button Lưu */}
                        <Grid item xs={12} textAlign="center">
                            <Button variant="contained" color="primary" type="submit">
                                Lưu
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Paper>
    );
};

export default StudentProfileForm;
