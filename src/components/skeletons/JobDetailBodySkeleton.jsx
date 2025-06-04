import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";

const JobDetailBodySkeleton = () => {
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
                paddingTop: 0.5,
            }}
        >
            {/* Tabs skeleton */}
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1, mb: 3 }}>
                    <Stack direction="row" spacing={4}>
                        <Skeleton variant="text" width={150} height={40} />
                        <Skeleton variant="text" width={130} height={40} />
                        <Skeleton variant="text" width={180} height={40} />
                        <Skeleton variant="text" width={140} height={40} />
                    </Stack>
                </Box>

                {/* Tab content skeleton */}
                <Box sx={{ mt: 3 }}>
                    <Stack spacing={3}>
                        {/* Mô tả công việc section */}
                        <Box>
                            <Skeleton variant="text" sx={{ fontSize: "1.25rem", width: "20%", mb: 2 }} />

                            <Stack spacing={1}>
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="text" width="95%" />
                                <Skeleton variant="text" width="90%" />
                                <Skeleton variant="text" width="85%" />
                                <Skeleton variant="text" width="92%" />
                            </Stack>
                            <Divider sx={{ mt: 2 }} />
                        </Box>

                        {/* Yêu cầu công việc section */}
                        <Box>
                            <Skeleton variant="text" sx={{ fontSize: "1.25rem", width: "35%", mb: 2 }} />

                            <Stack spacing={1}>
                                <Stack direction="row" alignItems="flex-start" spacing={1}>
                                    <Skeleton variant="text" width={20} height={20} sx={{ mt: 0.2 }} />
                                    <Skeleton variant="text" width="88%" />
                                </Stack>
                                <Stack direction="row" alignItems="flex-start" spacing={1}>
                                    <Skeleton variant="text" width={20} height={20} sx={{ mt: 0.2 }} />
                                    <Skeleton variant="text" width="82%" />
                                </Stack>
                                <Stack direction="row" alignItems="flex-start" spacing={1}>
                                    <Skeleton variant="text" width={20} height={20} sx={{ mt: 0.2 }} />
                                    <Skeleton variant="text" width="90%" />
                                </Stack>
                                <Stack direction="row" alignItems="flex-start" spacing={1}>
                                    <Skeleton variant="text" width={20} height={20} sx={{ mt: 0.2 }} />
                                    <Skeleton variant="text" width="75%" />
                                </Stack>
                            </Stack>
                            <Divider sx={{ mt: 2 }} />
                        </Box>

                        {/* Quyền lợi section */}
                        <Box>
                            <Skeleton variant="text" sx={{ fontSize: "1.25rem", width: "30%", mb: 2 }} />

                            <Stack spacing={1}>
                                <Stack direction="row" alignItems="flex-start" spacing={1}>
                                    <Skeleton variant="text" width={20} height={20} sx={{ mt: 0.2 }} />
                                    <Skeleton variant="text" width="85%" />
                                </Stack>
                                <Stack direction="row" alignItems="flex-start" spacing={1}>
                                    <Skeleton variant="text" width={20} height={20} sx={{ mt: 0.2 }} />
                                    <Skeleton variant="text" width="78%" />
                                </Stack>
                                <Stack direction="row" alignItems="flex-start" spacing={1}>
                                    <Skeleton variant="text" width={20} height={20} sx={{ mt: 0.2 }} />
                                    <Skeleton variant="text" width="92%" />
                                </Stack>
                            </Stack>
                            <Divider sx={{ mt: 2 }} />
                        </Box>

                        {/* Địa chỉ làm việc section */}
                        <Box>
                            <Skeleton variant="text" sx={{ fontSize: "1.25rem", width: "38%", mb: 2 }} />
                            <Stack direction="row" alignItems="flex-start" spacing={1}>
                                <Skeleton variant="circular" width={24} height={24} sx={{ mt: 0.2 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Skeleton variant="text" width="90%" />
                                    <Skeleton variant="text" width="70%" />
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default JobDetailBodySkeleton;
