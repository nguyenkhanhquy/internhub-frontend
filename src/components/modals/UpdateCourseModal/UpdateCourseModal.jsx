import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { updateCourse } from "@services/courseService";
import { getAllTeachers } from "@services/teacherService";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Typography,
    Box,
} from "@mui/material";

const schema = yup.object().shape({
    courseCode: yup.string().required("Không được để trống"),
    teacherId: yup.string().required("Vui lòng chọn giảng viên"),
});

const UpdateCourseModal = ({ isOpen, onClose, academicYear, semester, course, setFlag }) => {
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

    useEffect(() => {
        if (course && teachers.length > 0) {
            const selectedTeacher = teachers.find((teacher) => teacher.teacherId === course.teacherId);
            reset({
                courseCode: course.courseCode || "",
                courseName: "Thực tập tốt nghiệp",
                teacherId: selectedTeacher ? selectedTeacher.teacherId : "",
            });
        }
    }, [course, teachers, reset]);

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (formData) => {
        try {
            const data = await updateCourse(course.id, {
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
                <Typography fontWeight="bold">Chỉnh sửa lớp thực tập</Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
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
                    <Box mb={2}>
                        <TextField label="Năm học" value={course?.academicYear} fullWidth disabled />
                    </Box>
                    <Box mb={2}>
                        <TextField label="Học kỳ" value={course?.semester} fullWidth disabled />
                    </Box>
                    <Controller
                        name="teacherId"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                select
                                label="Giảng viên"
                                fullWidth
                                variant="outlined"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                error={!!errors.teacherId}
                                helperText={errors.teacherId?.message}
                            >
                                {teachers.map((teacher) => (
                                    <MenuItem key={teacher.userId} value={teacher.teacherId}>
                                        {teacher.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined">
                            Hủy
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Lưu
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

UpdateCourseModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    academicYear: PropTypes.object.isRequired,
    semester: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    setFlag: PropTypes.func.isRequired,
};

export default UpdateCourseModal;
