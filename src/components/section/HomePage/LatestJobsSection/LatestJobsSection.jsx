import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import JobCardBasic from "../../../job/JobCard/JobCardBasic";

const LatestJobsSection = ({ jobList }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "50vh",
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
                VIỆC LÀM MỚI NHẤT
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 2,
                    "@media (max-width: 900px)": {
                        gridTemplateColumns: "repeat(2, 1fr)",
                    },
                    "@media (max-width: 600px)": {
                        gridTemplateColumns: "1fr",
                    },
                }}
            >
                {jobList.map((job, index) => (
                    <JobCardBasic
                        key={index}
                        id={job.id}
                        logo={job.logo}
                        title={job.title}
                        companyName={job.companyName}
                        address={job.address}
                        remote={job.remote}
                        type={job.type}
                    />
                ))}
            </Box>

            {/* Button Xem thêm */}
            <Button
                variant="contained"
                sx={{
                    padding: "8px 16px",
                    backgroundColor: "#2e3090",
                    color: "white",
                    "&:hover": { backgroundColor: "#1f2061" },
                }}
                onClick={() => navigate("/search")}
            >
                Xem thêm
            </Button>
        </Box>
    );
};

LatestJobsSection.propTypes = {
    jobList: PropTypes.array.isRequired,
};

export default LatestJobsSection;
