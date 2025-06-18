import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import MainLayout from "@layouts/MainLayout/MainLayout";
import PageNavigation from "@components/layouts/PageNavigation/PageNavigation";
import SearchBar from "@components/search/SearchBar";
import SortBar from "@components/sort/SortBar";
import JobCardSearch from "@components/job/JobCard/JobCardSearch";
import JobCardSearchSkeleton from "@components/skeletons/JobCardSearchSkeletion";
import CustomPagination from "@components/pagination/Pagination";
import EmptyBox from "@components/box/EmptyBox";
import AdvancedFilter from "@components/filter/AdvancedFilter";

import { getAllJobPosts } from "@services/jobPostService";

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [jobPosts, setJobPosts] = useState([]);

    const [query, setQuery] = useState(location.state?.query || "");
    const [sort, setSort] = useState("default");

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const [filters, setFilters] = useState({
        salary: "",
        major: { label: "Tất cả ngành", value: "" },
        address: { label: "Tất cả địa điểm", value: "" },
        type: "",
        remote: "",
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setCurrentPage(1);
        setRecordsPerPage(value);
    };

    useEffect(() => {
        if (location.state?.query) {
            navigate(location.pathname, { replace: true, state: { ...location.state, query: undefined } });
        }
    }, [location, navigate]);

    useEffect(() => {
        const fetchJobPosts = async () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            try {
                setLoading(true);
                const data = await getAllJobPosts(currentPage, recordsPerPage, query, sort, filters);
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
            }
        };

        fetchJobPosts();
    }, [currentPage, recordsPerPage, query, sort, filters]);

    return (
        <MainLayout title="Việc làm">
            <PageNavigation pageName="Việc làm" />
            <Box
                sx={{
                    margin: {
                        xs: "10px 20px", // Dành cho màn hình nhỏ hơn 600px
                        sm: "10px 40px", // Dành cho màn hình từ 600px đến dưới 900px
                        md: "15px 80px", // Dành cho màn hình từ 900px đến dưới 1200px
                        lg: "20px 100px", // Dành cho màn hình từ 1200px đến dưới 1536px
                        xl: "20px 120px", // Dành cho màn hình từ 1536px trở lên
                    },
                    minHeight: 400,
                }}
            >
                {/* Thanh tìm kiếm */}
                <Box sx={{ position: "sticky", top: 4, zIndex: 1, mb: 1 }}>
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

                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                        {/* Bộ lọc */}
                        <AdvancedFilter filters={filters} onApplyFilters={setFilters} onResetFilters={setFilters} />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, md: 9 }}>
                        {/* Danh sách công việc */}
                        <Box display="flex" flexDirection="column" gap={1}>
                            {loading ? (
                                Array.from({ length: 3 }).map((_, index) => <JobCardSearchSkeleton key={index} />)
                            ) : jobPosts.length > 0 ? (
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
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <EmptyBox />
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setCurrentPage(1);
                                            setQuery("");
                                            setSort("default");
                                            setFilters({
                                                salary: "",
                                                major: { label: "Tất cả ngành", value: "" },
                                                address: { label: "Tất cả địa điểm", value: "" },
                                                type: "",
                                                remote: "",
                                            });
                                        }}
                                        sx={{
                                            borderRadius: 4,
                                            textTransform: "none",
                                            fontSize: "1rem",
                                            width: "fit-content",
                                            color: "#1976d2",
                                        }}
                                    >
                                        Đặt lại bộ lọc và tìm kiếm lại
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

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
        </MainLayout>
    );
};

export default SearchPage;
