import { Box, Typography, Stack, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const FeaturedCompaniesSection = ({ companies }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                my: 6,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "50vh",
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
                NHÀ TUYỂN DỤNG NỔI BẬT
            </Typography>

            {/* Các hình ảnh nhà tuyển dụng nổi bật */}
            <Stack direction="row" spacing={4} sx={{ flexWrap: "wrap", justifyContent: "center" }}>
                {companies.map((company, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            transition: "transform 0.3s, box-shadow 0.3s",
                            "&:hover": {
                                transform: "scale(1.1)",
                                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                                cursor: "pointer",
                            },
                        }}
                    >
                        <Avatar
                            src={company.logo}
                            alt={company.name}
                            sx={{
                                width: 200,
                                height: 200,
                                objectFit: "contain",
                                borderRadius: 0,
                            }}
                        />
                    </Box>
                ))}
            </Stack>

            {/* Button Xem thêm */}
            <Button
                variant="container"
                sx={{
                    mt: 4,
                    padding: "8px 16px",
                    backgroundColor: "#2e3090",
                    color: "white",
                    "&:hover": { backgroundColor: "#1f2061" },
                }}
                onClick={() => navigate("/companies")}
            >
                Xem thêm...
            </Button>
        </Box>
    );
};

FeaturedCompaniesSection.propTypes = {
    companies: PropTypes.array.isRequired,
};

export default FeaturedCompaniesSection;
