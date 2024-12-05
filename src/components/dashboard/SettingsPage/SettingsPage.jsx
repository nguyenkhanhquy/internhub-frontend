import { useState } from "react";

import { Box } from "@mui/material";
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
            <AccountDetailsCard flag={flag} />
            <DashboardUpdatePasswordForm setFlag={setFlag} />
        </Box>
    );
};

export default SettingsPage;
