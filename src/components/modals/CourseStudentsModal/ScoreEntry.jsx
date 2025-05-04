import PropTypes from "prop-types";
import { Box, Typography, TextField, TextareaAutosize, Button } from "@mui/material";

const ScoreEntry = ({
    student,
    score,
    comment,
    onScoreChange,
    onCommentChange,
    onSaveScore,
    onBackToList,
    onOpenReportDetails,
}) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}>
            <Box>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    Điểm
                </Typography>
                <TextField
                    type="number"
                    label="Nhập điểm"
                    value={score}
                    onChange={(e) => onScoreChange(e.target.value)}
                    variant="outlined"
                    fullWidth
                    inputProps={{ min: 0, max: 10, step: 0.1 }}
                />
            </Box>
            <Box>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    Nhận xét chung
                </Typography>
                <TextareaAutosize
                    minRows={5}
                    placeholder="Nhập nhận xét..."
                    value={comment}
                    onChange={(e) => onCommentChange(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        resize: "vertical",
                    }}
                />
            </Box>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button variant="contained" color="primary" onClick={onSaveScore}>
                    Lưu
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onOpenReportDetails(student)}
                    disabled={!student.report}
                >
                    Báo cáo chi tiết
                </Button>
                <Button variant="outlined" color="primary" onClick={onBackToList}>
                    Quay lại
                </Button>
            </Box>
        </Box>
    );
};

ScoreEntry.propTypes = {
    student: PropTypes.object.isRequired,
    score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    comment: PropTypes.string.isRequired,
    onScoreChange: PropTypes.func.isRequired,
    onCommentChange: PropTypes.func.isRequired,
    onSaveScore: PropTypes.func.isRequired,
    onBackToList: PropTypes.func.isRequired,
    onOpenReportDetails: PropTypes.func.isRequired,
};

export default ScoreEntry;
