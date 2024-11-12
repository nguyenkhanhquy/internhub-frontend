import { toast } from "react-toastify";
import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Loading from "../../loaders/Loading/Loading";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useEffect, useState } from "react";
import { getAuthProfile } from "../../../services/authService";
import { updateProfile } from "../../../services/recruiterService";

const defaultValues = {
    name: "",
    position: "",
    recruiterEmail: "",
    phone: "",
    companyName: "",
    website: "",
    companyAddress: "",
    companyLogo: "",
    description: "",
};

const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup
    .object({
        name: yup.string().required("Không được để trống"),
        position: yup.string().required("Không được để trống"),
        companyName: yup.string().required("Không được để trống"),
        recruiterEmail: yup.string().required("Không được để trống").matches(regexEmail, "Email không hợp lệ"),
        phone: yup
            .string()
            .required("Không được để trống")
            .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
        website: yup.string().required("Không được để trống"),
        companyAddress: yup.string().required("Không được để trống"),
        companyLogo: yup.string().required("Không được để trống"),
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
            setValue("companyName", profile.company.name);
            setValue("website", profile.company.website);
            setValue("companyAddress", profile.company.address);
            setValue("companyLogo", profile.company.logo);
            setValue("description", profile.company.description);
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
                style={{ minHeight: 560, maxWidth: 800, margin: "auto", padding: 16 }}
            >
                <Typography variant="h5" fontWeight="bold" marginBottom={3}>
                    Thông tin người đại diện
                </Typography>

                <Grid container spacing={2}>
                    {/* Họ tên người đại diện */}
                    <Grid item xs={12} md={6}>
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

                    {/* Chức vụ */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("position")}
                            label={
                                <span>
                                    Chức vụ <span style={{ color: "red" }}>*</span>
                                </span>
                            }
                            variant="outlined"
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true },
                            }}
                            error={!!errors.position}
                            helperText={errors.position?.message}
                        />
                    </Grid>

                    {/* Email người đại diện */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("recruiterEmail")}
                            label={
                                <span>
                                    Email người đại diện <span style={{ color: "red" }}>*</span>
                                </span>
                            }
                            variant="outlined"
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true },
                            }}
                            error={!!errors.recruiterEmail}
                            helperText={errors.recruiterEmail?.message}
                        />
                    </Grid>

                    {/* Số điện thoại */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("phone")}
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
                        />
                    </Grid>
                </Grid>

                <Typography variant="h5" fontWeight="bold" marginTop={4} marginBottom={3}>
                    Thông tin công ty
                </Typography>

                <Grid container spacing={2}>
                    {/* Tên công ty */}
                    <Grid item xs={12}>
                        <TextField
                            {...control.register("companyName")}
                            label={
                                <span>
                                    Tên công ty <span style={{ color: "red" }}>*</span>
                                </span>
                            }
                            disabled
                            variant="outlined"
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true },
                            }}
                            style={{ backgroundColor: "#f5f5f5" }}
                        />
                    </Grid>

                    {/* Website */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("website")}
                            label={
                                <span>
                                    Website <span style={{ color: "red" }}>*</span>
                                </span>
                            }
                            variant="outlined"
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true },
                            }}
                            error={!!errors.website}
                            helperText={errors.website?.message}
                        />
                    </Grid>

                    {/* Logo */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...control.register("companyLogo")}
                            label={
                                <span>
                                    Logo (URL) <span style={{ color: "red" }}>*</span>
                                </span>
                            }
                            variant="outlined"
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true },
                            }}
                            error={!!errors.companyLogo}
                            helperText={errors.companyLogo?.message}
                        />
                    </Grid>

                    {/* Địa chỉ */}
                    <Grid item xs={12} md={12}>
                        <TextField
                            {...control.register("companyAddress")}
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
                            error={!!errors.companyAddress}
                            helperText={errors.companyAddress?.message}
                        />
                    </Grid>

                    {/* Giới thiệu công ty */}
                    <Grid item xs={12}>
                        <TextField
                            {...control.register("description")}
                            label={
                                <span>
                                    Giới thiệu công ty <span style={{ color: "red" }}>*</span>
                                </span>
                            }
                            variant="outlined"
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true },
                            }}
                            multiline
                            rows={4}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    </Grid>

                    {/* Button Lưu */}
                    <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
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

export default RecruiterProfileForm;
