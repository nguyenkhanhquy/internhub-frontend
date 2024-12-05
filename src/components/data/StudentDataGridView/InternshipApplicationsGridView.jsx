import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";
import InternshipApplicationsTable from "./StudentDataTable/InternshipApplicationsTable";
import InternshipReportDetailsModal from "../../modals/InternshipReportDetailsModal/InternshipReportDetailsModal";

import { getAllInternshipReportsByStudent } from "../../../services/internshipReport";

const InternshipApplicationsGridView = () => {
    const [loading, setLoading] = useState(false);
    const [reports, setReports] = useState([]);

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getAllInternshipReportsByStudent(currentPage, recordsPerPage);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setTotalPages(data.pageInfo.totalPages);
                setTotalRecords(data.pageInfo.totalElements);
                setReports(data.result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, recordsPerPage]);

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
