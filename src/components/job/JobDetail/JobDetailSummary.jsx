import PropTypes from "prop-types";
import { Box, Typography, Stack, Divider, Chip } from "@mui/material";
import { MonetizationOn, Group, WorkOutline, Schedule, CalendarToday, School, LocationOn } from "@mui/icons-material";
import { formatDate } from "../../../utils/dateUtil";

const JobDetailSummary = ({ salary, quantity, remote, type, createdDate, expiryDate, jobPosition, major }) => {
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
                <Box display="flex" alignItems="center">
                    <MonetizationOn sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: "130px" }}>
                        Mức lương:
                    </Typography>
                    <Typography variant="body1">{salary}</Typography>
                </Box>

                {/* Số lượng tuyển dụng */}
                <Box display="flex" alignItems="center">
                    <Group sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: "130px" }}>
                        Số lượng tuyển:
                    </Typography>
                    <Typography variant="body1">{quantity} người</Typography>
                </Box>

                {/* Hình thức làm việc */}
                <Box display="flex" alignItems="center">
                    <WorkOutline sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: "130px" }}>
                        Hình thức:
                    </Typography>
                    <Typography variant="body1">{remote}</Typography>
                </Box>

                {/* Thời gian làm việc */}
                <Box display="flex" alignItems="center">
                    <Schedule sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: "130px" }}>
                        Thời gian:
                    </Typography>
                    <Typography variant="body1">{type}</Typography>
                </Box>

                {/* Ngày đăng */}
                <Box display="flex" alignItems="center">
                    <CalendarToday sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: "130px" }}>
                        Ngày đăng:
                    </Typography>
                    <Typography variant="body1">{formatDate(createdDate)}</Typography>
                </Box>

                {/* Ngày hết hạn */}
                <Box display="flex" alignItems="center">
                    <CalendarToday sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: "130px" }}>
                        Ngày hết hạn:
                    </Typography>
                    <Typography variant="body1">{formatDate(expiryDate)}</Typography>
                </Box>

                {/* Vị trí công việc */}
                <Box display="flex">
                    <LocationOn sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: "130px" }}>
                        Vị trí:
                    </Typography>
                    <Typography variant="body1">{jobPosition}</Typography>
                </Box>

                {/* Ngành đào tạo */}
                <Box display="flex">
                    <School sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold" sx={{ minWidth: "130px" }}>
                        Ngành đào tạo:
                    </Typography>
                    <Stack direction="column" spacing={1} flexWrap="wrap">
                        {major.map((m, index) => (
                            <Chip key={index} label={m} variant="outlined" />
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
    createdDate: PropTypes.instanceOf(Date).isRequired,
    expiryDate: PropTypes.instanceOf(Date).isRequired,
    jobPosition: PropTypes.string.isRequired,
    major: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default JobDetailSummary;
