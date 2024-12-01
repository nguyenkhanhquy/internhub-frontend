import PropTypes from "prop-types";
import { Box, Stack } from "@mui/material";
import JobCardSearch from "../../../job/JobCard/JobCardSearch";
import EmptyBox from "../../../box/EmptyBox";

const JobListingTab = ({ jobs }) => {
    return (
        <Box
            sx={{
                width: "100%",
                mt: 2,
            }}
        >
            {jobs.length > 0 ? (
                <Stack spacing={2}>
                    {jobs.map((job, index) => (
                        <JobCardSearch
                            key={index}
                            id={job.id}
                            logo={job.company.logo}
                            title={job.title}
                            companyName={job.company.name}
                            address={job.address}
                            jobPosition={job.jobPosition}
                            type={job.type}
                            salary={job.salary}
                            updatedDate={job.updatedDate}
                            expiryDate={job.expiryDate}
                            saved={job.saved}
                        />
                    ))}
                </Stack>
            ) : (
                <EmptyBox />
            )}
        </Box>
    );
};

JobListingTab.propTypes = {
    jobs: PropTypes.array.isRequired,
};

export default JobListingTab;
