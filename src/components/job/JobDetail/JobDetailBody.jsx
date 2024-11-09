import PropTypes from "prop-types";
import { Box, Typography, Divider, List, ListItem, ListItemText, Stack } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

const JobDetailBody = ({ description, benefits, requirements, address }) => {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                p: 4,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                mb: 4,
                lineHeight: 1.6,
                width: "100%",
                margin: "0 auto",
            }}
        >
            {/* Mô tả công việc */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="bold">
                    Mô tả công việc
                </Typography>
                <List>
                    {description.map((desc, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText
                                primary={`• ${desc}`}
                                primaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Phúc lợi dành cho bạn */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="bold">
                    Phúc lợi dành cho bạn
                </Typography>
                <List>
                    {benefits.map((benefit, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText
                                primary={`• ${benefit}`}
                                primaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Yêu cầu công việc */}
            <Box>
                <Typography variant="h6" fontWeight="bold">
                    Yêu cầu công việc
                </Typography>
                <List>
                    {requirements.map((requirement, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText
                                primary={`• ${requirement}`}
                                primaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Địa chỉ làm việc */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOn />
                    <Typography variant="h6" fontWeight="bold">
                        Địa chỉ làm việc:
                    </Typography>
                </Stack>
                <Typography variant="body1" sx={{ ml: 4 }}>
                    {address}
                </Typography>
            </Box>
        </Box>
    );
};

JobDetailBody.propTypes = {
    description: PropTypes.arrayOf(PropTypes.string).isRequired,
    benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
    requirements: PropTypes.arrayOf(PropTypes.string).isRequired,
    address: PropTypes.string.isRequired,
};

export default JobDetailBody;
