import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import PageNavigation from "../../components/layouts/PageNavigation/PageNavigation";
import SearchBar from "../../components/search/SearchBar";
import SortBar from "../../components/sort/SortBar";
import JobCardSearch from "../../components/job/JobCard/JobCardSearch";
import CustomPagination from "../../components/pagination/Pagination";
import LoadingOverlay from "../../components/loaders/LoadingOverlay/LoadingOverlay";
import EmptyBox from "../../components/box/emptyBox";

import { getAllJobPosts } from "../../services/jobService";

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [jobPosts, setJobPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    const [query, setQuery] = useState(location.state?.query || "");
    const [sort, setSort] = useState("default");

    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        if (location.state?.query) {
            navigate(location.pathname, { replace: true, state: { ...location.state, query: undefined } });
        }
    }, [location, navigate]);

    useEffect(() => {
        const fetchJobPosts = async () => {
            setLoading(true);
            try {
                const data = await getAllJobPosts(currentPage, recordsPerPage, query, sort);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setTotalPages(data.pageInfo.totalPages);
                setTotalRecords(data.pageInfo.totalElements);
                setJobPosts(data.result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
        };

        fetchJobPosts();
    }, [currentPage, recordsPerPage, query, sort]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setCurrentPage(1);
        setRecordsPerPage(value);
    };

    return (
        <MainLayout title="Việc làm">
            <PageNavigation pageName="Việc làm" />
            <Box
                sx={{
                    margin: {
                        xs: "10px 10px", // Dành cho màn hình nhỏ hơn 600px
                        sm: "10px 40px", // Dành cho màn hình từ 600px đến dưới 900px
                        md: "15px 80px", // Dành cho màn hình từ 900px đến dưới 1200px
                        lg: "20px 160px", // Dành cho màn hình từ 1200px đến dưới 1536px
                    },
                    minHeight: 400,
                }}
            >
                {/* Thanh tìm kiếm */}
                <Box sx={{ position: "sticky", top: 4, zIndex: 1000, mb: 2 }}>
                    <SearchBar
                        onSearch={(searchText) => {
                            setCurrentPage(1);
                            setQuery(searchText);
                        }}
                        query={query}
                    />
                </Box>

                {/* Thanh sắp xếp */}
                <SortBar
                    totalRecords={totalRecords}
                    sortOption={sort}
                    onSortChange={(sortOption) => {
                        setCurrentPage(1);
                        setSort(sortOption);
                    }}
                />

                {/* Danh sách công việc */}
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    sx={{
                        mt: 2,
                        mb: 3,
                    }}
                >
                    {jobPosts.length > 0 ? (
                        jobPosts.map((job, index) => (
                            <JobCardSearch
                                key={index}
                                id={job.id}
                                logo={job.company.logo}
                                title={job.title}
                                companyName={job.company.name}
                                address={job.address}
                                jobPosition={job.jobPosition}
                                type={job.type}
                                salary={job.salary}
                                updatedDate={job.updatedDate}
                                expiryDate={job.expiryDate}
                                saved={job.saved}
                            />
                        ))
                    ) : (
                        <EmptyBox />
                    )}
                </Box>

                {/* Phân trang */}
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    recordsPerPage={recordsPerPage}
                    totalRecords={totalRecords}
                    onPageChange={handlePageChange}
                    onRecordsPerPageChange={handleRecordsPerPageChange}
                />
            </Box>
            <LoadingOverlay open={loading} />
        </MainLayout>
    );
};

export default SearchPage;
