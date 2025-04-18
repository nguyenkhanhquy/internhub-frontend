import * as React from "react";
import PropTypes from "prop-types";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

const StyledText = styled("text", { shouldForwardProp: (prop) => prop !== "variant" })(({ theme }) => ({
    textAnchor: "middle",
    dominantBaseline: "central",
    fill: (theme.vars || theme).palette.text.secondary,
    variants: [
        {
            props: {
                variant: "primary",
            },
            style: {
                fontSize: theme.typography.h5.fontSize,
            },
        },
        {
            props: ({ variant }) => variant !== "primary",
            style: {
                fontSize: theme.typography.body2.fontSize,
            },
        },
        {
            props: {
                variant: "primary",
            },
            style: {
                fontWeight: theme.typography.h5.fontWeight,
            },
        },
        {
            props: ({ variant }) => variant !== "primary",
            style: {
                fontWeight: theme.typography.body2.fontWeight,
            },
        },
    ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
    const { width, height, left, top } = useDrawingArea();
    const primaryY = top + height / 2 - 10;
    const secondaryY = primaryY + 24;

    return (
        <React.Fragment>
            <StyledText variant="primary" x={left + width / 2} y={primaryY}>
                {primaryText}
            </StyledText>
            <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
                {secondaryText}
            </StyledText>
        </React.Fragment>
    );
}

const colors = ["rgb(255, 152, 0)", "rgb(33, 150, 243)", "rgb(76, 175, 80)", "hsl(220, 20%, 25%)"];

export default function ChartStudentByInternStatus({ overview }) {
    const { totalStudentsCompleted = 0, totalStudentsWorking = 0, totalStudentsSearching = 0 } = overview;

    const totalStudents = totalStudentsCompleted + totalStudentsWorking + totalStudentsSearching;

    const data = [
        { label: "Đang tìm nơi thực tập", value: totalStudentsSearching },
        { label: "Đang thực tập", value: totalStudentsWorking },
        { label: "Đã thực tập", value: totalStudentsCompleted },
    ];

    const students = [
        {
            name: "Đang tìm nơi thực tập",
            value: totalStudents ? Math.round((totalStudentsSearching / totalStudents) * 100) : 0,
            color: colors[0],
        },
        {
            name: "Đang thực tập",
            value: totalStudents ? Math.round((totalStudentsWorking / totalStudents) * 100) : 0,
            color: colors[1],
        },
        {
            name: "Đã thực tập",
            value: totalStudents ? Math.round((totalStudentsCompleted / totalStudents) * 100) : 0,
            color: colors[2],
        },
    ];

    return (
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2">
                    Thống kê sinh viên thực tập
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PieChart
                        aria-label="Số lượng sinh viên theo tình trạng thực tập"
                        colors={colors}
                        margin={{
                            left: 80,
                            right: 80,
                            top: 80,
                            bottom: 80,
                        }}
                        series={[
                            {
                                data,
                                innerRadius: 70,
                                outerRadius: 100,
                                paddingAngle: 0,
                                highlightScope: { fade: "global", highlight: "item" },
                            },
                        ]}
                        height={260}
                        width={260}
                        slotProps={{
                            legend: { hidden: true },
                        }}
                    >
                        <PieCenterLabel primaryText={totalStudents} secondaryText="Sinh viên" />
                    </PieChart>
                </Box>
                {students.map((student, index) => (
                    <Stack key={index} direction="row" sx={{ alignItems: "center", gap: 2, pb: 2 }}>
                        <Stack sx={{ gap: 1, flexGrow: 1 }}>
                            <Stack
                                direction="row"
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                <Typography variant="body2" sx={{ fontWeight: "500" }}>
                                    {student.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {student.value}%
                                </Typography>
                            </Stack>
                            <LinearProgress
                                variant="determinate"
                                aria-label="Number of students by internship status"
                                value={student.value}
                                sx={{
                                    [`& .${linearProgressClasses.bar}`]: {
                                        backgroundColor: student.color,
                                    },
                                }}
                            />
                        </Stack>
                    </Stack>
                ))}
            </CardContent>
        </Card>
    );
}

ChartStudentByInternStatus.propTypes = {
    overview: PropTypes.object.isRequired,
};

PieCenterLabel.propTypes = {
    primaryText: PropTypes.any.isRequired,
    secondaryText: PropTypes.any.isRequired,
};
