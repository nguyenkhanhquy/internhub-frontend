import PropTypes from "prop-types";

import { Box, Typography, Divider, Stack } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

const JobInfoTab = ({ description, benefits, requirements, address }) => {
    return (
        <>
            {/* Mô tả công việc */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="bold">
                    Mô tả công việc
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: description }} />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Quyền lợi */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="bold">
                    Quyền lợi
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: benefits }} />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Yêu cầu công việc */}
            <Box>
                <Typography variant="h6" fontWeight="bold">
                    Yêu cầu công việc
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: requirements }} />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Địa chỉ làm việc */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOn />
                    <Typography variant="h6" fontWeight="bold">
                        Địa chỉ làm việc
                    </Typography>
                </Stack>
                <Typography variant="body1" sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: address }} />
            </Box>
        </>
    );
};

JobInfoTab.propTypes = {
    description: PropTypes.string.isRequired,
    benefits: PropTypes.string.isRequired,
    requirements: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
};

export default JobInfoTab;
