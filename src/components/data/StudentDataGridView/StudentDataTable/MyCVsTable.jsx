import PropTypes from "prop-types";
import { useState } from "react";

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
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import EmptyBox from "@components/box/EmptyBox";
import ViewCvModal from "@components/modals/ViewCVModal/ViewCVModal";
import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";

import { formatDateTime } from "@utils/dateUtil";

const MyCVsTable = ({ loading, data, handleDeleteClick }) => {
    const [openCvModal, setOpenCvModal] = useState(false);
    const [cvUrl, setCvUrl] = useState(null);
    const [title, setTitle] = useState(null);

    const handleViewCv = (url, title) => {
        setCvUrl(url);
        setTitle(title);
        setOpenCvModal(true);
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
            <Table sx={{ minWidth: 800 }}>
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
                        <TableCell sx={{ width: "5%", textAlign: "center" }}>STT</TableCell>
                        <TableCell sx={{ width: "63%", textAlign: "left" }}>Tiêu đề</TableCell>
                        <TableCell sx={{ width: "17%", textAlign: "left" }}>Ngày tạo</TableCell>
                        <TableCell sx={{ width: "15%", textAlign: "right" }}>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ padding: "40px 0" }}>
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
                    ) : data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ padding: "40px 0" }}>
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
                        data.map((cv, index) => (
                            <TableRow
                                key={cv.id || index}
                                sx={{
                                    "&:hover": { backgroundColor: "#f9f9f9" },
                                    "& td": {
                                        padding: "10px 16px",
                                        fontSize: "0.875rem",
                                        borderBottom: "1px solid #e0e0e0",
                                    },
                                }}
                            >
                                <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                                <TableCell sx={{ textAlign: "left" }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {cv.title}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: "left" }}>{formatDateTime(cv.createdDate)}</TableCell>
                                <TableCell>
                                    <Stack direction="row" justifyContent="end">
                                        <Tooltip title="Xem CV" arrow>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleViewCv(cv?.filePath, cv?.title)}
                                                disabled={!cv?.filePath}
                                            >
                                                <ContactPageOutlinedIcon className="text-green-600" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Xóa" arrow>
                                            <IconButton color="error" onClick={() => handleDeleteClick(cv.id)}>
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {openCvModal && (
                <ViewCvModal isOpen={openCvModal} onClose={() => setOpenCvModal(false)} cvUrl={cvUrl} title={title} />
            )}
        </TableContainer>
    );
};

MyCVsTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    handleDeleteClick: PropTypes.func.isRequired,
};

export default MyCVsTable;
