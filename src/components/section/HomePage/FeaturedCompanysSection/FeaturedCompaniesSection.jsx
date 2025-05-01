import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Typography, Avatar, Button, IconButton } from "@mui/material";
import Loading from "@components/loaders/Loading/Loading";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const FeaturedCompaniesSection = ({ loading, companies }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Tự động chuyển slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev - 1 + companies.length) % companies.length);
        }, 3000);

        return () => clearInterval(interval);
    });

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev + 1) % companies.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev - 1 + companies.length) % companies.length);
    };

    return (
        <Box
            sx={{
                my: 6,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 1 }}>
                DOANH NGHIỆP NỔI BẬT
            </Typography>

            {loading ? (
                <Loading />
            ) : (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            width: "100%",
                            height: "260px",
                            maxWidth: "1200px",
                            overflow: "hidden",
                        }}
                    >
                        <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 0, zIndex: 1 }}>
                            <ChevronLeft />
                        </IconButton>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 4,
                                px: 6,
                                transform: `translateX(-${currentIndex * (200 + 32)}px)`, // 200px avatar + 32px spacing (gap=4)
                                transition: "transform 0.5s ease-in-out",
                            }}
                        >
                            {[...companies, ...companies].map((company, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        flex: "0 0 auto",
                                        display: "flex",
                                        justifyContent: "center",
                                        "&:hover": {
                                            transform: "scale(1.1)",
                                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                                            cursor: "pointer",
                                        },
                                        transition: "transform 0.3s, box-shadow 0.3s",
                                    }}
                                    onClick={() => navigate(`/companies/${company.id}`)}
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
                        </Box>

                        <IconButton onClick={handleNext} sx={{ position: "absolute", right: 0, zIndex: 1 }}>
                            <ChevronRight />
                        </IconButton>
                    </Box>

                    <Button
                        variant="contained"
                        sx={{
                            mt: 1,
                            padding: "8px 16px",
                            backgroundColor: "#2e3090",
                            color: "white",
                            "&:hover": { backgroundColor: "#1f2061" },
                        }}
                        onClick={() => navigate("/companies")}
                    >
                        Xem thêm
                    </Button>
                </>
            )}
        </Box>
    );
};

FeaturedCompaniesSection.propTypes = {
    loading: PropTypes.bool.isRequired,
    companies: PropTypes.array.isRequired,
};

export default FeaturedCompaniesSection;
