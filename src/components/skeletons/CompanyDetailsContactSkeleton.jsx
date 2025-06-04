import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";

const CompanyDetailsContactSkeleton = () => {
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
                    {/* Title skeleton */}
                    <Skeleton variant="text" sx={{ fontSize: "1.25rem", width: "60%" }} />

                    <Divider />

                    {/* Địa chỉ công ty section */}
                    <Box>
                        <Stack direction="row" alignItems="flex-start" spacing={1}>
                            <Skeleton variant="circular" width={24} height={24} sx={{ mt: 0.2 }} />
                            <Box sx={{ flex: 1 }}>
                                <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", mb: 0.5 }} />
                                <Skeleton variant="text" sx={{ fontSize: "0.875rem", width: "90%" }} />
                                <Skeleton variant="text" sx={{ fontSize: "0.875rem", width: "70%" }} />
                            </Box>
                        </Stack>
                    </Box>

                    <Divider />

                    {/* Xem bản đồ section */}
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                            <Skeleton variant="circular" width={24} height={24} />
                            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%" }} />
                        </Stack>

                        {/* Map skeleton */}
                        <Box sx={{ mt: 2, borderRadius: 1, overflow: "hidden" }}>
                            <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 1 }} />
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default CompanyDetailsContactSkeleton;
