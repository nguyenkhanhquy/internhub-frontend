import { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { getAuthUser } from "../../services/authService";
import SuspenseLoader from "../../components/loaders/SuspenseLoader/SuspenseLoader";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import AccountLayout from "../../layouts/AccountLayout/AccountLayout";
import PageNavigation from "../../components/layouts/PageNavigation/PageNavigation";

const AccountDetailsPage = () => {
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserDetails = async () => {
            setLoading(true);
            const data = await getAuthUser();
            setUserDetails(data.result);
            setLoading(false);
        };

        getUserDetails();
    }, []);

    return (
        <MainLayout title="Chi tiết tài khoản">
            <PageNavigation pageName="Tài khoản" />
            <AccountLayout>
                {!loading ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="60vh"
                        // bgcolor={"#f0f2f5"}
                    >
                        <Card
                            sx={{
                                minWidth: 400,
                                maxWidth: 800,
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
                                        ID
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
                                        Trạng thái
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: 14,
                                        }}
                                    >
                                        {userDetails.active ? "Đã kích hoạt" : "Chưa kích hoạt"}
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
                            height: "60vh",
                        }}
                    >
                        <SuspenseLoader />
                    </Box>
                )}
            </AccountLayout>
        </MainLayout>
    );
};

export default AccountDetailsPage;
