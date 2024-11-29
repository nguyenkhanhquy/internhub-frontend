import { Box } from "@mui/material";
import RecruiterDataNavigation from "../../components/navigations/DataNavigation/RecruiterDataNavigation";
import PropTypes from "prop-types";

const RecruiterDataLayout = ({ children }) => {
    return (
        <div className="mx-auto flex min-h-[500px] w-full max-w-[1360px] flex-col gap-6 p-4 md:flex-row">
            {/* Sidebar navigation bên trái */}
            <div className="w-full md:w-1/5">
                <Box
                    sx={{
                        position: { xs: "static", sm: "sticky" },
                        top: 0,
                    }}
                >
                    <RecruiterDataNavigation logo="https://marketplace.canva.com/EAE0rNNM2Fg/1/0/1600w/canva-letter-c-trade-marketing-logo-design-template-r9VFYrbB35Y.jpg" />
                </Box>
            </div>

            {/* Nội dung chính (children) bên phải */}
            <div className="w-full md:w-4/5">{children}</div>
        </div>

        // <Box sx={{ display: "flex", px: 10, py: 4, minHeight: 600 }}>
        //     {/* Bảng điều hướng bên trái */}
        //     <Box sx={{ position: "sticky", top: 0, height: 200, maxWidth: 300, mr: 4 }}>
        //         <RecruiterDataNavigation logo="https://marketplace.canva.com/EAE0rNNM2Fg/1/0/1600w/canva-letter-c-trade-marketing-logo-design-template-r9VFYrbB35Y.jpg" />
        //     </Box>

        //     {/* Nội dung bên phải */}
        //     <Box component="main" sx={{ flexGrow: 1, width: "90%", maxWidth: 1200 }}>
        //         {children}
        //     </Box>
        // </Box>
    );
};

RecruiterDataLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RecruiterDataLayout;
