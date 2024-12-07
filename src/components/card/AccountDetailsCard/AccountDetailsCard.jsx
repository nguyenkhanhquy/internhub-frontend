import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Grid, Divider, Box } from "@mui/material";
import Loading from "../../../components/loaders/Loading/Loading";

import { getToken } from "../../../services/localStorageService";
import { getAuthUser } from "../../../services/authService";

const AccountDetailsCard = ({ flag }) => {
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({});

    const getUserDetails = async () => {
        setLoading(true);
        const data = await getAuthUser();
        setUserDetails(data.result);
        setLoading(false);
    };

    useEffect(() => {
        const accessToken = getToken();
        if (accessToken) {
            getUserDetails();
        }
    }, [flag]);

    return (
        <Paper>
            <Typography variant="h5" px={4} py={2}>
                Thông tin tài khoản
            </Typography>

            <Divider />

            <Box
                sx={{
                    minWidth: 400,
                    px: 4,
                    py: 2,
                    mb: 2,
                }}
            >
                {loading ? (
                    <Loading />
                ) : (
                    <Grid container spacing={2}>
                        {[
                            { label: "ID", value: userDetails.id },
                            { label: "Email", value: userDetails.email },
                            { label: "Quyền", value: userDetails.role },
                            {
                                label: "Ngày tạo",
                                value: userDetails.createdDate || "Chưa cập nhật",
                            },
                            {
                                label: "Ngày cập nhật",
                                value: userDetails.updatedDate || "Chưa cập nhật",
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
                )}
            </Box>
        </Paper>
    );
};

AccountDetailsCard.propTypes = {
    flag: PropTypes.bool,
};

export default AccountDetailsCard;
