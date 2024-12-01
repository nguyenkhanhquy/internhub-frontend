import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import ApplicationListTable from "./RecruiterDataTable/ApplicationListTable";
import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";

const ApplicationListGridView = ({ applications, title, onBack }) => {
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
            actions={
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button variant="outlined" onClick={onBack} style={{ marginRight: "10px" }}>
                        Quay lại
                    </Button>
                </div>
            }
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
    applications: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func,
};

export default ApplicationListGridView;
