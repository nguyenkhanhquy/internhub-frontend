import { Box } from "@mui/material";
import StudentDataNavigation from "../../components/navigations/DataNavigation/StudentDataNavigation";
import PropTypes from "prop-types";

const StudentDataLayout = ({ children }) => {
    return (
        <Box sx={{ display: "flex", px: 10, py: 4, minHeight: 600 }}>
            {/* Bảng điều hướng bên trái */}
            <Box sx={{ position: "sticky", top: 0, height: 200, mr: 4 }}>
                <StudentDataNavigation studentName="Nguyễn Khánh Quy" />
            </Box>

            {/* Nội dung bên phải */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 20 }}>
                {children}
            </Box>
        </Box>
    );
};

StudentDataLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StudentDataLayout;
