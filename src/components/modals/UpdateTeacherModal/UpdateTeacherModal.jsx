import PropTypes from "prop-types";
import { toast } from "react-toastify";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { updateTeacher } from "@services/teacherService";

// Regex kiểm tra email
const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Schema Yup xác thực
const schema = yup.object().shape({
    name: yup.string().required("Họ và tên là bắt buộc").max(50, "Họ và tên không được vượt quá 50 ký tự"),
    // email: yup.string().required("Email là bắt buộc").matches(regexEmail, "Email không hợp lệ"),
    teacherId: yup.string().required("Mã giảng viên là bắt buộc").max(10, "Mã giảng viên không được vượt quá 10 ký tự"),
});

const UpdateTeacherModal = ({ isOpen, onClose, teacher, setFlag }) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            id: teacher?.userId || "",
            name: teacher?.name || "",
            teacherId: teacher?.teacherId || "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    // Đặt lại form khi đóng modal
    const handleClose = () => {
        reset();
        onClose();
    };

    // Xử lý nút Lưu
    const onSubmit = async (formData) => {
        try {
            const data = await updateTeacher(formData.id, formData.name, formData.teacherId);
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
            {/* Tiêu đề Modal */}
            <DialogTitle>
                <Typography component="div" variant="h6" sx={{ fontWeight: "bold" }}>
                    Cập nhật thông tin giảng viên
                </Typography>
            </DialogTitle>

            {/* Nội dung Modal */}
            <DialogContent dividers>
                <Box component="form" noValidate>
                    <Box mb={2}>
                        {/* Tên giảng viên */}
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Họ và tên"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </Box>
                    <Box mb={2}>
                        {/* Mã giảng viên */}
                        <Controller
                            name="teacherId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Mã giảng viên"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.teacherId}
                                    helperText={errors.teacherId?.message}
                                />
                            )}
                        />
                    </Box>
                </Box>
            </DialogContent>

            {/* Nút hành động */}
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                    Hủy
                </Button>
                <Button
                    disabled={isSubmitting}
                    onClick={handleSubmit((data) => {
                        onSubmit(data);
                    })}
                    variant="contained"
                >
                    {isSubmitting ? "Đang lưu..." : "Lưu"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

UpdateTeacherModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    teacher: PropTypes.object.isRequired,
    setFlag: PropTypes.func.isRequired,
};

export default UpdateTeacherModal;
