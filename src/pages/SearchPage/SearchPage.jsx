import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import PageNavigation from "../../components/layouts/PageNavigation/PageNavigation";
import SearchBar from "../../components/search/SearchBar";
import SortBar from "../../components/sort/SortBar";
import JobCardSearch from "../../components/job/JobCard/JobCardSearch";
import CustomPagination from "../../components/pagination/Pagination";
import LoadingOverlay from "../../components/loaders/LoadingOverlay/LoadingOverlay";

import { getAllJobPosts } from "../../services/jobService";

const SearchPage = () => {
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [jobPosts, setJobPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [query, setQuery] = useState(location.state?.query || "");
    const [sort, setSort] = useState("default");

    const [totalPages, setTotalPages] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);

    useEffect(() => {
        const fetchJobPosts = async () => {
            setLoading(true);
            try {
                const data = await getAllJobPosts(currentPage, recordsPerPage, query, sort);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setTotalPages(data.pageInfo.totalPages);
                setTotalJobs(data.pageInfo.totalElements);
                setJobPosts(data.result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobPosts();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [currentPage, recordsPerPage, query, sort]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setRecordsPerPage(value);
    };

    const notifySaveJob = (isSaved) => {
        if (isSaved) {
            toast.success("Lưu công việc thành công");
        } else {
            toast.info("Bỏ lưu công việc thành công");
        }
    };

    return (
        <MainLayout title="Việc làm">
            <PageNavigation pageName="Việc làm" />
            <div style={{ margin: "20px 160px" }}>
                <Box sx={{ position: "sticky", top: 4, zIndex: 1000 }}>
                    <SearchBar
                        onSearch={(searchText) => {
                            setQuery(searchText);
                            setCurrentPage(1);
                        }}
                        query={query}
                    />
                </Box>

                <SortBar totalJobs={totalJobs} sortOption={sort} onSortChange={(sortOption) => setSort(sortOption)} />

                {jobPosts.map((job, index) => (
                    <JobCardSearch
                        key={index}
                        logo={job.company.logo}
                        title={job.title}
                        companyName={job.company.name}
                        address={job.address}
                        jobPosition={job.jobPosition}
                        type={job.type}
                        salary={job.salary}
                        updatedDate={job.updatedDate}
                        expiryDate={job.expiryDate}
                        saved={false}
                        notifySaveJob={notifySaveJob}
                    />
                ))}

                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    recordsPerPage={recordsPerPage}
                    onPageChange={handlePageChange}
                    onRecordsPerPageChange={handleRecordsPerPageChange}
                />
            </div>
            <LoadingOverlay open={loading} />
        </MainLayout>
    );
};

export default SearchPage;
