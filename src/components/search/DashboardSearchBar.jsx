import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

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

    return (
        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
            <TextField
                value={searchText}
                onChange={handleSearchChange}
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
