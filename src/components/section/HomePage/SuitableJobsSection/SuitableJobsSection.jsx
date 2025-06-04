import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import JobCardBasic from "@components/job/JobCard/JobCardBasic";
import JobCardBasicSkeleton from "@components/skeletons/JobCardBasicSkeleton";

const SuitableJobsSection = ({ loading, jobList }) => {
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
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 3 }}>
                VIỆC LÀM PHÙ HỢP
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
                    ? Array.from({ length: 6 }).map((_, index) => <JobCardBasicSkeleton key={index} />)
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
        </Box>
    );
};

SuitableJobsSection.propTypes = {
    loading: PropTypes.bool.isRequired,
    jobList: PropTypes.array.isRequired,
};

export default SuitableJobsSection;
