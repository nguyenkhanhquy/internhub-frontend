import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import RecruiterDataNavigation from "@components/navigations/DataNavigation/RecruiterDataNavigation";

import useAuth from "@hooks/useAuth";

const RecruiterDataLayout = ({ children }) => {
    const { user } = useAuth();

    return (
        <div className="mx-auto flex min-h-[500px] w-full max-w-[1360px] flex-col gap-6 p-4 md:flex-row">
            {/* Sidebar navigation bên trái */}
            <div className="w-full md:w-2/5 lg:w-1/5">
                <Box
                    sx={{
                        position: { xs: "static", sm: "sticky" },
                        top: 0,
                    }}
                >
                    <RecruiterDataNavigation logo={user?.logo} />
                </Box>
            </div>

            {/* Nội dung chính (children) bên phải */}
            <div className="w-full md:w-3/5 lg:w-4/5">{children}</div>
        </div>
    );
};

RecruiterDataLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RecruiterDataLayout;
