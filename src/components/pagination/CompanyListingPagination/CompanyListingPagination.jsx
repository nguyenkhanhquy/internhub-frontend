import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

const CompanyListingPagination = ({ currentPage, totalPages, totalRecords, onPageChange }) => {
    const handlePageChange = (event, value) => {
        onPageChange(value);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
            }}
        >
            {/* Pagination */}
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                shape="circular"
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

CompanyListingPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,

    totalRecords: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default CompanyListingPagination;
