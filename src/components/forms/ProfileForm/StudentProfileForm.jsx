import { Box, Button, Grid, MenuItem, TextField, Typography, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Dữ liệu mặc định
const defaultValues = {
    fullName: "Nguyễn Văn A",
    studentId: "12345678",
    email: "nguyenvana@example.com",
    dob: "2000-01-01",
    phone: "0901234567",
    gender: "Nam",
    address: "123 Đường ABC, Quận XYZ, TP HCM",
    internshipStatus: "Đang tìm nơi thực tập",
    major: "Công nghệ thông tin",
    expectedGraduation: "2024-06-01",
    gpa: 3.5,
};

// Schema xác thực bằng YUP
const schema = yup
    .object({
        fullName: yup.string().required("Họ và tên là bắt buộc"),
        studentId: yup.string().required("Mã sinh viên là bắt buộc"),
        email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
        dob: yup.string().required("Ngày sinh là bắt buộc"),
        phone: yup.string().required("Số điện thoại là bắt buộc"),
        gender: yup.string().required("Giới tính là bắt buộc"),
        address: yup.string().required("Địa chỉ là bắt buộc"),
        internshipStatus: yup.string().required("Trạng thái thực tập là bắt buộc"),
        major: yup.string().required("Chuyên ngành là bắt buộc"),
        expectedGraduation: yup.string().required("Thời gian tốt nghiệp dự kiến là bắt buộc"),
        gpa: yup.number().min(0).max(4).required("GPA là bắt buộc"),
    })
    .required();

const StudentProfileForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = (data) => {
        console.log("Dữ liệu người dùng:", data);
    };

    return (
        <Paper>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                style={{ maxWidth: 800, margin: "auto", padding: 16 }}
            >
                <Typography variant="h5" fontWeight="bold" color="primary" marginBottom={3}>
                    Chi tiết hồ sơ
                </Typography>
                <Grid container spacing={2}>
                    {/* Họ và tên */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Họ và tên"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.fullName}
                                    helperText={errors.fullName?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Mã sinh viên */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="studentId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Mã sinh viên"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.studentId}
                                    helperText={errors.studentId?.message}
                                    InputProps={{ readOnly: true }} // Không cho chỉnh sửa
                                    style={{ backgroundColor: "#f5f5f5" }}
                                />
                            )}
                        />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    InputProps={{ readOnly: true }} // Không cho chỉnh sửa
                                    style={{ backgroundColor: "#f5f5f5" }}
                                />
                            )}
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
                                    label="Chuyên ngành"
                                    variant="outlined"
                                    fullWidth
                                    select
                                    error={!!errors.major}
                                    helperText={errors.major?.message}
                                >
                                    <MenuItem value="Công nghệ thông tin">Công nghệ thông tin</MenuItem>
                                    <MenuItem value="Kỹ thuật dữ liệu">Kỹ thuật dữ liệu</MenuItem>
                                    <MenuItem value="An toàn thông tin">An toàn thông tin</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Số điện thoại */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Số điện thoại"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* GPA */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="gpa"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="GPA"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    error={!!errors.gpa}
                                    helperText={errors.gpa?.message}
                                />
                            )}
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
                            name="internshipStatus"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Trạng thái thực tập"
                                    variant="outlined"
                                    fullWidth
                                    select
                                    error={!!errors.internshipStatus}
                                    helperText={errors.internshipStatus?.message}
                                >
                                    <MenuItem value="Đang tìm nơi thực tập">Đang tìm nơi thực tập</MenuItem>
                                    <MenuItem value="Đang thực tập">Đang thực tập</MenuItem>
                                    <MenuItem value="Đã hoàn thành thực tập">Đã hoàn thành thực tập</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Ngày sinh */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="dob"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Ngày sinh"
                                    variant="outlined"
                                    fullWidth
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.dob}
                                    helperText={errors.dob?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Thời gian tốt nghiệp dự kiến */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="expectedGraduation"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Thời gian tốt nghiệp dự kiến"
                                    variant="outlined"
                                    fullWidth
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.expectedGraduation}
                                    helperText={errors.expectedGraduation?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Địa chỉ */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Địa chỉ"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Button Lưu */}
                    <Grid item xs={12} textAlign="center">
                        <Button variant="contained" color="primary" type="submit">
                            Lưu
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default StudentProfileForm;
