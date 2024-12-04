import { Box, Typography } from "@mui/material";

const OverviewPage = () => {
    return (
        <Box
            sx={{
                py: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Overview Page
            </Typography>
            <Typography>This is the overview page.</Typography>
        </Box>
    );
};

export default OverviewPage;
