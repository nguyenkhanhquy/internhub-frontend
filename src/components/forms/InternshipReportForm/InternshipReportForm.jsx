import { useState } from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, MenuItem, Typography, Grid, IconButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup.object().shape({
    teacherName: yup.string().required("Vui lòng chọn giảng viên hướng dẫn."),
    companyName: yup.string().required("Vui lòng nhập tên công ty thực tập."),
    instructorName: yup.string().required("Vui lòng nhập tên người hướng dẫn."),
    instructorEmail: yup
        .string()
        .matches(regexEmail, "Email không hợp lệ.")
        .required("Vui lòng nhập email người hướng dẫn."),
    startDate: yup.string().required("Vui lòng chọn ngày bắt đầu."),
    endDate: yup
        .string()
        .required("Vui lòng chọn ngày kết thúc.")
        .test("is-after-start", "Ngày kết thúc phải sau ngày bắt đầu.", function (value) {
            const { startDate } = this.parent;
            return !startDate || new Date(value) >= new Date(startDate);
        }),
    reportFile: yup.mixed().required("Vui lòng tải lên báo cáo."),
    evaluationFile: yup.mixed().required("Vui lòng tải lên phiếu đánh giá."),
});

const teachers = [
    { id: 1, name: "Lê Văn D", email: "levand@gmail.com" },
    { id: 2, name: "Nguyễn Thị E", email: "nguyenthie@gmail.com" },
    { id: 3, name: "Trần Văn F", email: "tranvanf@gmail.com" },
];

const InternshipReportForm = () => {
    const [showForm, setShowForm] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            teacherName: "",
            companyName: "",
            instructorName: "",
            instructorEmail: "",
            startDate: "",
            endDate: "",
            reportFile: null,
            evaluationFile: null,
        },
    });

    const watchReportFile = watch("reportFile");
    const watchEvaluationFile = watch("evaluationFile");

    const handleToggleForm = () => {
        if (showForm) {
            // Xóa lỗi khi form bị đóng
            clearErrors();
            // reset();
        }
        setShowForm((prev) => !prev);
    };

    const onSubmit = async (dataForm) => {
        console.log(dataForm);
        reset();
        toast.success("Nộp báo cáo thành công");
    };

    return (
        <Box
            sx={{
                margin: "0 auto",
                padding: 2,
                boxShadow: 2,
                borderRadius: 2,
                mb: 3,
            }}
        >
            {/* Tiêu đề và nút sổ */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Nộp báo cáo thực tập
                </Typography>

                <IconButton
                    onClick={handleToggleForm}
                    sx={{
                        color: showForm ? "gray" : "#1e40af",
                    }}
                >
                    {showForm ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </Box>

            {/* Form hiển thị */}
            {showForm && (
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ marginTop: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="teacherName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Giảng viên hướng dẫn"
                                        fullWidth
                                        size="small"
                                        error={!!errors.teacherName}
                                        helperText={errors.teacherName?.message}
                                    >
                                        {teachers.map((teacher) => (
                                            <MenuItem key={teacher.id} value={teacher.name}>
                                                {teacher.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="companyName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Công ty thực tập"
                                        fullWidth
                                        size="small"
                                        error={!!errors.companyName}
                                        helperText={errors.companyName?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="instructorName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Người hướng dẫn"
                                        fullWidth
                                        size="small"
                                        error={!!errors.instructorName}
                                        helperText={errors.instructorName?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="instructorEmail"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email người hướng dẫn"
                                        fullWidth
                                        size="small"
                                        error={!!errors.instructorEmail}
                                        helperText={errors.instructorEmail?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="date"
                                        label="Ngày bắt đầu"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        size="small"
                                        error={!!errors.startDate}
                                        helperText={errors.startDate?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                name="endDate"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="date"
                                        label="Ngày kết thúc"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        size="small"
                                        error={!!errors.endDate}
                                        helperText={errors.endDate?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                name="reportFile"
                                control={control}
                                render={() => (
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        fullWidth
                                        sx={{
                                            textAlign: "left",
                                            color: errors.reportFile ? "error.main" : "#1e40af",
                                            borderColor: errors.reportFile ? "error.main" : "#1e40af",
                                        }}
                                    >
                                        {watchReportFile?.name || "Tải lên báo cáo"}
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) => {
                                                setValue("reportFile", e.target.files[0]);
                                                errors.reportFile && clearErrors("reportFile");
                                            }}
                                        />
                                    </Button>
                                )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                name="evaluationFile"
                                control={control}
                                render={() => (
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        fullWidth
                                        sx={{
                                            textAlign: "left",
                                            color: errors.evaluationFile ? "error.main" : "#1e40af",
                                            borderColor: errors.evaluationFile ? "error.main" : "#1e40af",
                                        }}
                                    >
                                        {watchEvaluationFile?.name || "Tải lên phiếu đánh giá"}
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) => {
                                                setValue("evaluationFile", e.target.files[0]);
                                                errors.evaluationFile && clearErrors("evaluationFile");
                                            }}
                                        />
                                    </Button>
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Box mt={3} textAlign="center">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "#1e40af",
                                color: "white",
                                "&:hover": { backgroundColor: "#1e3a8a" },
                            }}
                        >
                            Nộp báo cáo
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default InternshipReportForm;
