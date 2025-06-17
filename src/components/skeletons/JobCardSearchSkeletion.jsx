import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const JobCardSearchSkeleton = () => {
    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: 1,
                p: 2,
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                border: "1px solid transparent",
            }}
        >
            {/* Logo công ty skeleton */}
            <Box
                sx={{
                    width: { xs: 80, sm: 140, md: 150, lg: 160 },
                    aspectRatio: "1 / 1",
                    mr: 2,
                }}
            >
                <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 2 }} />
            </Box>

            {/* Nội dung công việc skeleton */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                {/* Tiêu đề công việc và nút lưu skeleton */}
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Skeleton animation="wave" variant="text" width="70%" height={28} />
                    <Skeleton animation="wave" variant="circular" width={30} height={30} />
                </Box>

                {/* Thông tin công ty skeleton */}
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <Skeleton animation="wave" variant="circular" width={20} height={20} />
                    <Skeleton animation="wave" variant="text" width="60%" height={20} />
                </Stack>

                {/* Địa chỉ skeleton */}
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <Skeleton animation="wave" variant="circular" width={20} height={20} />
                    <Skeleton animation="wave" variant="text" width="65%" height={20} />
                </Stack>

                {/* Vị trí và kiểu công việc skeleton */}
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <Skeleton animation="wave" variant="circular" width={20} height={20} />
                    <Skeleton animation="wave" variant="text" width="55%" height={20} />
                </Stack>

                {/* Trợ cấp skeleton */}
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <Skeleton animation="wave" variant="circular" width={20} height={20} />
                    <Skeleton animation="wave" variant="text" width="40%" height={20} />
                </Stack>

                {/* Divider */}
                <Divider sx={{ mb: 0.5 }} />

                {/* Ngày cập nhật và hạn nộp skeleton */}
                <Skeleton animation="wave" variant="text" width="80%" height={20} />
            </Box>
        </Card>
    );
};

export default JobCardSearchSkeleton;
