import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import DashboardUpdatePasswordForm from "@components/forms/DashboardUpdatePasswordForm/DashboardUpdatePasswordForm";
import AccountDetailsCard from "@components/card/AccountDetailsCard/AccountDetailsCard";

const SettingsPage = () => {
    const [flag, setFlag] = useState(false);

    return (
        <Box
            sx={{
                p: 4,
            }}
        >
            <Typography
                variant="h5"
                gutterBottom
                color="primary"
                sx={{
                    fontWeight: "bold",
                    fontSize: "2rem",
                    color: "linear-gradient(to right, #1976d2, #42a5f5)", // Gradient màu xanh
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Bóng chữ
                    letterSpacing: "0.05em", // Khoảng cách chữ nhẹ
                }}
            >
                Cài đặt
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <AccountDetailsCard flag={flag} />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <DashboardUpdatePasswordForm setFlag={setFlag} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default SettingsPage;
