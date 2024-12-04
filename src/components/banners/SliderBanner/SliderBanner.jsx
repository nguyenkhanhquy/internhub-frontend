import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

const images = [
    {
        url: "/images/banner.png",
        title: "Banner 1",
    },
    {
        url: "/images/banner.png",
        title: "Banner 2",
    },
    {
        url: "/images/banner.png",
        title: "Banner 3",
    },
    {
        url: "/images/banner.png",
        title: "Banner 4",
    },
    {
        url: "/images/banner.png",
        title: "Banner 5",
    },
];

const SliderBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Tự động chuyển ảnh sau mỗi 5 giây
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 5000);
        return () => clearInterval(interval); // Xóa interval khi component bị hủy
    }, []);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Box sx={{ position: "relative", width: "100%", height: "400px", overflow: "hidden" }}>
            {images.map((image, index) => (
                <Box
                    key={index}
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: `${(index - currentIndex) * 100}%`,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${image.url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "left 0.5s ease-in-out",
                    }}
                >
                    <Typography
                        variant="h6"
                        color="white"
                        sx={{
                            position: "absolute",
                            bottom: "20px",
                            left: "20px",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            padding: "10px 20px",
                            borderRadius: "5px",
                        }}
                    >
                        {image.title}
                    </Typography>
                </Box>
            ))}

            {/* Nút điều hướng trái và phải */}
            <Button
                onClick={goToPrevious}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    transform: "translateY(-50%)",
                    color: "white",
                    fontSize: "24px",
                    zIndex: 1,
                }}
            >
                ❮
            </Button>
            <Button
                onClick={goToNext}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: "20px",
                    transform: "translateY(-50%)",
                    color: "white",
                    fontSize: "24px",
                    zIndex: 1,
                }}
            >
                ❯
            </Button>

            {/* Nút chọn để nhảy đến bất kỳ banner nào */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "8px",
                }}
            >
                {images.map((_, index) => (
                    <Button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        sx={{
                            width: "12px",
                            height: "12px",
                            minWidth: "unset",
                            padding: 0,
                            borderRadius: "50%",
                            backgroundColor: currentIndex === index ? "white" : "rgba(255, 255, 255, 0.5)",
                            transition: "background-color 0.3s",
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default SliderBanner;
