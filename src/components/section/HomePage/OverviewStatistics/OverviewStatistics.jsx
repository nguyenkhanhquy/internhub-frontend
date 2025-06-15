import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import AnimatedCounter from "@components/common/AnimatedCounter/AnimatedCounter";

const OverviewStatistics = ({ overview }) => {
    return (
        <Box sx={{ width: { xs: "100%", sm: "80%" }, margin: "0 auto" }}>
            <Grid container spacing={2} justifyContent="center" alignItems="stretch">
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                    <Paper
                        sx={{
                            p: 2,
                            textAlign: "center",
                            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            transition: "all 0.3s ease-in-out", // Thêm hiệu ứng mượt
                            "&:hover": {
                                borderColor: "warning.main",
                                boxShadow: 2,
                                cursor: "default",
                            },
                        }}
                    >
                        <AnimatedCounter value={overview.totalInternStudents || 0} color="warning" duration={2000} />
                        <Typography variant="body1" color="text.secondary">
                            Sinh viên thực tập
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                    <Paper
                        sx={{
                            p: 2,
                            textAlign: "center",
                            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            transition: "all 0.3s ease-in-out", // Thêm hiệu ứng mượt
                            "&:hover": {
                                borderColor: "primary.main",
                                boxShadow: 2,
                                cursor: "default",
                            },
                        }}
                    >
                        <AnimatedCounter value={overview.maxExpectedAcceptances || 0} color="primary" duration={1800} />
                        <Typography variant="body1" color="text.secondary">
                            Vị trí thực tập dự kiến
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                    <Paper
                        sx={{
                            p: 2,
                            textAlign: "center",
                            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            transition: "all 0.3s ease-in-out", // Thêm hiệu ứng mượt
                            "&:hover": {
                                borderColor: "success.main",
                                boxShadow: 2,
                                cursor: "default",
                            },
                        }}
                    >
                        <AnimatedCounter value={overview.acceptedStudents || 0} color="success" duration={1600} />
                        <Typography variant="body1" color="text.secondary">
                            Sinh viên đã được nhận
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

OverviewStatistics.propTypes = {
    overview: PropTypes.object.isRequired,
};

export default OverviewStatistics;
