import PropTypes from "prop-types";
import { Backdrop, CircularProgress, Box } from "@mui/material";

const LoadingOverlay = ({ open }) => {
    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
            open={open}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress color="inherit" />
            </Box>
        </Backdrop>
    );
};

LoadingOverlay.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default LoadingOverlay;
