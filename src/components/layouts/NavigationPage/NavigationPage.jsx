import { Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NavigationPage = ({ pageName }) => {
    const navigate = useNavigate();

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate("/"); // Điều hướng tới trang chủ
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#007",
                color: "white",
                px: 12,
                py: 1.5,
            }}
        >
            {/* Tên của trang web */}
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {pageName}
            </Typography>

            {/* Link "Trang chủ" */}
            <Link
                href="/"
                onClick={handleHomeClick}
                sx={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                    "&:hover": {
                        textDecoration: "underline",
                    },
                }}
            >
                Trang chủ
            </Link>
        </Box>
    );
};

NavigationPage.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default NavigationPage;
