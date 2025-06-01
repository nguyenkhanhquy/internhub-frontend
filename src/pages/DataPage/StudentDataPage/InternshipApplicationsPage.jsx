import { useState } from "react";

import MainLayout from "@layouts/MainLayout/MainLayout";
import StudentDataLayout from "@layouts/DataLayout/StudentDataLayout";
import PageNavigation from "@components/layouts/PageNavigation/PageNavigation";
import InternshipApplicationsGridView from "@components/data/StudentDataGridView/InternshipApplicationsGridView";
import InternshipReportForm from "@components/forms/InternshipReportForm/InternshipReportForm";

const InternshipApplicationsPage = () => {
    const [flag, setFlag] = useState(false);

    return (
        <MainLayout title="Báo cáo thực tập">
            <PageNavigation pageName="Sinh viên" />
            <StudentDataLayout>
                <InternshipReportForm setFlag={setFlag} />
                <InternshipApplicationsGridView flag={flag} setFlag={setFlag} />
            </StudentDataLayout>
        </MainLayout>
    );
};

export default InternshipApplicationsPage;
