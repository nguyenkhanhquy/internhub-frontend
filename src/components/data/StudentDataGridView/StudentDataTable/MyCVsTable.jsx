import PropTypes from "prop-types";
import { useState } from "react";
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
    Stack,
    Tooltip,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import EmptyBox from "@components/box/EmptyBox";
import ViewCvModal from "@/components/modals/ViewCVModal/ViewCVModal";
import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";
import { formatDate } from "../../../../utils/dateUtil";

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
            <Table>
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
                        <TableCell sx={{ width: "45%" }}>Tiêu đề</TableCell>
                        <TableCell sx={{ width: "25%" }}>Ngày tạo</TableCell>
                        <TableCell sx={{ width: "25%" }} align="center">
                            Hành động
                        </TableCell>
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
                                    height="100%"
                                    padding={2}
                                >
                                    <SuspenseLoader />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ padding: "40px 0" }}>
                                <EmptyBox />
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
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {cv.title}
                                    </Typography>
                                </TableCell>
                                <TableCell>{formatDate(cv.createdDate)}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1} justifyContent="center">
                                        <Tooltip title="Xem CV" arrow>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleViewCv(cv?.file, cv?.title)}
                                                disabled={!cv?.file}
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
