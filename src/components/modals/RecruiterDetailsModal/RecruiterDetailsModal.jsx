import PropTypes from "prop-types";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const RecruiterDetailsModal = ({ isOpen, onClose, recruiter }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
            {/* Tiêu đề Modal */}
            <DialogTitle>
                <Typography component="div" variant="h6" sx={{ fontWeight: "bold" }}>
                    Thông tin doanh nghiệp
                </Typography>
            </DialogTitle>

            {/* Nội dung Modal */}
            <DialogContent dividers>
                {/* Thông tin công ty */}
                <Box mb={3}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
                        Công ty
                    </Typography>
                    <Box display="flex" gap={2}>
                        {/* Logo */}
                        <Box>
                            <img
                                src={recruiter.company.logo || "/images/no_image_available.jpg"}
                                alt="Company Logo"
                                style={{
                                    width: "96px",
                                    height: "96px",
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </Box>
                        {/* Thông tin công ty */}
                        <Box flex={1}>
                            <Box display="flex" mb={1}>
                                <Typography variant="body2" sx={{ width: "120px", fontWeight: "bold" }}>
                                    Công ty:
                                </Typography>
                                <Typography variant="body2">{recruiter.company.name || "Chưa cập nhật"}</Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography variant="body2" sx={{ width: "120px", fontWeight: "bold" }}>
                                    Website:
                                </Typography>
                                <Typography variant="body2">
                                    {recruiter.company.website ? (
                                        <Link
                                            href={recruiter.company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            underline="hover"
                                            color="primary"
                                        >
                                            {recruiter.company.website}
                                        </Link>
                                    ) : (
                                        "Chưa cập nhật"
                                    )}
                                </Typography>
                            </Box>
                            <Box display="flex" mb={1}>
                                <Typography variant="body2" sx={{ width: "120px", fontWeight: "bold" }}>
                                    Địa chỉ:
                                </Typography>
                                <Typography variant="body2">{recruiter.company.address || "Chưa cập nhật"}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Người đại diện */}
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
                        Người đại diện
                    </Typography>
                    <Box display="flex" mb={1}>
                        <Typography variant="body2" sx={{ width: "120px", fontWeight: "bold" }}>
                            Họ và tên:
                        </Typography>
                        <Typography variant="body2">{recruiter.name || "Chưa cập nhật"}</Typography>
                    </Box>
                    <Box display="flex" mb={1}>
                        <Typography variant="body2" sx={{ width: "120px", fontWeight: "bold" }}>
                            Chức vụ:
                        </Typography>
                        <Typography variant="body2">{recruiter.position || "Chưa cập nhật"}</Typography>
                    </Box>
                    <Box display="flex" mb={1}>
                        <Typography variant="body2" sx={{ width: "120px", fontWeight: "bold" }}>
                            Email liên hệ:
                        </Typography>
                        <Typography variant="body2">{recruiter.recruiterEmail || "Chưa cập nhật"}</Typography>
                    </Box>
                    <Box display="flex" mb={1}>
                        <Typography variant="body2" sx={{ width: "120px", fontWeight: "bold" }}>
                            Số điện thoại:
                        </Typography>
                        <Typography variant="body2">{recruiter.phone || "Chưa cập nhật"}</Typography>
                    </Box>
                </Box>
            </DialogContent>

            {/* Nút đóng */}
            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

RecruiterDetailsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    recruiter: PropTypes.object.isRequired,
};

export default RecruiterDetailsModal;
