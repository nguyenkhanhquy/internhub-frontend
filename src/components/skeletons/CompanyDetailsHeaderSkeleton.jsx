import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";

const CompanyDetailsHeaderSkeleton = () => {
    // Kiểm tra kích thước màn hình
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const isMediumScreen = useMediaQuery("(max-width: 960px)");

    // Xác định kích thước của avatar skeleton
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
                {/* Avatar skeleton */}
                <Skeleton variant="rectangular" width={avatarSize} height={avatarSize} sx={{ borderRadius: 2 }} />

                <Box sx={{ flex: 1 }}>
                    {/* Company name skeleton */}
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: isSmallScreen ? "1.25rem" : "1.5rem",
                            mb: 1,
                            width: "60%",
                        }}
                    />

                    {/* Website skeleton */}
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%" }} />
                    </Stack>

                    {/* Address skeleton */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70%" }} />
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default CompanyDetailsHeaderSkeleton;
