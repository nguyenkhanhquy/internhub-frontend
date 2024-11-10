import PropTypes from "prop-types";
import { Box, Typography, Select, MenuItem } from "@mui/material";

const SortBar = ({ totalJobs, sortOption, onSortChange }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Typography variant="body2">{totalJobs} Việc phù hợp</Typography>

            <Box display="flex" alignItems="center">
                <Typography variant="body2" color="textSecondary" sx={{ mr: 1, minWidth: 80 }}>
                    Sắp xếp theo:
                </Typography>
                <Select
                    value={sortOption}
                    onChange={(e) => onSortChange(e.target.value)}
                    size="small"
                    variant="outlined"
                    disableUnderline
                    sx={{
                        minWidth: 200,
                        fontSize: "0.95rem",
                        color: "text.primary",
                        "& .MuiSelect-select": {
                            padding: "4px",
                            transition: "color 0.2s",
                        },
                        "&:hover .MuiSelect-select": {
                            color: "#1976d2",
                        },
                    }}
                >
                    <MenuItem value="default">Mặc định</MenuItem>
                    <MenuItem value="latest">Việc làm mới nhất</MenuItem>
                    <MenuItem value="oldest">Việc làm cũ nhất</MenuItem>
                    <MenuItem value="recentUpdate">Được cập nhật gần nhất</MenuItem>
                </Select>
            </Box>
        </Box>
    );
};

SortBar.propTypes = {
    totalJobs: PropTypes.number.isRequired,
    sortOption: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
};

export default SortBar;
