import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";

import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

const FeaturedCompaniesSection = ({ loading, companies }) => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(companies.length);
    const [isAnimating, setIsAnimating] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const sliderRef = useRef(null);

    const extendedCompanies = [
        ...companies.slice(-companies.length), // n phần tử cuối
        ...companies, // toàn bộ mảng gốc
        ...companies.slice(0, companies.length), // n phần tử đầu
    ];

    const [canClick, setCanClick] = useState(true);

    const goToNext = useCallback(() => {
        if (!canClick || index >= extendedCompanies.length - companies.length) return;

        setCanClick(false);
        setIndex((prev) => prev + 1);

        setTimeout(() => {
            setCanClick(true);
        }, 550);
    }, [canClick, index, extendedCompanies.length, companies.length]);

    const goToPrev = useCallback(() => {
        if (!canClick || index <= 0) return;

        setCanClick(false);
        setIndex((prev) => prev - 1);

        setTimeout(() => {
            setCanClick(true);
        }, 550);
    }, [canClick, index]);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(goToNext, 2000);
        return () => clearInterval(interval);
    }, [goToNext, index, isPaused]);

    const handleTransitionEnd = () => {
        if (index === extendedCompanies.length - companies.length) {
            setIsAnimating(false);
            setIndex(companies.length);
        } else if (index === 0) {
            setIsAnimating(false);
            setIndex(companies.length);
        }
    };

    useEffect(() => {
        if (!isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    return (
        <Box
            sx={{
                my: 4,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                sx={{
                    mb: 2,
                    color: "#333",
                    fontSize: {
                        xs: "1.5rem",
                        sm: "2.125rem",
                    },
                    fontWeight: 600,
                }}
            >
                DOANH NGHIỆP NỔI BẬT
            </Typography>

            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 1160,
                    overflow: "hidden",
                }}
            >
                <Box
                    ref={sliderRef}
                    onTransitionEnd={handleTransitionEnd}
                    sx={{
                        display: "flex",
                        transform: {
                            xs: `translateX(-${index * (100 + 32)}px)`,
                            sm: `translateX(-${index * (200 + 32)}px)`,
                        },
                        transition: isAnimating ? "transform 0.5s ease-in-out" : "none",
                        gap: { xs: 2, sm: 4 },
                        px: { xs: 1, sm: 2 },
                    }}
                >
                    {loading
                        ? Array.from({ length: 15 }).map((_, i) => (
                              <Box
                                  key={i}
                                  height={200}
                                  sx={{
                                      flexShrink: 0,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                  }}
                              >
                                  <Skeleton
                                      animation="wave"
                                      variant="rectangular"
                                      width={200}
                                      height="90%"
                                      sx={{ borderRadius: 2 }}
                                  />
                              </Box>
                          ))
                        : extendedCompanies.map((company, i) => (
                              <Box
                                  key={i}
                                  sx={{
                                      flexShrink: 0,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      transition: "transform 0.3s, box-shadow 0.3s",
                                      "&:hover": {
                                          transform: "scale(1.05)",
                                          cursor: "pointer",
                                      },
                                  }}
                                  onMouseEnter={() => setIsPaused(true)}
                                  onMouseLeave={() => setIsPaused(false)}
                                  onClick={() => navigate(`/companies/${company.id}`)}
                              >
                                  <Avatar
                                      src={company.logo}
                                      alt={company.name}
                                      draggable={false}
                                      onDragStart={(e) => e.preventDefault()}
                                      sx={{
                                          width: { xs: 100, sm: 200 },
                                          height: "90%",
                                          objectFit: "contain",
                                          boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                                          borderRadius: 2,
                                          border: "1px solid #e0e0e0",
                                          transition: "all 0.3s ease-in-out",
                                          "&:hover": {
                                              borderColor: "#007bff",
                                              boxShadow: 3,
                                              cursor: "pointer",
                                          },
                                      }}
                                  />
                              </Box>
                          ))}
                </Box>

                {!loading && (
                    <>
                        {/* Nút điều hướng */}
                        <IconButton
                            onClick={goToPrev}
                            sx={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)" }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <ChevronLeft />
                        </IconButton>

                        <IconButton
                            onClick={goToNext}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                right: 0,
                                transform: "translateY(-50%)",
                            }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <ChevronRight />
                        </IconButton>
                    </>
                )}
            </Box>

            <Button
                disabled={loading}
                variant="contained"
                sx={{
                    mt: 1,
                    px: 3,
                    py: 1,
                    backgroundColor: "#2e3090",
                    color: "white",
                    "&:hover": { backgroundColor: "#1f2061" },
                }}
                onClick={() => navigate("/companies")}
            >
                Xem thêm
            </Button>
        </Box>
    );
};

FeaturedCompaniesSection.propTypes = {
    loading: PropTypes.bool.isRequired,
    companies: PropTypes.array.isRequired,
};

export default FeaturedCompaniesSection;
