import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import SettingsIcon from "@mui/icons-material/Settings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";
import EmptyBox from "@components/box/EmptyBox";

// Hàm chuyển đổi status sang tiếng Việt và trả về Chip tương ứng
const renderStatusChip = (status) => {
    let color, label, backgroundColor;

    switch (status) {
        case "NOT_SUBMITTED":
            color = "warning";
            label = "Chưa nộp báo cáo";
            backgroundColor = "#fff3e0"; // Màu nền nhạt (light orange)
            break;
        case "SUBMITTED":
            color = "info";
            label = "Đã nộp báo cáo";
            backgroundColor = "#e3f2fd"; // Màu nền nhạt (light blue)
            break;
        case "COMPLETED":
            color = "success";
            label = "Hoàn thành";
            backgroundColor = "#e8f5e9"; // Màu nền nhạt (light green)
            break;
        case "FAILED":
            color = "error";
            label = "Không đạt";
            backgroundColor = "#ffebee"; // Màu nền nhạt (light red)
            break;
        default:
            color = "default";
            label = "";
            backgroundColor = "#f0f0f0"; // Màu nền nhạt mặc định
            break;
    }

    return (
        <Chip
            label={label}
            color={color}
            variant="outlined"
            sx={{
                width: "100%",
                borderRadius: 1,
                borderWidth: "1px",
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                fontWeight: "500",
            }}
        />
    );
};

const CoursesTable = ({ loading, courses, handleViewDetailsClick }) => {
    return (
        <>
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
                            <TableCell sx={{ textAlign: "center", width: "5%" }}>STT</TableCell>
                            <TableCell sx={{ textAlign: "left", width: "20%" }}>Mã học phần</TableCell>
                            <TableCell sx={{ textAlign: "center", width: "11%" }}>Năm học</TableCell>
                            <TableCell sx={{ textAlign: "center", width: "11%" }}>Học kỳ</TableCell>
                            <TableCell sx={{ textAlign: "center", width: "20%" }}>Giảng viên</TableCell>
                            <TableCell sx={{ textAlign: "center", width: "11%" }}>Điểm hệ 10</TableCell>
                            <TableCell sx={{ textAlign: "center", width: "17%" }}>Trạng thái</TableCell>
                            <TableCell sx={{ textAlign: "center", width: "5%" }}>
                                <SettingsIcon />
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {/* Nội dung bảng */}
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ padding: "40px 0" }}>
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
                        ) : courses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ padding: "40px 0" }}>
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
                            courses.map((item, index) => (
                                <TableRow
                                    key={item.id}
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
                                    <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                                    <TableCell sx={{ textAlign: "left", whiteSpace: "normal", wordWrap: "break-word" }}>
                                        <Tooltip arrow>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {item.courseCode}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell
                                        sx={{ textAlign: "center", whiteSpace: "normal", wordWrap: "break-word" }}
                                    >
                                        <Tooltip arrow>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {item.academicYear}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell
                                        sx={{ textAlign: "center", whiteSpace: "normal", wordWrap: "break-word" }}
                                    >
                                        <Tooltip arrow>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {item.semester}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell
                                        sx={{ textAlign: "center", whiteSpace: "normal", wordWrap: "break-word" }}
                                    >
                                        <Tooltip arrow>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {item.teacherName}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell
                                        sx={{ textAlign: "center", whiteSpace: "normal", wordWrap: "break-word" }}
                                    >
                                        <Tooltip arrow>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {item.finalScore ?? "–"}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>{renderStatusChip(item.enrollmentStatus)}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Xem chi tiết" arrow>
                                            <IconButton color="primary" onClick={() => handleViewDetailsClick(item)}>
                                                <InfoOutlinedIcon className="text-blue-800 hover:text-blue-900" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

// Định nghĩa PropTypes
CoursesTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    courses: PropTypes.array.isRequired,
    handleViewDetailsClick: PropTypes.func.isRequired,
};

export default CoursesTable;
