import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import ApplicationListTable from "./RecruiterDataTable/ApplicationListTable";
import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";

import { getAllJobApplyByJobPostId } from "../../../services/jobApplyService";

const ApplicationListGridView = ({ title, jobPostId, onBack }) => {
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const [applications, setApplications] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setCurrentPage(1);
        setRecordsPerPage(value);
    };

    const handleAction = (id, action) => {
        console.log(id, action);
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
        <GridViewLayout
            title={"Danh sách hồ sơ ứng viên cho công việc: " + title}
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
            actions={
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button variant="outlined" onClick={onBack} style={{ marginRight: "10px" }}>
                        Quay lại
                    </Button>
                </div>
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
    );
};

ApplicationListGridView.propTypes = {
    title: PropTypes.string.isRequired,
    jobPostId: PropTypes.string.isRequired,
    onBack: PropTypes.func,
};

export default ApplicationListGridView;
