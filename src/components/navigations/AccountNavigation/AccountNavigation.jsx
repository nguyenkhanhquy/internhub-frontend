import { useNavigate, useLocation } from "react-router-dom";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

import PersonIcon from "@mui/icons-material/Person";
import Lock from "@mui/icons-material/Lock";
import AccountCircle from "@mui/icons-material/AccountCircle";

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
                    paddingY: { xs: 2, sm: 5 },
                    paddingX: { xs: 2, sm: 5 },
                }}
            >
                <Avatar
                    src={"/images/ute_logo_c.png"}
                    alt={"Logo"}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    sx={{
                        width: { xs: "25%", sm: "30%", md: "50%" },
                        height: { xs: "25%", sm: "30%", md: "50%" },
                        marginBottom: 2,
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)", // Đổ bóng cho avatar
                    }}
                />
                <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 200 }}>
                    Tài khoản
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
