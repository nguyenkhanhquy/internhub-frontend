import { useState, useEffect } from "react";
import {
    Button,
    Menu,
    List,
    ListItemText,
    ListItem,
    Divider,
    CircularProgress,
    TextField,
    InputAdornment,
    Typography,
    Box,
    Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

import NotificationModal from "@components/modals/NotificationModal/NotfificationModal";
import EmptyBox from "@components/box/EmptyBox";

import { getAllNotificationsByUser, markNotificationAsRead } from "@services/notificationService";

import { useDispatch, useSelector } from "react-redux";
import { selectNotifications, setNotifications as setNotificationsRedux } from "@store/slices/notificationSlice";

import useAuth from "@hooks/useAuth";

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

const ITEMS_PER_PAGE = 5;

const Notification = () => {
    const dispatch = useDispatch();
    const notificationsRedux = useSelector(selectNotifications);
    const { isAuthenticated } = useAuth();

    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState(notificationsRedux ?? []);
    const [visibleNotifications, setVisibleNotifications] = useState(
        (notificationsRedux ?? []).slice(0, ITEMS_PER_PAGE),
    );
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchNotifications = async () => {
            const data = await getAllNotificationsByUser();

            const sortedNotifications = data.result.sort((a, b) => {
                if (a.read === b.read) {
                    return new Date(b.createdDate) - new Date(a.createdDate);
                }
                return a.read ? 1 : -1;
            });

            setNotifications(sortedNotifications);
            dispatch(setNotificationsRedux(sortedNotifications));
            setVisibleNotifications(sortedNotifications.slice(0, ITEMS_PER_PAGE));
        };

        if (!notificationsRedux) {
            fetchNotifications();
        }
    }, [isAuthenticated, notificationsRedux, dispatch]);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setVisibleNotifications(notifications.slice(0, page * ITEMS_PER_PAGE));
        } else {
            const filteredNotifications = notifications.filter(
                (notification) =>
                    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (notification.content && notification.content.toLowerCase().includes(searchQuery.toLowerCase())),
            );
            setVisibleNotifications(filteredNotifications.slice(0, page * ITEMS_PER_PAGE));
        }
    }, [searchQuery, notifications, page]);

    const handleNotificationClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            const nextPage = page + 1;
            let newVisibleNotifications;

            if (searchQuery.trim() === "") {
                newVisibleNotifications = notifications.slice(0, nextPage * ITEMS_PER_PAGE);
            } else {
                const filteredNotifications = notifications.filter(
                    (notification) =>
                        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (notification.content &&
                            notification.content.toLowerCase().includes(searchQuery.toLowerCase())),
                );
                newVisibleNotifications = filteredNotifications.slice(0, nextPage * ITEMS_PER_PAGE);
            }

            setVisibleNotifications(newVisibleNotifications);
            setPage(nextPage);
            setLoading(false);
        }, 1000);
    };

    const markAsRead = async (id) => {
        const notification = notifications.find((n) => n.id === id);

        if (notification && !notification.read) {
            await markNotificationAsRead(id);

            const updatedNotifications = notifications.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification,
            );

            const sortedNotifications = updatedNotifications.sort((a, b) => {
                if (a.read === b.read) {
                    return new Date(b.createdDate) - new Date(a.createdDate);
                }
                return a.read ? 1 : -1;
            });

            setNotifications(sortedNotifications);
            dispatch(setNotificationsRedux(sortedNotifications));

            if (searchQuery.trim() === "") {
                setVisibleNotifications(sortedNotifications.slice(0, page * ITEMS_PER_PAGE));
            } else {
                const filteredNotifications = sortedNotifications.filter(
                    (notification) =>
                        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (notification.content &&
                            notification.content.toLowerCase().includes(searchQuery.toLowerCase())),
                );
                setVisibleNotifications(filteredNotifications.slice(0, page * ITEMS_PER_PAGE));
            }
        }
    };

    const handleClose = () => {
        setNotificationAnchorEl(null);
        setSearchQuery("");
        setPage(1);
    };

    const handleSelectNotification = (notification) => {
        setSelectedNotification(notification);
    };

    const handleCloseModal = () => {
        setSelectedNotification(null);
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            {/* Nút thông báo */}
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
                    badgeContent={notifications.filter((notification) => !notification.read).length}
                    color="error"
                    sx={{ right: -40, top: -20 }}
                ></Badge>
                <NotificationsIcon />
            </Button>

            {/* Menu thông báo */}
            <Menu
                sx={{
                    marginTop: 0.5,
                }}
                anchorEl={notificationAnchorEl}
                open={Boolean(notificationAnchorEl)}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 4,
                        sx: {
                            width: 400,
                            borderRadius: 2,
                            overflow: "hidden",
                        },
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
                    <Typography
                        variant="h6"
                        fontSize="1.1rem"
                        color="#2e3090"
                        fontWeight="bold"
                        tabIndex={-1}
                        sx={{ outline: "none" }}
                    >
                        Thông báo
                    </Typography>
                </Box>

                {/* Ô tìm kiếm */}
                <Box sx={{ padding: "8px 16px", borderBottom: "1px solid #e0e0e0" }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Tìm kiếm thông báo..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                        }}
                        onKeyDown={(e) => {
                            e.stopPropagation();
                        }}
                        slotProps={{
                            htmlInput: {
                                maxLength: 50,
                            },
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "#888" }} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "20px",
                                backgroundColor: "#fff",
                                "&:hover fieldset": {
                                    borderColor: "#2e3090",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#2e3090",
                                },
                            },
                        }}
                    />
                </Box>

                <List sx={{ maxHeight: 500, overflowY: "auto", padding: 0 }}>
                    {visibleNotifications.length === 0 ? (
                        searchQuery.trim() !== "" ? (
                            <Box sx={{ padding: 3, textAlign: "center" }}>
                                <Typography variant="body2" color="#888">
                                    Không tìm thấy thông báo nào với từ khóa &ldquo;{searchQuery}&rdquo;
                                </Typography>
                            </Box>
                        ) : (
                            <EmptyBox />
                        )
                    ) : (
                        visibleNotifications.map((notification) => (
                            <div key={notification.id}>
                                <ListItem
                                    sx={{
                                        alignItems: "flex-start",
                                        backgroundColor: notification.read ? "#ffffff" : "#f0f8ff",
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
                                                    fontWeight: notification.read ? "400" : "600",
                                                    color: "#333",
                                                }}
                                            >
                                                {notification.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="caption" color="#888">
                                                {formatRelativeTime(notification.createdDate)}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                            </div>
                        ))
                    )}
                    {loading && (
                        <Box display="flex" justifyContent="center" sx={{ padding: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    )}
                    {!loading &&
                        visibleNotifications.length <
                            (searchQuery.trim() === ""
                                ? notifications.length
                                : notifications.filter(
                                      (notification) =>
                                          notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                          (notification.content &&
                                              notification.content.toLowerCase().includes(searchQuery.toLowerCase())),
                                  ).length) && (
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

            {/* Modal hiển thị chi tiết thông báo */}
            <NotificationModal
                open={Boolean(selectedNotification)}
                onClose={handleCloseModal}
                notification={selectedNotification}
            />
        </>
    );
};

export default Notification;
