import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";

import { uploadCV } from "../../../services/uploadService";
import { applyJob } from "../../../services/jobApplyService";

const JobApplicationModal = ({ jobPostId, jobTitle, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [coverLetter, setCoverLetter] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        // Khóa cuộn trang khi mở modal
        document.body.style.overflow = "hidden";

        // Kiểm tra vị trí cuộn, chỉ trượt xuống nếu đang ở gần top
        // if (window.scrollY <= 150) {
        //     window.scrollTo({ top: 150, behavior: "smooth" });
        // }

        return () => {
            // Khôi phục cuộn trang khi đóng modal
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleApply = async () => {
        setLoading(true);
        try {
            if (selectedFile && coverLetter !== "") {
                // Tạo đường dẫn tệp với timestamp
                const timestamp = Date.now();
                const filePath = `cv/${jobPostId}/${timestamp}`;
                const dataUpload = await uploadCV(selectedFile, filePath);
                if (!dataUpload.success) {
                    throw new Error(dataUpload.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                } else {
                    const data = await applyJob(jobPostId, coverLetter, dataUpload.result.secure_url);
                    if (!data.success) {
                        throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                    }
                    toast.success(data.message);
                    onClose();
                }
            } else {
                toast.info("Vui lòng cung cấp đầy đủ thông tin ứng tuyển");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileRemove = () => {
        setSelectedFile(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl">
                {/* Header */}
                <h2 className="mb-4 text-xl font-bold text-gray-800">
                    Ứng tuyển: <span className="text-blue-800">{jobTitle}</span>
                </h2>

                {/* CV Upload Section */}
                <div className="mb-6 rounded-lg border border-dashed border-blue-600 p-4">
                    {!selectedFile ? (
                        <div className="flex flex-col items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="mb-3 h-10 w-10 text-blue-800"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v10.5m-6 3H9m3-3v3"
                                />
                            </svg>
                            <p className="text-base font-medium text-gray-700">Tải lên CV từ máy tính</p>
                            <p className="mt-1 text-sm text-gray-500">
                                Hỗ trợ định dạng <span className="font-semibold">.doc, .docx, .pdf</span>
                            </p>
                            <label className="mt-3 inline-block cursor-pointer rounded-lg bg-blue-800 px-4 py-2 text-base font-semibold text-white hover:bg-blue-900">
                                <input
                                    type="file"
                                    accept=".doc,.docx,.pdf"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                Chọn CV
                            </label>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between rounded-lg border border-gray-300 p-3">
                            <div className="flex items-center gap-2">
                                <DescriptionIcon className="text-blue-800" />
                                <span className="text-sm font-medium text-gray-700">{selectedFile.name}</span>
                            </div>
                            <button
                                onClick={handleFileRemove}
                                className="rounded-full p-1 text-red-600 hover:bg-gray-200"
                                aria-label="Remove file"
                            >
                                <DeleteIcon />
                            </button>
                        </div>
                    )}
                </div>

                {/* Cover Letter Section */}
                <div className="mb-6">
                    <label className="block text-base font-semibold text-gray-800">Thư giới thiệu:</label>
                    <p className="mt-1 text-base text-gray-500">
                        Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên nghiệp và gây ấn tượng hơn với
                        nhà tuyển dụng.
                    </p>
                    <textarea
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows="4"
                        className="mt-3 w-full rounded-lg border border-gray-300 p-3 text-base text-gray-800 focus:border-blue-600 focus:outline-none"
                        placeholder="Viết thư giới thiệu của bạn tại đây..."
                    ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="w-1/5 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleApply}
                        disabled={loading}
                        className="w-4/5 rounded-lg bg-blue-800 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-900"
                    >
                        {loading ? "Đang nộp hồ sơ ứng tuyển..." : "Nộp hồ sơ ứng tuyển"}
                    </button>
                </div>
            </div>
        </div>
    );
};

JobApplicationModal.propTypes = {
    jobPostId: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default JobApplicationModal;
