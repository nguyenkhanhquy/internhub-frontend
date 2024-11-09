import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

const images = [
    {
        url: "https://via.placeholder.com/1920x600",
        title: "Ảnh 1",
    },
    {
        url: "https://via.placeholder.com/1920x600",
        title: "Ảnh 2",
    },
    {
        url: "https://via.placeholder.com/1920x600",
        title: "Ảnh 3",
    },
    {
        url: "https://via.placeholder.com/1920x600",
        title: "Ảnh 4",
    },
    {
        url: "https://via.placeholder.com/1920x600",
        title: "Ảnh 5",
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
                        variant="h4"
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
        </Box>
    );
};

export default SliderBanner;
