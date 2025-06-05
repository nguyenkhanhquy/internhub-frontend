import { useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch, query }) => {
    const [searchText, setSearchText] = useState(query || "");

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchText);
        // if (searchText?.trim() !== "") {
        //     navigate(`/search?query=${searchText}`);
        // } else {
        //     navigate("/search");
        // }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
            <TextField
                value={searchText}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
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
    query: PropTypes.string,
};

export default SearchBar;
