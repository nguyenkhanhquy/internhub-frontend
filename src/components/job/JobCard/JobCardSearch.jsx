import { Card, CardContent, Typography, Box, IconButton, Avatar, Divider, Stack } from "@mui/material";
import {
    BookmarkBorder,
    Bookmark,
    Business,
    LocationOn,
    Work,
    MonetizationOn,
    CalendarToday,
} from "@mui/icons-material";
import { formatDate } from "../../../utils/dateUtil";
import PropTypes from "prop-types";

const JobCardSearch = ({
    logo,
    title,
    companyName,
    address,
    jobPosition,
    type,
    salary,
    updateDate,
    expiryDate,
    saved,
    onToggleSave,
}) => {
    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: 2,
                p: 2,
                maxWidth: 800,
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.15)",
                    borderColor: "#90caf9",
                    backgroundColor: "#f0f8ff", // Màu xanh nhạt hơn
                },
                border: "1px solid transparent",
            }}
        >
            {/* Logo công ty */}
            <Box sx={{ width: 200, mr: 2 }}>
                <Avatar
                    src={logo}
                    alt={`${companyName} logo`}
                    variant="square"
                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 1 }}
                />
            </Box>

            {/* Nội dung công việc */}
            <Box sx={{ flex: 1 }}>
                <CardContent sx={{ p: 0 }}>
                    {/* Tiêu đề công việc và nút lưu */}
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1.2rem", color: "#1976d2" }}>
                            {title}
                        </Typography>
                        <IconButton onClick={onToggleSave} aria-label="save job">
                            {saved ? <Bookmark color="primary" /> : <BookmarkBorder color="action" />}
                        </IconButton>
                    </Box>

                    {/* Thông tin công ty và địa chỉ */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Business fontSize="small" color="action" sx={{ color: "black" }} />
                        <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                            Công ty: {companyName}
                        </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <LocationOn fontSize="small" color="action" sx={{ color: "black" }} />
                        <Typography variant="subtitle2" color="textPrimary">
                            Nơi làm việc: {address}
                        </Typography>
                    </Stack>

                    {/* Vị trí và kiểu công việc */}
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Work fontSize="small" color="action" sx={{ color: "black" }} />
                        <Typography variant="body2" color="textPrimary">
                            Vị trí: {jobPosition} - {type}
                        </Typography>
                    </Stack>

                    {/* Lương */}
                    {salary && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <MonetizationOn fontSize="small" color="action" sx={{ color: "black" }} />
                            <Typography variant="body2" color="textPrimary">
                                Lương: {salary}
                            </Typography>
                        </Stack>
                    )}

                    {/* Ngày cập nhật và hạn nộp */}
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" color="textSecondary">
                        <CalendarToday fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle", color: "black" }} />
                        Cập nhật: {formatDate(updateDate)} - Hạn: {formatDate(expiryDate)}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

JobCardSearch.propTypes = {
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    jobPosition: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    salary: PropTypes.string,
    updateDate: PropTypes.instanceOf(Date).isRequired,
    expiryDate: PropTypes.instanceOf(Date).isRequired,
    saved: PropTypes.bool.isRequired,
    onToggleSave: PropTypes.func.isRequired,
};

export default JobCardSearch;
