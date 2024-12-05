import { Box, Typography } from "@mui/material";

const NotificationPage = () => {
    return (
        <Box
            sx={{
                py: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Notification Page
            </Typography>
            <Typography>This is the notification page.</Typography>
        </Box>
    );
};

export default NotificationPage;
