import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SortBar = ({ totalRecords, sortOption, onSortChange }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Typography variant="body1">
                Có <strong>{totalRecords}</strong> việc phù hợp
            </Typography>

            <Box display="flex" alignItems="center">
                <Typography variant="body2" color="textSecondary" sx={{ mr: 1, minWidth: 80 }}>
                    Sắp xếp theo:
                </Typography>
                <Select
                    value={sortOption}
                    onChange={(e) => onSortChange(e.target.value)}
                    size="small"
                    variant="standard"
                    sx={{
                        width: 180,
                        fontSize: "1rem",
                        color: "text.primary",
                        "& .MuiSelect-select": {
                            padding: "4px",
                            transition: "color 0.2s",
                        },
                        "&:hover .MuiSelect-select": {
                            color: "#1976d2",
                        },
                        "&:before, &:after": {
                            display: "none",
                        },
                    }}
                >
                    <MenuItem value="default">Mặc định</MenuItem>
                    <MenuItem value="latest">Việc làm mới nhất</MenuItem>
                    <MenuItem value="oldest">Việc làm cũ nhất</MenuItem>
                    <MenuItem value="recentUpdate">Cập nhật gần nhất</MenuItem>
                </Select>
            </Box>
        </Box>
    );
};

SortBar.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    sortOption: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
};

export default SortBar;
