import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";

const JobDetailHeaderSkeleton = () => {
    // Kiểm tra kích thước màn hình
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const isTabletScreen = useMediaQuery("(max-width: 900px)");
    const avatarSize = isSmallScreen ? 40 : isTabletScreen ? 56 : 140;

    return (
        <Box
            sx={{
                backgroundColor: "white",
                p: isSmallScreen ? 0.75 : isTabletScreen ? 1.2 : 2,
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                mb: 3,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: isSmallScreen ? 1 : isTabletScreen ? 1.2 : 2,
            }}
        >
            <Stack
                direction={isSmallScreen ? "column" : isTabletScreen ? "column" : "row"}
                spacing={isSmallScreen ? 1 : isTabletScreen ? 1.2 : 2}
                alignItems={isSmallScreen ? "flex-start" : isTabletScreen ? "flex-start" : "center"}
                justifyContent="space-between"
                flexWrap="wrap"
            >
                <Stack
                    direction="row"
                    spacing={isSmallScreen ? 1 : isTabletScreen ? 1.2 : 2}
                    alignItems={isSmallScreen ? "flex-start" : isTabletScreen ? "flex-start" : "center"}
                    sx={{ flex: 1, flexWrap: "wrap", width: "100%" }}
                >
                    {/* Avatar skeleton */}
                    <Skeleton
                        variant="rectangular"
                        width={avatarSize}
                        height={avatarSize}
                        sx={{
                            borderRadius: 2,
                            mr: isSmallScreen ? 1.5 : isTabletScreen ? 1.2 : 2,
                            mb: isSmallScreen ? 1 : isTabletScreen ? 0.5 : 0,
                        }}
                    />

                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        {/* Title skeleton */}
                        <Skeleton
                            variant="text"
                            sx={{
                                fontSize: isSmallScreen ? "1.05rem" : isTabletScreen ? "1.15rem" : "1.5rem",
                                width: "70%",
                                mb: isSmallScreen ? 0.25 : isTabletScreen ? 0.3 : 0.5,
                            }}
                        />

                        {/* Company info skeleton */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mb: isSmallScreen ? 0.25 : 0.5, flexWrap: "wrap" }}
                        >
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: isSmallScreen ? "0.85rem" : "1rem",
                                    width: "50%",
                                }}
                            />
                        </Stack>

                        {/* Address skeleton */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mb: isSmallScreen ? 0.25 : 0.5, flexWrap: "wrap" }}
                        >
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: isSmallScreen ? "0.8rem" : "0.875rem",
                                    width: "80%",
                                }}
                            />
                        </Stack>

                        {/* Job position skeleton */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mb: isSmallScreen ? 0.25 : 0.5, flexWrap: "wrap" }}
                        >
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: isSmallScreen ? "0.8rem" : "0.875rem",
                                    width: "60%",
                                }}
                            />
                        </Stack>

                        {/* Date info skeleton */}
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: isSmallScreen ? "0.8rem" : "0.875rem",
                                    width: "90%",
                                }}
                            />
                        </Stack>
                    </Box>
                </Stack>

                {/* Buttons skeleton */}
                <Stack
                    direction={isSmallScreen || isTabletScreen ? "row" : "column"}
                    spacing={isSmallScreen ? 0.5 : isTabletScreen ? 0.6 : 2}
                    sx={{
                        minWidth: isSmallScreen ? "100%" : isTabletScreen ? 0 : 200,
                        mt: isSmallScreen ? 1 : isTabletScreen ? 0.5 : 0,
                        width: isSmallScreen ? "100%" : isTabletScreen ? "100%" : undefined,
                        alignItems: isSmallScreen || isTabletScreen ? "flex-end" : "center",
                        justifyContent: isSmallScreen || isTabletScreen ? "flex-end" : undefined,
                        flex: isTabletScreen ? 1 : undefined,
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        width={isSmallScreen ? 120 : 200}
                        height={44}
                        sx={{ borderRadius: 1 }}
                    />
                    <Skeleton
                        variant="rectangular"
                        width={isSmallScreen ? 120 : 200}
                        height={44}
                        sx={{ borderRadius: 1 }}
                    />
                </Stack>
            </Stack>
        </Box>
    );
};

export default JobDetailHeaderSkeleton;
