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
import DashboardSearchBar from "@components/search/DashboardSearchBar";
import ReportDetails from "@components/modals/CourseStudentsModal/ReportDetails";
import ScoreEntry from "@components/modals/CourseStudentsModal/ScoreEntry";

import { getAllEnrollmentsByCourseId } from "@services/courseService";
import { updateFinalScore } from "@services/enrollmentService";

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
            // Có thể mở modal hiển thị nhận xét hoặc chuyển đến một view khác
            console.log(`Viewing feedback for enrollment: ${enrollment.id}`);
            // TODO: Implement feedback viewing logic
            toast.info(`Xem nhận xét cho sinh viên: ${enrollment.student.name}`);
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
                        ? `Nhập điểm (${selectedEnrollment.student.name} - ${selectedEnrollment.student.studentId})`
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
                        <Box className="sticky top-0 z-10 bg-white">
                            <DashboardSearchBar
                                onSearch={handleSearch}
                                query={searchQuery}
                                placeholder="Tìm kiếm sinh viên..."
                            />
                        </Box>
                        <TableContainer sx={{ flex: 1, overflowY: "auto", minWidth: "600px" }}>
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
                                                <Typography color="textSecondary">
                                                    {searchQuery
                                                        ? "Không tìm thấy sinh viên nào."
                                                        : "Không có sinh viên nào."}
                                                </Typography>
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
                                                        onClick={() => handleOpenReportDetails(enrollment)}
                                                        disabled={!enrollment.internshipReport}
                                                    >
                                                        Chi tiết
                                                    </Button>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center" }}>
                                                    {enrollment.finalScore ? enrollment.finalScore : "-"}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center" }}>
                                                    {user?.role === "TEACHER" ? (
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            onClick={() => handleOpenScoreForm(enrollment)}
                                                            disabled={enrollment.finalScore}
                                                        >
                                                            Nhập điểm
                                                        </Button>
                                                    ) : user?.role === "FIT" ? (
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            size="small"
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
