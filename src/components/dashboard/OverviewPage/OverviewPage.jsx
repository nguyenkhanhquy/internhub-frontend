import { Box, Typography, Paper } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import SummarySection from "../../section/OverviewPage/SummarySection";

const studentInternshipData = [
    { name: "Đã thực tập", value: 1234, color: "#4caf50" }, // Màu xanh lá
    { name: "Đang thực tập", value: 567, color: "#2196f3" }, // Màu xanh dương
    { name: "Đang tìm nơi thực tập", value: 789, color: "#ff9800" }, // Màu cam
];

const DashboardPage = () => {
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
            <SummarySection />

            {/* Section: Pie Chart */}
            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Thống kê thực tập
                </Typography>
                <Box sx={{ height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={studentInternshipData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                innerRadius={60} // Biểu đồ tròn rỗng ở giữa (donut chart)
                                fill="#8884d8"
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
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

export default DashboardPage;
