import { Box, Typography } from "@mui/material";

const SettingsPage = () => {
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
                Settings Page
            </Typography>
            <Typography>This is the settings page.</Typography>
        </Box>
    );
};

export default SettingsPage;
