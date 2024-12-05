import { Box, Typography } from "@mui/material";
import DashboardUpdatePasswordForm from "../../forms/DashboardUpdatePasswordForm/DashboardUpdatePasswordForm";
import AccountDetailsCard from "../../card/AccountDetailsCard/AccountDetailsCard";

const SettingsPage = () => {
    return (
        <Box
            sx={{
                p: 4,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Settings Page
            </Typography>
            <Typography mb={2}>This is the settings page.</Typography>
            <AccountDetailsCard />
            <DashboardUpdatePasswordForm />
        </Box>
    );
};

export default SettingsPage;
