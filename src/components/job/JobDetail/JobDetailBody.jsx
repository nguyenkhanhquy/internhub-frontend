import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import CustomTabPanel from "@components/tabs/CustomTabPanel/CustomTabPanel";

import JobInfoTab from "./Tabs/JobInfoTab";
import CompanyInfoTab from "./Tabs/CompanyInfoTab";
import JobListingTab from "@components/section/CompanyDetailsPage/Tabs/JobListingTab";

const JobDetailBody = ({ jobDetail, companyJobs, relatedJobs }) => {
    const [value, setValue] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setValue(0);
    }, [jobDetail.id]);

    return (
        <Box
            sx={{
                p: 3,
                pt: 0,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                lineHeight: 1.6,
                width: "100%",
                margin: "0 auto",
            }}
        >
            {/* Tabs */}
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChangeTab}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        selectionFollowsFocus
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: {
                                "&.Mui-disabled": { opacity: 0.3 },
                            },
                        }}
                    >
                        <Tab label="Thông tin việc làm" />
                        <Tab label="Thông tin công ty" />
                        <Tab label="Việc làm khác từ công ty" />
                        <Tab label="Việc làm liên quan" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <JobInfoTab
                        description={jobDetail.description}
                        benefits={jobDetail.benefits}
                        requirements={jobDetail.requirements}
                        address={jobDetail.address}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <CompanyInfoTab description={jobDetail.company.description} />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    <JobListingTab jobs={companyJobs} />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={3}>
                    <JobListingTab jobs={relatedJobs} />
                </CustomTabPanel>
            </Box>
        </Box>
    );
};

JobDetailBody.propTypes = {
    jobDetail: PropTypes.object.isRequired,
    companyJobs: PropTypes.array.isRequired,
    relatedJobs: PropTypes.array.isRequired,
};

export default JobDetailBody;
