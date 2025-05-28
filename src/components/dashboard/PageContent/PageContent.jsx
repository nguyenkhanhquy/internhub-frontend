import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import NotificationPage from "@components/dashboard/NotificationPage/NotificationPage";
import OverviewPage from "@components/dashboard/OverviewPage/OverviewPage";
import CoursePage from "@components/dashboard/CoursePage/CoursePage";
import TeacherCoursePage from "@components/dashboard/CoursePage/Teacher/CoursePage";
import InternshipReportPage from "@components/dashboard/InternshipReportPage/InternshipReportPage";
import StudentPage from "@components/dashboard/StudentPage/StudentPage";
import TeacherPage from "@components/dashboard/TeacherPage/TeacherPage";
import RecruiterPage from "@components/dashboard/RecruiterPage/RecruiterPage";
import JobPostPage from "@components/dashboard/JobPostPage/JobPostPage";
import SettingsPage from "@components/dashboard/SettingsPage/SettingsPage";

function PageContent({ pathname, router }) {
    switch (pathname) {
        case "/notification":
            return <NotificationPage />;
        case "/":
            return <OverviewPage router={router} />;
        case "/overview":
            return <OverviewPage router={router} />;
        case "/course":
            return <CoursePage />;
        case "/course/teacher":
            return <TeacherCoursePage />;
        case "/internship-report":
            return <InternshipReportPage />;
        case "/student":
            return <StudentPage />;
        case "/teacher":
            return <TeacherPage />;
        case "/business":
            return <RecruiterPage />;
        case "/job-post":
            return <JobPostPage />;
        case "/settings":
            return <SettingsPage />;
        case "/map":
            return (
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7836.970935350415!2d106.76933817462827!3d10.850632389302666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2sHCMC%20University%20of%20Technology%20and%20Education!5e0!3m2!1sen!2sus!4v1731181271761!5m2!1sen!2sus"
                    style={{ flex: 1, border: 0 }}
                    allowFullScreen
                    loading="lazy"
                />
            );
        default:
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
                    <Typography>Dashboard content for {pathname}</Typography>
                </Box>
            );
    }
}

PageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
    router: PropTypes.object,
};

export default PageContent;
