import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, Typography, Paper } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import SummarySection from "../../section/OverviewPage/SummarySection";

import { getOverview } from "../../../services/adminService";

const OverviewPage = () => {
    const [overview, setOverview] = useState({});

    const studentInternshipData = useMemo(
        () => [
            { name: "Đã thực tập", value: overview.totalStudentsCompleted ?? 0, color: "#4caf50" },
            { name: "Đang thực tập", value: overview.totalStudentsWorking ?? 0, color: "#2196f3" },
            { name: "Đang tìm nơi thực tập", value: overview.totalStudentsSearching ?? 0, color: "#ff9800" },
        ],
        [overview],
    );

    const fetchData = useCallback(async () => {
        try {
            const data = await getOverview();
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setOverview(data.result);
        } catch (error) {
            toast.error(error.message);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Box
            sx={{
                px: 2,
                display: "flex",
                flexDirection: "column",
                gap: 4,
            }}
        >
            {/* Section: Summary Cards */}
            <SummarySection overview={overview} />

            {/* Section: Pie Chart */}
            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Thống kê sinh viên thực tập
                </Typography>
                <Box sx={{ height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                isAnimationActive={true}
                                animationDuration={400}
                                data={studentInternshipData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                innerRadius={60}
                                fill="#8884d8"
                                cursor={"pointer"}
                                label={({ name, percent, value }) => {
                                    // Kiểm tra cả percent và value
                                    return percent >= 0 && value >= 0
                                        ? `${name} (${(percent * 100).toFixed(1)}%)`
                                        : null;
                                }}
                            >
                                {studentInternshipData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value} sinh viên`} />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>
        </Box>
    );
};

export default OverviewPage;
