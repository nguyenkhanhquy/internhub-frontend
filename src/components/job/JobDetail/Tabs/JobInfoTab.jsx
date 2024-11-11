import PropTypes from "prop-types";

import { Box, Typography, Divider, List, ListItem, ListItemText, Stack } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

const JobInfoTab = ({ description, benefits, requirements, address }) => {
    return (
        <>
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
        </>
    );
};

JobInfoTab.propTypes = {
    description: PropTypes.arrayOf(PropTypes.string).isRequired,
    benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
    requirements: PropTypes.arrayOf(PropTypes.string).isRequired,
    address: PropTypes.string.isRequired,
};

export default JobInfoTab;
