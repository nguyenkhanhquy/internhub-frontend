import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import JobCardBasic from "@components/job/JobCard/JobCardBasic";
import JobCardBasicSkeleton from "@components/skeletons/JobCardBasicSkeleton";

const LatestJobsSection = ({ loading, jobList }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                sx={{
                    mb: 2,
                    color: "#333",
                    fontSize: {
                        xs: "1.5rem",
                        sm: "2.125rem",
                    },
                    fontWeight: 600,
                }}
            >
                VIỆC LÀM MỚI NHẤT
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 2,
                    "@media (max-width: 1400px)": {
                        gridTemplateColumns: "repeat(2, 1fr)",
                    },
                    "@media (max-width: 960px)": {
                        gridTemplateColumns: "1fr",
                    },
                }}
            >
                {loading
                    ? Array.from({ length: 12 }).map((_, index) => <JobCardBasicSkeleton key={index} />)
                    : jobList.map((job, index) => (
                          <JobCardBasic
                              key={index}
                              id={job.id}
                              logo={job.company.logo}
                              title={job.title}
                              companyName={job.company.name}
                              remote={job.remote}
                              type={job.type}
                          />
                      ))}
            </Box>

            <Button
                disabled={loading}
                variant="contained"
                sx={{
                    mt: 1,
                    px: 3,
                    py: 1,
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
    loading: PropTypes.bool.isRequired,
    jobList: PropTypes.array.isRequired,
};

export default LatestJobsSection;
