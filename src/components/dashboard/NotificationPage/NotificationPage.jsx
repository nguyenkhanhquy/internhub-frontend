import { useState } from "react";
import { Box, Typography, List, Button, Divider, Card, CardContent, Paper } from "@mui/material";

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

// Dữ liệu mẫu thông báo
const sampleNotifications = [
    {
        id: 1,
        title: "Hệ thống sẽ được bảo trì vào tối nay từ 22:00 đến 24:00",
        content: "Hệ thống sẽ được bảo trì vào tối nay từ 22:00 đến 24:00.",
        createdDate: "2024-12-06T08:00:00",
        isRead: false,
    },
    {
        id: 2,
        title: "Kế hoạch đào tạo",
        content: "Kế hoạch đào tạo học kỳ mới đã được công bố trên cổng thông tin.",
        createdDate: "2024-12-05T14:00:00",
        isRead: true,
    },
    {
        id: 3,
        title: "Thời gian đăng ký học phần",
        content: "Thời gian đăng ký học phần sẽ bắt đầu từ ngày 10/12/2024.",
        createdDate: "2024-12-04T09:30:00",
        isRead: false,
    },
    {
        id: 4,
        title: "Thời gian đăng ký học phần",
        content: "Thời gian đăng ký học phần sẽ bắt đầu từ ngày 10/12/2024.",
        createdDate: "2024-12-04T09:30:00",
        isRead: false,
    },
    {
        id: 5,
        title: "Thời gian đăng ký học phần",
        content: "Thời gian đăng ký học phần sẽ bắt đầu từ ngày 10/12/2024.",
        createdDate: "2024-12-04T09:30:00",
        isRead: false,
    },
    {
        id: 6,
        title: "Thời gian đăng ký học phần",
        content: "Thời gian đăng ký học phần sẽ bắt đầu từ ngày 10/12/2024.",
        createdDate: "2024-12-04T09:30:00",
        isRead: false,
    },
    {
        id: 7,
        title: "Thời gian đăng ký học phần",
        content: "Thời gian đăng ký học phần sẽ bắt đầu từ ngày 10/12/2024.",
        createdDate: "2024-12-04T09:30:00",
        isRead: false,
    },
    {
        id: 8,
        title: "Thời gian đăng ký học phần",
        content: "Thời gian đăng ký học phần sẽ bắt đầu từ ngày 10/12/2024.",
        createdDate: "2024-12-04T09:30:00",
        isRead: false,
    },
    {
        id: 9,
        title: "Thời gian đăng ký học phần",
        content: "Thời gian đăng ký học phần sẽ bắt đầu từ ngày 10/12/2024.",
        createdDate: "2024-12-04T09:30:00",
        isRead: false,
    },
];

const NotificationPage = () => {
    const [notifications, setNotifications] = useState(sampleNotifications);
    const [selectedNotification, setSelectedNotification] = useState(null);

    // Xử lý khi chọn thông báo
    const handleNotificationClick = (notification) => {
        setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)));
        setSelectedNotification(notification);
    };

    // Xử lý quay lại danh sách thông báo
    const handleBackToList = () => {
        setSelectedNotification(null);
    };

    return (
        <Box sx={{ p: 4 }}>
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
            <Divider />`{/* Danh sách thông báo */}
            {selectedNotification === null ? (
                <Paper sx={{ p: 2, mb: 2 }}>
                    <List>
                        {notifications.map((notification) => (
                            <Box key={notification.id}>
                                <Card
                                    onClick={() => handleNotificationClick(notification)}
                                    sx={{
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        backgroundColor: notification.isRead ? "white" : "#e3f2fd",
                                        "&:hover": {
                                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                            backgroundColor: notification.isRead ? "#f5f5f5" : "#bbdefb",
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
                                                    fontWeight: notification.isRead ? "normal" : "bold",
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
                                <Divider />
                            </Box>
                        ))}
                    </List>
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
