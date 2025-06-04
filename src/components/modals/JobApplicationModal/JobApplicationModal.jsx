import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { uploadCV } from "@services/uploadService";
import { applyJob } from "@services/jobApplyService";
import { getAllCVsByStudent } from "@services/cvService";

import { formatDateTime } from "@utils/dateUtil";

const JobApplicationModal = ({ jobPostId, jobTitle, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [coverLetter, setCoverLetter] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedCvId, setSelectedCvId] = useState(null);
    const [cvSource, setCvSource] = useState("saved"); // 'saved' hoặc 'upload'
    const [listCVs, setListCVs] = useState([]);

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
            if (coverLetter === "") {
                toast.info("Vui lòng cung cấp thư giới thiệu");
                return;
            }

            let cvUrl = null;

            if (cvSource === "saved") {
                // Sử dụng CV có sẵn từ list
                if (!selectedCvId) {
                    toast.info("Vui cung cấp file CV");
                    return;
                }
                const selectedCv = listCVs.find((cv) => cv.id === selectedCvId);
                if (!selectedCv) {
                    throw new Error("Không tìm thấy CV đã chọn");
                }
                cvUrl = selectedCv.filePath;
            } else if (cvSource === "upload") {
                // Upload CV mới
                if (!selectedFile) {
                    toast.info("Vui cung cấp file CV");
                    return;
                }
                // Tạo đường dẫn tệp với timestamp
                const timestamp = Date.now();
                const filePath = `cv/${jobPostId}/${timestamp}`;
                const dataUpload = await uploadCV(selectedFile, filePath);
                if (!dataUpload.success) {
                    throw new Error(dataUpload.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                cvUrl = dataUpload.result.secure_url;
            }

            // Gọi API apply job
            const data = await applyJob(jobPostId, coverLetter, cvUrl);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            toast.success(data.message);
            onClose();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Kiểm tra dung lượng file (5MB = 5 * 1024 * 1024 bytes)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                toast.warn("File quá lớn! Vui lòng chọn file có dung lượng dưới 5MB.");
                e.target.value = "";
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleFileRemove = () => {
        setSelectedFile(null);
    };

    const handleSelectCv = (cvId) => {
        setCvSource("saved");
        setSelectedCvId(cvId);
        setSelectedFile(null);
    };

    const handleSelectUpload = () => {
        setCvSource("upload");
        setSelectedCvId(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllCVsByStudent(0, 10);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }

                setListCVs(data.result);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg bg-white p-0 shadow-xl">
                {/* Header */}
                <div className="border-b border-gray-200 px-6 pt-6 pb-2">
                    <h2 className="text-xl font-bold text-gray-800">
                        Ứng tuyển: <span className="text-blue-800">{jobTitle}</span>
                    </h2>
                </div>

                {/* Content (scrollable) */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {/* Danh sách CV có sẵn */}
                    <div className="mb-6">
                        <label className="mb-2 block text-base font-semibold text-gray-800">
                            Chọn CV để ứng tuyển:
                        </label>
                        <div className="flex flex-col gap-2">
                            {listCVs.map((cv) => (
                                <label
                                    key={cv.id}
                                    className={
                                        `flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 transition ` +
                                        (cvSource === "saved" && selectedCvId === cv.id
                                            ? "border-blue-700 bg-blue-50 shadow"
                                            : "border-gray-200 hover:border-blue-400 hover:bg-blue-50")
                                    }
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <input
                                            type="radio"
                                            name="selectedCv"
                                            checked={cvSource === "saved" && selectedCvId === cv.id}
                                            onChange={() => handleSelectCv(cv.id)}
                                            className="accent-blue-700"
                                        />
                                        <DescriptionIcon className="text-blue-800" />
                                        <div className="flex min-w-0 flex-col">
                                            <span className="truncate font-medium text-gray-800">{cv.title}</span>
                                            <span className="mt-0.5 text-xs text-gray-500">
                                                Ngày tạo: {formatDateTime(cv.createdDate)}
                                            </span>
                                        </div>
                                    </div>
                                    <a
                                        href={cv.filePath}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 text-blue-700 hover:text-blue-900"
                                        title="Xem file CV"
                                    >
                                        <VisibilityIcon />
                                    </a>
                                </label>
                            ))}
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="radio"
                                    name="selectedCv"
                                    checked={cvSource === "upload"}
                                    onChange={handleSelectUpload}
                                />
                                <DescriptionIcon className="text-green-700" />
                                <span className="font-medium text-gray-700">Tải lên CV mới</span>
                            </label>
                        </div>
                    </div>

                    {/* CV Upload Section */}
                    {cvSource === "upload" && (
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
                                    <p className="text-base font-medium text-gray-700">Tải lên CV mới từ máy tính</p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Hỗ trợ định dạng <span className="font-semibold">.doc, .docx, .pdf</span> và
                                        dung lượng dưới <span className="font-semibold">5MB</span>
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
                    )}

                    {/* Cover Letter Section */}
                    <div className="mb-6">
                        <label className="block text-base font-semibold text-gray-800">Thư giới thiệu:</label>
                        <p className="mt-1 text-base text-gray-500">
                            Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên nghiệp và gây ấn tượng hơn
                            với nhà tuyển dụng.
                        </p>
                        <textarea
                            onChange={(e) => setCoverLetter(e.target.value)}
                            rows="4"
                            className="mt-3 w-full rounded-lg border border-gray-300 p-3 text-base text-gray-800 focus:border-blue-600 focus:outline-none"
                            placeholder="Viết thư giới thiệu của bạn tại đây..."
                        ></textarea>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 border-t border-gray-200 px-6 pt-2 pb-6">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className={`w-1/5 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 ${
                            !loading ? "hover:bg-gray-100" : ""
                        }`}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleApply}
                        disabled={loading}
                        className={`w-4/5 rounded-lg bg-blue-800 px-4 py-3 text-sm font-semibold text-white ${
                            !loading ? "hover:bg-blue-900" : ""
                        }`}
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
