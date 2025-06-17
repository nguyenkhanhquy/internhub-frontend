import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ApplicationListTable from "@components/data/RecruiterDataGridView/RecruiterDataTable/ApplicationListTable";
import GridViewLayout from "@layouts/DataLayout/GridViewLayout/GridViewLayout";
import InterviewInvitationModal from "@components/modals/InterviewInvitationModal/InterviewInvitationModal";
import ConfirmModal from "@components/modals/ConfirmModal/ConfirmModal";

import { getAllJobApplyByJobPostId, rejectJobApply, offerJobApply } from "@services/jobApplyService";

const ApplicationListGridView = ({ title, jobPostId, onBack }) => {
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const [applications, setApplications] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    const [pendingRejectId, setPendingRejectId] = useState(null);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setCurrentPage(1);
        setRecordsPerPage(value);
    };

    const handleAction = async (jobApplyId, action) => {
        if (action === "INTERVIEW") {
            const application = applications.find((app) => app.id === jobApplyId);
            setSelectedApplication(application);
            setIsModalOpen(true);
        } else if (action === "REJECTED") {
            handleOpenConfirmModal(jobApplyId);
        } else if (action === "OFFER") {
            try {
                const data = await offerJobApply(jobApplyId);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setFlag((prev) => !prev);
                toast.success(data.message);
            } catch (error) {
                toast.error(error.message);
            }
        } else {
            console.log(jobApplyId, action);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedApplication(null);
    };

    // Hàm xử lý mở/đóng Modal xác nhận từ chối
    const handleOpenConfirmModal = (jobApplyId) => {
        setPendingRejectId(jobApplyId);
        setConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setConfirmModalOpen(false);
        setPendingRejectId(null);
    };

    // Hàm xử lý khi xác nhận từ chối ứng viên
    const handleConfirmReject = async () => {
        setLoadingConfirm(true);
        try {
            const data = await rejectJobApply(pendingRejectId);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setFlag((prev) => !prev);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingConfirm(false);
        }
        handleCloseConfirmModal();
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getAllJobApplyByJobPostId(jobPostId, currentPage, recordsPerPage);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setTotalPages(data.pageInfo.totalPages);
                setTotalRecords(data.pageInfo.totalElements);
                setApplications(data.result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [jobPostId, currentPage, recordsPerPage, flag]);

    return (
        <>
            <GridViewLayout
                title={"Danh sách hồ sơ ứng viên cho công việc: " + title}
                currentPage={currentPage}
                totalPages={totalPages}
                recordsPerPage={recordsPerPage}
                totalRecords={totalRecords}
                onPageChange={handlePageChange}
                onRecordsPerPageChange={handleRecordsPerPageChange}
                actions={
                    <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onBack} size="small">
                        Quay lại
                    </Button>
                }
            >
                <ApplicationListTable
                    loading={loading}
                    applications={applications}
                    currentPage={currentPage}
                    recordsPerPage={recordsPerPage}
                    handleAction={handleAction}
                />
            </GridViewLayout>

            {selectedApplication && (
                <InterviewInvitationModal
                    open={isModalOpen}
                    onClose={handleModalClose}
                    application={selectedApplication}
                    setFlag={setFlag}
                />
            )}

            {/* Confirm Modal cho từ chối ứng viên */}
            {isConfirmModalOpen && (
                <ConfirmModal
                    isOpen={isConfirmModalOpen}
                    loading={loadingConfirm}
                    title="Xác nhận từ chối ứng viên"
                    onConfirm={handleConfirmReject}
                    onCancel={handleCloseConfirmModal}
                />
            )}
        </>
    );
};

ApplicationListGridView.propTypes = {
    title: PropTypes.string.isRequired,
    jobPostId: PropTypes.string.isRequired,
    onBack: PropTypes.func,
};

export default ApplicationListGridView;
