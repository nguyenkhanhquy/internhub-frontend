import { useEffect, useState } from "react";
import { Paper, Card, Typography, Grid } from "@mui/material";
import { getToken } from "../../../services/localStorageService";
import { getAuthUser } from "../../../services/authService";

const AccountDetailsCard = () => {
    const [userDetails, setUserDetails] = useState({});

    const getUserDetails = async () => {
        const data = await getAuthUser();
        setUserDetails(data.result);
    };

    useEffect(() => {
        const accessToken = getToken();
        if (accessToken) {
            getUserDetails();
        }
    }, []);

    return (
        <Paper>
            <Card
                sx={{
                    minWidth: 400,
                    px: 4,
                    py: 2,
                    mb: 4,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        mb: 3,
                    }}
                >
                    Thông tin tài khoản
                </Typography>
                <Grid container spacing={2}>
                    {[
                        { label: "ID", value: userDetails.id },
                        { label: "Email", value: userDetails.email },
                        { label: "Quyền", value: userDetails.role },
                        {
                            label: "Ngày tạo",
                            value: userDetails.createdDate
                                ? new Date(userDetails.createdDate).toLocaleDateString()
                                : "Chưa cập nhật",
                        },
                        {
                            label: "Ngày cập nhật",
                            value: userDetails.updatedDate
                                ? new Date(userDetails.updatedDate).toLocaleDateString()
                                : "Chưa cập nhật",
                        },
                        {
                            label: "Trạng thái",
                            value: userDetails.active ? "Đã kích hoạt" : "Chưa kích hoạt",
                            color: userDetails.active ? "green" : "red",
                        },
                    ].map((item, index) => (
                        <Grid item xs={12} key={index}>
                            <Typography variant="body1" fontWeight="bold" display="inline">
                                {item.label}:
                            </Typography>{" "}
                            <Typography variant="body1" display="inline" color={item.color || "inherit"}>
                                {item.value}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Card>
        </Paper>
    );
};

export default AccountDetailsCard;
