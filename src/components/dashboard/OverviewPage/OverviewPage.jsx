import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import { Box, Grid, Stack } from "@mui/material";
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
                px: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            {/* Section: Summary Cards */}
            <SummarySection overview={overview} router={router} />

            {/* Section: Pie Chart */}
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Stack gap={2} direction={{ xs: "column", sm: "row" }}>
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
