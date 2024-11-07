import { useState } from "react";
import { Box, TextField, InputAdornment, Select, MenuItem, Typography, Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import PropTypes from "prop-types";

const SearchBar = ({ totalJobs, onSearch, onSortChange }) => {
    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState("default");

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        onSortChange(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                // p: 2,
                // boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1)",
                // bgcolor: "white",
            }}
        >
            {/* Ô tìm kiếm với nút tìm kiếm tích hợp */}
            <TextField
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Tìm kiếm việc làm..."
                variant="outlined"
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                onClick={handleSearch}
                                variant="contained"
                                startIcon={<SearchIcon />}
                                sx={{
                                    borderRadius: "4px",
                                    textTransform: "none",
                                    fontWeight: 500,
                                    px: 3,
                                    height: "100%",
                                    bgcolor: "#2e3090",
                                    color: "white",
                                    "&:hover": {
                                        bgcolor: "#1f2061",
                                    },
                                }}
                            >
                                Tìm kiếm
                            </Button>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor: "white",
                        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                    },
                }}
            />

            {/* Thanh sắp xếp */}
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
                        onChange={handleSortChange}
                        size="small"
                        variant="standard"
                        disableUnderline
                        sx={{
                            minWidth: 200,
                            fontSize: "0.9rem",
                            color: "text.primary",
                            "& .MuiSelect-select": {
                                padding: "4px 0px",
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
        </Box>
    );
};

SearchBar.propTypes = {
    totalJobs: PropTypes.number.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
};

export default SearchBar;
