import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

import JobCardBasic from "../../../job/JobCard/JobCardBasic";
import Loading from "../../../loaders/Loading/Loading";

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
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
                VIỆC LÀM PHÙ HỢP NHẤT
            </Typography>

            {loading ? (
                <Loading />
            ) : (
                <>
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
                        {jobList.map((job, index) => (
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
                </>
            )}
        </Box>
    );
};

SuitableJobsSection.propTypes = {
    loading: PropTypes.bool.isRequired,
    jobList: PropTypes.array.isRequired,
};

export default SuitableJobsSection;
