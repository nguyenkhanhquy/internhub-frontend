import PropTypes from "prop-types";

import { Box, Typography, Avatar, Stack, useMediaQuery } from "@mui/material";

import Language from "@mui/icons-material/Language";
import LocationOn from "@mui/icons-material/LocationOn";

const CompanyDetailsHeader = ({ logo, name, website, address }) => {
    // Kiểm tra kích thước màn hình
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const isMediumScreen = useMediaQuery("(max-width: 960px)");

    // Xác định kích thước của avatar
    const avatarSize = isSmallScreen ? 80 : isMediumScreen ? 120 : 140;

    return (
        <Box
            sx={{
                backgroundColor: "white",
                p: 2,
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                mb: 3,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                <Avatar
                    src={logo}
                    alt={`${name} logo`}
                    variant="square"
                    sx={{
                        width: avatarSize,
                        height: avatarSize,
                        borderRadius: 2,
                    }}
                />

                <Box>
                    <Typography variant={isSmallScreen ? "h6" : "h5"} fontWeight="bold" sx={{ mb: 1 }}>
                        {name}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <Language fontSize="small" sx={{ color: "#555" }} />
                        <Typography variant="body1">
                            <strong>Website:</strong>{" "}
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#1976d2", fontWeight: 600 }}
                            >
                                {website}
                            </a>
                        </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <LocationOn fontSize="small" sx={{ color: "#555" }} />
                        <Typography variant="body1">
                            <strong>Địa chỉ:</strong> {address}
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

CompanyDetailsHeader.propTypes = {
    logo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
};

export default CompanyDetailsHeader;
