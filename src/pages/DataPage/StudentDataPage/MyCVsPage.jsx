import MainLayout from "../../../layouts/MainLayout/MainLayout";
import StudentDataLayout from "../../../layouts/DataLayout/StudentDataLayout";
import PageNavigation from "../../../components/layouts/PageNavigation/PageNavigation";
import MyCVsGridView from "../../../components/data/StudentDataGridView/MyCVsGridView";

const MyCVsPage = () => {
    return (
        <MainLayout title="CV">
            <PageNavigation pageName="CV" />
            <StudentDataLayout>
                <MyCVsGridView />
            </StudentDataLayout>
        </MainLayout>
    );
};

export default MyCVsPage;
