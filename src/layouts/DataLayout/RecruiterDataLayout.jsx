import { Box } from "@mui/material";
import RecruiterDataNavigation from "../../components/navigations/DataNavigation/RecruiterDataNavigation";
import PropTypes from "prop-types";

const RecruiterDataLayout = ({ children }) => {
    return (
        <Box sx={{ display: "flex", px: 10, py: 4, minHeight: 600 }}>
            {/* Bảng điều hướng bên trái */}
            <Box sx={{ position: "sticky", top: 0, height: 200, maxWidth: 300, mr: 4 }}>
                <RecruiterDataNavigation logo="https://marketplace.canva.com/EAE0rNNM2Fg/1/0/1600w/canva-letter-c-trade-marketing-logo-design-template-r9VFYrbB35Y.jpg" />
            </Box>

            {/* Nội dung bên phải */}
            <Box component="main" sx={{ flexGrow: 1, width: "90%", maxWidth: 1200 }}>
                {children}
            </Box>
        </Box>
    );
};

RecruiterDataLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RecruiterDataLayout;
