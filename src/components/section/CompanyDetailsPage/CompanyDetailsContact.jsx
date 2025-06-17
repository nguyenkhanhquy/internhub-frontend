import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import LocationOn from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";

const CompanyDetailsContact = ({ companyName, address }) => {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                mb: 4,
                width: "100%",
                margin: "0 auto",
                overflow: "hidden",
            }}
        >
            <Box sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Typography variant="h6" fontWeight="bold">
                        Thông tin liên hệ
                    </Typography>

                    <Divider />

                    {/* Địa chỉ công ty */}
                    <Box display="flex" alignItems="flex-start">
                        <LocationOn fontSize="medium" color="primary" sx={{ mr: 1.5, mt: 1.5 }} />
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1" sx={{ minWidth: "130px" }}>
                                Địa chỉ công ty
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#666", lineHeight: 1.6, wordBreak: "break-word" }}
                            >
                                {address}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider />

                    {/* Xem bản đồ */}
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <MapIcon fontSize="medium" color="primary" sx={{ mr: 1.5, mt: 1.5 }} />
                            <Typography variant="body1" fontWeight="bold">
                                Xem bản đồ
                            </Typography>
                        </Stack>

                        {/* Bản đồ nhỏ luôn hiển thị */}
                        <Box sx={{ mt: 2, borderRadius: 1, overflow: "hidden" }}>
                            <iframe
                                title={`Bản đồ ${companyName}`}
                                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

CompanyDetailsContact.propTypes = {
    companyName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
};

export default CompanyDetailsContact;
