// import { toast } from "react-toastify";
import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Loading from "../../loaders/Loading/Loading";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useEffect, useState } from "react";
import { getAuthProfile } from "../../../services/authService";
// import { updateRecruiterProfile } from "../../../services/recruiterService";

const defaultValues = {
    name: "",
    position: "",
    recruiterEmail: "",
    phone: "",
    email: "",
    companyName: "",
    website: "",
    companyAddress: "",
    companyLogo: "",
    description: "",
};

const schema = yup
    .object({
        name: yup.string().required("Không được để trống"),
        position: yup.string().required("Không được để trống"),
        recruiterEmail: yup.string().email("Email không hợp lệ").required("Không được để trống"),
        phone: yup
            .string()
            .required("Không được để trống")
            .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
        email: yup.string().email("Email không hợp lệ").required("Không được để trống"),
        website: yup.string().url("Website không hợp lệ"),
        companyAddress: yup.string().required("Không được để trống"),
        companyLogo: yup.string().url("Logo phải là URL hợp lệ"),
        description: yup.string().required("Không được để trống"),
    })
    .required();

const RecruiterProfileForm = () => {
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
            setValue("position", profile.position);
            setValue("recruiterEmail", profile.recruiterEmail);
            setValue("phone", profile.phone);
            setValue("email", profile.email);
            setValue("companyName", profile.companyName);
            setValue("website", profile.website);
            setValue("companyAddress", profile.companyAddress);
            setValue("companyLogo", profile.companyLogo);
            setValue("description", profile.description);
        }
    }, [profile, setValue]);

    const onSubmit = async (formData) => {
        console.log(formData);
        // setLoading(true);
        // try {
        //     const data = await updateRecruiterProfile(formData);

        //     if (!data.success) {
        //         if (data?.message) throw new Error(data.message);
        //         else throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
        //     }

        //     setProfile(formData);
        //     toast.success(data.message);
        // } catch (error) {
        //     toast.error(error.message);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <Paper>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                style={{ minHeight: 560, maxWidth: 800, margin: "auto", padding: 16 }}
            >
                <Typography variant="h5" fontWeight="bold" color="primary" marginBottom={3}>
                    Chi tiết hồ sơ nhà tuyển dụng
                </Typography>

                <Grid container spacing={2}>
                    {/* Họ tên người đại diện */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("name")}
                            label="Họ tên người đại diện *"
                            variant="outlined"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>

                    {/* Chức vụ */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("position")}
                            label="Chức vụ *"
                            variant="outlined"
                            fullWidth
                            error={!!errors.position}
                            helperText={errors.position?.message}
                        />
                    </Grid>

                    {/* Email người đại diện */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("recruiterEmail")}
                            label="Email người đại diện *"
                            variant="outlined"
                            fullWidth
                            error={!!errors.recruiterEmail}
                            helperText={errors.recruiterEmail?.message}
                        />
                    </Grid>

                    {/* Số điện thoại */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("phone")}
                            label="Số điện thoại *"
                            variant="outlined"
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>

                    {/* Email đăng nhập */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("email")}
                            label="Email đăng nhập *"
                            disabled
                            variant="outlined"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            style={{ backgroundColor: "#f5f5f5" }}
                        />
                    </Grid>
                </Grid>

                <Typography variant="h5" fontWeight="bold" color="primary" marginTop={4} marginBottom={3}>
                    Thông tin công ty
                </Typography>

                <Grid container spacing={2}>
                    {/* Tên công ty */}
                    <Grid item xs={12}>
                        <TextField
                            {...control.register("companyName")}
                            label="Tên công ty *"
                            disabled
                            variant="outlined"
                            fullWidth
                            style={{ backgroundColor: "#f5f5f5" }}
                        />
                    </Grid>

                    {/* Website */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("website")}
                            label="Website"
                            variant="outlined"
                            fullWidth
                            error={!!errors.website}
                            helperText={errors.website?.message}
                        />
                    </Grid>

                    {/* Địa chỉ */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("companyAddress")}
                            label="Địa chỉ *"
                            variant="outlined"
                            fullWidth
                            error={!!errors.companyAddress}
                            helperText={errors.companyAddress?.message}
                        />
                    </Grid>

                    {/* Logo */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("companyLogo")}
                            label="Logo (URL)"
                            variant="outlined"
                            fullWidth
                            error={!!errors.companyLogo}
                            helperText={errors.companyLogo?.message}
                        />
                    </Grid>

                    {/* Giới thiệu công ty */}
                    <Grid item xs={12}>
                        <TextField
                            {...control.register("description")}
                            label="Giới thiệu công ty *"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    </Grid>

                    {/* Button Lưu */}
                    <Grid item xs={12} display="flex" justifyContent="center">
                        {loading ? (
                            <Loading />
                        ) : (
                            <Button variant="contained" color="primary" type="submit">
                                <SaveIcon sx={{ marginRight: 1 }} /> Lưu
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default RecruiterProfileForm;
