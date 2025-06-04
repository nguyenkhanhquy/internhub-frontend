import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const JobCardBasicSkeleton = () => {
    return (
        <Card
            sx={{
                maxWidth: 420,
                minHeight: 160,
                mb: 1,
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                padding: 2,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", minWidth: 400 }}>
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={100}
                    height={100}
                    sx={{ borderRadius: 2, mr: 2 }}
                />
                <Box sx={{ flex: 1 }}>
                    <Skeleton animation="wave" variant="text" width="80%" height={40} sx={{ mb: 1 }} />
                    <Skeleton animation="wave" variant="text" width="50%" height={24} sx={{ mb: 2 }} />
                    <Stack direction="row" spacing={1}>
                        <Skeleton animation="wave" variant="rounded" width={70} height={24} />
                        <Skeleton animation="wave" variant="rounded" width={120} height={24} />
                    </Stack>
                </Box>
            </Box>
        </Card>
    );
};

export default JobCardBasicSkeleton;
