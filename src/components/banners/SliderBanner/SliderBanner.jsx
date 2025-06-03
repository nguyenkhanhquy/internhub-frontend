import { useState, useEffect, useRef, useCallback } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

const images = [
    { url: "/images/banner.png", title: "Banner 1" },
    { url: "/images/banner.png", title: "Banner 2" },
    { url: "/images/banner.png", title: "Banner 3" },
    { url: "/images/banner.png", title: "Banner 4" },
    { url: "/images/banner.png", title: "Banner 5" },
];

const SliderBanner = () => {
    const [index, setIndex] = useState(1);
    const [isAnimating, setIsAnimating] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const sliderRef = useRef(null);

    const extendedImages = [images[images.length - 1], ...images, images[0]];

    const goToNext = useCallback(() => {
        if (index < extendedImages.length - 1) setIndex((prev) => prev + 1);
    }, [index, extendedImages.length]);

    const goToPrev = useCallback(() => {
        if (index > 0) setIndex((prev) => prev - 1);
    }, [index]);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(goToNext, 2000);
        return () => clearInterval(interval);
    }, [index, isPaused, goToNext]);

    const handleTransitionEnd = () => {
        if (index === extendedImages.length - 1) {
            setIsAnimating(false);
            setIndex(1);
        } else if (index === 0) {
            setIsAnimating(false);
            setIndex(images.length);
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

    const startX = useRef(0);
    const endX = useRef(0);

    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        endX.current = e.changedTouches[0].clientX;
        const diff = startX.current - endX.current;
        if (diff > 50) goToNext();
        else if (diff < -50) goToPrev();
    };

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                maxWidth: 1400,
                overflow: "hidden",
                boxShadow: 3,
                margin: "auto",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <Box
                ref={sliderRef}
                onTransitionEnd={handleTransitionEnd}
                sx={{
                    display: "flex",
                    transform: `translateX(-${index * 100}%)`,
                    transition: isAnimating ? "transform 0.5s ease-in-out" : "none",
                }}
            >
                {extendedImages.map((item, i) => (
                    <Box
                        key={i}
                        sx={{
                            flexShrink: 0,
                            width: "100%",
                            position: "relative",
                            height: { xs: 200, sm: 300, md: 400 },
                        }}
                    >
                        <Box
                            component="img"
                            src={item.url}
                            alt={item.title}
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 16,
                                left: 16,
                                bgcolor: "rgba(0, 0, 0, 0.5)",
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                            }}
                        >
                            <Typography variant="h6" color="white">
                                {item.title}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Nút điều hướng trái và phải */}
            <Button
                onClick={goToPrev}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 16,
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0,0,0,0.3)",
                    color: "white",
                    minWidth: 40,
                    height: 60,
                    "&:hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                    },
                }}
            >
                <ChevronLeft />
            </Button>

            <Button
                onClick={goToNext}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: 16,
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0,0,0,0.3)",
                    color: "white",
                    minWidth: 40,
                    height: 60,
                    "&:hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                    },
                }}
            >
                <ChevronRight />
            </Button>

            {/* Nút chọn để nhảy đến bất kỳ banner nào */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 1,
                }}
            >
                {images.map((_, i) => (
                    <Button
                        key={i}
                        onClick={() => setIndex(i + 1)}
                        sx={{
                            width: 12,
                            height: 12,
                            minWidth: 0,
                            p: 0,
                            borderRadius: "50%",
                            bgcolor: index === i + 1 ? "white" : "rgba(255,255,255,0.5)",
                            "&:hover": {
                                bgcolor: "white",
                            },
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default SliderBanner;
