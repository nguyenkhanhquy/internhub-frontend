import { Box, Avatar, Typography, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ company }) => {
    const navigate = useNavigate();

    // Hàm xử lý sự kiện click để điều hướng đến /companies/:id
    const handleCardClick = () => {
        navigate(`/companies/${company.id}`);
    };

    // const handleCardClick = () => {
    //     window.open(`/companies/${company.id}`, "_blank");
    // };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                border: "1px solid #ddd",
                borderRadius: 1,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                },
            }}
            onClick={handleCardClick}
        >
            <Avatar
                src={company.logo}
                alt={company.name}
                sx={{
                    width: 160,
                    height: 160,
                    objectFit: "contain",
                    marginBottom: 2,
                }}
            />

            <Tooltip title={company.name} arrow>
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: "center",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                    }}
                >
                    {company.name}
                </Typography>
            </Tooltip>
        </Box>
    );
};

CompanyCard.propTypes = {
    company: PropTypes.object.isRequired,
};

export default CompanyCard;
