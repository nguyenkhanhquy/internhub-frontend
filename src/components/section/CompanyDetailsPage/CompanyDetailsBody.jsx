import { useState } from "react";
import PropTypes from "prop-types";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import CustomTabPanel from "../../tabs/CustomTabPanel/CustomTabPanel";
import CompanyInfoTab from "../../job/JobDetail/Tabs/CompanyInfoTab";
import JobListingTab from "../../section/CompanyDetailsPage/Tabs/JobListingTab";

const CompanyDetailsBody = ({ description, address, jobs }) => {
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
                        <Tab label="Thông tin công ty" />
                        <Tab label="Danh sách việc làm" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <CompanyInfoTab description={description} address={address} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <JobListingTab jobs={jobs} />
                </CustomTabPanel>
            </Box>
        </Box>
    );
};

CompanyDetailsBody.propTypes = {
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    jobs: PropTypes.array.isRequired,
};

export default CompanyDetailsBody;
