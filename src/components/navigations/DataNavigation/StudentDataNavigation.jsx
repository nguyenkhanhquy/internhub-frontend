import {
    Avatar,
    Box,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Paper,
} from "@mui/material";
import { Bookmark, AssignmentTurnedIn } from "@mui/icons-material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "/images/ute_logo_c.png";

const StudentDataNavigation = ({ studentName }) => {
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
            {/* Thông tin sinh viên */}
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
                    alt={studentName}
                    sx={{
                        width: "50%",
                        height: "50%",
                        marginBottom: 2,
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)", // Đổ bóng cho avatar
                    }}
                />
                {/* Tên sinh viên */}
                <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 200 }}>
                    {studentName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Sinh viên
                </Typography>
            </Box>

            {/* Danh sách menu */}
            <List>
                <Divider />
                {/* Công việc ứng tuyển */}
                <ListItemButton
                    onClick={() => handleNavigate("/student/applied-jobs")}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: location.pathname === "/student/applied-jobs" ? "100%" : "0%",
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
                        <PersonAddAlt1Icon />
                    </ListItemIcon>
                    <ListItemText primary="Công việc ứng tuyển" />
                </ListItemButton>

                <Divider />
                {/* Công việc đã lưu */}
                <ListItemButton
                    onClick={() => handleNavigate("/student/saved-jobs")}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: location.pathname === "/student/saved-jobs" ? "100%" : "0%",
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
                        <Bookmark />
                    </ListItemIcon>
                    <ListItemText primary="Công việc đã lưu" />
                </ListItemButton>

                <Divider />
                {/* Đơn đăng ký thực tập */}
                <ListItemButton
                    onClick={() => handleNavigate("/student/internship-applications")}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: location.pathname === "/student/internship-applications" ? "100%" : "0%",
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
                        <AssignmentTurnedIn />
                    </ListItemIcon>
                    <ListItemText primary="Đơn đăng ký thực tập" />
                </ListItemButton>
            </List>
        </Paper>
    );
};

// Định nghĩa PropTypes
StudentDataNavigation.propTypes = {
    studentName: PropTypes.string.isRequired,
};

export default StudentDataNavigation;
