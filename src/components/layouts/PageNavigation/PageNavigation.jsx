import { Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PageNavigation = ({ pageName }) => {
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
                px: {
                    xs: 2, // Đối với màn hình nhỏ (mobile)
                    sm: 4, // Đối với màn hình trung bình nhỏ
                    md: 8, // Đối với màn hình trung bình
                    lg: 12, // Đối với màn hình lớn
                },
                py: 1.5,
            }}
        >
            {/* Tên của trang web */}
            <Typography
                variant="body1"
                sx={{
                    fontWeight: "bold",
                    fontSize: {
                        xs: "14px", // Font nhỏ hơn trên màn hình nhỏ
                        sm: "16px",
                        md: "18px",
                    },
                }}
            >
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
                    fontSize: {
                        xs: "14px",
                        sm: "16px",
                        md: "18px",
                    },
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

PageNavigation.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default PageNavigation;
