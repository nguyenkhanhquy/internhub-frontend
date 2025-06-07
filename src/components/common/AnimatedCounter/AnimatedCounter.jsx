import PropTypes from "prop-types";
import useCountUp from "@hooks/useCountUp";

import Typography from "@mui/material/Typography";

const AnimatedCounter = ({
    value,
    duration = 2000,
    variant = "h4",
    color = "primary",
    fontWeight = "bold",
    suffix = "",
    prefix = "",
    ...props
}) => {
    const { currentValue } = useCountUp(value, duration, value > 0);

    const formatNumber = (num) => {
        return new Intl.NumberFormat("vi-VN").format(num);
    };

    return (
        <Typography variant={variant} color={color} fontWeight={fontWeight} {...props}>
            {prefix}
            {formatNumber(currentValue)}
            {suffix}
        </Typography>
    );
};

AnimatedCounter.propTypes = {
    value: PropTypes.number.isRequired,
    duration: PropTypes.number,
    variant: PropTypes.string,
    color: PropTypes.string,
    fontWeight: PropTypes.string,
    suffix: PropTypes.string,
    prefix: PropTypes.string,
};

export default AnimatedCounter;
