import { List, ListItemButton, ListItemText, ListItemIcon, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { AccountCircle, Lock } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";

const AccountNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy đường dẫn hiện tại

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Tài khoản của tôi
            </Typography>
            <List sx={{ width: 240 }}>
                <ListItemButton
                    onClick={() => handleNavigate("/account/profile")}
                    selected={location.pathname === "/account/profile"}
                    sx={{
                        color: location.pathname === "/account/profile" ? "primary.main" : "text.primary",
                    }}
                >
                    <ListItemIcon>
                        <PersonIcon color={location.pathname === "/account/profile" ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Chi tiết hồ sơ" />
                </ListItemButton>

                <ListItemButton
                    onClick={() => handleNavigate("/account/update-password")}
                    selected={location.pathname === "/account/update-password"}
                    sx={{
                        color: location.pathname === "/account/update-password" ? "primary.main" : "text.primary",
                    }}
                >
                    <ListItemIcon>
                        <Lock color={location.pathname === "/account/update-password" ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Đổi mật khẩu" />
                </ListItemButton>

                <ListItemButton
                    onClick={() => handleNavigate("/account/details")}
                    selected={location.pathname === "/account/details"}
                    sx={{
                        color: location.pathname === "/account/details" ? "primary.main" : "text.primary",
                    }}
                >
                    <ListItemIcon>
                        <AccountCircle color={location.pathname === "/account/details" ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Chi tiết tài khoản" />
                </ListItemButton>
            </List>
        </>
    );
};

export default AccountNavigation;
