import { Box, Typography, Avatar, Button, Stack } from "@mui/material";
import { Business, LocationOn, Work, CalendarToday } from "@mui/icons-material";
import PropTypes from "prop-types";
import { formatDate } from "../../../utils/dateUtil";

const JobDetailHeader = ({
    logo,
    title,
    companyName,
    address,
    jobPosition,
    type,
    updateDate,
    expiryDate,
    onSaveJob,
    onApplyJob,
}) => {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                p: 2,
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                mb: 3,
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            {/* Header thông tin công việc */}
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                {/* Thông tin logo và mô tả công việc */}
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* Logo công ty */}
                    <Avatar
                        src={logo}
                        alt={`${companyName} logo`}
                        variant="square"
                        sx={{ width: 140, height: 140, borderRadius: 2 }}
                    />

                    {/* Thông tin công việc */}
                    <Box>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
                            {title}
                        </Typography>

                        {/* Tên công ty */}
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                            <Business fontSize="small" sx={{ color: "#555" }} />
                            <Typography variant="body1">
                                <strong>Công ty:</strong>
                                <span style={{ color: "#1976d2", fontWeight: 600 }}> {companyName}</span>
                            </Typography>
                        </Stack>

                        {/* Địa chỉ làm việc */}
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                            <LocationOn fontSize="small" sx={{ color: "#555" }} />
                            <Typography variant="subtitle2">
                                <strong>Nơi làm việc:</strong> {address}
                            </Typography>
                        </Stack>

                        {/* Vị trí công việc và loại hình */}
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                            <Work fontSize="small" sx={{ color: "#555" }} />
                            <Typography variant="body2">
                                <strong>Vị trí:</strong> {jobPosition} - {type}
                            </Typography>
                        </Stack>

                        {/* Ngày cập nhật và hạn nộp */}
                        <Typography variant="body2">
                            <CalendarToday fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
                            <strong>Cập nhật:</strong> {formatDate(updateDate)} - <strong>Hạn nộp:</strong>{" "}
                            {formatDate(expiryDate)}
                        </Typography>
                    </Box>
                </Stack>

                {/* Nút hành động ở phía bên phải theo chiều dọc */}
                <Stack spacing={2} sx={{ minWidth: 180 }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onApplyJob}
                        sx={{
                            textTransform: "none",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            py: 1.8,
                        }}
                    >
                        Nộp đơn
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={onSaveJob}
                        sx={{
                            textTransform: "none",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            py: 1.8,
                        }}
                    >
                        Lưu việc làm
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

JobDetailHeader.propTypes = {
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    jobPosition: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    updateDate: PropTypes.instanceOf(Date).isRequired,
    expiryDate: PropTypes.instanceOf(Date).isRequired,
    onSaveJob: PropTypes.func.isRequired,
    onApplyJob: PropTypes.func.isRequired,
};

export default JobDetailHeader;
