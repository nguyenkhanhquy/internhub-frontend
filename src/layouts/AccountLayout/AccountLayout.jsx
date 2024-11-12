import { Box } from "@mui/material";
import AccountNavigation from "../../components/navigations/AccountNavigation/AccountNavigation";
import PropTypes from "prop-types";

const AccountLayout = ({ children }) => {
    return (
        <Box sx={{ display: "flex", px: 10, py: 4, minHeight: 600 }}>
            {/* Bảng điều hướng bên trái */}
            <Box sx={{ position: "sticky", top: 0, height: 200, maxWidth: 300, mr: 4 }}>
                <AccountNavigation />
            </Box>

            {/* Nội dung bên phải */}
            <Box component="main" sx={{ flexGrow: 1, width: "90%", maxWidth: 1200 }}>
                {children}
            </Box>
        </Box>
    );
};

AccountLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AccountLayout;
