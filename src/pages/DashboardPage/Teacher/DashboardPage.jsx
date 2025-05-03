import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import usePageTitle from "@hooks/usePageTitle";
import useAuth from "@hooks/useAuth";

import Chip from "@mui/material/Chip";
import { createTheme } from "@mui/material/styles";
import ClassIcon from "@mui/icons-material/Class";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";

import PageContent from "@components/dashboard/PageContent/PageContent";

const NAVIGATION = [
    {
        kind: "header",
        title: "Thông báo",
    },
    {
        segment: "notification",
        title: "Thông báo",
        icon: <NotificationsIcon />,
        action: <Chip label={7} color="error" size="small" />,
    },
    {
        kind: "divider",
    },
    {
        kind: "header",
        title: "Quản lý chung",
    },
    {
        segment: "course/teacher",
        title: "Lớp thực tập",
        icon: <ClassIcon />,
    },
    {
        segment: "internship-report",
        title: "Báo cáo thực tập",
        icon: <WorkspacesIcon />,
    },
    {
        kind: "divider",
    },
    {
        kind: "header",
        title: "Cài đặt",
    },
    {
        segment: "settings",
        title: "Cài đặt",
        icon: <SettingsIcon />,
    },
];

const theme = createTheme({
    // cssVariables: {
    //     colorSchemeSelector: "data-toolpad-color-scheme",
    // },
    // colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DashboardPage(props) {
    usePageTitle("Bảng điều khiển");
    const { user } = useAuth();

    const navigate = useNavigate();
    const { window } = props;
    const [session, setSession] = useState({
        user: {
            name: user?.name,
            email: user?.email,
            // image: "/images/fit_logo.png",
        },
    });

    const authentication = useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: user?.name,
                        email: user?.email,
                        // image: "/images/fit_logo.png",
                    },
                });
            },
            signOut: () => {
                setSession(null);
                navigate("/logout");
            },
        };
    }, [navigate, user]);

    const router = useDemoRouter("/notification");

    return (
        <AppProvider
            session={session}
            authentication={authentication}
            navigation={NAVIGATION}
            router={router}
            branding={{
                // logo: <img src="" />,
                title: "INTERN HUB",
                homeUrl: "/notification",
            }}
            theme={theme}
            window={window}
        >
            <DashboardLayout defaultSidebarCollapsed>
                <PageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
    );
}

DashboardPage.propTypes = {
    window: PropTypes.func,
};

export default DashboardPage;
