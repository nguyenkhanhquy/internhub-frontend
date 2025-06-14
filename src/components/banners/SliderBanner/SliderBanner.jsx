import { useState, useEffect, useRef, useCallback } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

const images = [
    { url: "/images/banner_fit_ute.png" },
    { url: "/images/banner_hcmute.jpg" },
    { url: "/images/banner.png" },
    { url: "/images/banner_career_fair_1.png" },
    { url: "/images/banner_career_fair_2.png" },
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
                boxShadow: 4,
                borderRadius: 2,
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
                            height: { xs: 160, sm: 200, md: 240, lg: 420 },
                        }}
                    >
                        <Box
                            component="img"
                            src={item.url}
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                ))}
            </Box>

            {/* Nút điều hướng trái và phải */}
            <Button
                onClick={goToPrev}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: { xs: 4, sm: 16 },
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0,0,0,0.3)",
                    color: "white",
                    minWidth: { xs: 32, sm: 40 },
                    height: { xs: 40, sm: 60 },
                    "&:hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                    },
                    borderRadius: 2,
                }}
            >
                <ChevronLeft />
            </Button>

            <Button
                onClick={goToNext}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: { xs: 4, sm: 16 },
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0,0,0,0.3)",
                    color: "white",
                    minWidth: { xs: 32, sm: 40 },
                    height: { xs: 40, sm: 60 },
                    "&:hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                    },
                    borderRadius: 2,
                }}
            >
                <ChevronRight />
            </Button>

            {/* Nút chọn để nhảy đến bất kỳ banner nào */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: { xs: 8, sm: 12 },
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: { xs: 0.5, sm: 1 },
                }}
            >
                {images.map((_, i) => (
                    <Button
                        key={i}
                        onClick={() => setIndex(i + 1)}
                        sx={{
                            width: { xs: 16, sm: 24 },
                            height: { xs: 4, sm: 6 },
                            minWidth: 0,
                            p: 0,
                            borderRadius: 1,
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
