import { List, ListItemButton, ListItemText, ListItemIcon, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { AccountCircle, Lock } from "@mui/icons-material";
import { Paper, Box, Divider, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import logo from "/images/ute_logo_c.png";

const AccountNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy đường dẫn hiện tại

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Paper
            sx={{
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                textAlign: "center",
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                    paddingY: 5,
                    paddingX: 5,
                }}
            >
                {/* Avatar sinh viên */}
                <Avatar
                    src={logo}
                    alt={""}
                    sx={{
                        width: "50%",
                        height: "50%",
                        marginBottom: 2,
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)", // Đổ bóng cho avatar
                    }}
                />
                <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 200 }}>
                    Tài khoản của tôi
                </Typography>
            </Box>
            <List>
                <Divider />
                <ListItemButton
                    onClick={() => handleNavigate("/account/profile")}
                    // selected={location.pathname === "/account/profile"}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: location.pathname === "/account/profile" ? "100%" : "0%",
                            width: "4px",
                            backgroundColor: "primary.main",
                            transition: "height 0.3s ease",
                        },
                        "&:hover::after": {
                            height: "100%",
                        },
                    }}
                >
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chi tiết hồ sơ" />
                </ListItemButton>

                <Divider />
                <ListItemButton
                    onClick={() => handleNavigate("/account/update-password")}
                    // selected={location.pathname === "/account/update-password"}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: location.pathname === "/account/update-password" ? "100%" : "0%",
                            width: "4px",
                            backgroundColor: "primary.main",
                            transition: "height 0.3s ease",
                        },
                        "&:hover::after": {
                            height: "100%",
                        },
                    }}
                >
                    <ListItemIcon>
                        <Lock />
                    </ListItemIcon>
                    <ListItemText primary="Đổi mật khẩu" />
                </ListItemButton>

                <Divider />
                <ListItemButton
                    onClick={() => handleNavigate("/account/details")}
                    // selected={location.pathname === "/account/details"}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: location.pathname === "/account/details" ? "100%" : "0%",
                            width: "4px",
                            backgroundColor: "primary.main",
                            transition: "height 0.3s ease",
                        },
                        "&:hover::after": {
                            height: "100%",
                        },
                    }}
                >
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Chi tiết tài khoản" />
                </ListItemButton>
            </List>
        </Paper>
    );
};

export default AccountNavigation;
