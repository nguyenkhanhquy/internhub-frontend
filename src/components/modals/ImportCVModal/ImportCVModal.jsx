import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import useAuth from "@hooks/useAuth";

import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";

import { uploadCV } from "@services/uploadService";
import { createCV } from "@services/cvService";

const ImportCVModal = ({ isOpen, onClose, setFlag }) => {
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (isOpen) {
            // Khóa cuộn trang khi mở modal
            document.body.style.overflow = "hidden";
        } else {
            // Reset file đã chọn khi modal đóng
            setSelectedFile(null);
        }

        return () => {
            // Khôi phục cuộn trang khi đóng modal
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleSave = async () => {
        setLoading(true);
        try {
            if (selectedFile) {
                // Tạo đường dẫn tệp với timestamp
                const timestamp = Date.now();
                const filePath = `student/${user.id}/cv/${timestamp}`;
                const dataUpload = await uploadCV(selectedFile, filePath);
                if (!dataUpload.success) {
                    throw new Error(dataUpload.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }

                const data = await createCV({
                    title: selectedFile.name.split(".")[0],
                    filePath: dataUpload.result.secure_url,
                });
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setFlag((prev) => !prev);
                toast.success(data.message);
                onClose();
            } else {
                toast.info("Vui lòng chọn file CV để tải lên");
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl">
                {/* Header */}
                <h2 className="mb-4 text-xl font-bold text-gray-800">Tải lên CV</h2>

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
                                Hỗ trợ định dạng <span className="font-semibold">.doc, .docx, .pdf</span> và dung lượng
                                dưới <span className="font-semibold">5MB</span>
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

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
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
                        onClick={handleSave}
                        disabled={loading}
                        className={`w-4/5 rounded-lg bg-blue-800 px-4 py-3 text-sm font-semibold text-white ${
                            !loading ? "hover:bg-blue-900" : ""
                        }`}
                    >
                        {loading ? "Đang tải lên..." : "Lưu"}
                    </button>
                </div>
            </div>
        </div>
    );
};

ImportCVModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    setFlag: PropTypes.func.isRequired,
};

export default ImportCVModal;
