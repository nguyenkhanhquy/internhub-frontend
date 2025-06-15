import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import useAuth from "@hooks/useAuth";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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
                p: { xs: 0.75, sm: 1.2, md: 2 },
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                mb: { xs: 2, sm: 2.5, md: 3 },
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1, sm: 1.2, md: 2 },
            }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1, sm: 1.2, md: 2 }}
                alignItems={{ xs: "flex-start", md: "center" }}
                justifyContent="space-between"
                flexWrap="wrap"
            >
                <Stack
                    direction="row"
                    spacing={{ xs: 1, sm: 1.2, md: 2 }}
                    alignItems={{ xs: "flex-start", md: "center" }}
                    sx={{ flex: 1, flexWrap: "wrap", width: "100%" }}
                >
                    <Avatar
                        src={logo}
                        alt={`${companyName} logo`}
                        variant="square"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        sx={{
                            width: { xs: 80, sm: 100, md: 120 },
                            height: { xs: 80, sm: 100, md: 120 },
                            borderRadius: 2,
                            mr: { xs: 1.5, sm: 1.2, md: 2 },
                            mb: { xs: 1, sm: 0.5, md: 0 },
                        }}
                    />

                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            fontWeight="bold"
                            sx={{
                                mb: { xs: 0.25, sm: 0.3, md: 0.5 },
                                wordBreak: "break-word",
                                fontSize: {
                                    xs: "1.05rem",
                                    sm: "1.15rem",
                                    md: "1.25rem",
                                },
                            }}
                        >
                            {title}
                        </Typography>

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mb: { xs: 0.25, sm: 0.5 }, flexWrap: "wrap" }}
                        >
                            <Business fontSize="small" sx={{ color: "#555" }} />

                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: "0.85rem", sm: "1rem" },
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{ display: { xs: "none", md: "inline" }, fontWeight: 600, mr: 0.5 }}
                                >
                                    Công ty:
                                </Box>
                                <a
                                    href={website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#1976d2", fontWeight: 600, wordBreak: "break-word" }}
                                >
                                    {companyName}
                                </a>
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mb: { xs: 0.25, sm: 0.5 }, flexWrap: "wrap" }}
                        >
                            <LocationOn fontSize="small" sx={{ color: "#555" }} />
                            <Typography variant="subtitle2" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                                <Box
                                    component="span"
                                    sx={{ display: { xs: "none", md: "inline" }, fontWeight: 600, mr: 0.5 }}
                                >
                                    Địa chỉ làm việc:
                                </Box>
                                {address}
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mb: { xs: 0.25, sm: 0.5 }, flexWrap: "wrap" }}
                        >
                            <Work fontSize="small" sx={{ color: "#555" }} />
                            <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                                <Box
                                    component="span"
                                    sx={{ display: { xs: "none", md: "inline" }, fontWeight: 600, mr: 0.5 }}
                                >
                                    Vị trí:
                                </Box>
                                {jobPosition} -{" "}
                                <Box
                                    component="span"
                                    sx={{ display: { xs: "none", md: "inline" }, fontWeight: 600, mr: 0.5 }}
                                >
                                    Hình thức:
                                </Box>
                                {type}
                            </Typography>
                        </Stack>

                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: { xs: "0.8rem", sm: "1rem" },
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <CalendarToday fontSize="small" sx={{ mr: 0.5, color: "#555" }} />

                            <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>
                                <Box component="span" sx={{ fontWeight: 600, mr: 0.5 }}>
                                    Cập nhật:
                                </Box>
                                {formatDate(updateDate)}
                                {" - "}

                                <Box component="span" sx={{ fontWeight: 600, mr: 0.5 }}>
                                    Hạn nộp:
                                </Box>
                            </Box>
                            {formatDate(expiryDate)}

                            {expiryDate >= new Date().toISOString() && (
                                <Box component="span" sx={{ ml: 0.5 }}>
                                    {"("}Còn lại{" "}
                                    <Box component="span" sx={{ fontWeight: 600 }}>
                                        {Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} ngày
                                    </Box>
                                    {")"}
                                </Box>
                            )}
                        </Typography>
                    </Box>
                </Stack>

                <Stack
                    direction={{ xs: "row", md: "column" }}
                    spacing={{ xs: 0.5, md: 2 }}
                    sx={{
                        minWidth: { xs: "100%", sm: 200 },
                        mt: { sx: 1, sm: 0.5, md: 0 },
                        width: { sm: "100%", md: 200 },
                        alignItems: { xs: "flex-end", md: "center" },
                        justifyContent: { xs: "flex-end", md: "center" },
                        flex: { sm: 1, md: 0 },
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
                                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                                fontWeight: "bold",
                                py: { xs: 0.8, sm: 0.9, md: 1 },
                                borderRadius: 1,
                                minWidth: { xs: 0, sm: 140 },
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
                                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                                fontWeight: "bold",
                                py: { xs: 0.8, sm: 0.9, md: 1 },
                                borderRadius: 1,
                                minWidth: { xs: 0, sm: 140 },
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
                            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                            fontWeight: "bold",
                            py: { xs: 0.8, sm: 0.9, md: 1 },
                            borderRadius: 1,
                            minWidth: { xs: 0, sm: 140 },
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
