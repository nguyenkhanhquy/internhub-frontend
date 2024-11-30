import PropTypes from "prop-types";
import UpdateJobPostForm from "../../forms/UpdateJobPostForm/UpdateJobPostForm";
import CloseIcon from "@mui/icons-material/Close";

const UpdateJobPostModal = ({ isOpen, jobPostData, onClose }) => {
    if (!isOpen) return null; // Không render nếu modal không mở

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
                {/* Modal Header */}
                <div className="mb-3 flex justify-between">
                    <h2 className="text-xl font-bold text-blue-800">
                        Chỉnh sửa bài đăng: <span className="text-gray-900">{jobPostData.title || ""}</span>
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>
                {/* Modal Content */}
                <div className="max-h-[80vh] overflow-y-auto px-6 py-4">
                    <UpdateJobPostForm jobPostData={jobPostData} onCancel={onClose} />
                </div>
            </div>
        </div>
    );
};

UpdateJobPostModal.propTypes = {
    isOpen: PropTypes.bool.isRequired, // Hiển thị modal hay không
    jobPostData: PropTypes.object.isRequired, // Dữ liệu bài đăng tuyển dụng
    onClose: PropTypes.func.isRequired, // Hành động đóng modal
};

export default UpdateJobPostModal;
