import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const GridViewHeaderLayout = ({ title, children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
                borderBottom: "1px solid #ddd",
                bgcolor: "background.paper",
                flexWrap: "wrap",
                gap: 1,
            }}
        >
            {/* Tiêu đề của Grid View */}
            <Typography variant="h6" fontWeight="bold">
                {title}
            </Typography>

            {/* Phần children chứa thanh tìm kiếm và các nút hành động */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

GridViewHeaderLayout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default GridViewHeaderLayout;
