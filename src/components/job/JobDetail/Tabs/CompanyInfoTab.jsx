import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CompanyInfoTab = ({ description }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight="bold">
                Giới thiệu công ty
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    mt: 2,
                    "& a": {
                        color: "primary.main",
                    },
                    "& p": {
                        mb: 2,
                    },
                    "& ul": {
                        listStyleType: "disc",
                        pl: 4,
                        mt: 2,
                        mb: 2,
                    },
                    "& ol": {
                        listStyleType: "decimal",
                        pl: 4,
                        mt: 2,
                        mb: 2,
                    },
                    "& li": {
                        mb: 1,
                    },
                }}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </Box>
    );
};

CompanyInfoTab.propTypes = {
    description: PropTypes.string.isRequired,
};

export default CompanyInfoTab;
