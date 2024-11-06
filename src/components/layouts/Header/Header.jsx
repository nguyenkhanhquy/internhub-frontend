import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../../services/localStorageService";
import { logout } from "../../../services/authService";
import useAuth from "../../../hooks/useAuth";

import { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "/images/HCMUTE-FIT.png";
import { Box, Button, Menu, MenuItem, Paper } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
    const { setIsAuthenticated } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);
    const [accountAnchorEl, setAccountAnchorEl] = useState(null);

    const handleSignUpClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAccountClick = (event) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAccountAnchorEl(null);
    };

    const navigate = useNavigate();

    const accessToken = getToken();

    const handleLogout = async () => {
        handleClose();

        const accessToken = getToken();

        if (accessToken) {
            const data = await logout(accessToken);

            console.log(data);
        }

        removeToken();

        setIsAuthenticated(false);

        navigate("/login");
    };

    return (
        <Paper
            elevation={3}
            sx={{
                width: "100%",
                paddingY: 2,
                boxShadow: 2,
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
                    <Box component="img" src={logoImage} alt="Logo" sx={{ width: { xs: "300px", md: "500px" } }} />
                </Link>

                <Box component="nav" sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<InfoIcon />}
                        sx={{
                            marginRight: 1,
                            padding: "8px 10px",
                            color: "white",
                            "&:hover": { backgroundColor: "#a92a21" },
                        }}
                    >
                        HSSD
                    </Button>

                    {/* Nút Tài khoản */}
                    {accessToken ? (
                        <>
                            <Button
                                variant="outlined"
                                startIcon={<AccountCircleIcon />}
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
                                Tài khoản
                            </Button>

                            <Menu anchorEl={accountAnchorEl} open={Boolean(accountAnchorEl)} onClose={handleClose}>
                                <MenuItem onClick={handleClose} component={Link} to="/">
                                    <WorkIcon sx={{ marginRight: 1 }} />
                                    Việc làm
                                </MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to="/account">
                                    <AccountCircleIcon sx={{ marginRight: 1 }} />
                                    Tài khoản
                                </MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to="/">
                                    <DataUsageIcon sx={{ marginRight: 1 }} />
                                    Dữ liệu của tôi
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
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
                                    marginRight: 1,
                                    padding: "8px 10px",
                                    color: "#2e3090",
                                    borderColor: "#d9d9d9",
                                    boxShadow: "0 2px #00000004",
                                    "&:hover": { borderColor: "#2e3090" },
                                }}
                            >
                                Đăng ký
                            </Button>

                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                <MenuItem onClick={handleClose} component={Link} to="/register-student">
                                    <PersonIcon sx={{ marginRight: 1 }} />
                                    Thực tập sinh
                                </MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to="/register-recruiter">
                                    <PersonIcon sx={{ marginRight: 1 }} />
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
    );
};

export default Header;
