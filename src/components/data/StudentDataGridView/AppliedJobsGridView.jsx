import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box } from "@mui/material";
import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "../DataSearchBar";
import AppliedJobsTable from "./StudentDataTable/AppliedJobsTable";

import { getAllJobApplyByStudent } from "../../../services/jobApplyService";

const AppliedJobsGridView = () => {
    const [loading, setLoading] = useState(false);
    const [applyJobs, setApplyJobs] = useState([]);

    const [search, setSearch] = useState("");
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

    useEffect(() => {
        const fetchSavedJobPosts = async () => {
            setLoading(true);
            try {
                const data = await getAllJobApplyByStudent(currentPage, recordsPerPage, search);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setTotalPages(data.pageInfo.totalPages);
                setTotalRecords(data.pageInfo.totalElements);
                setApplyJobs(data.result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedJobPosts();
    }, [search, currentPage, recordsPerPage]);

    return (
        <GridViewLayout
            title="CÔNG VIỆC ỨNG TUYỂN"
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
            actions={
                <DataSearchBar placeholder="Tìm kiếm" onSearch={(searchText) => setSearch(searchText)} query={search} />
            }
        >
            <Box>
                {/* Nội dung danh sách công việc */}
                <AppliedJobsTable loading={loading} applyJobs={applyJobs} />
            </Box>
        </GridViewLayout>
    );
};

export default AppliedJobsGridView;
