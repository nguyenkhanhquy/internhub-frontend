import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { createCourse } from "@services/courseService";
import { getAllTeachers } from "@services/teacherService";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Box,
    Grid,
    Autocomplete,
} from "@mui/material";

const schema = yup.object().shape({
    courseCode: yup.string().required("Không được để trống"),
    teacherId: yup.string().required("Vui lòng chọn giảng viên"),
});

const CreateCourseModal = ({ isOpen, onClose, academicYear, semester, setFlag }) => {
    const [teachers, setTeachers] = useState([]);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            courseCode: "",
            courseName: "Thực tập tốt nghiệp",
            teacherId: "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllTeachers();
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setTeachers(data.result);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, []);

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (formData) => {
        try {
            const data = await createCourse({
                ...formData,
                courseName: "Thực tập tốt nghiệp",
                academicYearId: academicYear.id,
                semester: semester.id,
            });
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            handleClose();
            setFlag((prev) => !prev);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography fontWeight="bold">Tạo lớp thực tập</Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Box component="form" noValidate>
                    <Box mb={2}>
                        <Controller
                            name="courseCode"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Mã học phần"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.courseCode}
                                    helperText={errors.courseCode?.message}
                                />
                            )}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField label="Tên học phần" value="Thực tập tốt nghiệp" fullWidth disabled />
                    </Box>
                    <Controller
                        name="teacherId"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                sx={{ mb: 2 }}
                                options={teachers}
                                noOptionsText="Không tìm thấy giảng viên"
                                getOptionLabel={(option) => `${option.teacherId} - ${option.name}`}
                                value={teachers.find((teacher) => teacher.teacherId === value) || null}
                                onChange={(_, newValue) => onChange(newValue?.teacherId || "")}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Giảng viên"
                                        variant="outlined"
                                        error={!!errors.teacherId}
                                        helperText={errors.teacherId?.message}
                                    />
                                )}
                                isOptionEqualToValue={(option, value) => option.teacherId === value?.teacherId}
                            />
                        )}
                    />
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box mb={2}>
                                <TextField label="Năm học" value={academicYear.name} fullWidth disabled />
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box mb={2}>
                                <TextField label="Học kỳ" value={semester.name} fullWidth disabled />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                    Hủy
                </Button>
                <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)} variant="contained">
                    {isSubmitting ? "Đang tạo..." : "Tạo lớp"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CreateCourseModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    academicYear: PropTypes.string.isRequired,
    semester: PropTypes.string.isRequired,
    setFlag: PropTypes.func.isRequired,
};

export default CreateCourseModal;
