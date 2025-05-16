import PropTypes from "prop-types";

const PersonalInfo = ({ personalInfo, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...personalInfo, [name]: value });
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Họ và tên
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={personalInfo.fullName || ""}
                        onChange={handleChange}
                        placeholder="Nguyễn Văn A"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                        Vị trí ứng tuyển
                    </label>
                    <input
                        id="position"
                        type="text"
                        name="position"
                        value={personalInfo.position || ""}
                        onChange={handleChange}
                        placeholder="Java Intern"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={personalInfo.email || ""}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Số điện thoại
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={personalInfo.phone || ""}
                        onChange={handleChange}
                        placeholder="0912345678"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Địa chỉ
                </label>
                <input
                    id="location"
                    type="text"
                    name="location"
                    value={personalInfo.location || ""}
                    onChange={handleChange}
                    placeholder="Hà Nội, Việt Nam"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                    Tóm tắt về bản thân
                </label>
                <textarea
                    id="summary"
                    name="summary"
                    value={personalInfo.summary || ""}
                    onChange={handleChange}
                    placeholder="Giới thiệu ngắn gọn về bản thân, mục tiêu nghề nghiệp và điểm mạnh của bạn..."
                    rows="4"
                    className="min-h-[100px] w-full resize-y rounded-md border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                        LinkedIn URL
                    </label>
                    <input
                        id="linkedin"
                        type="url"
                        name="linkedin"
                        value={personalInfo.linkedin || ""}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                        GitHub URL
                    </label>
                    <input
                        id="github"
                        type="url"
                        name="github"
                        value={personalInfo.github || ""}
                        onChange={handleChange}
                        placeholder="https://github.com/username"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
};

PersonalInfo.propTypes = {
    personalInfo: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default PersonalInfo;
