import { Box } from "@mui/material";
import StudentDataNavigation from "../../components/navigations/DataNavigation/StudentDataNavigation";
import PropTypes from "prop-types";

import useAuth from "../../hooks/useAuth";

const StudentDataLayout = ({ children }) => {
    const { user } = useAuth();

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
                    <StudentDataNavigation studentName={user?.name || "Dữ liệu của tôi"} />
                </Box>
            </div>

            {/* Nội dung chính (children) bên phải */}
            <div className="w-full md:w-4/5">{children}</div>
        </div>
    );
};

StudentDataLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StudentDataLayout;
