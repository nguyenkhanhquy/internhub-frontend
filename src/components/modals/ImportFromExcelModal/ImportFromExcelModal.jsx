import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Link } from "@mui/material";

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
            toast.error("Vui lòng chọn file Excel trước khi import!");
            return;
        }

        try {
            await onImport(selectedFile);
            toast.success(`Import danh sách ${entityName} thành công!`);
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
                    <Typography variant="body2">Vui lòng tham khảo file Excel mẫu trước khi upload:</Typography>
                    <Link href={templateUrl} underline="always" color="primary" download>
                        Tải file mẫu
                    </Link>
                    <Box>
                        <Button variant="outlined" component="label" sx={{ mr: 2 }}>
                            Chọn tệp
                            <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileChange} />
                        </Button>
                        <Typography variant="caption" color={selectedFile ? "textPrimary" : "textSecondary"}>
                            {selectedFile ? selectedFile.name : "Không có tệp nào được chọn"}
                        </Typography>
                    </Box>
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
