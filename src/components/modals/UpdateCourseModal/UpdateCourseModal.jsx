import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

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
    teacherName: yup.string().required("Vui lòng chọn giảng viên"),
});

const UpdateCourseModal = ({ isOpen, onClose, course, onUpdate }) => {
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
            academicYear: "",
            semester: "",
            teacherName: "",
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
            const selectedTeacher = teachers.find((teacher) => teacher.name === course.teacherName) || { name: "" };
            reset({
                courseCode: course.courseCode || "",
                courseName: "Thực tập tốt nghiệp",
                academicYear: course.academicYear || "",
                semester: course.semester || "",
                teacherName: selectedTeacher.name,
            });
        }
    }, [course, teachers, reset]);

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (formData) => {
        try {
            await onUpdate(formData); // Cập nhật lớp học
            toast.success("Cập nhật lớp học thành công!");
            handleClose();
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Cập nhật lớp học thất bại!");
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
                        name="teacherName"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                select
                                label="Giảng viên"
                                fullWidth
                                variant="outlined"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
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
    course: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default UpdateCourseModal;
