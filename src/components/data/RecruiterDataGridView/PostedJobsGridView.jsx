import { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Divider } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { toast } from "react-toastify";

import GridViewLayout from "../../../layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "../DataSearchBar";
import PostedJobsTable from "./RecruiterDataTable/PostedJobsTable";
import SortBar from "../../../components/sort/SortBar";
import CustomTabPanel from "../../../components/tabs/CustomTabPanel/CustomTabPanel";
import UpdateJobPostModal from "../../modals/UpdateJobPostModal/UpdateJobPostModal";

import { getJobPostsByRecruiter } from "../../../services/jobPostService";
import { hiddenJobPost } from "../../../services/jobPostService";

const PostedJobsGridView = () => {
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(true);
    const [jobPosts, setJobPosts] = useState([]);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const [selectedMajor, setSelectedMajor] = useState("");
    const [sort, setSort] = useState("default");
    const [isApproved, setIsApproved] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const [value, setValue] = useState(0);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    // const [isDetailmodalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedJobPost, setSelectedJobPost] = useState(null);

    const fetchData = async (currentPage, recordsPerPage, search, sort, isApproved, isHidden, isDeleted) => {
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

    useEffect(() => {
        fetchData(currentPage, recordsPerPage, search, sort, isApproved, isHidden, isDeleted);
    }, [flag, currentPage, recordsPerPage, search, sort, isApproved, isHidden, isDeleted]);

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

    // useEffect(() => {
    //     console.log("Ngành đã chọn:", selectedMajor);
    // }, [selectedMajor]);

    // Mở modal
    const handleEditPostClick = (postId) => {
        const job = jobPosts.find((post) => post.id === postId); // Tìm bài đăng cần sửa
        if (job) {
            setSelectedJobPost(job);
            setIsUpdateModalOpen(true);
        }
    };

    // Đóng Modal
    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedJobPost(null);
    };

    const handleViewDetails = (post) => {
        // setSelectedJobPost(post);
        // setIsDetailModalOpen(true);
        console.log("View details of job post:", post);
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
                    <InputLabel id="major-filter-label">Ngành</InputLabel>
                    <Select
                        labelId="major-filter-label"
                        id="majorFilter"
                        value={selectedMajor}
                        onChange={(e) => setSelectedMajor(e.target.value)}
                        label="Ngành"
                    >
                        <MenuItem value="">Tất cả ngành</MenuItem>
                        <MenuItem value="IT">Công nghệ thông tin</MenuItem>
                        <MenuItem value="DS">Kỹ thuật dữ liệu</MenuItem>
                        <MenuItem value="IS">An toàn thông tin</MenuItem>
                    </Select>
                </FormControl>

                <DataSearchBar placeholder="Tìm kiếm" onSearch={(searchText) => setSearch(searchText)} query={search} />
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
                            loading={loading}
                            postedJobPosts={jobPosts}
                            currentPage={currentPage}
                            recordsPerPage={recordsPerPage}
                            handleViewApplicationsClick={() => console.log("View applications")}
                            handleEditPostClick={handleEditPostClick} // Gọi hàm mở modal
                            handleViewDetails={handleViewDetails}
                            handleToggleVisibility={handleToggleVisibility}
                        />
                    </Box>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <PostedJobsTable
                        loading={loading}
                        postedJobPosts={jobPosts}
                        currentPage={currentPage}
                        recordsPerPage={recordsPerPage}
                        handleViewApplicationsClick={() => console.log("View applications")}
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
                        handleViewApplicationsClick={() => console.log("View applications")}
                        handleEditPostClick={handleEditPostClick} // Gọi hàm mở modal
                        handleViewDetails={handleViewDetails}
                        handleToggleVisibility={handleToggleVisibility}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={3}></CustomTabPanel>

                <CustomTabPanel value={value} index={4}></CustomTabPanel>
            </Box>

            {/* Modal chỉnh sửa bài đăng */}
            <UpdateJobPostModal
                isOpen={isUpdateModalOpen}
                jobPostData={selectedJobPost || {}}
                onClose={handleCloseUpdateModal}
                setFlag={setFlag}
            />
        </GridViewLayout>
    );
};

export default PostedJobsGridView;
