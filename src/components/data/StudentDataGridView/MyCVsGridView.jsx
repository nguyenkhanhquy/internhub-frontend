import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Box, Button, Tooltip } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import GridViewLayout from "@layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "@components/data/DataSearchBar";
import MyCVsTable from "./StudentDataTable/MyCVsTable";
import ConfirmModal from "@components/modals/ConfirmModal/ConfirmModal";
import ImportCVModal from "@components/modals/ImportCVModal/ImportCVModal";

import { getAllCVsByStudent, deleteCV } from "@services/cvService";

const MyCVsGridView = () => {
    const [loading, setLoading] = useState(false);
    const [listCVs, setListCVs] = useState([]);
    const [flag, setFlag] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCvId, setSelectedCvId] = useState(null);
    const [importModalOpen, setImportModalOpen] = useState(false);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const navigate = useNavigate();

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRecordsPerPageChange = (value) => {
        setCurrentPage(1);
        setRecordsPerPage(value);
    };

    const handleDeleteClick = (id) => {
        setSelectedCvId(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            setLoading(true);
            await deleteCV(selectedCvId);
            setDeleteModalOpen(false);
            setSelectedCvId(null);
            setFlag((prev) => !prev);
            toast.success("Xóa CV thành công");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelDelete = () => {
        setDeleteModalOpen(false);
        setSelectedCvId(null);
    };

    const handleImportClick = () => {
        setImportModalOpen(true);
    };

    const handleImportClose = () => {
        setImportModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getAllCVsByStudent(currentPage - 1, recordsPerPage, search);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }

                setTotalPages(data.pageInfo.totalPages);
                setTotalRecords(data.pageInfo.totalElements);
                setListCVs(data.result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [search, currentPage, recordsPerPage, flag]);

    return (
        <GridViewLayout
            title="DANH SÁCH CV"
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
            actions={
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

                    {/* Nút Import CV */}
                    <Tooltip title="Import CV" arrow>
                        <Button
                            variant="outlined"
                            onClick={handleImportClick}
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
                            <UploadFileIcon />
                        </Button>
                    </Tooltip>

                    {/* Nút Tạo CV */}
                    <Tooltip title="Tạo CV" arrow>
                        <Button
                            variant="contained"
                            sx={{
                                minWidth: 44,
                                width: 44,
                                height: 44,
                                borderRadius: 2,
                                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                                bgcolor: "#2e3090",
                                color: "white",
                                p: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                    bgcolor: "#1f2061",
                                },
                                "&:active": {
                                    boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                                },
                            }}
                            onClick={() => navigate("/student/cv-builder")}
                        >
                            <AddIcon />
                        </Button>
                    </Tooltip>
                </Box>
            }
        >
            <Box>
                <MyCVsTable loading={loading} data={listCVs} setFlag={setFlag} handleDeleteClick={handleDeleteClick} />
            </Box>
            <ConfirmModal
                isOpen={deleteModalOpen}
                loading={loading}
                title="Xóa CV"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <ImportCVModal isOpen={importModalOpen} onClose={handleImportClose} setFlag={setFlag} />
        </GridViewLayout>
    );
};

export default MyCVsGridView;
