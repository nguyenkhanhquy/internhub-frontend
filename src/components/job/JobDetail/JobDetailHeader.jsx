import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, Typography, Avatar, Button, Stack, useMediaQuery } from "@mui/material";
import { Business, LocationOn, Work, CalendarToday } from "@mui/icons-material";

import { formatDate } from "../../../utils/dateUtil";
import { saveJobPost } from "../../../services/jobPostService";

const JobDetailHeader = ({
    id,
    logo,
    title,
    companyName,
    address,
    jobPosition,
    type,
    updateDate,
    expiryDate,
    saved,
    onApplyJob,
}) => {
    // Kiểm tra kích thước màn hình
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const isMediumScreen = useMediaQuery("(max-width: 960px)");

    // Xác định kích thước của các button và avatar
    const buttonFontSize = isSmallScreen ? "0.8rem" : isMediumScreen ? "0.9rem" : "1rem";
    const buttonPaddingY = isSmallScreen ? 0.4 : isMediumScreen ? 0.6 : 1;
    const avatarSize = isSmallScreen ? 80 : isMediumScreen ? 120 : 140;

    const [isSaved, setIsSaved] = useState(saved);

    const handleSaveJob = async () => {
        try {
            const data = await saveJobPost(id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setIsSaved((prev) => !prev);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: "white",
                p: 2,
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                mb: 3,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" flexWrap="wrap">
                <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, flexWrap: "wrap" }}>
                    <Avatar
                        src={logo}
                        alt={`${companyName} logo`}
                        variant="square"
                        sx={{
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: 2,
                        }}
                    />

                    <Box>
                        <Typography variant={isSmallScreen ? "h6" : "h5"} fontWeight="bold" sx={{ mb: 0.5 }}>
                            {title}
                        </Typography>

                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                            <Business fontSize="small" sx={{ color: "#555" }} />
                            <Typography variant="body1">
                                <strong>Công ty:</strong>
                                <span style={{ color: "#1976d2", fontWeight: 600 }}> {companyName}</span>
                            </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                            <LocationOn fontSize="small" sx={{ color: "#555" }} />
                            <Typography variant="subtitle2">
                                <strong>Nơi làm việc:</strong> {address}
                            </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                            <Work fontSize="small" sx={{ color: "#555" }} />
                            <Typography variant="body2">
                                <strong>Vị trí:</strong> {jobPosition} - {type}
                            </Typography>
                        </Stack>

                        <Typography variant="body2">
                            <CalendarToday fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
                            <strong>Cập nhật:</strong> {formatDate(updateDate)} - <strong>Hạn nộp:</strong>{" "}
                            {formatDate(expiryDate)}
                        </Typography>
                    </Box>
                </Stack>

                <Stack
                    direction={isSmallScreen ? "row" : "column"}
                    spacing={2}
                    sx={{ minWidth: isSmallScreen ? "80%" : 180, mt: isSmallScreen ? 2 : 0 }}
                >
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onApplyJob}
                        fullWidth={isSmallScreen}
                        sx={{
                            textTransform: "none",
                            fontSize: buttonFontSize,
                            fontWeight: "bold",
                            py: buttonPaddingY,
                        }}
                    >
                        Ứng tuyển ngay
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleSaveJob}
                        fullWidth={isSmallScreen}
                        sx={{
                            textTransform: "none",
                            fontSize: buttonFontSize,
                            fontWeight: "bold",
                            py: buttonPaddingY,
                        }}
                    >
                        {isSaved ? "Bỏ lưu công việc" : "Lưu công việc"}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

JobDetailHeader.propTypes = {
    id: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    jobPosition: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    updateDate: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
    saved: PropTypes.bool.isRequired,
    onApplyJob: PropTypes.func.isRequired,
};

export default JobDetailHeader;
