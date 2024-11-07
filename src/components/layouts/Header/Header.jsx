import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken, removeToken } from "../../../services/localStorageService";
import { logout } from "../../../services/authService";
import useAuth from "../../../hooks/useAuth";

import { Box, Button, Menu, MenuItem, Paper } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import LogoutIcon from "@mui/icons-material/Logout";

import logoImage from "/images/hcmute_fit_logo.png";

const Header = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();

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

    const handleLogout = async () => {
        handleClose();

        const accessToken = getToken();

        try {
            if (accessToken) {
                const data = await logout(accessToken);

                if (data.success !== true) {
                    if (data?.message) throw new Error(data.message);
                    else throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
                } else {
                    removeToken();
                    setIsAuthenticated(false);
                    navigate("/login");
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
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
                        <Box component="img" src={logoImage} alt="Logo" sx={{ width: { xs: "300px", md: "400px" } }} />
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
                        {isAuthenticated ? (
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

                                <Menu
                                    className="mt-1"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose} component={Link} to="/register-student">
                                        <PersonIcon sx={{ marginRight: 1 }} />
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
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick={false}
                pauseOnHover={true}
                draggable={true}
                theme="light"
            />
        </>
    );
};

export default Header;
