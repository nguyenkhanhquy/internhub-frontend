"use client";

const Experience = ({ experience, onChange, onAdd, onDelete }) => {
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newExperience = [...experience];
        newExperience[index] = { ...newExperience[index], [name]: value };
        onChange(newExperience);
    };

    return (
        <div className="space-y-6">
            {experience.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500 mb-4">Chưa có thông tin kinh nghiệm làm việc</p>
                    <button
                        type="button"
                        onClick={onAdd}
                        className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Thêm kinh nghiệm
                    </button>
                </div>
            ) : (
                <>
                    {experience.map((exp, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm relative hover:shadow-md transition"
                        >
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Tên công ty</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={exp.company || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="Công ty ABC"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Vị trí công việc
                                        </label>
                                        <input
                                            type="text"
                                            name="position"
                                            value={exp.position || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="Frontend Developer"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Ngày bắt đầu</label>
                                        <input
                                            type="month"
                                            name="startDate"
                                            value={exp.startDate || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Ngày kết thúc</label>
                                        <input
                                            type="month"
                                            name="endDate"
                                            value={exp.endDate || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Mô tả công việc và thành tích
                                    </label>
                                    <textarea
                                        name="description"
                                        value={exp.description || ""}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Mô tả chi tiết về trách nhiệm, dự án và thành tích đạt được..."
                                        rows="4"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-y min-h-[100px]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Công nghệ sử dụng</label>
                                    <input
                                        type="text"
                                        name="technologies"
                                        value={exp.technologies || ""}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="React, Node.js, MongoDB, ..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => onDelete(index)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                                aria-label="Xóa"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={onAdd}
                        className="w-full flex items-center justify-center py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Thêm kinh nghiệm
                    </button>
                </>
            )}
        </div>
    );
};

export default Experience;
