import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { toast } from "react-toastify";

import { Button, Tooltip } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

import GridViewLayout from "@layouts/DataLayout/GridViewLayout/GridViewLayout";
import InternshipApplicationsTable from "@components/data/StudentDataGridView/StudentDataTable/InternshipApplicationsTable";
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
                <Tooltip title="Làm mới" arrow>
                    <Button
                        variant="outlined"
                        onClick={() => setFlag((prev) => !prev)}
                        sx={{
                            minWidth: 44,
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                            color: "#2e3090",
                            borderColor: "#2e3090",
                            p: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "&:hover": {
                                bgcolor: "#1f2061",
                                color: "white",
                                borderColor: "#1f2061",
                            },
                            "&:active": {
                                boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                            },
                        }}
                    >
                        <CachedIcon />
                    </Button>
                </Tooltip>
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
