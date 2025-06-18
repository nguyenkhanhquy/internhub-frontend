import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

import SaveIcon from "@mui/icons-material/Save";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ScoreEntry = ({
    enrollment,
    score,
    feedback,
    onScoreChange,
    onFeedbackChange,
    onSaveScore,
    onBackToList,
    onOpenReportDetails,
}) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}>
            <Card elevation={3} sx={{ flex: 1, borderRadius: 2 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Typography variant="h6" fontWeight="bold" mb={2} color="primary.main">
                                Điểm số
                            </Typography>
                            <TextField
                                type="number"
                                label="Nhập điểm (0-10)"
                                value={score}
                                onChange={(e) => onScoreChange(e.target.value)}
                                variant="outlined"
                                fullWidth
                                slotProps={{
                                    htmlInput: {
                                        min: 0,
                                        max: 10,
                                        step: 0.1,
                                    },
                                }}
                                helperText="Điểm từ 0 đến 10"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "&:hover fieldset": {
                                            borderColor: "primary.main",
                                        },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={12}>
                            <Typography variant="h6" fontWeight="bold" mb={2} color="primary.main">
                                Nhận xét chung
                            </Typography>
                            <TextField
                                multiline
                                rows={5}
                                placeholder="Nhập nhận xét chi tiết về kết quả thực tập của sinh viên..."
                                value={feedback}
                                onChange={(e) => onFeedbackChange(e.target.value)}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "&:hover fieldset": {
                                            borderColor: "primary.main",
                                        },
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={onSaveScore}>
                    Lưu
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<DescriptionIcon />}
                    onClick={() => onOpenReportDetails(enrollment)}
                    disabled={!enrollment.internshipReport}
                >
                    Báo cáo chi tiết
                </Button>
                <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />} onClick={onBackToList}>
                    Quay lại
                </Button>
            </Box>
        </Box>
    );
};

ScoreEntry.propTypes = {
    enrollment: PropTypes.object.isRequired,
    score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    feedback: PropTypes.string.isRequired,
    onScoreChange: PropTypes.func.isRequired,
    onFeedbackChange: PropTypes.func.isRequired,
    onSaveScore: PropTypes.func.isRequired,
    onBackToList: PropTypes.func.isRequired,
    onOpenReportDetails: PropTypes.func.isRequired,
};

export default ScoreEntry;
