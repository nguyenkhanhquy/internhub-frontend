import { useState } from "react";
import PropTypes from "prop-types";
import ApplicationListTable from "./RecruiterDataTable/ApplicationListTable";
import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";

const ApplicationListGridView = ({ applications, title }) => {
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

    return (
        <GridViewLayout
            title={"Danh sách ứng viên: " + title}
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
        >
            <ApplicationListTable
                applications={applications}
                currentPage={currentPage}
                recordsPerPage={recordsPerPage}
                handleAction={handleAction}
            />
        </GridViewLayout>
    );
};

ApplicationListGridView.propTypes = {
    applications: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

export default ApplicationListGridView;
