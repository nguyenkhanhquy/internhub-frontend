import PropTypes from "prop-types";

import { Box, Typography, Divider, Stack } from "@mui/material";

import LocationOn from "@mui/icons-material/LocationOn";

const CompanyInfoTab = ({ description, address }) => {
    return (
        <>
            {/* Mô tả công ty */}
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

            <Divider sx={{ my: 3 }} />

            {/* Địa chỉ công ty */}
            <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOn />
                    <Typography variant="h6" fontWeight="bold">
                        Địa chỉ công ty
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
