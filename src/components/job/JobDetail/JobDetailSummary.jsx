import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

import MonetizationOn from "@mui/icons-material/MonetizationOn";
import Group from "@mui/icons-material/Group";
import Work from "@mui/icons-material/Work";
import WorkOutline from "@mui/icons-material/WorkOutline";
import Schedule from "@mui/icons-material/Schedule";
import CalendarToday from "@mui/icons-material/CalendarToday";
import School from "@mui/icons-material/School";

import { formatDate } from "@utils/dateUtil";

const majorLabels = {
    IT: "Công nghệ thông tin",
    DS: "Kỹ thuật dữ liệu",
    IS: "An toàn thông tin",
};

const JobDetailSummary = ({ salary, quantity, remote, type, createdDate, expiryDate, jobPosition, majors }) => {
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

            <Grid container spacing={2}>
                {/* Trợ cấp */}
                <Grid size={{ xs: 6, md: 12, lg: 6 }}>
                    <Box display="flex" alignItems="flex-start">
                        <MonetizationOn fontSize="medium" color="primary" sx={{ mr: 2, mt: 1.5 }} />
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1" sx={{ minWidth: "130px" }}>
                                Trợ cấp
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" sx={{ wordBreak: "break-word" }}>
                                {salary}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Số lượng tuyển dụng */}
                <Grid size={{ xs: 6, md: 12, lg: 6 }}>
                    <Box display="flex" alignItems="flex-start">
                        <Group fontSize="medium" color="primary" sx={{ mr: 1.5, mt: 1.5 }} />
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1" sx={{ minWidth: "130px" }}>
                                Số lượng tuyển
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" sx={{ wordBreak: "break-word" }}>
                                {quantity} người
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Hình thức làm việc */}
                <Grid size={{ xs: 6, md: 12, lg: 6 }}>
                    <Box display="flex" alignItems="flex-start">
                        <WorkOutline fontSize="medium" color="primary" sx={{ mr: 1.5, mt: 1.5 }} />
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1" sx={{ minWidth: "130px" }}>
                                Hình thức
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" sx={{ wordBreak: "break-word" }}>
                                {remote}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Loại hợp đồng */}
                <Grid size={{ xs: 6, md: 12, lg: 6 }}>
                    <Box display="flex" alignItems="flex-start">
                        <Schedule fontSize="medium" color="primary" sx={{ mr: 1.5, mt: 1.5 }} />
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1" sx={{ minWidth: "130px" }}>
                                Loại hợp đồng
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" sx={{ wordBreak: "break-word" }}>
                                {type}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Ngày đăng */}
                <Grid size={{ xs: 6, md: 12, lg: 6 }}>
                    <Box display="flex" alignItems="flex-start">
                        <CalendarToday fontSize="medium" color="primary" sx={{ mr: 1.5, mt: 1.5 }} />
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1" sx={{ minWidth: "130px" }}>
                                Ngày đăng
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" sx={{ wordBreak: "break-word" }}>
                                {formatDate(createdDate)}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Ngày hết hạn */}
                <Grid size={{ xs: 6, md: 12, lg: 6 }}>
                    <Box display="flex" alignItems="flex-start">
                        <CalendarToday fontSize="medium" color="primary" sx={{ mr: 1.5, mt: 1.5 }} />
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1" sx={{ minWidth: "130px" }}>
                                Ngày hết hạn
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" sx={{ wordBreak: "break-word" }}>
                                {formatDate(expiryDate)}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Vị trí công việc */}
                <Grid size={{ xs: 6, md: 12, lg: 6 }}>
                    <Box display="flex" alignItems="flex-start">
                        <Work fontSize="medium" color="primary" sx={{ mr: 1.5, mt: 1.5 }} />
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1" sx={{ minWidth: "130px" }}>
                                Vị trí
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" sx={{ wordBreak: "break-word" }}>
                                {jobPosition}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Ngành đào tạo */}
                <Grid size={{ xs: 6, md: 12, lg: 6 }}>
                    <Box display="flex" alignItems="flex-start">
                        <School fontSize="medium" color="primary" sx={{ mr: 1.5, mt: 1.5 }} />
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1" sx={{ minWidth: "130px" }}>
                                Ngành đào tạo
                            </Typography>
                            <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
                                {majors.map((major, index) => (
                                    <Chip
                                        key={index}
                                        label={majorLabels[major] || major}
                                        color="primary"
                                        variant="outlined"
                                        sx={{
                                            fontSize: "0.875rem",
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
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
