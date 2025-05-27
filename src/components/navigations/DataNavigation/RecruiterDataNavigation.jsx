import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import {
    Box,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Paper,
    Avatar,
} from "@mui/material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const RecruiterDataNavigation = ({ logo }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Hàm điều hướng
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
            {/* Chức danh Nhà tuyển dụng */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                    paddingY: 5,
                    paddingX: 5,
                }}
            >
                {/* Logo công ty */}
                <Avatar
                    src={logo}
                    alt={"logo"}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    sx={{
                        width: "50%",
                        height: "50%",
                        marginBottom: 2,
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)", // Đổ bóng cho avatar
                    }}
                />
                <Typography variant="h6" fontWeight="500">
                    Nhà tuyển dụng
                </Typography>
            </Box>

            {/* Danh sách menu */}
            <List>
                <Divider />
                {/* Việc làm đã đăng tuyển */}
                <ListItemButton
                    onClick={() => handleNavigate("/recruiter/posted-jobs")}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: location.pathname === "/recruiter/posted-jobs" ? "100%" : "0%",
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
                        <ListOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Việc làm đã đăng tuyển" />
                </ListItemButton>

                <Divider />
                {/* Đăng tin tuyển dụng */}
                <ListItemButton
                    onClick={() => handleNavigate("/recruiter/create-job-post")}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: location.pathname === "/recruiter/create-job-post" ? "100%" : "0%",
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
                        <AddBoxOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đăng tin tuyển dụng" />
                </ListItemButton>
            </List>
        </Paper>
    );
};

RecruiterDataNavigation.propTypes = {
    logo: PropTypes.string.isRequired,
};

export default RecruiterDataNavigation;
