import { Box, List, ListItemButton, ListItemText, ListItemIcon, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { AccountCircle, Lock } from "@mui/icons-material";
import PropTypes from "prop-types";

const AccountLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy đường dẫn hiện tại

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ display: "flex", pl: 12, bgcolor: "#f0f2f5" }}>
            {/* Bảng điều hướng bên trái */}
            <Box sx={{ height: 200, p: 2, mr: 3, mt: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    Tài khoản của tôi
                </Typography>
                <List sx={{ width: 240 }}>
                    <ListItemButton
                        onClick={() => handleNavigate("/account/profile")}
                        selected={location.pathname === "/account/profile"} // Đặt màu khi đang ở trang profile
                        sx={{
                            color: location.pathname === "/account/profile" ? "primary.main" : "text.primary",
                        }}
                    >
                        <ListItemIcon>
                            <AccountCircle color={location.pathname === "/account/profile" ? "primary" : "inherit"} />
                        </ListItemIcon>
                        <ListItemText primary="Chi tiết hồ sơ" />
                    </ListItemButton>

                    <ListItemButton
                        onClick={() => handleNavigate("/account/update-password")}
                        selected={location.pathname === "/account/update-password"} // Đặt màu khi đang ở trang update-password
                        sx={{
                            color: location.pathname === "/account/update-password" ? "primary.main" : "text.primary",
                        }}
                    >
                        <ListItemIcon>
                            <Lock color={location.pathname === "/account/update-password" ? "primary" : "inherit"} />
                        </ListItemIcon>
                        <ListItemText primary="Đổi mật khẩu" />
                    </ListItemButton>
                </List>
            </Box>

            {/* Nội dung bên phải */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 20 }}>
                {children}
            </Box>
        </Box>
    );
};

AccountLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AccountLayout;
