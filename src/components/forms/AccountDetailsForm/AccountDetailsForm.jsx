import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { getAuthUser } from "@services/authService";

import SuspenseLoader from "@components/loaders/SuspenseLoader/SuspenseLoader";

import { useDispatch, useSelector } from "react-redux";
import { selectAccountDetails, setAccountDetails as setAccountDetailsRedux } from "@store/slices/accountSlice";

const AccountDetailsForm = () => {
    const dispatch = useDispatch();
    const accountDetails = useSelector(selectAccountDetails);

    const [userDetails, setUserDetails] = useState(accountDetails);
    const [loading, setLoading] = useState(!accountDetails);

    useEffect(() => {
        const fetchAccountDetails = async () => {
            setLoading(true);
            try {
                const data = await getAuthUser();
                if (!data?.success || !data?.result) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setUserDetails(data.result);
                dispatch(setAccountDetailsRedux(data.result));
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (!accountDetails) {
            fetchAccountDetails();
        }
    }, [accountDetails, dispatch]);

    if (loading) {
        return (
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
        );
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight={400}
            margin="auto"
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
                            width: "100%",
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
    );
};

export default AccountDetailsForm;
