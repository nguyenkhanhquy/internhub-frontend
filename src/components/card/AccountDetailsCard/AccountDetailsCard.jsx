import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import Loading from "@components/loaders/Loading/Loading";

import { getAuthUser } from "@services/authService";

import { useDispatch, useSelector } from "react-redux";
import { selectAccountDetails, setAccountDetails as setAccountDetailsRedux } from "@store/slices/accountSlice";

const AccountDetailsCard = () => {
    const dispatch = useDispatch();
    const accountDetailsRedux = useSelector(selectAccountDetails);

    const [accountDetails, setAccountDetails] = useState(accountDetailsRedux);
    const [loading, setLoading] = useState(!accountDetailsRedux);

    useEffect(() => {
        const fetchAccountDetails = async () => {
            setLoading(true);
            try {
                const data = await getAuthUser();
                if (!data?.success || !data?.result) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setAccountDetails(data.result);
                dispatch(setAccountDetailsRedux(data.result));
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (!accountDetailsRedux) {
            fetchAccountDetails();
        }
    }, [accountDetailsRedux, dispatch]);

    return (
        <Paper>
            <Typography variant="h5" px={4} py={2}>
                Thông tin tài khoản
            </Typography>

            <Divider />

            <Box
                sx={{
                    minHeight: 280,
                    maxWidth: 400,
                    px: 4,
                    py: 2,
                }}
            >
                {loading ? (
                    <Loading />
                ) : (
                    <Grid container spacing={2}>
                        {[
                            { label: "ID", value: accountDetails.id },
                            { label: "Email", value: accountDetails.email },
                            { label: "Quyền", value: accountDetails.role },
                            {
                                label: "Ngày tạo",
                                value: accountDetails.createdDate || "Chưa cập nhật",
                            },
                            {
                                label: "Ngày cập nhật",
                                value: accountDetails.updatedDate || "Chưa cập nhật",
                            },
                            {
                                label: "Trạng thái",
                                value: accountDetails.active ? "Đã kích hoạt" : "Chưa kích hoạt",
                                color: accountDetails.active ? "green" : "red",
                            },
                        ].map((item, index) => (
                            <Grid size={12} key={index}>
                                <Typography variant="body1" fontWeight="bold" display="inline">
                                    {item.label}:
                                </Typography>{" "}
                                <Typography variant="body1" display="inline" color={item.color || "inherit"}>
                                    {item.value}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Paper>
    );
};

export default AccountDetailsCard;
