import PropTypes from "prop-types";

import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EmptyBox from "../../../box/EmptyBox";
import SuspenseLoader from "../../../loaders/SuspenseLoader/SuspenseLoader";

import { formatDate } from "../../../../utils/dateUtil";

const InternshipApplicationsTable = ({ loading, internshipApplications, handleViewDetailsClick }) => {
    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
            <Table>
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
                        <TableCell sx={{ width: "20%" }}>Ngày tạo</TableCell>
                        <TableCell sx={{ width: "25%" }} align="center">
                            Trạng thái đơn
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
                                    height="100%"
                                    padding={2}
                                >
                                    <SuspenseLoader />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : internshipApplications.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ padding: "40px 0" }}>
                                <EmptyBox />
                            </TableCell>
                        </TableRow>
                    ) : (
                        internshipApplications.map((application, index) => (
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
                                        {application.companyName}
                                    </Typography>
                                </TableCell>
                                <TableCell>{formatDate(application.createdDate)}</TableCell>
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
                                                application.registerStatus === "PROCESSING"
                                                    ? "orange"
                                                    : application.registerStatus === "ACCEPTED"
                                                      ? "green"
                                                      : "red",
                                            backgroundColor:
                                                application.registerStatus === "PROCESSING"
                                                    ? "rgba(255, 165, 0, 0.1)"
                                                    : application.registerStatus === "ACCEPTED"
                                                      ? "rgba(0, 128, 0, 0.1)"
                                                      : "rgba(255, 0, 0, 0.1)",
                                        }}
                                    >
                                        {application.registerStatus === "PROCESSING"
                                            ? "Chờ duyệt"
                                            : application.registerStatus === "ACCEPTED"
                                              ? "Đã duyệt"
                                              : "Không được duyệt"}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => handleViewDetailsClick(application)}>
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
    internshipApplications: PropTypes.array.isRequired,
    handleViewDetailsClick: PropTypes.func.isRequired,
};

export default InternshipApplicationsTable;
