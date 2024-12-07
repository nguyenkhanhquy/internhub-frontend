import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import JobCardBasic from "../../../job/JobCard/JobCardBasic";
import Loading from "../../../loaders/Loading/Loading";

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
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
                VIỆC LÀM MỚI NHẤT
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
                </>
            )}
        </Box>
    );
};

LatestJobsSection.propTypes = {
    loading: PropTypes.bool.isRequired,
    jobList: PropTypes.array.isRequired,
};

export default LatestJobsSection;
