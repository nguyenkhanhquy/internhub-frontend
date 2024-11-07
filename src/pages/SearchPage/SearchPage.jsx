import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import JobCardSearch from "../../components/job/JobCard/JobCardSearch";

const SearchPage = () => {
    const [isSaved, setIsSaved] = useState(false);

    const toggleSaveJob = () => {
        setIsSaved((prev) => !prev);
        toast.success("Đã lưu công việc thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    };
    return (
        <MainLayout title="Việc làm">
            <div style={{ margin: "50px" }}>
                <JobCardSearch
                    logo="https://innhanhhcm.vn/wp-content/uploads/2023/11/logo-fpt-01-1024x774.jpg" // URL logo của công ty
                    title="Thực tập sinh Frontend" // Tên công việc
                    companyName="Công ty Cổ phần Viễn thông FPT" // Tên công ty
                    address="Thành phố Hồ Chí Minh" // Địa chỉ làm việc
                    jobPosition="IT Phần mềm" // Vị trí công việc
                    type="Toàn thời gian" // Kiểu công việc
                    salary="Thỏa thuận" // Mức lương
                    updateDate={new Date("2024-11-07")} // Ngày cập nhật
                    expiryDate={new Date("2024-12-31")} // Hạn nộp
                    saved={isSaved} // Trạng thái lưu công việc
                    onToggleSave={toggleSaveJob} // Hàm bật/tắt lưu công việc
                />
                <JobCardSearch
                    logo="https://innhanhhcm.vn/wp-content/uploads/2023/11/logo-fpt-01-1024x774.jpg" // URL logo của công ty
                    title="Thực tập sinh Frontend" // Tên công việc
                    companyName="Công ty Cổ phần Viễn thông FPT" // Tên công ty
                    address="Thành phố Hồ Chí Minh" // Địa chỉ làm việc
                    jobPosition="IT Phần mềm" // Vị trí công việc
                    type="Toàn thời gian" // Kiểu công việc
                    salary="Thỏa thuận" // Mức lương
                    updateDate={new Date("2024-11-07")} // Ngày cập nhật
                    expiryDate={new Date("2024-12-31")} // Hạn nộp
                    saved={isSaved} // Trạng thái lưu công việc
                    onToggleSave={toggleSaveJob} // Hàm bật/tắt lưu công việc
                />
            </div>
            <ToastContainer />
        </MainLayout>
    );
};

export default SearchPage;
