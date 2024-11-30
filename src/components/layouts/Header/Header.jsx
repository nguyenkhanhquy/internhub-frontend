import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import {
    Typography,
    Box,
    Button,
    Menu,
    MenuItem,
    Paper,
    List,
    ListItemText,
    ListItem,
    Divider,
    CircularProgress,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import SchoolIcon from "@mui/icons-material/School";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge"; // Nhập Badge

import logoImage from "/images/hcmute_fit_logo.png";
import NotificationModal from "../../modals/NotificationModal/NotfificationModal";

const mockNotifications = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Bạn đã bị từ chối vì CV quá xấu ${i + 1}`,
    content: `Nội dung thông báo`,
    isRead: i % 3 !== 0,
    createTime: new Date(Date.now() - i * 3200000).toISOString(),
}));

const formatRelativeTime = (createTime) => {
    const now = new Date();
    const createdAt = new Date(createTime);
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

const Header = () => {
    const { user, isAuthenticated } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);
    const [accountAnchorEl, setAccountAnchorEl] = useState(null);

    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [visibleNotifications, setVisibleNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const ITEMS_PER_PAGE = 5;

    useEffect(() => {
        setNotifications(
            mockNotifications.sort((a, b) => {
                if (a.isRead === b.isRead) {
                    return new Date(b.createTime) - new Date(a.createTime);
                }
                return a.isRead ? 1 : -1; // Đưa thông báo chưa đọc lên đầu
            }),
        );
        setVisibleNotifications(
            mockNotifications
                .sort((a, b) => {
                    if (a.isRead === b.isRead) {
                        return new Date(b.createTime) - new Date(a.createTime);
                    }
                    return a.isRead ? 1 : -1;
                })
                .slice(0, ITEMS_PER_PAGE),
        );
    }, []);

    const handleNotificationClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            const nextPage = page + 1;
            const newVisibleNotifications = notifications.slice(0, nextPage * ITEMS_PER_PAGE);
            setVisibleNotifications(newVisibleNotifications);
            setPage(nextPage);
            setLoading(false);
        }, 1000);
    };

    const markAsRead = (id) => {
        const updatedNotifications = notifications.map((notification) =>
            notification.id === id ? { ...notification, isRead: true } : notification,
        );

        setNotifications(
            updatedNotifications.sort((a, b) => {
                if (a.isRead === b.isRead) {
                    return new Date(b.createTime) - new Date(a.createTime);
                }
                return a.isRead ? 1 : -1;
            }),
        );

        setVisibleNotifications(() => updatedNotifications.slice(0, page * ITEMS_PER_PAGE));
    };

    const handleSignUpClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAccountClick = (event) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAccountAnchorEl(null);
        setNotificationAnchorEl(null);
    };

    const handleSelectNotification = (notification) => {
        setSelectedNotification(notification);
    };

    const handleCloseModal = () => {
        setSelectedNotification(null);
    };

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    paddingY: 2,
                    boxShadow: 1,
                    backgroundColor: "white",
                    borderRadius: 0,
                    overflowX: "hidden",
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        maxWidth: "1400px",
                        margin: "0 auto",
                        paddingX: 3,
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Link to="/">
                        <Box component="img" src={logoImage} alt="Logo" sx={{ width: { xs: "280px", md: "380px" } }} />
                    </Link>

                    <Box component="nav" sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<InfoIcon />}
                            sx={{
                                padding: "8px 10px",
                                color: "white",
                                "&:hover": { backgroundColor: "#a92a21" },
                            }}
                        >
                            HSSD
                        </Button>

                        {isAuthenticated ? (
                            <>
                                {/* Thông báo  */}
                                <Button
                                    variant="outlined"
                                    onClick={handleNotificationClick}
                                    sx={{
                                        marginLeft: 1,
                                        color: "#2e3090",
                                        borderColor: "#d9d9d9",
                                        boxShadow: "0 2px #00000004",
                                        "&:hover": { borderColor: "#2e3090" },
                                    }}
                                >
                                    <Badge
                                        badgeContent={
                                            notifications.filter((notification) => !notification.isRead).length
                                        } // Đếm số lượng thông báo chưa đọc
                                        color="error" // Màu sắc của badge
                                        sx={{ right: -40, top: -20 }} // Vị trí của badge
                                    ></Badge>
                                    <NotificationsIcon />
                                </Button>

                                <Menu
                                    className="mt-1"
                                    anchorEl={notificationAnchorEl}
                                    open={Boolean(notificationAnchorEl)}
                                    onClose={handleClose}
                                    PaperProps={{
                                        elevation: 3,
                                        sx: {
                                            width: 360,
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: "#f7f9fc",
                                            borderBottom: "1px solid #e0e0e0",
                                            padding: "8px 16px",
                                        }}
                                    >
                                        <Typography variant="h6" fontSize="1.1rem" color="#2e3090" fontWeight="bold">
                                            Thông Báo
                                        </Typography>
                                    </Box>

                                    <List sx={{ maxHeight: 300, overflowY: "auto", padding: 0 }}>
                                        {visibleNotifications.map((notification) => (
                                            <div key={notification.id}>
                                                <ListItem
                                                    sx={{
                                                        alignItems: "flex-start",
                                                        backgroundColor: notification.isRead ? "#ffffff" : "#f0f8ff",
                                                        "&:hover": { backgroundColor: "#eaf4fe" },
                                                        paddingX: 2,
                                                        paddingY: 1.5,
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        handleSelectNotification(notification);
                                                        markAsRead(notification.id);
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    fontWeight: notification.isRead ? "400" : "600",
                                                                    color: "#333",
                                                                }}
                                                            >
                                                                {notification.title}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Typography variant="caption" color="#888">
                                                                {formatRelativeTime(notification.createTime)}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider />
                                            </div>
                                        ))}
                                        {loading && (
                                            <Box display="flex" justifyContent="center" sx={{ padding: 2 }}>
                                                <CircularProgress size={24} />
                                            </Box>
                                        )}
                                        {!loading && visibleNotifications.length < notifications.length && (
                                            <Button
                                                onClick={handleLoadMore}
                                                sx={{
                                                    display: "block",
                                                    margin: "8px auto",
                                                    color: "#2e3090",
                                                    fontWeight: "bold",
                                                    "&:hover": { backgroundColor: "#eaf4fe" },
                                                }}
                                            >
                                                Xem thêm
                                            </Button>
                                        )}
                                    </List>
                                </Menu>

                                {/* Nút Tài khoản */}
                                <Button
                                    variant="outlined"
                                    startIcon={(() => {
                                        switch (user?.role) {
                                            case "STUDENT":
                                                return <SchoolIcon />;
                                            case "RECRUITER":
                                                return <PersonSearchIcon />;
                                            default:
                                                return <AccountCircleIcon />;
                                        }
                                    })()}
                                    onClick={handleAccountClick}
                                    sx={{
                                        marginLeft: 1,
                                        padding: "8px 10px",
                                        color: "#2e3090",
                                        borderColor: "#d9d9d9",
                                        boxShadow: "0 2px #00000004",
                                        "&:hover": { borderColor: "#2e3090" },
                                    }}
                                >
                                    {(() => {
                                        switch (user?.role) {
                                            case "STUDENT":
                                                return <>Sinh Viên</>;
                                            case "RECRUITER":
                                                return <>Nhà tuyển dụng</>;
                                            default:
                                                return <>Tài khoản</>;
                                        }
                                    })()}
                                </Button>

                                <Menu
                                    className="mt-1"
                                    anchorEl={accountAnchorEl}
                                    open={Boolean(accountAnchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose} component={Link} to="/search">
                                        <WorkIcon sx={{ marginRight: 1 }} />
                                        Việc làm
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} to="/account">
                                        <AccountCircleIcon sx={{ marginRight: 1 }} />
                                        Tài khoản
                                    </MenuItem>

                                    <MenuItem
                                        onClick={handleClose}
                                        component={Link}
                                        to={(() => {
                                            switch (user?.role) {
                                                case "STUDENT":
                                                    return "/student";
                                                case "RECRUITER":
                                                    return "/recruiter";
                                                default:
                                                    return "/";
                                            }
                                        })()}
                                    >
                                        <DataUsageIcon sx={{ marginRight: 1 }} />
                                        Dữ liệu của tôi
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} to="/logout">
                                        <LogoutIcon sx={{ marginRight: 1 }} />
                                        Đăng xuất
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outlined"
                                    startIcon={<PersonAddIcon />}
                                    onClick={handleSignUpClick}
                                    sx={{
                                        margin: "0 8px",
                                        padding: "8px 10px",
                                        color: "#2e3090",
                                        borderColor: "#d9d9d9",
                                        boxShadow: "0 2px #00000004",
                                        "&:hover": { borderColor: "#2e3090" },
                                    }}
                                >
                                    Đăng ký
                                </Button>

                                <Menu
                                    className="mt-1"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose} component={Link} to="/register-student">
                                        <SchoolIcon sx={{ marginRight: 1 }} />
                                        Thực tập sinh
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} to="/register-recruiter">
                                        <PersonSearchIcon sx={{ marginRight: 1 }} />
                                        Nhà tuyển dụng
                                    </MenuItem>
                                </Menu>

                                <Button
                                    variant="contained"
                                    component={Link}
                                    to="/login"
                                    startIcon={<LoginIcon />}
                                    sx={{
                                        padding: "8px 10px",
                                        backgroundColor: "#2e3090",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#1f2061" },
                                    }}
                                >
                                    Đăng nhập
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </Paper>
            {/* Modal hiển thị chi tiết thông báo */}
            <NotificationModal
                open={Boolean(selectedNotification)}
                onClose={handleCloseModal}
                notification={selectedNotification}
            />
        </>
    );
};

export default Header;
