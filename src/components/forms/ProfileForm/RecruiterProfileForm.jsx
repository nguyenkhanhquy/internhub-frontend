import { toast } from "react-toastify";
import { Box, Button, Grid, TextField, Typography, Paper, IconButton, Card, CardMedia } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import CKEditor5 from "@components/editors/CKEditor5/CKEditor5";
import Loading from "@components/loaders/Loading/Loading";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAuth from "@hooks/useAuth";
import { useEffect, useState, useRef } from "react";
import { getAuthProfile } from "@services/authService";
import { updateProfile } from "@services/recruiterService";
import { uploadImage } from "@services/uploadService";

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
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const fileInputRef = useRef(null);

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
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getAuthProfile();
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setProfile(data?.result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

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

    useEffect(() => {
        return () => {
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }
        };
    }, [previewURL]);

    const onSubmit = async (formData) => {
        setLoading(true);
        try {
            if (selectedFile) {
                const dataUpload = await uploadImage(selectedFile, "company/" + profile.company.id);
                setValue("companyLogo", dataUpload.result.secure_url);
            }

            const data = await updateProfile(formData);
            if (!data.success) {
                if (data?.message) throw new Error(data.message);
                else throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setUser((prevUser) => ({
                ...prevUser,
                logo: formData.companyLogo,
            }));

            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPreviewURL(null);
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
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

                    {/* Chức vụ */}
                    <Grid size={{ xs: 12, sm: 6 }}>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
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

                    {/* Địa chỉ */}
                    <Grid size={12}>
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
                    <Grid size={12}>
                        {/* <TextField
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
                        /> */}
                        <CKEditor5
                            control={control}
                            name="description"
                            label="Giới thiệu công ty"
                            error={errors.description}
                        />
                    </Grid>

                    {/* Logo công ty URL */}
                    <Grid size={12}>
                        <TextField
                            {...control.register("companyLogo")}
                            label={
                                <span>
                                    Logo công ty (URL) <span style={{ color: "red" }}>*</span>
                                </span>
                            }
                            disabled={selectedFile ? true : false}
                            variant="outlined"
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true },
                            }}
                            error={!!errors.companyLogo}
                            helperText={errors.companyLogo?.message}
                        />
                    </Grid>

                    {/* Chọn logo công ty */}
                    <Grid size={12}>
                        <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                            Chọn logo công ty <span style={{ color: "red" }}>*</span>
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                            {/* File Upload Section */}
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                {/* File Upload Button */}
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{
                                        padding: "12px 24px",
                                        borderStyle: "dashed",
                                        borderWidth: 2,
                                        "&:hover": {
                                            backgroundColor: "rgba(46, 48, 144, 0.04)",
                                            borderColor: "#2e3090",
                                        },
                                    }}
                                >
                                    Chọn file ảnh
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setValue("companyLogo", "Khóa do đang chọn file...");
                                                // Kiểm tra dung lượng file (5MB = 5 * 1024 * 1024 bytes)
                                                const maxSize = 5 * 1024 * 1024;
                                                if (file.size > maxSize) {
                                                    toast.warn(
                                                        "File quá lớn! Vui lòng chọn file có dung lượng dưới 5MB.",
                                                    );
                                                } else {
                                                    const fileURL = URL.createObjectURL(file);
                                                    setPreviewURL(fileURL);
                                                    setSelectedFile(file);
                                                }
                                            }
                                        }}
                                    />
                                </Button>

                                {/* File Info */}
                                {selectedFile && (
                                    <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 200 }}>
                                        File đã chọn: {selectedFile.name}
                                    </Typography>
                                )}
                            </Box>

                            {/* Preview Image */}
                            {previewURL && (
                                <Card sx={{ width: 200, position: "relative" }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={previewURL}
                                        alt="Logo preview"
                                        sx={{ objectFit: "contain" }}
                                    />
                                    {selectedFile && (
                                        <IconButton
                                            onClick={() => {
                                                setValue("companyLogo", profile.company.logo);
                                                setPreviewURL(null);
                                                setSelectedFile(null);
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = "";
                                                }
                                            }}
                                            sx={{
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                                "&:hover": {
                                                    backgroundColor: "rgba(255, 255, 255, 1)",
                                                },
                                            }}
                                            size="small"
                                        >
                                            <DeleteIcon fontSize="small" color="error" />
                                        </IconButton>
                                    )}
                                </Card>
                            )}
                        </Box>
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

export default RecruiterProfileForm;
