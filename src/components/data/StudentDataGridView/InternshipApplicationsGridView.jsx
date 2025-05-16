import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { toast } from "react-toastify";

import { Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

import GridViewLayout from "@layouts/DataLayout/GridViewLayout/GridViewLayout";
import InternshipApplicationsTable from "./StudentDataTable/InternshipApplicationsTable";
import InternshipReportDetailsModal from "@components/modals/InternshipReportDetailsModal/InternshipReportDetailsModal";

import { getAllInternshipReportsByStudent } from "@services/internshipReport";

const InternshipApplicationsGridView = ({ flag, setFlag }) => {
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
    }, [currentPage, recordsPerPage, flag]);

    return (
        <GridViewLayout
            title="BÁO CÁO THỰC TẬP"
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
            actions={
                <Button
                    startIcon={<CachedIcon />}
                    onClick={() => setFlag((prev) => !prev)}
                    variant="contained"
                    sx={{
                        padding: "5px 10px",
                        width: "50%",
                        minWidth: 130,
                        borderRadius: 2,
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                        bgcolor: "#2e3090",
                        color: "white",
                        "&:hover": {
                            bgcolor: "#1f2061",
                        },
                        "&:active": {
                            boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                        },
                    }}
                >
                    Làm mới
                </Button>
            }
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

InternshipApplicationsGridView.propTypes = {
    flag: PropTypes.bool.isRequired,
    setFlag: PropTypes.func.isRequired,
};

export default InternshipApplicationsGridView;
