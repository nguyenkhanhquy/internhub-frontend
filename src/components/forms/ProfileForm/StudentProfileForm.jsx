import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import SaveIcon from "@mui/icons-material/Save";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAuth from "@hooks/useAuth";

import { getAuthProfile } from "@services/authService";
import { updateProfile } from "@services/studentService";

import { useDispatch, useSelector } from "react-redux";
import { selectProfile, setProfile as setProfileRedux } from "@store/slices/profileSlice";

import Loading from "@components/loaders/Loading/Loading";

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
        name: yup.string().required("Không được để trống"),
        studentId: yup.string().required("Không được để trống"),
        email: yup.string().email("Email không hợp lệ").required("Không được để trống"),
        dob: yup.string().required("Không được để trống"),
        phone: yup
            .string()
            .required("Không được để trống")
            .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
        gender: yup.string().required("Không được để trống"),
        address: yup.string().required("Không được để trống"),
        internStatus: yup.string().required("Không được để trống"),
        major: yup.string().required("Không được để trống"),
        expGrad: yup.string().required("Không được để trống"),
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
    const dispatch = useDispatch();
    const studentProfile = useSelector(selectProfile);

    const { setUser } = useAuth();

    const [profile, setProfile] = useState(studentProfile);
    const [loading, setLoading] = useState(!studentProfile);

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
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const data = await getAuthProfile();
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setProfile(data?.result);
                dispatch(setProfileRedux(data?.result));
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (!studentProfile) {
            fetchProfile();
        }
    }, [studentProfile, dispatch]);

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
        setLoading(true);
        try {
            const data = await updateProfile(formData);

            if (!data.success) {
                if (data?.message) throw new Error(data.message);
                else throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setUser((prevUser) => ({
                ...prevUser,
                name: formData.name,
            }));

            dispatch(setProfileRedux({ ...formData }));

            toast.success(data.message);
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
                style={{ minHeight: 580, maxWidth: 800, margin: "auto", padding: 16 }}
            >
                <Typography variant="h5" fontWeight="bold" marginBottom={3}>
                    Chi tiết hồ sơ sinh viên
                </Typography>

                <Grid container spacing={2}>
                    {/* Họ và tên */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            {...control.register("name")}
                            label={
                                <span>
                                    Họ và tên <span style={{ color: "red" }}>*</span>
                                </span>
                            }
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            {...control.register("studentId")}
                            label={
                                <span>
                                    Mã sinh viên <span style={{ color: "red" }}>*</span>
                                </span>
                            }
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            {...control.register("email")}
                            label={
                                <span>
                                    Email <span style={{ color: "red" }}>*</span>
                                </span>
                            }
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                            name="major"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={
                                        <span>
                                            Ngành <span style={{ color: "red" }}>*</span>
                                        </span>
                                    }
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label={
                                <span>
                                    Số điện thoại <span style={{ color: "red" }}>*</span>
                                </span>
                            }
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            {...control.register("gpa")}
                            label={
                                <span>
                                    GPA <span style={{ color: "red" }}>*</span>
                                </span>
                            }
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={
                                        <span>
                                            Giới tính <span style={{ color: "red" }}>*</span>
                                        </span>
                                    }
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
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Trạng thái thực tập */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                            name="internStatus"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={
                                        <span>
                                            Trạng thái thực tập <span style={{ color: "red" }}>*</span>
                                        </span>
                                    }
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            {...control.register("dob")}
                            label={
                                <span>
                                    Ngày sinh <span style={{ color: "red" }}>*</span>
                                </span>
                            }
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            {...control.register("expGrad")}
                            label={
                                <span>
                                    Thời gian tốt nghiệp dự kiến <span style={{ color: "red" }}>*</span>
                                </span>
                            }
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
                    <Grid size={12}>
                        <TextField
                            {...control.register("address")}
                            label={
                                <span>
                                    Địa chỉ <span style={{ color: "red" }}>*</span>
                                </span>
                            }
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
                    <Grid size={12} display="flex" justifyContent="center" alignItems="center">
                        {loading ? (
                            <Loading />
                        ) : (
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    padding: "8px 10px",
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

export default StudentProfileForm;
