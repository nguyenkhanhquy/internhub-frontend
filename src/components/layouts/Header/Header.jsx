import { useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "@hooks/useAuth";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";

import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import SchoolIcon from "@mui/icons-material/School";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import LogoutIcon from "@mui/icons-material/Logout";

import Notification from "@components/layouts/Header/Notification";

const HDSD_ThucTapSinh =
    "https://docs.google.com/document/d/1Op5scqQRMR0nTkCO0OPEjRTsuGdmxApUMXdKUdUgYKM/edit?usp=sharing";
const HDSD_NhaTuyenDung =
    "https://docs.google.com/document/d/15A7WHF5nBrRVJ6OShW2jKReSx5zgTrvuEdemCMshnEo/edit?usp=sharing";

const Header = () => {
    const { user, isAuthenticated } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);
    const [accountAnchorEl, setAccountAnchorEl] = useState(null);
    const [infoAnchorEl, setInfoAnchorEl] = useState(null);

    const handleSignUpClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleInfoClick = (event) => {
        setInfoAnchorEl(event.currentTarget);
    };

    const handleAccountClick = (event) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAccountAnchorEl(null);
        setInfoAnchorEl(null);
    };

    return (
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
                    <Box
                        component="img"
                        src="/images/hcmute_fit_logo.png"
                        alt="hcmute_fit_logo"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        width={380}
                    />
                </Link>

                <Box component="nav" sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<InfoIcon />}
                        onClick={handleInfoClick}
                        sx={{
                            padding: "8px 10px",
                            color: "white",
                            "&:hover": { backgroundColor: "#a92a21" },
                        }}
                    >
                        HDSD
                    </Button>

                    <Menu className="mt-1" anchorEl={infoAnchorEl} open={Boolean(infoAnchorEl)} onClose={handleClose}>
                        <MenuItem
                            onClick={() => {
                                window.open(HDSD_ThucTapSinh, "_blank");
                                handleClose();
                            }}
                        >
                            <SchoolIcon sx={{ marginRight: 1 }} />
                            Thực tập sinh
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                window.open(HDSD_NhaTuyenDung, "_blank");
                                handleClose();
                            }}
                        >
                            <PersonSearchIcon sx={{ marginRight: 1 }} />
                            Nhà tuyển dụng
                        </MenuItem>
                    </Menu>

                    {isAuthenticated ? (
                        <>
                            {/* Thông báo */}
                            <Notification />

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
                                {user?.role === "STUDENT" && (
                                    <MenuItem onClick={handleClose} component={Link} to="/search">
                                        <WorkIcon sx={{ marginRight: 1 }} />
                                        Việc làm
                                    </MenuItem>
                                )}

                                <MenuItem onClick={handleClose} component={Link} to="/account">
                                    <AccountCircleIcon sx={{ marginRight: 1 }} />
                                    Tài khoản
                                </MenuItem>

                                {user?.approved && (
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
                                )}

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

                            <Menu className="mt-1" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
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
    );
};

export default Header;
