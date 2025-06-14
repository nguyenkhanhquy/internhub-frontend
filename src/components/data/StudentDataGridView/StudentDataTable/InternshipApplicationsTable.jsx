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
import IconButton from "@mui/material/IconButton";

import SettingsIcon from "@mui/icons-material/Settings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EmptyBox from "@components/box/EmptyBox";
import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";

import { formatDate } from "@utils/dateUtil";

const InternshipApplicationsTable = ({ loading, internshipReports, handleViewDetailsClick }) => {
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
                        <TableCell sx={{ width: "40%" }}>Công ty thực tập</TableCell>
                        <TableCell sx={{ width: "20%" }} align="center">
                            Ngày nộp
                        </TableCell>
                        <TableCell sx={{ width: "25%" }} align="center">
                            Trạng thái
                        </TableCell>
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
                    ) : internshipReports.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ padding: "40px 0" }}>
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
                        internshipReports.map((report, index) => (
                            <TableRow
                                key={index}
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
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell
                                    sx={{
                                        whiteSpace: "normal",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {report.companyName}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">{formatDate(report.createdDate)}</TableCell>
                                <TableCell
                                    sx={{
                                        whiteSpace: "normal",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 500,
                                            textAlign: "center",
                                            padding: "6px 12px",
                                            borderRadius: 1,
                                            color:
                                                report.reportStatus === "PROCESSING"
                                                    ? "orange"
                                                    : report.reportStatus === "ACCEPTED"
                                                      ? "green"
                                                      : "red",
                                            backgroundColor:
                                                report.reportStatus === "PROCESSING"
                                                    ? "rgba(255, 165, 0, 0.1)"
                                                    : report.reportStatus === "ACCEPTED"
                                                      ? "rgba(0, 128, 0, 0.1)"
                                                      : "rgba(255, 0, 0, 0.1)",
                                        }}
                                    >
                                        {report.reportStatus === "PROCESSING"
                                            ? "Chờ duyệt"
                                            : report.reportStatus === "ACCEPTED"
                                              ? "Đã được duyệt"
                                              : "Không được duyệt"}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => handleViewDetailsClick(report)}>
                                        <InfoOutlinedIcon className="text-blue-800 hover:text-blue-900" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

InternshipApplicationsTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    internshipReports: PropTypes.array.isRequired,
    handleViewDetailsClick: PropTypes.func.isRequired,
};

export default InternshipApplicationsTable;
