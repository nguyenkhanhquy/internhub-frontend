import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";

const JobDetailSummarySkeleton = () => {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                p: 3,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                mb: 4,
                width: "100%",
                margin: "0 auto",
            }}
        >
            <Skeleton variant="text" sx={{ fontSize: "1.25rem", width: "60%", mb: 2 }} />
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
                {/* Trợ cấp */}
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                    <Skeleton variant="text" width="60%" />
                </Box>

                {/* Số lượng tuyển dụng */}
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                    <Skeleton variant="text" width="30%" />
                </Box>

                {/* Hình thức làm việc */}
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                    <Skeleton variant="text" width="50%" />
                </Box>

                {/* Thời gian làm việc */}
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                    <Skeleton variant="text" width="45%" />
                </Box>

                {/* Ngày đăng */}
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                    <Skeleton variant="text" width="40%" />
                </Box>

                {/* Ngày hết hạn */}
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                    <Skeleton variant="text" width="55%" />
                </Box>

                {/* Vị trí công việc */}
                <Box display="flex" flexWrap="wrap">
                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                    <Skeleton variant="text" width="65%" />
                </Box>

                {/* Ngành đào tạo */}
                <Box display="flex" flexWrap="wrap">
                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                    <Stack direction="column" spacing={1} flexWrap="wrap">
                        <Skeleton variant="rectangular" width={120} height={24} sx={{ borderRadius: "16px" }} />
                        <Skeleton variant="rectangular" width={140} height={24} sx={{ borderRadius: "16px" }} />
                        <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: "16px" }} />
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default JobDetailSummarySkeleton;
