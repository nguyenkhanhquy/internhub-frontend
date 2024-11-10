import { Card, Typography, Avatar, Box, Stack } from "@mui/material";
import PropTypes from "prop-types";

const JobCardBasic = ({ logo, title, companyName, remote, type }) => {
    return (
        <Card
            sx={{
                maxWidth: 420,
                minHeight: 150,
                mb: 3,
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                padding: 2,
                transition: "all 0.3s ease-in-out", // Thêm hiệu ứng mượt
                "&:hover": {
                    borderColor: "#007bff", // Hiệu ứng sáng viền khi hover
                    boxShadow: 3, // Tăng nhẹ shadow khi hover
                },
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                    src={logo}
                    alt={`${companyName} logo`}
                    variant="square"
                    sx={{
                        height: 100,
                        width: 100,
                        objectFit: "cover",
                        borderRadius: 2,
                        border: "1px solid #f0f0f0",
                        mr: 2,
                    }}
                />
                <Box sx={{ flex: 1 }}>
                    {/* Hiển thị thông tin công việc */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: "#333",
                            mb: 0.5,
                            whiteSpace: "normal", // Cho phép xuống dòng
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 1,
                            whiteSpace: "normal", // Cho phép xuống dòng
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {companyName}
                    </Typography>

                    {/* Hiển thị thời gian và hình thức */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            mt: 0.5,
                            display: "flex",
                            justifyContent: "flex-start",
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: "#e0f7fa",
                                padding: "2px 6px",
                                borderRadius: 1,
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#007bff",
                                }}
                            >
                                {remote}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "#e6ffe6",
                                padding: "2px 6px",
                                borderRadius: 1,
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#28a745",
                                }}
                            >
                                {type}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Card>
    );
};

JobCardBasic.propTypes = {
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    remote: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default JobCardBasic;
