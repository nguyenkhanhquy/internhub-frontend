import PropTypes from "prop-types";

import { Box, Typography, Divider, Stack } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

const CompanyInfoTab = ({ description, address }) => {
    return (
        <>
            {/* Mô tả công ty */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="bold">
                    Mô tả công ty
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: description }} />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Địa chỉ công ty */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOn />
                    <Typography variant="h6" fontWeight="bold">
                        Địa chỉ công ty:
                    </Typography>
                </Stack>
                <Typography variant="body1" sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: address }} />
            </Box>
        </>
    );
};

CompanyInfoTab.propTypes = {
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
};

export default CompanyInfoTab;
