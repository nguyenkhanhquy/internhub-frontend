import PropTypes from "prop-types";
import { Box, Typography, Stack, Divider, Chip, useTheme, useMediaQuery } from "@mui/material";
import { MonetizationOn, Group, Work, Schedule, CalendarToday, School, WorkOutline } from "@mui/icons-material";
import { formatDate } from "../../../utils/dateUtil";

const majorLabels = {
    IT: "Công nghệ thông tin",
    DS: "Kỹ thuật dữ liệu",
    IS: "An toàn thông tin",
};

const JobDetailSummary = ({ salary, quantity, remote, type, createdDate, expiryDate, jobPosition, majors }) => {
    // Lấy theme và kiểm tra xem màn hình có nhỏ hay không
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                backgroundColor: "white",
                p: 3,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                mb: 4,
                width: "100%",
                margin: "0 auto",
            }}
        >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Thông tin chung
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
                {/* Mức lương */}
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <MonetizationOn sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: isSmallScreen ? "100%" : "130px" }}>
                        Mức lương:
                    </Typography>
                    <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                        {salary}
                    </Typography>
                </Box>

                {/* Số lượng tuyển dụng */}
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <Group sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: isSmallScreen ? "100%" : "130px" }}>
                        Số lượng tuyển:
                    </Typography>
                    <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                        {quantity} người
                    </Typography>
                </Box>

                {/* Hình thức làm việc */}
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <WorkOutline sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: isSmallScreen ? "100%" : "130px" }}>
                        Hình thức:
                    </Typography>
                    <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                        {remote}
                    </Typography>
                </Box>

                {/* Thời gian làm việc */}
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <Schedule sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: isSmallScreen ? "100%" : "130px" }}>
                        Loại hợp đồng:
                    </Typography>
                    <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                        {type}
                    </Typography>
                </Box>

                {/* Ngày đăng */}
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <CalendarToday sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: isSmallScreen ? "100%" : "130px" }}>
                        Ngày đăng:
                    </Typography>
                    <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                        {formatDate(createdDate)}
                    </Typography>
                </Box>

                {/* Ngày hết hạn */}
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <CalendarToday sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: isSmallScreen ? "100%" : "130px" }}>
                        Ngày hết hạn:
                    </Typography>
                    <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                        {formatDate(expiryDate)}
                    </Typography>
                </Box>

                {/* Vị trí công việc */}
                <Box display="flex" flexWrap="wrap">
                    <Work sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: isSmallScreen ? "100%" : "130px" }}>
                        Vị trí:
                    </Typography>
                    <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                        {jobPosition}
                    </Typography>
                </Box>

                {/* Ngành đào tạo */}
                <Box display="flex" flexWrap="wrap">
                    <School sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: isSmallScreen ? "100%" : "130px" }}>
                        Ngành đào tạo:
                    </Typography>
                    <Stack direction="column" spacing={1} flexWrap="wrap">
                        {majors.map((major, index) => (
                            <Chip key={index} label={majorLabels[major] || major} variant="outlined" />
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

JobDetailSummary.propTypes = {
    salary: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    remote: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
    jobPosition: PropTypes.string.isRequired,
    majors: PropTypes.array.isRequired,
};

export default JobDetailSummary;
