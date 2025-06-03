import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PageNavigation = ({ pageName }) => {
    const navigate = useNavigate();

    // Xử lý quay lại trang trước
    const handleBackClick = () => {
        navigate(-1);
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
                py: 1.2,
            }}
        >
            {/* Tên của trang web */}
            <Typography
                variant="body1"
                sx={{
                    fontWeight: "bold",
                    fontSize: {
                        xs: "14px",
                        sm: "16px",
                        md: "18px",
                    },
                }}
            >
                {pageName}
            </Typography>

            <IconButton
                onClick={handleBackClick}
                sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: {
                        xs: "14px",
                        sm: "16px",
                        md: "18px",
                    },
                    padding: "2px 4px",
                    borderRadius: "4px",
                    "&:hover": {
                        textDecoration: "underline",
                        "& .MuiSvgIcon-root": {
                            transform: "translateX(-4px)",
                        },
                    },
                    "& .MuiSvgIcon-root": {
                        marginRight: "4px",
                        fontSize: {
                            xs: "16px",
                            sm: "18px",
                            md: "20px",
                        },
                        transition: "transform 0.3s ease",
                    },
                }}
            >
                <ArrowBackIcon />
                Trang trước
            </IconButton>
        </Box>
    );
};

PageNavigation.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default PageNavigation;
