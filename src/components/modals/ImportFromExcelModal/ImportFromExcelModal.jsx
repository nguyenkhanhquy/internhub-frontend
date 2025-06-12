import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";

const ImportFromExcelModal = ({ isOpen, onClose, entityName, templateUrl, onImport }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    // Xử lý khi chọn file
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    // Xử lý khi nhấn Import
    const handleImport = async () => {
        if (!selectedFile) {
            toast.warning("Vui lòng chọn file Excel!");
            return;
        }

        try {
            await onImport(selectedFile);
            toast.success(`Import thành công!`);
            handleClose();
        } catch (error) {
            console.error("Import error:", error);
            toast.error("Import thất bại!");
        }
    };

    // Xử lý đóng modal
    const handleClose = () => {
        setSelectedFile(null);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} sx={{ "& .MuiDialog-paper": { width: "400px" } }}>
            <DialogTitle>
                <Typography fontWeight="bold">Import {entityName} từ Excel</Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                            backgroundColor: "#f9f9f9",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                borderColor: "#1976d2",
                                backgroundColor: "#f5f5f5",
                                elevation: 2,
                            },
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <DescriptionIcon color="primary" sx={{ fontSize: 24 }} />
                            <Box flex={1}>
                                <Typography variant="body2" color="text.primary" fontWeight="medium">
                                    Template Excel
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Tải xuống file mẫu để tham khảo định dạng
                                </Typography>
                            </Box>
                            <Button
                                href={templateUrl}
                                download
                                variant="outlined"
                                component="span"
                                startIcon={<DownloadIcon />}
                                sx={{
                                    borderColor: "#1976d2",
                                    color: "#1976d2",
                                    "&:hover": {
                                        borderColor: "#1565c0",
                                        backgroundColor: "#e3f2fd",
                                    },
                                }}
                            >
                                Tải xuống
                            </Button>
                        </Box>
                    </Paper>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            border: "2px dashed #e0e0e0",
                            backgroundColor: "#fafafa",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                borderColor: "#1976d2",
                                backgroundColor: "#f5f5f5",
                            },
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
                            <input
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                id="file-upload-input-modal"
                            />
                            <label htmlFor="file-upload-input-modal">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<AttachFileIcon />}
                                    sx={{
                                        borderColor: "#1976d2",
                                        color: "#1976d2",
                                        "&:hover": {
                                            borderColor: "#1565c0",
                                            backgroundColor: "#e3f2fd",
                                        },
                                    }}
                                >
                                    Chọn tệp
                                </Button>
                            </label>

                            {selectedFile && (
                                <Chip
                                    icon={<UploadFileIcon />}
                                    label={selectedFile.name}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    sx={{ maxWidth: "200px" }}
                                />
                            )}

                            {!selectedFile && (
                                <Typography variant="caption" color="textSecondary">
                                    Không có tệp nào được chọn
                                </Typography>
                            )}
                        </Box>
                    </Paper>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 2, py: 1 }}>
                <Button onClick={handleClose} variant="outlined">
                    Hủy
                </Button>
                <Button onClick={handleImport} variant="contained" color="primary">
                    Import
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ImportFromExcelModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    entityName: PropTypes.string.isRequired,
    templateUrl: PropTypes.string.isRequired,
    onImport: PropTypes.func.isRequired,
};

export default ImportFromExcelModal;
