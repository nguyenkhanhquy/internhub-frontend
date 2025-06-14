import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "@hooks/useAuth";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import Bookmark from "@mui/icons-material/Bookmark";
import Business from "@mui/icons-material/Business";
import LocationOn from "@mui/icons-material/LocationOn";
import Work from "@mui/icons-material/Work";
import MonetizationOn from "@mui/icons-material/MonetizationOn";
import CalendarToday from "@mui/icons-material/CalendarToday";

import { formatDate } from "@utils/dateUtil";
import { saveJobPost } from "@services/jobPostService";

const JobCardSearch = ({
    id,
    logo,
    title,
    companyName,
    address,
    jobPosition,
    type,
    salary,
    updatedDate,
    expiryDate,
    saved,
}) => {
    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();
    const [isSaved, setIsSaved] = useState(saved);

    // Hàm xử lý sự kiện click để điều hướng đến /search/:id
    const handleCardClick = () => {
        navigate(`/search/${id}`);
    };

    // const handleCardClick = () => {
    //     window.open(`/search/${id}`, "_blank");
    // };

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

    useEffect(() => {
        setIsSaved(saved);
    }, [id, saved]);

    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: 2,
                p: 1.5,
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.15)",
                    borderColor: "#90caf9",
                    backgroundColor: "#f0f8ff",
                    cursor: "pointer",
                },
                border: "1px solid transparent",
            }}
            onClick={handleCardClick}
        >
            {/* Logo công ty */}
            <Box sx={{ width: { xs: 80, sm: 140, md: 160, lg: 180 }, mr: 2 }}>
                <Avatar
                    src={logo}
                    alt={`${companyName} logo`}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    variant="square"
                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
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
                        <IconButton
                            onClick={(event) => {
                                event.stopPropagation(); // Ngăn chặn sự kiện onClick lan truyền
                                handleSaveJob();
                            }}
                            aria-label="save job"
                        >
                            {isSaved ? <Bookmark color="primary" /> : <BookmarkBorder color="action" />}
                        </IconButton>
                    </Box>

                    {/* Thông tin công ty và địa chỉ */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Business fontSize="small" color="action" sx={{ color: "black" }} />
                        <Typography variant="subtitle2" color="textPrimary">
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

                    {/* Trợ cấp */}
                    {salary && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <MonetizationOn fontSize="small" color="action" sx={{ color: "black" }} />
                            <Typography variant="body2" color="textPrimary">
                                Trợ cấp: {salary}
                            </Typography>
                        </Stack>
                    )}

                    {/* Ngày cập nhật và hạn nộp */}
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" color="textSecondary">
                        <CalendarToday fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle", color: "black" }} />
                        Cập nhật: {formatDate(updatedDate)} - Hạn nộp: {formatDate(expiryDate)}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

JobCardSearch.propTypes = {
    id: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    jobPosition: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    salary: PropTypes.string,
    updatedDate: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
    saved: PropTypes.bool.isRequired,
};

export default JobCardSearch;
