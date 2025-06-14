import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Fade from "@mui/material/Fade";
import Grow from "@mui/material/Grow";

import CachedIcon from "@mui/icons-material/Cached";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import EmptyBox from "@components/box/EmptyBox";
import DashboardSearchBar from "@components/search/DashboardSearchBar";

import { getAllNotificationsByUser, markNotificationAsRead } from "@services/notificationService";

// Component Skeleton cho notification item
const NotificationSkeleton = () => (
    <Card
        sx={{
            mb: 1,
            borderRadius: 2,
            backgroundColor: "#f8f9fa",
        }}
        elevation={1}
    >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box sx={{ flex: 1, mr: 2 }}>
                <Skeleton
                    variant="text"
                    width="80%"
                    height={24}
                    sx={{
                        backgroundColor: "#e0e0e0",
                        mb: 0.5,
                        "&::after": {
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                        },
                    }}
                />
                <Skeleton
                    variant="text"
                    width="95%"
                    height={16}
                    sx={{
                        backgroundColor: "#f0f0f0",
                    }}
                />
            </Box>
            <Skeleton
                variant="text"
                width={80}
                height={14}
                sx={{
                    ml: 2,
                    mt: 0.5,
                }}
            />
        </Box>
    </Card>
);

// Hàm định dạng thời gian tương đối
const formatRelativeTime = (createdDate) => {
    const now = new Date();
    const createdAt = new Date(createdDate);
    const diffInMs = now - createdAt;
    const diffInMinutes = Math.floor(diffInMs / 60000);

    if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
        const diffInHours = Math.floor(diffInMinutes / 60);
        return `${diffInHours} giờ trước`;
    } else {
        return createdAt.toLocaleString("vi-VN");
    }
};

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [animationKey, setAnimationKey] = useState(0);

    const fetchNotifications = async (isInitial = false) => {
        setLoading(true);
        if (!isInitial) {
            setSelectedNotification(null);
        }
        try {
            const data = await getAllNotificationsByUser();
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            const sortedNotifications = data.result.sort((a, b) => {
                if (a.read === b.read) {
                    return new Date(b.createdDate) - new Date(a.createdDate);
                }
                return a.read ? 1 : -1;
            });

            setNotifications(sortedNotifications);
            // Trigger animation lại sau khi fetch xong
            setAnimationKey((prev) => prev + 1);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            if (isInitial) {
                setInitialLoading(false);
            }
            setSearch("");
        }
    };

    useEffect(() => {
        fetchNotifications(true);
    }, []);

    // Xử lý khi chọn thông báo
    const handleNotificationClick = async (notification) => {
        setSelectedNotification(notification);
        if (!notification.read) {
            await markNotificationAsRead(notification.id);

            const updatedNotifications = notifications.map((n) =>
                n.id === notification.id ? { ...n, read: true } : n,
            );

            const sortedNotifications = updatedNotifications.sort((a, b) => {
                if (a.read === b.read) {
                    return new Date(b.createdDate) - new Date(a.createdDate);
                }
                return a.read ? 1 : -1;
            });

            setNotifications(sortedNotifications);
        }
    };

    // Xử lý quay lại danh sách thông báo
    const handleBackToList = () => {
        setSelectedNotification(null);
    };

    // Lọc thông báo dựa trên search query
    const filteredNotifications = notifications.filter((notification) => {
        if (!search.trim()) return true;

        const searchLower = search.toLowerCase().trim();
        const titleMatch = notification.title.toLowerCase().includes(searchLower);
        const contentMatch = notification.content.toLowerCase().includes(searchLower);

        return titleMatch || contentMatch;
    });

    return (
        <Box sx={{ p: 4 }}>
            <div className="mb-4 flex items-center justify-between">
                {/* Tiêu đề */}
                <Typography
                    variant="h5"
                    gutterBottom
                    color="primary"
                    sx={{
                        fontWeight: "bold",
                        fontSize: "2rem",
                        color: "linear-gradient(to right, #1976d2, #42a5f5)", // Gradient màu xanh
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Bóng chữ
                        letterSpacing: "0.05em", // Khoảng cách chữ nhẹ
                    }}
                >
                    Thông báo
                    {search.trim() && (
                        <Typography
                            component="span"
                            sx={{
                                ml: 2,
                                fontSize: "1rem",
                                color: "text.secondary",
                                fontWeight: "normal",
                            }}
                        >
                            ({filteredNotifications.length} kết quả)
                        </Typography>
                    )}
                </Typography>
                <Button
                    onClick={() => fetchNotifications(false)}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    startIcon={<CachedIcon className={`${loading ? "animate-spin" : ""}`} />}
                >
                    Làm mới
                </Button>
            </div>

            <div className="sticky top-2 z-10 mb-4">
                <DashboardSearchBar
                    onSearch={(searchText) => setSearch(searchText)}
                    query={search}
                    placeholder="Tìm kiếm thông báo..."
                />
            </div>

            {/* Danh sách thông báo */}
            {selectedNotification === null ? (
                <Paper sx={{ p: 2, borderRadius: 2 }} elevation={3}>
                    {initialLoading ? (
                        // Skeleton loading cho lần đầu load
                        <Box>
                            {[...Array(5)].map((_, index) => (
                                <NotificationSkeleton key={index} />
                            ))}
                        </Box>
                    ) : filteredNotifications.length === 0 ? (
                        <Fade in={true}>
                            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                                {search.trim() ? (
                                    <Box sx={{ textAlign: "center" }}>
                                        <Typography variant="h6" color="text.secondary" gutterBottom>
                                            Không tìm thấy kết quả
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Không có thông báo nào phù hợp với từ khóa &ldquo;{search}&rdquo;
                                        </Typography>
                                    </Box>
                                ) : (
                                    <EmptyBox />
                                )}
                            </Box>
                        </Fade>
                    ) : (
                        <Box
                            key={animationKey}
                            sx={{
                                opacity: loading ? 0.5 : 1,
                                pointerEvents: loading ? "none" : "auto",
                                transition: "opacity 0.3s ease",
                            }}
                        >
                            {filteredNotifications.map((notification, index) => (
                                <Grow key={notification.id} in={true} timeout={300 + index * 100}>
                                    <Box>
                                        <Card
                                            onClick={() => handleNotificationClick(notification)}
                                            sx={{
                                                mb: 1,
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                                backgroundColor: notification.read ? "white" : "#e3f2fd",
                                                "&:hover": {
                                                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                                                    backgroundColor: notification.read ? "#f5f5f5" : "#bbdefb",
                                                    transform: "translateY(-2px)",
                                                },
                                                borderRadius: 2,
                                                borderLeft: notification.read
                                                    ? "4px solid transparent"
                                                    : "4px solid #1976d2",
                                            }}
                                            elevation={2}
                                        >
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "flex-start",
                                                }}
                                            >
                                                <Box sx={{ flex: 1, mr: 2 }}>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            fontWeight: notification.read ? "normal" : "bold",
                                                            color: notification.read ? "text.primary" : "#1976d2",
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        {notification.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: "text.secondary",
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 1,
                                                            WebkitBoxOrient: "vertical",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            lineHeight: 1.4,
                                                            fontSize: "0.875rem",
                                                        }}
                                                    >
                                                        {notification.content}
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: "text.secondary",
                                                        whiteSpace: "nowrap",
                                                        fontSize: "0.825rem",
                                                        mt: 0.5,
                                                    }}
                                                >
                                                    {formatRelativeTime(notification.createdDate)}
                                                </Typography>
                                            </Box>
                                        </Card>
                                    </Box>
                                </Grow>
                            ))}
                        </Box>
                    )}
                </Paper>
            ) : (
                // Chi tiết thông báo
                <Fade in={true} timeout={500}>
                    <Paper
                        sx={{
                            p: 4,
                            mb: 4,
                            borderRadius: 2,
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        }}
                        elevation={3}
                    >
                        <Box>
                            {/* Tiêu đề thông báo */}
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                    fontWeight: "bold",
                                    color: "#1565c0",
                                }}
                            >
                                {selectedNotification.title}
                            </Typography>

                            {/* Thời gian tạo thông báo */}
                            <Typography
                                sx={{
                                    fontStyle: "italic",
                                    color: "text.secondary",
                                    mb: 2,
                                }}
                            >
                                {formatRelativeTime(selectedNotification.createdDate)}
                            </Typography>

                            {/* Nội dung thông báo */}
                            <Typography
                                sx={{
                                    lineHeight: 1.7,
                                    fontSize: "1rem",
                                    color: "text.primary",
                                }}
                            >
                                {selectedNotification.content}
                            </Typography>

                            {/* Nút quay lại */}
                            <Button
                                variant="contained"
                                startIcon={<ArrowBackIcon />}
                                sx={{
                                    mt: 2,
                                    backgroundColor: "#1976d2",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "#1565c0",
                                        transform: "translateY(-1px)",
                                        boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
                                    },
                                    transition: "all 0.3s ease",
                                }}
                                onClick={handleBackToList}
                            >
                                Quay lại
                            </Button>
                        </Box>
                    </Paper>
                </Fade>
            )}
        </Box>
    );
};

export default NotificationPage;
