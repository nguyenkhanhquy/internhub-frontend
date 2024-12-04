import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";
import InternshipApplicationsTable from "./StudentDataTable/InternshipApplicationsTable";

const applicatons = [
    { companyName: "Công ty TNHH ABC", createdDate: "2021-10-10", registerStatus: "ACCEPTED" },
    { companyName: "Công ty TNHH XYZ", createdDate: "2021-10-11", registerStatus: "PROCESSING" },
    { companyName: "Công ty TNHH KLM", createdDate: "2021-10-12", registerStatus: "REJECTED" },
];

const InternshipApplicationsGridView = () => {
    const [loading, setLoading] = useState(false);
    // const [flag, setFlag] = useState(false);

    // const [search, setSearch] = useState("");
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
                internshipApplications={applicatons}
                handleViewDetailsClick={() => {}}
            />
        </GridViewLayout>
    );
};

export default InternshipApplicationsGridView;
