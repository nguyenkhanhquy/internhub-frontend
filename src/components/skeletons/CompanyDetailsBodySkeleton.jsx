import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const CompanyDetailsBodySkeleton = () => {
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
                paddingTop: 2,
            }}
        >
            {/* Tabs skeleton */}
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1, mb: 3 }}>
                    <Stack direction="row" spacing={4} sx={{ px: 2 }}>
                        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "140px" }} />
                        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "140px" }} />
                    </Stack>
                </Box>

                {/* Tab content skeleton */}
                <Box>
                    {/* Title skeleton */}
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "40%", mb: 2 }} />

                    {/* Paragraph skeletons */}
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%", mb: 1 }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "95%", mb: 1 }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "85%", mb: 1 }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "90%", mb: 2 }} />

                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%", mb: 1 }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80%", mb: 1 }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "75%", mb: 2 }} />

                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "90%", mb: 2 }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%", mb: 1 }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "90%", mb: 2 }} />
                </Box>
            </Box>
        </Box>
    );
};

export default CompanyDetailsBodySkeleton;
