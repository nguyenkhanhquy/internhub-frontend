import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Tooltip from "@mui/material/Tooltip";
import GridViewLayout from "@layouts/DataLayout/GridViewLayout/GridViewLayout";
import DataSearchBar from "../DataSearchBar";
import MyCVsTable from "./StudentDataTable/MyCVsTable";
import ConfirmModal from "@/components/modals/ConfirmModal/ConfirmModal";
import ImportCVModal from "@/components/modals/ImportCVModal/ImportCVModal";

// Mock data cho danh sách CV
const mockCVs = [
    {
        id: 1,
        title: "CV Frontend Developer",
        createdDate: "2024-05-01T10:00:00Z",
        file: "https://example.com/cv-frontend.pdf",
    },
    {
        id: 2,
        title: "CV Backend Developer",
        createdDate: "2024-04-15T14:30:00Z",
        file: "https://example.com/cv-backend.pdf",
    },
    {
        id: 3,
        title: "CV Data Analyst",
        createdDate: "2024-03-20T09:15:00Z",
        file: "https://example.com/cv-backend.pdf",
    },
];

const MyCVsGridView = () => {
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCvId, setSelectedCvId] = useState(null);
    const [importModalOpen, setImportModalOpen] = useState(false);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(mockCVs.length);

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

    const handleConfirmDelete = () => {
        // TODO: Gọi API xóa CV ở đây
        alert(`Xóa CV có id: ${selectedCvId}`);
        setDeleteModalOpen(false);
        setSelectedCvId(null);
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
        setFlag((prev) => !prev); // Refresh danh sách CV sau khi import
    };

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
                            onClick={() => navigate("/cv-builder")}
                        >
                            <AddIcon />
                        </Button>
                    </Tooltip>
                </Box>
            }
        >
            <Box>
                <MyCVsTable loading={loading} data={mockCVs} setFlag={setFlag} handleDeleteClick={handleDeleteClick} />
            </Box>
            <ConfirmModal
                isOpen={deleteModalOpen}
                loading={loading}
                title="Xóa CV"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <ImportCVModal isOpen={importModalOpen} onClose={handleImportClose} />
        </GridViewLayout>
    );
};

export default MyCVsGridView;
