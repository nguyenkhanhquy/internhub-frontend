import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import useAuth from "@/hooks/useAuth";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";

import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";

import DashboardSearchBar from "@components/search/DashboardSearchBar";
import ReportDetails from "@components/modals/CourseStudentsModal/ReportDetails";
import ScoreEntry from "@components/modals/CourseStudentsModal/ScoreEntry";
import EmptyBox from "@/components/box/EmptyBox";

import { getAllEnrollmentsByCourseId } from "@services/courseService";
import { updateFinalScore } from "@services/enrollmentService";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const CourseStudentsModal = ({ isOpen, onClose, course }) => {
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [enrollments, setEnrollments] = useState([]);
    const [filteredEnrollments, setFilteredEnrollments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedReportEnrollment, setSelectedReportEnrollment] = useState(null);
    const [score, setScore] = useState("");
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen && course) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const data = await getAllEnrollmentsByCourseId(course.id);
                    if (!data.success) {
                        throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                    }

                    setEnrollments(data.result);
                    setFilteredEnrollments(data.result);
                } catch (error) {
                    toast.error(error.message);
                } finally {
                    setLoading(false);
                    setSearchQuery("");
                    setSelectedEnrollment(null);
                    setSelectedReport(null);
                    setSelectedReportEnrollment(null);
                    setScore("");
                    setFeedback("");
                    setError("");
                }
            };

            fetchData();
        }
    }, [isOpen, course]);

    useEffect(() => {
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            const filtered = enrollments.filter(
                (student) =>
                    student.student.name.toLowerCase().includes(searchLower) ||
                    student.student.studentId.toLowerCase().includes(searchLower),
            );
            setFilteredEnrollments(filtered);
        } else {
            setFilteredEnrollments(enrollments);
        }
    }, [searchQuery, enrollments]);

    const handleSearch = (searchText) => {
        setSearchQuery(searchText);
    };

    const handleOpenScoreForm = (enrollment) => {
        if (!enrollment.finalScore) {
            setSelectedEnrollment(enrollment);
            setSelectedReport(null);
            setSelectedReportEnrollment(null);
            setError("");
        }
    };

    const handleOpenReportDetails = (enrollment) => {
        if (enrollment.internshipReport) {
            setSelectedReport(enrollment.internshipReport);
            setSelectedReportEnrollment(enrollment);
            setSelectedEnrollment(null);
            setError("");
        }
    };

    const handleBackToList = () => {
        setSelectedEnrollment(null);
        setSelectedReport(null);
        setSelectedReportEnrollment(null);
        setScore("");
        setFeedback("");
        setError("");
    };

    const handleFinalScoreChange = (newScore) => {
        setScore(newScore);
        setError("");
    };

    const handleFeedbackChange = (newFeedback) => {
        setFeedback(newFeedback);
        setError("");
    };

    const handleViewFeedback = (enrollment) => {
        if (enrollment.finalScore) {
            toast.info(`Nhận xét cho sinh viên [${enrollment.student.name}]: ${enrollment.feedback}`);
        }
    };

    const handleSaveScore = async () => {
        // Kiểm tra điểm
        if (score === "" || isNaN(score)) {
            setError("Vui lòng nhập điểm.");
            return;
        }

        const scoreValue = Number(score);
        if (scoreValue < 0 || scoreValue > 10) {
            setError("Điểm không hợp lệ. Điểm phải nằm trong khoảng từ 0 đến 10.");
            return;
        }

        // Kiểm tra nhận xét
        if (!feedback.trim()) {
            setError("Vui lòng thêm nhận xét.");
            return;
        }

        // Gọi API cập nhật điểm
        // setLoading(true);
        try {
            const data = await updateFinalScore(selectedEnrollment.id, {
                finalScore: scoreValue,
                feedback: feedback,
            });
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            // Nếu không có lỗi, tiến hành lưu
            const updatedStudents = enrollments.map((enrollment) =>
                enrollment.id === selectedEnrollment.id ? { ...enrollment, finalScore: scoreValue } : enrollment,
            );
            setEnrollments(updatedStudents);
            setFilteredEnrollments(updatedStudents);

            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            // setLoading(false);
        }
        handleBackToList();
    };

    const handleDownloadFile = (file) => {
        window.open(file, "_blank");
    };

    const handleExportExcel = async () => {
        try {
            if (filteredEnrollments.length === 0) {
                toast.warning("Không có dữ liệu để xuất!");
                return;
            }

            // Tạo workbook mới
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Danh sách sinh viên");

            // Định nghĩa columns width (6 cột sau khi bỏ cột GIẢNG VIÊN HƯỚNG DẪN)
            worksheet.columns = [
                { width: 8 }, // STT
                { width: 28 }, // HỌ VÀ TÊN
                { width: 18 }, // MSSV
                { width: 35 }, // CÔNG TY THỰC TẬP
                { width: 15 }, // ĐIỂM HỆ 10
                { width: 50 }, // NHẬN XÉT
            ];

            // Thêm thông tin khóa học ở đầu file
            let currentRow = 1;

            // Tiêu đề chính
            worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
            const titleRow = worksheet.getRow(currentRow);
            titleRow.getCell(1).value = "DANH SÁCH SINH VIÊN THỰC TẬP";
            titleRow.getCell(1).font = { bold: true, size: 18, color: { argb: "1F4E79" } };
            titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" };
            titleRow.getCell(1).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "E7F3FF" },
            };
            titleRow.height = 35;
            currentRow++;

            // Thêm 1 dòng trống
            currentRow += 1;

            // Thông tin khóa học - Layout 2 cột
            const courseInfoLeft = [
                `Mã lớp học phần: ${course?.courseCode || "N/A"}`,
                `Năm học: ${course?.academicYear || "N/A"}`,
                `Giảng viên hướng dẫn: ${course?.teacherName || "N/A"}`,
            ];

            const courseInfoRight = [
                `Tên lớp học phần: ${course?.courseName || "Thực tập tốt nghiệp"}`,
                `Học kỳ: ${course?.semester || "N/A"}`,
                `Ngày xuất: ${new Date().toLocaleDateString("vi-VN")}`,
            ];

            for (let i = 0; i < Math.max(courseInfoLeft.length, courseInfoRight.length); i++) {
                const infoRow = worksheet.getRow(currentRow);

                // Cột trái (A-C)
                if (courseInfoLeft[i]) {
                    worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
                    infoRow.getCell(1).value = courseInfoLeft[i];
                    infoRow.getCell(1).font = { bold: true, size: 11 };
                    infoRow.getCell(1).alignment = { horizontal: "left", vertical: "middle" };
                }

                // Cột phải (D-F)
                if (courseInfoRight[i]) {
                    worksheet.mergeCells(`D${currentRow}:F${currentRow}`);
                    infoRow.getCell(4).value = courseInfoRight[i];
                    infoRow.getCell(4).font = { bold: true, size: 11 };
                    infoRow.getCell(4).alignment = { horizontal: "left", vertical: "middle" };
                }

                infoRow.height = 22;
                currentRow++;
            }

            // Thêm 2 dòng trống
            currentRow += 2;

            // Định nghĩa headers cho bảng dữ liệu
            const headers = ["STT", "HỌ VÀ TÊN", "MSSV", "CÔNG TY THỰC TẬP", "ĐIỂM HỆ 10", "NHẬN XÉT"];

            // Thêm header row
            const headerRow = worksheet.getRow(currentRow);
            headers.forEach((header, index) => {
                const cell = headerRow.getCell(index + 1);
                cell.value = header;
                cell.font = { bold: true, color: { argb: "FFFFFF" } };
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "4472C4" },
                };
                cell.alignment = { vertical: "middle", horizontal: "center" };
            });

            headerRow.height = 25;

            // Thêm border cho header
            headerRow.eachCell((cell) => {
                cell.border = {
                    top: { style: "thin", color: { argb: "000000" } },
                    left: { style: "thin", color: { argb: "000000" } },
                    bottom: { style: "thin", color: { argb: "000000" } },
                    right: { style: "thin", color: { argb: "000000" } },
                };
            });

            // Cập nhật currentRow sau khi thêm header
            currentRow++;

            // Thêm dữ liệu
            filteredEnrollments.forEach((enrollment, index) => {
                const dataRow = worksheet.getRow(currentRow + index);
                dataRow.values = [
                    index + 1,
                    enrollment.student.name || "N/A",
                    enrollment.student.studentId || "N/A",
                    enrollment.internshipReport?.companyName || "N/A",
                    enrollment.finalScore || "N/A",
                    enrollment.feedback || "N/A",
                ];

                // Style cho từng row
                dataRow.alignment = { vertical: "middle", wrapText: true };
                dataRow.height = 20;

                // Thêm border cho từng cell
                dataRow.eachCell((cell) => {
                    cell.border = {
                        top: { style: "thin", color: { argb: "000000" } },
                        left: { style: "thin", color: { argb: "000000" } },
                        bottom: { style: "thin", color: { argb: "000000" } },
                        right: { style: "thin", color: { argb: "000000" } },
                    };
                });
            });

            // Tạo buffer và download file
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const fileName = `${course?.courseCode || "Course"}_${new Date().toISOString().split("T")[0]}.xlsx`;
            saveAs(blob, fileName);

            toast.success("Xuất file Excel thành công!");
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Có lỗi xảy ra khi xuất file Excel!");
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "1200px",
                    maxWidth: "90%",
                    height: "85vh",
                    maxHeight: "85vh",
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography fontWeight="bold">
                    {selectedEnrollment
                        ? `Nhập điểm thực tập cho sinh viên [${selectedEnrollment.student.name} - ${selectedEnrollment.student.studentId}]`
                        : selectedReport
                          ? `Chi tiết báo cáo thực tập - ${selectedReport.student.name}`
                          : `Danh sách sinh viên - ${course?.courseCode}`}
                </Typography>
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {!selectedEnrollment && !selectedReport ? (
                    <>
                        <Box className="sticky top-0 z-10 min-w-[1100px] bg-white">
                            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                    <DashboardSearchBar
                                        onSearch={handleSearch}
                                        query={searchQuery}
                                        placeholder="Tìm kiếm sinh viên..."
                                    />
                                </Box>
                                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        startIcon={<FileDownloadIcon />}
                                        onClick={handleExportExcel}
                                        sx={{ whiteSpace: "nowrap" }}
                                    >
                                        Xuất Excel
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <TableContainer sx={{ flex: 1, overflowY: "auto", minWidth: "1100px" }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ textAlign: "center", width: "5%" }}>STT</TableCell>
                                        <TableCell sx={{ textAlign: "left", width: "25%" }}>HỌ VÀ TÊN</TableCell>
                                        <TableCell sx={{ textAlign: "center", width: "15%" }}>MSSV</TableCell>
                                        <TableCell sx={{ textAlign: "center", width: "25%" }}>
                                            BÁO CÁO THỰC TẬP
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center", width: "15%" }}>ĐIỂM HỆ 10</TableCell>
                                        <TableCell sx={{ textAlign: "center", width: "15%" }}>HÀNH ĐỘNG</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                align="center"
                                                sx={{
                                                    padding: 0,
                                                    height: "4px",
                                                }}
                                            >
                                                <LinearProgress />
                                            </TableCell>
                                        </TableRow>
                                    ) : filteredEnrollments.length === 0 ? (
                                        <TableRow sx={{ height: "auto" }}>
                                            <TableCell
                                                colSpan={6}
                                                align="center"
                                                sx={{ padding: "8px", height: "auto" }}
                                            >
                                                <EmptyBox />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredEnrollments.map((enrollment, index) => (
                                            <TableRow key={enrollment.id} sx={{ height: "48px" }}>
                                                <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                                                <TableCell sx={{ textAlign: "left" }}>
                                                    {enrollment.student.name}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center" }}>
                                                    {enrollment.student.studentId}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center" }}>
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        size="small"
                                                        startIcon={<VisibilityIcon />}
                                                        onClick={() => handleOpenReportDetails(enrollment)}
                                                        disabled={!enrollment.internshipReport}
                                                    >
                                                        Chi tiết
                                                    </Button>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center" }}>
                                                    {enrollment.finalScore != null ? enrollment.finalScore : "-"}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center" }}>
                                                    {user?.role === "TEACHER" ? (
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            startIcon={<EditIcon />}
                                                            onClick={() => handleOpenScoreForm(enrollment)}
                                                            disabled={
                                                                enrollment.finalScore != null ||
                                                                course?.courseStatus !== "Đang nhập điểm"
                                                            }
                                                        >
                                                            Nhập điểm
                                                        </Button>
                                                    ) : user?.role === "FIT" ? (
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            size="small"
                                                            startIcon={<CommentIcon />}
                                                            onClick={() => handleViewFeedback(enrollment)}
                                                            disabled={!enrollment.finalScore}
                                                        >
                                                            Xem nhận xét
                                                        </Button>
                                                    ) : null}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : selectedEnrollment ? (
                    <>
                        <ScoreEntry
                            enrollment={selectedEnrollment}
                            score={score}
                            feedback={feedback}
                            onScoreChange={handleFinalScoreChange}
                            onFeedbackChange={handleFeedbackChange}
                            onSaveScore={handleSaveScore}
                            onBackToList={handleBackToList}
                            onOpenReportDetails={handleOpenReportDetails}
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                    </>
                ) : (
                    <ReportDetails
                        course={course}
                        report={selectedReport}
                        enrollment={selectedReportEnrollment}
                        onDownloadFile={handleDownloadFile}
                        onOpenScoreForm={handleOpenScoreForm}
                        onBackToList={handleBackToList}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

CourseStudentsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
};

export default CourseStudentsModal;
