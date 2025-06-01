import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Box, Button, FormControl, InputLabel, Select, MenuItem, Divider, Tooltip } from "@mui/material";

import CachedIcon from "@mui/icons-material/Cached";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import GridViewLayout from "@layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "@components/data/DataSearchBar";
import PostedJobsTable from "@components/data/RecruiterDataGridView/RecruiterDataTable/PostedJobsTable";
import SortBar from "@components/sort/SortBar";
import CustomTabPanel from "@components/tabs/CustomTabPanel/CustomTabPanel";
import UpdateJobPostModal from "@components/modals/UpdateJobPostModal/UpdateJobPostModal";
import JobPostDetailsModal from "@components/modals/JobPostDetailsModal/JobPostDetailsModal";

import { getJobPostsByRecruiter, getExpiredJobPostsByRecruiter } from "@services/jobPostService";
import { hiddenJobPost } from "@services/jobPostService";

const PostedJobsGridView = ({ onViewApplications }) => {
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(true);
    const [jobPosts, setJobPosts] = useState([]);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const [selectedType, setSelectedType] = useState("");
    const [sort, setSort] = useState("default");
    const [isApproved, setIsApproved] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const [value, setValue] = useState(0);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedJobPost, setSelectedJobPost] = useState(null);

    const fetchData = async (
        currentPage,
        recordsPerPage,
        search,
        sort,
        isApproved,
        isHidden,
        isDeleted,
        selectedType,
    ) => {
        setLoading(true);
        try {
            const data = await getJobPostsByRecruiter(
                currentPage,
                recordsPerPage,
                search,
                sort,
                isApproved,
                isHidden,
                isDeleted,
                selectedType,
            );
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

    const fetchExpiredJobPosts = async (currentPage, recordsPerPage, search, sort, selectedType) => {
        setLoading(true);
        try {
            const data = await getExpiredJobPostsByRecruiter(currentPage, recordsPerPage, search, sort, selectedType);
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

    useEffect(() => {
        if (value === 4) {
            fetchExpiredJobPosts(currentPage, recordsPerPage, search, sort, selectedType);
        } else {
            fetchData(currentPage, recordsPerPage, search, sort, isApproved, isHidden, isDeleted, selectedType);
        }
    }, [flag, currentPage, recordsPerPage, search, sort, isApproved, isHidden, isDeleted, selectedType, value]);

    const handleChangeTab = async (event, newValue) => {
        setSearch("");
        setCurrentPage(1);
        if (newValue === 0) {
            // Lấy dữ liệu việc làm đang hiển thị
            setIsApproved(true);
            setIsHidden(false);
            setIsDeleted(false);
        } else if (newValue === 1) {
            // Lấy dữ liệu việc làm đang ẩn
            setIsApproved(true);
            setIsHidden(true);
            setIsDeleted(false);
        } else if (newValue === 2) {
            // Lấy dữ liệu việc làm chờ duyệt
            setIsApproved(false);
            setIsHidden(true);
            setIsDeleted(false);
        } else if (newValue === 3) {
            // Lấy dữ liệu việc làm không được duyệt
            setIsApproved(false);
            setIsHidden(true);
            setIsDeleted(true);
        } else if (newValue === 4) {
            // Lấy dữ liệu việc làm đã hết hạn
        }
        setValue(newValue);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setCurrentPage(1);
        setRecordsPerPage(value);
    };

    // Mở modal Edit
    const handleEditPostClick = (postId) => {
        const job = jobPosts.find((post) => post.id === postId); // Tìm bài đăng cần sửa
        if (job) {
            setSelectedJobPost(job);
            setIsUpdateModalOpen(true);
        }
    };

    // Đóng Modal Edit
    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedJobPost(null);
    };

    // Mở modal xem chi tiết bài đăng
    const handleViewDetails = (post) => {
        setSelectedJobPost(post);
        setIsDetailsModalOpen(true);
    };

    const handleToggleVisibility = async (jobPostId) => {
        try {
            const data = await hiddenJobPost(jobPostId);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setFlag((prev) => !prev);
        }
    };

    return (
        <GridViewLayout
            title="DANH SÁCH VIỆC LÀM ĐÃ ĐĂNG TUYỂN"
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
        >
            <Box className="mb-4 flex justify-between space-x-4">
                <FormControl size="small" sx={{ minWidth: 200, width: "30%" }}>
                    <InputLabel id="type-filter-label">Loại hợp đồng</InputLabel>
                    <Select
                        labelId="type-filter-label"
                        id="typeFilter"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        label="Loại hợp đồng"
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        <MenuItem value="Bán thời gian">Bán thời gian</MenuItem>
                        <MenuItem value="Toàn thời gian">Toàn thời gian</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <DataSearchBar
                        placeholder="Tìm kiếm"
                        onSearch={(searchText) => setSearch(searchText)}
                        query={search}
                    />

                    {/* Nút Làm mới */}
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
                </Box>
            </Box>

            <SortBar
                totalRecords={totalRecords}
                sortOption={sort}
                onSortChange={(sortOption) => {
                    setCurrentPage(1);
                    setSort(sortOption);
                }}
            />

            <Divider />

            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChangeTab}
                        variant="scrollable"
                        scrollButtons={false}
                        selectionFollowsFocus
                    >
                        <Tab label="Việc làm đang hiển thị" />
                        <Tab label="Việc làm đang ẩn" />
                        <Tab label="Việc làm chờ duyệt" />
                        <Tab label="Việc làm không được duyệt" />
                        <Tab label="Việc làm đã hết hạn" />
                    </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>
                    <Box>
                        <PostedJobsTable
                            value={value}
                            loading={loading}
                            postedJobPosts={jobPosts}
                            currentPage={currentPage}
                            recordsPerPage={recordsPerPage}
                            handleViewApplicationsClick={(post) => onViewApplications(post)}
                            handleEditPostClick={handleEditPostClick} // Gọi hàm mở modal
                            handleViewDetails={handleViewDetails}
                            handleToggleVisibility={handleToggleVisibility}
                        />
                    </Box>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <PostedJobsTable
                        value={value}
                        loading={loading}
                        postedJobPosts={jobPosts}
                        currentPage={currentPage}
                        recordsPerPage={recordsPerPage}
                        handleViewApplicationsClick={(post) => onViewApplications(post)}
                        handleEditPostClick={handleEditPostClick} // Gọi hàm mở modal
                        handleViewDetails={handleViewDetails}
                        handleToggleVisibility={handleToggleVisibility}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    <PostedJobsTable
                        value={value}
                        loading={loading}
                        postedJobPosts={jobPosts}
                        currentPage={currentPage}
                        recordsPerPage={recordsPerPage}
                        handleViewApplicationsClick={(post) => onViewApplications(post)}
                        handleEditPostClick={handleEditPostClick} // Gọi hàm mở modal
                        handleViewDetails={handleViewDetails}
                        handleToggleVisibility={handleToggleVisibility}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={3}>
                    <PostedJobsTable
                        value={value}
                        loading={loading}
                        postedJobPosts={jobPosts}
                        currentPage={currentPage}
                        recordsPerPage={recordsPerPage}
                        handleViewApplicationsClick={(post) => onViewApplications(post)}
                        handleEditPostClick={handleEditPostClick} // Gọi hàm mở modal
                        handleViewDetails={handleViewDetails}
                        handleToggleVisibility={handleToggleVisibility}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={4}>
                    <PostedJobsTable
                        value={value}
                        loading={loading}
                        postedJobPosts={jobPosts}
                        currentPage={currentPage}
                        recordsPerPage={recordsPerPage}
                        handleViewApplicationsClick={(post) => onViewApplications(post)}
                        handleEditPostClick={handleEditPostClick} // Gọi hàm mở modal
                        handleViewDetails={handleViewDetails}
                        handleToggleVisibility={handleToggleVisibility}
                    />
                </CustomTabPanel>
            </Box>

            {/* Modal chỉnh sửa bài đăng */}
            {isUpdateModalOpen && (
                <UpdateJobPostModal jobPostData={selectedJobPost} onClose={handleCloseUpdateModal} setFlag={setFlag} />
            )}

            {/* Modal xem chi tiết bài đăng */}
            {isDetailsModalOpen && (
                <JobPostDetailsModal
                    open={isDetailsModalOpen}
                    jobPost={selectedJobPost}
                    onClose={() => setIsDetailsModalOpen(false)}
                />
            )}
        </GridViewLayout>
    );
};

PostedJobsGridView.propTypes = {
    onViewApplications: PropTypes.func,
};

export default PostedJobsGridView;
