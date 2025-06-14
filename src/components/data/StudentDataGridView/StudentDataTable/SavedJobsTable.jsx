import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EmptyBox from "@components/box/EmptyBox";
import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";

import { formatDate } from "@utils/dateUtil";

const SavedJobsTable = ({
    loading,
    savedJobPosts,
    currentPage,
    recordsPerPage,
    handleViewDetailsClick,
    handleDeleteClick,
}) => {
    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
            <Table sx={{ minWidth: 800 }}>
                {/* Tiêu đề bảng */}
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: "#f5f5f5",
                            "& th": {
                                fontWeight: "bold",
                                fontSize: "0.875rem",
                                padding: "12px 16px",
                                borderBottom: "1px solid #ddd",
                            },
                        }}
                    >
                        <TableCell align="center" sx={{ width: "5%" }}>
                            STT
                        </TableCell>
                        <TableCell sx={{ width: "30%" }}>Tên công việc</TableCell>
                        <TableCell sx={{ width: "20%" }}>Vị trí công việc</TableCell>
                        <TableCell sx={{ width: "20%" }}>Tên công ty</TableCell>
                        <TableCell sx={{ width: "15%" }}>Ngày hết hạn</TableCell>
                        <TableCell sx={{ width: "10%" }} align="center">
                            <SettingsIcon />
                        </TableCell>
                    </TableRow>
                </TableHead>

                {/* Nội dung bảng */}
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ padding: "40px 0" }}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="200px"
                                >
                                    <SuspenseLoader />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : savedJobPosts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ padding: "40px 0" }}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="200px"
                                >
                                    <EmptyBox />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        savedJobPosts.map((job, index) => (
                            <TableRow
                                key={index + 1 + (currentPage - 1) * recordsPerPage}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#f9f9f9",
                                    },
                                    "& td": {
                                        padding: "10px 16px",
                                        fontSize: "0.875rem",
                                        borderBottom: "1px solid #e0e0e0",
                                    },
                                }}
                            >
                                <TableCell align="center">{index + 1 + (currentPage - 1) * recordsPerPage}</TableCell>
                                <TableCell
                                    sx={{
                                        whiteSpace: "normal",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {job.title}
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        whiteSpace: "normal",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {job.jobPosition}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        whiteSpace: "normal",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {job.companyName}
                                </TableCell>
                                <TableCell>{formatDate(job.expiryDate)}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton color="primary" onClick={() => handleViewDetailsClick(job.id)}>
                                            <InfoOutlinedIcon className="text-blue-800 hover:text-blue-900" />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteClick(job.id)}>
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

SavedJobsTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    savedJobPosts: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    recordsPerPage: PropTypes.number.isRequired,
    handleViewDetailsClick: PropTypes.func.isRequired,
    handleDeleteClick: PropTypes.func.isRequired,
};

export default SavedJobsTable;
