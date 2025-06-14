import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const CustomPagination = ({
    currentPage,
    totalPages,
    recordsPerPage,
    totalRecords,
    onPageChange,
    onRecordsPerPageChange,
}) => {
    const handlePageChange = (event, value) => {
        onPageChange(value);
    };

    const handleRecordsPerPageChange = (event) => {
        onRecordsPerPageChange(event.target.value);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "space-between" },
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1, sm: 2 },
                // p: 1,
                // bgcolor: "white",
                // boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1)",
                // borderRadius: 2,
            }}
        >
            {/* Lựa chọn số lượng bản ghi */}
            <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel id="records-per-page-label">Bản ghi / Trang</InputLabel>
                <Select
                    labelId="records-per-page-label"
                    value={recordsPerPage}
                    onChange={handleRecordsPerPageChange}
                    label="Bản ghi / Trang"
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
            </FormControl>

            {/* Pagination */}
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                size="medium"
                siblingCount={1}
                boundaryCount={1}
                sx={{
                    "& .MuiPaginationItem-root": {
                        fontSize: "0.875rem",
                        fontWeight: 500,
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "#1e40af", // Thay đổi màu nền của trang được chọn
                        color: "#fff", // Màu chữ của trang được chọn
                    },
                    "& .MuiPaginationItem-root:hover": {
                        backgroundColor: "#e0e7ff", // Màu nền khi hover
                    },
                }}
            />

            {/* Hiển thị trang hiện tại */}
            <Typography variant="body2" color="textSecondary">
                Trang {currentPage} / {totalPages} • Tổng số {totalRecords} bản ghi
            </Typography>
        </Box>
    );
};

CustomPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    recordsPerPage: PropTypes.number.isRequired,
    totalRecords: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRecordsPerPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;
