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

const CreateCourseModal = ({ isOpen, onClose, academicYear, semester }) => {
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
            academicYear: academicYear || "",
            semester: semester || "",
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

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (formData) => {
        console.log("Dữ liệu từ form:", {
            ...formData,
            courseName: "Thực tập tốt nghiệp",
            academicYear,
            semester,
        });
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography fontWeight="bold">Thêm lớp thực tập</Typography>
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
                    <Box mb={2}>
                        <TextField label="Năm học" value={academicYear} fullWidth disabled />
                    </Box>
                    <Box mb={2}>
                        <TextField label="Học kỳ" value={semester} fullWidth disabled />
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
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                    Hủy
                </Button>
                <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)} variant="contained">
                    {isSubmitting ? "Đang lưu..." : "Thêm lớp"}
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
};

export default CreateCourseModal;
