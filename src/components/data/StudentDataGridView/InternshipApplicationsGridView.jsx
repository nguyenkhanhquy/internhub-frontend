import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";
import InternshipApplicationsTable from "./StudentDataTable/InternshipApplicationsTable";
import InternshipReportDetailsModal from "../../modals/InternshipReportDetailsModal/InternshipReportDetailsModal";

const reports = [
    {
        companyName: "Công ty TNHH ABC",
        createdDate: "2021-10-10",
        reportStatus: "ACCEPTED",
        Student: { name: "Nguyễn Văn A", studentId: "123456", major: "Công nghệ thông tin" },
        teacherName: "Thầy Trần Văn B",
        instructorName: "Mr. Smith",
        instructorEmail: "smith@example.com",
        startDate: "2021-09-01",
        endDate: "2021-12-31",
        reportFile: "https://example.com/report1.pdf",
        evaluationFile: "https://example.com/evaluation1.pdf",
    },
    {
        companyName: "Công ty TNHH XYZ",
        createdDate: "2021-10-11",
        reportStatus: "PROCESSING",
        Student: { name: "Trần Văn B", studentId: "654321", major: "Kỹ thuật phần mềm" },
        teacherName: "Cô Nguyễn Thị C",
        instructorName: "Mrs. Johnson",
        instructorEmail: "johnson@example.com",
        startDate: "2021-09-15",
        endDate: "2021-12-15",
        reportFile: "https://example.com/report2.pdf",
        evaluationFile: "https://example.com/evaluation2.pdf",
    },
    {
        companyName: "Công ty TNHH KLM",
        createdDate: "2021-10-12",
        reportStatus: "REJECTED",
        Student: { name: "Lê Thị C", studentId: "987654", major: "Hệ thống thông tin" },
        teacherName: "Thầy Lê Văn D",
        instructorName: "Dr. Lee",
        instructorEmail: "lee@example.com",
        startDate: "2021-08-01",
        endDate: "2021-11-30",
        reportFile: "https://example.com/report3.pdf",
        evaluationFile: "https://example.com/evaluation3.pdf",
    },
];

const InternshipApplicationsGridView = () => {
    const [loading, setLoading] = useState(false);
    // const [flag, setFlag] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setCurrentPage(1);
        setRecordsPerPage(value);
    };

    const handleViewDetailsClick = (report) => {
        setSelectedReport(report);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedReport(null);
    };

    return (
        <GridViewLayout
            title="BÁO CÁO THỰC TẬP"
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
        >
            <InternshipApplicationsTable
                loading={loading}
                internshipReports={reports}
                handleViewDetailsClick={handleViewDetailsClick}
            />

            <InternshipReportDetailsModal
                open={isModalOpen}
                onClose={handleCloseModal}
                report={selectedReport}
                onDownloadFile={(file) => {
                    if (file) {
                        window.open(file, "_blank");
                    }
                }}
            />
        </GridViewLayout>
    );
};

export default InternshipApplicationsGridView;
