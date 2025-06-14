import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Bookmark from "@mui/icons-material/Bookmark";
import AssignmentTurnedIn from "@mui/icons-material/AssignmentTurnedIn";
import Class from "@mui/icons-material/Class";
import DescriptionIcon from "@mui/icons-material/Description";

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
                    paddingY: { xs: 2, sm: 5 },
                    paddingX: { xs: 2, sm: 5 },
                }}
            >
                {/* Avatar sinh viên */}
                <Avatar
                    src={"/images/ute_logo_c.png"}
                    alt={studentName}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    sx={{
                        width: { xs: "25%", sm: "30%", md: "50%" },
                        height: { xs: "25%", sm: "30%", md: "50%" },
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
                {/* CV */}
                <ListItemButton
                    onClick={() => handleNavigate("/student/my-cv")}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: location.pathname === "/student/my-cv" ? "100%" : "0%",
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
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="CV" />
                </ListItemButton>

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
                    onClick={() => handleNavigate("/student/internship-reports")}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: location.pathname === "/student/internship-reports" ? "100%" : "0%",
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
                    <ListItemText primary="Báo cáo thực tập" />
                </ListItemButton>

                <Divider />
                {/* Lớp thực tập */}
                <ListItemButton
                    onClick={() => handleNavigate("/student/courses")}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: location.pathname === "/student/courses" ? "100%" : "0%",
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
                        <Class />
                    </ListItemIcon>
                    <ListItemText primary="Lớp thực tập" />
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
