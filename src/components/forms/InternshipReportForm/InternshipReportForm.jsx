import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { getCurrentEnrollment } from "@/services/studentService";
import { getAllApprovedCompanies } from "@services/companyService";
import { submitInternshipReport } from "@services/internshipReport";
import { uploadFile } from "@services/uploadService";

import useAuth from "@hooks/useAuth";

const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup.object().shape({
    courseCode: yup.string().required("Không tìm thấy mã lớp học phần."),
    teacherName: yup.string().required("Không tìm thấy giảng viên hướng dẫn."),
    companyName: yup.string().required("Vui lòng nhập tên công ty thực tập."),
    isSystemCompany: yup.boolean(),
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
            return !startDate || new Date(value) > new Date(startDate);
        }),
    reportFile: yup.mixed().required("Vui lòng tải lên báo cáo."),
    evaluationFile: yup.mixed().required("Vui lòng tải lên phiếu đánh giá."),
});

const InternshipReportForm = ({ setFlag }) => {
    const { user } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [currentEnrollment, setCurrentEnrollment] = useState(null);
    const [companies, setCompanies] = useState([]);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
        reset,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            courseCode: "",
            teacherName: "",
            companyName: "",
            isSystemCompany: true,
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
    const watchIsSystemCompany = watch("isSystemCompany");
    const watchStartDate = watch("startDate");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCurrentEnrollment();
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setCurrentEnrollment(data.result);
                reset((prev) => ({
                    ...prev,
                    courseCode: data?.result?.courseCode || "",
                    teacherName: data?.result?.teacherName || "",
                }));

                if (data?.result?.courseCode) {
                    const data = await getAllApprovedCompanies(1, 100);
                    if (!data.success) {
                        throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                    }
                    setCompanies(data.result);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchData();
    }, [reset]);

    const handleToggleForm = () => {
        // Kiểm tra nếu chưa có enrollment
        if (!showForm && !currentEnrollment) {
            toast.warning("Bạn chưa được thêm vào lớp thực tập nào trong kỳ này");
            return;
        }

        // Kiểm tra trạng thái enrollment trước khi mở form
        if (!showForm && currentEnrollment?.enrollmentStatus !== "NOT_SUBMITTED") {
            toast.info("Bạn đã nộp báo cáo kỳ này rồi");
            return;
        }

        if (showForm) {
            clearErrors();
            reset({
                courseCode: currentEnrollment?.courseCode || "",
                teacherName: currentEnrollment?.teacherName || "",
                companyName: "",
                isSystemCompany: true,
                instructorName: "",
                instructorEmail: "",
                startDate: "",
                endDate: "",
                reportFile: null,
                evaluationFile: null,
            });
        }
        setShowForm((prev) => !prev);
    };

    const onSubmit = async (dataForm) => {
        try {
            if (dataForm.reportFile) {
                // Tạo đường dẫn tệp với timestamp
                const timestamp = Date.now();
                const filePath = `report/${user.id}/${timestamp}`;
                const dataUpload = await uploadFile(dataForm.reportFile, filePath);
                if (!dataUpload.success) {
                    throw new Error(dataUpload.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                dataForm.reportFile = dataUpload.result.secure_url;
            }

            if (dataForm.evaluationFile) {
                // Tạo đường dẫn tệp với timestamp
                const timestamp = Date.now();
                const filePath = `evaluation/${user.id}/${timestamp}`;
                const dataUpload = await uploadFile(dataForm.evaluationFile, filePath);
                if (!dataUpload.success) {
                    throw new Error(dataUpload.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                dataForm.evaluationFile = dataUpload.result.secure_url;
            }

            const data = await submitInternshipReport(dataForm);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            reset();
            handleToggleForm();
            setFlag((prev) => !prev);
            setCurrentEnrollment((prev) => ({ ...prev, enrollmentStatus: "SUBMITTED" }));
            toast.success("Nộp báo cáo thành công");
        } catch (error) {
            toast.error(error.message);
        }
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
                        opacity:
                            !currentEnrollment || currentEnrollment?.enrollmentStatus !== "NOT_SUBMITTED" ? 0.5 : 1,
                    }}
                >
                    {showForm ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </Box>

            {/* Form hiển thị */}
            {showForm && (
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ marginTop: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="courseCode"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Mã lớp học phần"
                                        fullWidth
                                        size="small"
                                        disabled
                                        error={!!errors.courseCode}
                                        helperText={errors.courseCode?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="teacherName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Giảng viên hướng dẫn"
                                        fullWidth
                                        size="small"
                                        disabled
                                        error={!!errors.teacherName}
                                        helperText={errors.teacherName?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={12}>
                            <Controller
                                name="companyName"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Autocomplete
                                        freeSolo={!watchIsSystemCompany}
                                        options={watchIsSystemCompany ? companies : []}
                                        getOptionLabel={(option) =>
                                            typeof option === "string" ? option : option.name || ""
                                        }
                                        value={
                                            watchIsSystemCompany
                                                ? companies.find((company) => company.name === value) || null
                                                : value || ""
                                        }
                                        onChange={(_, newValue) => {
                                            if (watchIsSystemCompany) {
                                                onChange(
                                                    typeof newValue === "string" ? newValue : newValue?.name || "",
                                                );
                                            } else {
                                                onChange(typeof newValue === "string" ? newValue : "");
                                            }
                                        }}
                                        onInputChange={(_, newInputValue) => {
                                            if (!watchIsSystemCompany) {
                                                onChange(newInputValue);
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Công ty thực tập"
                                                fullWidth
                                                size="small"
                                                error={!!errors.companyName}
                                                helperText={errors.companyName?.message}
                                            />
                                        )}
                                        noOptionsText="Không tìm thấy công ty"
                                        isOptionEqualToValue={(option, value) =>
                                            option.name === (typeof value === "string" ? value : value?.name)
                                        }
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={12}>
                            <Controller
                                name="isSystemCompany"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...field}
                                                checked={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e.target.checked);
                                                    setValue("companyName", "");
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label="Công ty trong hệ thống"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
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

                        <Grid size={{ xs: 12, sm: 6 }}>
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

                        <Grid size={{ xs: 12, sm: 6 }}>
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
                                        onChange={(e) => {
                                            field.onChange(e);
                                            if (e.target.value) {
                                                setValue("endDate", e.target.value);
                                            } else {
                                                setValue("endDate", "");
                                            }
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
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
                                        disabled={!watchStartDate}
                                        inputProps={{
                                            min: watchStartDate || "",
                                        }}
                                        error={!!errors.endDate}
                                        helperText={errors.endDate?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
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

                        <Grid size={{ xs: 12, sm: 6 }}>
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
                            {isSubmitting ? "Đang nộp..." : "Nộp báo cáo"}
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

InternshipReportForm.propTypes = {
    setFlag: PropTypes.func,
};

export default InternshipReportForm;
