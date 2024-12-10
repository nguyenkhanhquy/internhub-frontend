import { useState, useEffect } from "react";

import { Box, Typography, List, Button, Divider, Card, CardContent, Paper } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

import EmptyBox from "../../box/EmptyBox";

import { getAllNotificationsByUser, markNotificationAsRead } from "../../../services/notificationService";

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
        return createdAt.toLocaleString(); // Hiển thị định dạng ngày giờ thông thường
    }
};

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const fetchNotifications = async () => {
        const data = await getAllNotificationsByUser();

        const sortedNotifications = data.result.sort((a, b) => {
            if (a.read === b.read) {
                return new Date(b.createdDate) - new Date(a.createdDate);
            }
            return a.read ? 1 : -1;
        });

        setNotifications(sortedNotifications);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    // Xử lý khi chọn thông báo
    const handleNotificationClick = async (notification) => {
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
        setSelectedNotification(notification);
    };

    // Xử lý quay lại danh sách thông báo
    const handleBackToList = () => {
        setSelectedNotification(null);
    };

    return (
        <Box sx={{ p: 4 }}>
            <div className="flex items-center justify-between">
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
                </Typography>
                <Button onClick={fetchNotifications} variant="contained" color="primary">
                    Làm mới <CachedIcon className="ml-2" fontSize="small" />
                </Button>
            </div>
            {/* <Divider /> */}
            {/* Danh sách thông báo */}
            {selectedNotification === null ? (
                <Paper sx={{ p: 2, mb: 2 }}>
                    {notifications.length === 0 ? (
                        <EmptyBox />
                    ) : (
                        <List>
                            {notifications.map((notification) => (
                                <Box key={notification.id}>
                                    <Card
                                        onClick={() => handleNotificationClick(notification)}
                                        sx={{
                                            marginBottom: 0.5,
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                            backgroundColor: notification.read ? "white" : "#e3f2fd",
                                            "&:hover": {
                                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                                backgroundColor: notification.read ? "#f5f5f5" : "#bbdefb",
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            {/* Sử dụng Flexbox để căn tiêu đề và thời gian */}
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontWeight: notification.read ? "normal" : "bold",
                                                    }}
                                                >
                                                    {notification.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
                                                >
                                                    {formatRelativeTime(notification.createdDate)}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                    {/* <Divider /> */}
                                </Box>
                            ))}
                        </List>
                    )}
                </Paper>
            ) : (
                // Chi tiết thông báo
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        mb: 4,
                        borderRadius: 2,
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
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
                            paragraph
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
                            sx={{
                                mt: 2,
                                backgroundColor: "#1976d2",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "#1565c0",
                                },
                            }}
                            onClick={handleBackToList}
                        >
                            Quay lại
                        </Button>
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default NotificationPage;
