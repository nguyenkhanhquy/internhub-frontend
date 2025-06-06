import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const CompanyCardSkeleton = () => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: 1,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
    >
        <Skeleton variant="rounded" width="100%" height={160} sx={{ marginBottom: 2 }} />
        <Skeleton variant="text" width="80%" height={32} sx={{ fontSize: "1.25rem" }} />
    </Box>
);

export default CompanyCardSkeleton;
