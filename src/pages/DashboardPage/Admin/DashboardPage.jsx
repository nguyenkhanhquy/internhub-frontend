import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import usePageTitle from "../../../hooks/usePageTitle";
import Chip from "@mui/material/Chip";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import SchoolIcon from "@mui/icons-material/School";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkIcon from "@mui/icons-material/Work";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DnsIcon from "@mui/icons-material/Dns";
import MapIcon from "@mui/icons-material/Map";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import PageContent from "../../../components/dashboard/PageContent/PageContent";

const NAVIGATION = [
    {
        kind: "header",
        title: "Thông báo",
    },
    {
        segment: "notification",
        title: "Thông báo",
        icon: <NotificationsIcon />,
        action: <Chip label={7} color="primary" size="small" />,
    },
    {
        kind: "divider",
    },
    {
        kind: "header",
        title: "Bảng điều khiển",
    },
    {
        segment: "overview",
        title: "Bảng điều khiển",
        icon: <DashboardIcon />,
    },
    {
        segment: "manage-intern",
        title: "Quản lý thực tập",
        icon: <WorkspacesIcon />,
    },
    {
        kind: "divider",
    },
    {
        kind: "header",
        title: "Quản lý chung",
    },
    {
        segment: "student",
        title: "Sinh viên",
        icon: <SchoolIcon />,
    },
    {
        segment: "teacher",
        title: "Giảng viên",
        icon: <SupervisorAccountIcon />,
    },
    {
        segment: "business",
        title: "Doanh nghiệp",
        icon: <BusinessIcon />,
    },
    {
        segment: "job-post",
        title: "Bài đăng tuyển dụng",
        icon: <WorkIcon />,
    },
    {
        kind: "divider",
    },
    {
        kind: "header",
        title: "Cài đặt",
    },
    {
        segment: "setting",
        title: "Cài đặt",
        icon: <SettingsIcon />,
    },
    // {
    //     kind: "divider",
    // },
    // {
    //     kind: "header",
    //     title: "Hổ trợ",
    // },
    // {
    //     segment: "map",
    //     title: "Bản đồ",
    //     icon: <MapIcon />,
    // },
    // {
    //     segment: "technical-support",
    //     title: "Hổ trợ kỹ thuật",
    //     icon: <SupportAgentIcon />,
    // },
];

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: { light: true, dark: true },
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

    const navigate = useNavigate();
    const { window } = props;
    const [session, setSession] = useState({
        user: {
            name: "Khoa Công Nghệ Thông Tin",
            email: "kcntt@hcmute.edu.vn",
            // image: "/images/fit_logo.png",
        },
    });

    const authentication = useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: "Khoa Công Nghệ Thông Tin",
                        email: "kcntt@hcmute.edu.vn",
                        // image: "",
                    },
                });
            },
            signOut: () => {
                setSession(null);
                navigate("/logout");
            },
        };
    }, [navigate]);

    const router = useDemoRouter("/dashboard");

    return (
        <AppProvider
            session={session}
            authentication={authentication}
            navigation={NAVIGATION}
            router={router}
            branding={{
                // logo: <img src="" />,
                title: "INTERN HUB",
            }}
            theme={theme}
            window={window}
        >
            <DashboardLayout defaultSidebarCollapsed>
                <PageContent pathname={router.pathname} navigate={router.navigate} />
            </DashboardLayout>
        </AppProvider>
    );
}

DashboardPage.propTypes = {
    window: PropTypes.func,
};

export default DashboardPage;
