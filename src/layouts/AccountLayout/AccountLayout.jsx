import { Box } from "@mui/material";
import AccountNavigation from "../../components/navigations/AccountNavigation/AccountNavigation";
import PropTypes from "prop-types";

const AccountLayout = ({ children }) => {
    return (
        <Box sx={{ display: "flex", pl: 20, bgcolor: "#f0f2f5" }}>
            {/* Bảng điều hướng bên trái */}
            <Box sx={{ position: "sticky", top: 0, height: 200, p: 2, mr: 4, mt: 2 }}>
                <AccountNavigation />
            </Box>

            {/* Nội dung bên phải */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 20 }}>
                {children}
            </Box>
        </Box>
    );
};

AccountLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AccountLayout;
