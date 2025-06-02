import PropTypes from "prop-types";

import { Box, Typography, Stack, Divider } from "@mui/material";

import LocationOn from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";

const JobDetailContact = ({ companyName, address }) => {
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
                    <Box>
                        <Stack direction="row" alignItems="flex-start" spacing={1}>
                            <LocationOn sx={{ mt: 0.2 }} />
                            <Box>
                                <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5 }}>
                                    Địa chỉ công ty
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
                                    {address}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Divider />

                    {/* Xem bản đồ */}
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <MapIcon />
                            <Typography variant="body1" fontWeight="bold">
                                Xem bản đồ
                            </Typography>
                        </Stack>

                        {/* Bản đồ nhỏ luôn hiển thị */}
                        <Box sx={{ mt: 2, borderRadius: 1, overflow: "hidden" }}>
                            <iframe
                                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Bản đồ ${companyName}`}
                            />
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

JobDetailContact.propTypes = {
    companyName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
};

export default JobDetailContact;
