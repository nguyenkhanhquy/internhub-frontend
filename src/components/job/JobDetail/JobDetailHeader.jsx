import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import useAuth from "@hooks/useAuth";

import { Box, Typography, Avatar, Button, Stack, useMediaQuery } from "@mui/material";

import Business from "@mui/icons-material/Business";
import LocationOn from "@mui/icons-material/LocationOn";
import Work from "@mui/icons-material/Work";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Bookmark from "@mui/icons-material/Bookmark";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";

import { formatDate } from "@utils/dateUtil";
import { saveJobPost } from "@services/jobPostService";

const JobDetailHeader = ({
    id,
    logo,
    title,
    companyName,
    website,
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
    const isTabletScreen = useMediaQuery("(max-width: 900px)");

    // Xác định kích thước của các button và avatar
    const buttonFontSize = isSmallScreen ? "0.75rem" : isTabletScreen ? "0.85rem" : isMediumScreen ? "0.9rem" : "1rem";
    const buttonPaddingY = isSmallScreen ? 0.25 : isTabletScreen ? 0.4 : isMediumScreen ? 0.6 : 1;
    const avatarSize = isSmallScreen ? 40 : isTabletScreen ? 56 : isMediumScreen ? 100 : 140;

    const { isAuthenticated } = useAuth();
    const [isSaved, setIsSaved] = useState(saved);

    const handleSaveJob = async () => {
        try {
            if (!isAuthenticated) {
                toast.info("Vui lòng đăng nhập để lưu");
                return;
            }
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
                p: isSmallScreen ? 0.75 : isTabletScreen ? 1.2 : 2,
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                mb: 3,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: isSmallScreen ? 1 : isTabletScreen ? 1.2 : 2,
            }}
        >
            <Stack
                direction={isSmallScreen ? "column" : isTabletScreen ? "column" : "row"}
                spacing={isSmallScreen ? 1 : isTabletScreen ? 1.2 : 2}
                alignItems={isSmallScreen ? "flex-start" : isTabletScreen ? "flex-start" : "center"}
                justifyContent="space-between"
                flexWrap="wrap"
            >
                <Stack
                    direction="row"
                    spacing={isSmallScreen ? 1 : isTabletScreen ? 1.2 : 2}
                    alignItems={isSmallScreen ? "flex-start" : isTabletScreen ? "flex-start" : "center"}
                    sx={{ flex: 1, flexWrap: "wrap", width: "100%" }}
                >
                    <Avatar
                        src={logo}
                        alt={`${companyName} logo`}
                        variant="square"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        sx={{
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: 2,
                            mr: isSmallScreen ? 1.5 : isTabletScreen ? 1.2 : 2,
                            mb: isSmallScreen ? 1 : isTabletScreen ? 0.5 : 0,
                        }}
                    />

                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            variant={isSmallScreen ? "subtitle1" : isTabletScreen ? "h6" : "h5"}
                            fontWeight="bold"
                            sx={{
                                mb: isSmallScreen ? 0.25 : isTabletScreen ? 0.3 : 0.5,
                                wordBreak: "break-word",
                                fontSize: isSmallScreen ? "1.05rem" : isTabletScreen ? "1.15rem" : undefined,
                            }}
                        >
                            {title}
                        </Typography>

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mb: isSmallScreen ? 0.25 : 0.5, flexWrap: "wrap" }}
                        >
                            <Business fontSize="small" sx={{ color: "#555" }} />
                            <Typography variant="body1" sx={{ fontSize: isSmallScreen ? "0.85rem" : undefined }}>
                                <strong>Công ty: </strong>
                                <a
                                    href={website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#1976d2", fontWeight: 600, wordBreak: "break-all" }}
                                >
                                    {companyName}
                                </a>
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mb: isSmallScreen ? 0.25 : 0.5, flexWrap: "wrap" }}
                        >
                            <LocationOn fontSize="small" sx={{ color: "#555" }} />
                            <Typography variant="subtitle2" sx={{ fontSize: isSmallScreen ? "0.8rem" : undefined }}>
                                <strong>Địa chỉ làm việc:</strong> {address}
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mb: isSmallScreen ? 0.25 : 0.5, flexWrap: "wrap" }}
                        >
                            <Work fontSize="small" sx={{ color: "#555" }} />
                            <Typography variant="body2" sx={{ fontSize: isSmallScreen ? "0.8rem" : undefined }}>
                                <strong>Vị trí:</strong> {jobPosition} - <strong>Hình thức:</strong> {type}
                            </Typography>
                        </Stack>

                        <Typography variant="body2" sx={{ fontSize: isSmallScreen ? "0.8rem" : undefined }}>
                            <CalendarToday fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
                            <strong>Cập nhật:</strong> {formatDate(updateDate)} - <strong>Hạn nộp:</strong>{" "}
                            {formatDate(expiryDate)}
                        </Typography>
                    </Box>
                </Stack>

                <Stack
                    direction={isSmallScreen || isTabletScreen ? "row" : "column"}
                    spacing={isSmallScreen ? 0.5 : isTabletScreen ? 0.6 : 2}
                    sx={{
                        minWidth: isSmallScreen ? "100%" : isTabletScreen ? 0 : 200,
                        mt: isSmallScreen ? 1 : isTabletScreen ? 0.5 : 0,
                        width: isSmallScreen ? "100%" : isTabletScreen ? "100%" : undefined,
                        alignItems: isSmallScreen || isTabletScreen ? "flex-end" : "center",
                        justifyContent: isSmallScreen || isTabletScreen ? "flex-end" : undefined,
                        flex: isTabletScreen ? 1 : undefined,
                        gap: undefined,
                    }}
                >
                    {expiryDate >= new Date().toISOString() ? (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={onApplyJob}
                            fullWidth
                            sx={{
                                textTransform: "none",
                                fontSize: buttonFontSize,
                                fontWeight: "bold",
                                py: buttonPaddingY,
                                borderRadius: 1,
                                minWidth: isSmallScreen ? 0 : 140,
                            }}
                        >
                            Ứng tuyển ngay
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            disabled
                            fullWidth
                            sx={{
                                textTransform: "none",
                                fontSize: buttonFontSize,
                                fontWeight: "bold",
                                py: buttonPaddingY,
                                borderRadius: 1,
                                minWidth: isSmallScreen ? 0 : 140,
                            }}
                        >
                            Hết hạn ứng tuyển
                        </Button>
                    )}
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleSaveJob}
                        fullWidth
                        startIcon={isSaved ? <Bookmark /> : <BookmarkBorder />}
                        sx={{
                            textTransform: "none",
                            fontSize: buttonFontSize,
                            fontWeight: "bold",
                            py: buttonPaddingY,
                            borderRadius: 1,
                            minWidth: isSmallScreen ? 0 : 140,
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
    website: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    jobPosition: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    updateDate: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
    saved: PropTypes.bool.isRequired,
    onApplyJob: PropTypes.func.isRequired,
};

export default JobDetailHeader;
