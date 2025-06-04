import PropTypes from "prop-types";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";

import CloseIcon from "@mui/icons-material/Close";

const ViewCvModal = ({ isOpen, onClose, cvUrl, title }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const isMobile = useMediaQuery("(max-width: 900px)");

    const handleIframeLoad = () => {
        setLoading(false);
        setError(false);
    };

    const handleIframeError = () => {
        setLoading(false);
        setError(true);
    };

    const resetStates = () => {
        setLoading(true);
        setError(false);
    };

    const handleClose = () => {
        resetStates();
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            fullScreen={isMobile}
            slotProps={{
                paper: {
                    sx: {
                        height: isMobile ? "100vh" : "90vh",
                        maxHeight: isMobile ? "100vh" : "90vh",
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: 1,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Typography variant="h6" fontWeight="bold" sx={{ flex: 1 }}>
                    {title || "Xem CV"}
                </Typography>
                <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {!cvUrl ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                        padding={3}
                    >
                        <Typography color="textSecondary" variant="h6" gutterBottom>
                            Không có CV để hiển thị
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                            Vui lòng kiểm tra lại đường dẫn CV
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {/* Loading overlay */}
                        {loading && (
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                bottom={0}
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                bgcolor="rgba(255, 255, 255, 0.9)"
                                zIndex={1}
                            >
                                <CircularProgress size={40} />
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    Đang tải CV...
                                </Typography>
                            </Box>
                        )}

                        {/* Error state */}
                        {error && !loading && (
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                height="100%"
                                padding={3}
                                gap={2}
                            >
                                <Alert severity="error" sx={{ width: "100%", maxWidth: 400 }}>
                                    <Typography variant="body2">
                                        Không thể tải CV. Vui lòng kiểm tra liên kết hoặc thử lại.
                                    </Typography>
                                </Alert>
                            </Box>
                        )}

                        {/* CV iframe */}
                        <iframe
                            src={cvUrl}
                            title="CV Viewer"
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "none",
                                display: error ? "none" : "block",
                            }}
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                        />
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

ViewCvModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    cvUrl: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ViewCvModal;
