import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import SummarySection from "@components/section/OverviewPage/SummarySection";
import ChartStudentByInternStatus from "./ChartStudentByInternStatus";

import { getOverview } from "@services/adminService";

const OverviewPage = ({ router }) => {
    const [overview, setOverview] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOverview();
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setOverview(data.result);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <Box
            sx={{
                py: 4,
                px: 2,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, lg: 9 }}>
                    {/* Section: Summary Cards */}
                    <SummarySection overview={overview} router={router} />
                </Grid>
                <Grid size={{ xs: 12, lg: 3 }}>
                    {/* Section: Pie Chart */}
                    <Stack sx={{ height: "100%" }} gap={2} direction={{ xs: "column", sm: "row" }}>
                        <ChartStudentByInternStatus overview={overview} />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

OverviewPage.propTypes = {
    router: PropTypes.object,
};

export default OverviewPage;
