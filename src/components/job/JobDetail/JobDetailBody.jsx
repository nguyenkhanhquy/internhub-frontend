import { useState } from "react";
import PropTypes from "prop-types";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomTabPanel from "../../tabs/CustomTabPanel/CustomTabPanel";
import Box from "@mui/material/Box";

import JobInfoTab from "./Tabs/JobInfoTab";

const JobDetailBody = ({ jobData }) => {
    const [value, setValue] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                backgroundColor: "white",
                p: 4,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                mb: 4,
                lineHeight: 1.6,
                width: "100%",
                margin: "0 auto",
                paddingTop: "0",
            }}
        >
            {/* Tabs */}
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChangeTab}
                        variant="scrollable"
                        scrollButtons={false}
                        selectionFollowsFocus
                    >
                        <Tab label="Thông tin việc làm" />
                        <Tab label="Thông tin công ty" />
                        <Tab label="Việc làm khác từ công ty" />
                        <Tab label="Việc làm khác liên quan" disabled />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <JobInfoTab
                        description={jobData.description}
                        benefits={jobData.benefits}
                        requirements={jobData.requirements}
                        address={jobData.address}
                    />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Thông tin công ty
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Việc làm khác từ công ty
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    Việc làm liên quan
                </CustomTabPanel>
            </Box>
        </Box>
    );
};

JobDetailBody.propTypes = {
    jobData: PropTypes.object.isRequired,
};

export default JobDetailBody;
