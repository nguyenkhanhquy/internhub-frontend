import PropTypes from "prop-types";
import { Grid, Paper, Box, Typography } from "@mui/material";
import { blue, green, purple, orange } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";

const SummaryCard = ({ color, title, count, subInfo, Icon }) => (
    <Paper
        sx={{
            p: 3,
            mx: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: color[50],
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
            },
            minHeight: 150,
        }}
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
            <Typography variant="h6" color="textSecondary">
                {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {count}
            </Typography>
            {subInfo && (
                <Typography variant="subtitle2" color="textSecondary">
                    {subInfo}
                </Typography>
            )}
        </Box>
    </Paper>
);

const SummarySection = () => {
    return (
        <Grid container sx={{ py: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
                <SummaryCard color={blue} title="Giảng viên" count="45" Icon={PersonIcon} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                    color={green}
                    title="Sinh viên"
                    count="3,567"
                    subInfo="Chưa báo cáo thực tập: 1,234"
                    Icon={SchoolIcon}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                    color={orange}
                    title="Nhà tuyển dụng"
                    count="678"
                    subInfo="Chưa được duyệt: 123"
                    Icon={BusinessIcon}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                    color={purple}
                    title="Bài đăng"
                    count="2,432"
                    subInfo="Đang hiển thị: 1,567"
                    Icon={WorkIcon}
                />
            </Grid>
        </Grid>
    );
};

SummaryCard.propTypes = {
    color: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
    subInfo: PropTypes.string, // Thông tin bổ sung là không bắt buộc
    Icon: PropTypes.elementType.isRequired,
};

export default SummarySection;
