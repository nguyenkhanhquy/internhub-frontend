import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import StudentPage from "../StudentPage/StudentPage";
import TeacherPage from "../TeacherPage/TeacherPage";
import RecruiterPage from "../RecruiterPage/RecruiterPage";

function PageContent({ pathname, navigate }) {
    switch (pathname) {
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
        case "/student":
            return <StudentPage />;
        case "/teacher":
            return <TeacherPage />;
        case "/business":
            return <RecruiterPage />;
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
                    {pathname.startsWith("/notification") ? (
                        <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
                            <Button
                                onClick={() => {
                                    navigate("/notification/1");
                                }}
                            >
                                Notification 1
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate("/notification/2");
                                }}
                            >
                                Notification 2
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate("/notification/3");
                                }}
                            >
                                Notification 3
                            </Button>
                        </Stack>
                    ) : null}
                </Box>
            );
    }
}

PageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
};

export default PageContent;
