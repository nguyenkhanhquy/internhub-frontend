import { useState } from "react";
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
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
        </Box>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
