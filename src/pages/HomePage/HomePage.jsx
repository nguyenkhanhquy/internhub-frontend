import MainLayout from "../../layouts/MainLayout/MainLayout";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../services/localStorageService";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { getAuthUser } from "../../services/authService";

const HomePage = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});

    const getUserDetails = async () => {
        const data = await getAuthUser();
        setUserDetails(data.result);
    };

    useEffect(() => {
        const accessToken = getToken();

        if (!accessToken) {
            navigate("/login");
        } else {
            getUserDetails();
        }
    }, [navigate]);

    return (
        <MainLayout title="Trang chủ">
            {userDetails ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="60vh"
                    bgcolor={"#f0f2f5"}
                >
                    <Card
                        sx={{
                            minWidth: 350,
                            maxWidth: 500,
                            boxShadow: 4,
                            borderRadius: 4,
                            padding: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                width: "100%",
                                gap: "10px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                    }}
                                >
                                    Id
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                    }}
                                >
                                    {userDetails.id}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                    }}
                                >
                                    Email
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                    }}
                                >
                                    {userDetails.email}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    width: "100%", // Ensure content takes full width
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                    }}
                                >
                                    Quyền
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                    }}
                                >
                                    {userDetails.role}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                    }}
                                >
                                    Ngày tạo
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                    }}
                                >
                                    {userDetails.createdDate}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                    }}
                                >
                                    Ngày cập nhật
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                    }}
                                >
                                    {userDetails.updatedDate}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                    }}
                                >
                                    Active
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                    }}
                                >
                                    {userDetails.active ? "Yes" : "No"}
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <CircularProgress></CircularProgress>
                    <Typography>Loading ...</Typography>
                </Box>
            )}
        </MainLayout>
    );
};

export default HomePage;
