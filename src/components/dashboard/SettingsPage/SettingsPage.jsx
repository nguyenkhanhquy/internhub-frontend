import { useState } from "react";

import { Box, Typography } from "@mui/material";
import DashboardUpdatePasswordForm from "../../forms/DashboardUpdatePasswordForm/DashboardUpdatePasswordForm";
import AccountDetailsCard from "../../card/AccountDetailsCard/AccountDetailsCard";

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
            <AccountDetailsCard flag={flag} />
            <DashboardUpdatePasswordForm setFlag={setFlag} />
        </Box>
    );
};

export default SettingsPage;
