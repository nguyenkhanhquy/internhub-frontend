import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import SearchIcon from "@mui/icons-material/Search";

const DashboardSearchBar = ({ onSearch, query, placeholder }) => {
    const [searchText, setSearchText] = useState(query || "");

    useEffect(() => {
        setSearchText(query || "");
    }, [query]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchText);
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
                placeholder={placeholder || "Tìm kiếm..."}
                variant="outlined"
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                onClick={handleSearch}
                                variant="contained"
                                color="primary"
                                startIcon={<SearchIcon />}
                                sx={{
                                    borderRadius: "4px",
                                    textTransform: "none",
                                    fontWeight: 500,
                                    px: 3,
                                    height: "100%",
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

DashboardSearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    query: PropTypes.string,
    placeholder: PropTypes.string,
};

export default DashboardSearchBar;
