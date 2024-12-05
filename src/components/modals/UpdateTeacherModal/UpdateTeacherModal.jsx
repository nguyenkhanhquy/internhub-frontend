import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Regex kiểm tra email
const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Schema Yup xác thực
const schema = yup.object().shape({
    name: yup.string().required("Họ và tên là bắt buộc").max(50, "Họ và tên không được vượt quá 50 ký tự"),
    email: yup.string().required("Email là bắt buộc").matches(regexEmail, "Email không hợp lệ"),
});

const UpdateTeacherModal = ({ isOpen, onClose, teacher, onSubmit }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: teacher?.name || "",
            email: teacher?.email || "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    // Đặt lại form khi đóng modal
    const handleClose = () => {
        reset();
        onClose();
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
                        {/* Email giảng viên */}
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
                    onClick={handleSubmit((data) => {
                        onSubmit(data);
                        handleClose();
                    })}
                    variant="contained"
                >
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

UpdateTeacherModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    teacher: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default UpdateTeacherModal;
