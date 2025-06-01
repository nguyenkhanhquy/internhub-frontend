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
    Stack,
    Button,
    Tooltip,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";
import EmptyBox from "@components/box/EmptyBox";

import { formatDate } from "@utils/dateUtil";

const PostedJobsTable = ({
    value,
    loading,
    postedJobPosts,
    currentPage,
    recordsPerPage,
    handleViewApplicationsClick,
    handleEditPostClick,
    handleViewDetails,
    handleToggleVisibility,
}) => {
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
                        <TableCell sx={{ textAlign: "center", width: "5%" }}>STT</TableCell>
                        <TableCell sx={{ width: "30%" }}>Tiêu đề</TableCell>
                        <TableCell sx={{ width: "20%" }}>Vị trí công việc</TableCell>
                        <TableCell sx={{ width: "15%" }}>Ngày hết hạn</TableCell>
                        <TableCell sx={{ textAlign: "center", width: "15%" }}>Hồ sơ ứng tuyển</TableCell>
                        <TableCell sx={{ textAlign: "center", width: "15%" }}>
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
                    ) : postedJobPosts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ padding: "40px 0" }}>
                                <EmptyBox />
                            </TableCell>
                        </TableRow>
                    ) : (
                        postedJobPosts.map((job, index) => (
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
                                <TableCell sx={{ textAlign: "center" }}>
                                    {index + 1 + (currentPage - 1) * recordsPerPage}
                                </TableCell>
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
                                <TableCell>{formatDate(job.expiryDate)}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Stack direction="column" spacing={1}>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {job.jobApplyCount} hồ sơ
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleViewApplicationsClick(job)}
                                        >
                                            Xem
                                        </Button>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Stack direction="row" spacing={1}>
                                        {value === 2 ? (
                                            <>
                                                <Tooltip title="Chi tiết bài đăng" arrow>
                                                    <IconButton onClick={() => handleViewDetails(job)}>
                                                        <InfoIcon className="text-blue-800" />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        ) : value === 3 ? (
                                            <>
                                                <Tooltip title="Chỉnh sửa bài đăng" arrow>
                                                    <IconButton onClick={() => handleEditPostClick(job.id)}>
                                                        <EditIcon className="text-yellow-500" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Chi tiết bài đăng" arrow>
                                                    <IconButton onClick={() => handleViewDetails(job)}>
                                                        <InfoIcon className="text-blue-800" />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        ) : (
                                            <>
                                                <Tooltip title="Chỉnh sửa bài đăng" arrow>
                                                    <IconButton onClick={() => handleEditPostClick(job.id)}>
                                                        <EditIcon className="text-yellow-500" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={job.hidden ? "Hiện bài đăng" : "Ẩn bài đăng"} arrow>
                                                    <IconButton onClick={() => handleToggleVisibility(job.id)}>
                                                        {job.hidden ? (
                                                            <VisibilityIcon className="text-cyan-950" />
                                                        ) : (
                                                            <VisibilityOffIcon className="text-cyan-950" />
                                                        )}
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Chi tiết bài đăng" arrow>
                                                    <IconButton onClick={() => handleViewDetails(job)}>
                                                        <InfoIcon className="text-blue-800" />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        )}
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

PostedJobsTable.propTypes = {
    value: PropTypes.number,
    loading: PropTypes.bool,
    postedJobPosts: PropTypes.array,
    currentPage: PropTypes.number,
    recordsPerPage: PropTypes.number,
    handleViewApplicationsClick: PropTypes.func,
    handleEditPostClick: PropTypes.func,
    handleViewDetails: PropTypes.func,
    handleToggleVisibility: PropTypes.func,
};

export default PostedJobsTable;
