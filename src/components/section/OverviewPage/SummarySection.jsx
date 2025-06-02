import PropTypes from "prop-types";
import { Grid, Paper, Box, Typography } from "@mui/material";
import {
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    yellow,
    amber,
    orange,
    deepOrange,
    brown,
    grey,
    blueGrey,
} from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ClassIcon from "@mui/icons-material/Class";
import AnimatedCounter from "@components/common/AnimatedCounter/AnimatedCounter";

const SummaryCard = ({ color, title, count, subInfo, Icon, onClick, animationDelay = 0 }) => (
    <Paper
        sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: color[50],
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
                transform: "scale(1.03)",
                boxShadow: 4,
                cursor: "pointer",
            },
            minHeight: 150,
        }}
        onClick={onClick}
    >
        <Box
            sx={{
                p: 2,
                borderRadius: "50%",
                backgroundColor: color[100],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Icon sx={{ fontSize: 40, color: color[900] }} />
        </Box>
        <Box>
            <Typography variant="subtitle1" color="textSecondary">
                {title}
            </Typography>
            <AnimatedCounter
                value={count || 0}
                variant="h5"
                color="inherit"
                fontWeight="bold"
                duration={500 + animationDelay * 200}
            />
            {subInfo && (
                <Typography variant="subtitle2" color="textSecondary">
                    {subInfo}
                </Typography>
            )}
        </Box>
    </Paper>
);

const SummarySection = ({ overview, router }) => {
    const handleNavigate = (route) => {
        if (router && router.navigate) {
            router.navigate(route);
        }
    };

    return (
        <Grid container sx={{ py: 2 }} spacing={2} columns={12}>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <SummaryCard
                    color={red}
                    title="Thông báo"
                    count={overview.totalNotifications}
                    subInfo={"Chưa đọc: " + (overview.totalNotificationsNotRead ?? "...")}
                    Icon={NotificationsIcon}
                    onClick={() => handleNavigate("/notification")}
                    animationDelay={0}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <SummaryCard
                    color={indigo}
                    title="Lớp thực tập"
                    count={overview.totalCourses}
                    subInfo={"..."}
                    Icon={ClassIcon}
                    onClick={() => handleNavigate("/course")}
                    animationDelay={1}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                <SummaryCard
                    color={green}
                    title="Sinh viên"
                    count={overview.totalStudents}
                    subInfo={"Chưa hoàn thành môn: " + (overview.totalStudentsNotReported ?? "...")}
                    Icon={SchoolIcon}
                    onClick={() => handleNavigate("/student")}
                    animationDelay={2}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                <SummaryCard
                    color={blue}
                    title="Giảng viên"
                    count={overview.totalTeachers}
                    subInfo={"..."}
                    Icon={PersonIcon}
                    onClick={() => handleNavigate("/teacher")}
                    animationDelay={3}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                <SummaryCard
                    color={orange}
                    title="Doanh nghiệp"
                    count={overview.totalRecruiters}
                    subInfo={"Chưa duyệt: " + (overview.totalRecruitersNotApproved ?? "...")}
                    Icon={BusinessIcon}
                    onClick={() => handleNavigate("/business")}
                    animationDelay={4}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                <SummaryCard
                    color={purple}
                    title="Bài đăng"
                    count={overview.totalJobPosts}
                    subInfo={"Chưa duyệt: " + (overview.totalJobPostsNotApproved ?? "...")}
                    Icon={WorkIcon}
                    onClick={() => handleNavigate("/job-post")}
                    animationDelay={5}
                />
            </Grid>
        </Grid>
    );
};

SummaryCard.propTypes = {
    color: PropTypes.object,
    title: PropTypes.string,
    count: PropTypes.number,
    subInfo: PropTypes.string,
    Icon: PropTypes.elementType,
    onClick: PropTypes.func,
    animationDelay: PropTypes.number,
};

SummarySection.propTypes = {
    overview: PropTypes.object,
    router: PropTypes.object,
};

export default SummarySection;
