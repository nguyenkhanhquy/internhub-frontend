import { useState, useEffect } from "react";

const useCountUp = (targetValue, duration = 2000, startOnMount = true) => {
    const [currentValue, setCurrentValue] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (!startOnMount || targetValue === 0) {
            setCurrentValue(targetValue);
            return;
        }

        setIsAnimating(true);
        const startTime = Date.now();
        const startValue = 0;

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Sử dụng easing function để tạo hiệu ứng mượt mà hơn
            const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const value = Math.floor(startValue + (targetValue - startValue) * easedProgress);

            setCurrentValue(value);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCurrentValue(targetValue);
                setIsAnimating(false);
            }
        };

        const timeoutId = setTimeout(() => {
            requestAnimationFrame(animate);
        }, 50); // Delay nhỏ để tạo hiệu ứng tự nhiên hơn

        return () => clearTimeout(timeoutId);
    }, [targetValue, duration, startOnMount]);

    return { currentValue, isAnimating };
};

export default useCountUp;
