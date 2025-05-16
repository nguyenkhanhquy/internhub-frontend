import PropTypes from "prop-types";

import { useState } from "react";

const Skills = ({ skills, onChange }) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("technical"); // technical, soft, language

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const newSkill = inputValue.trim();
            if (newSkill && !skills[selectedCategory].includes(newSkill)) {
                const updatedSkills = {
                    ...skills,
                    [selectedCategory]: [...skills[selectedCategory], newSkill],
                };
                onChange(updatedSkills);
            }
            setInputValue("");
        }
    };

    const removeSkill = (category, indexToRemove) => {
        const updatedSkills = {
            ...skills,
            [category]: skills[category].filter((_, index) => index !== indexToRemove),
        };
        onChange(updatedSkills);
    };

    const categoryLabels = {
        technical: "Kỹ năng chuyên môn",
        soft: "Kỹ năng mềm",
        language: "Ngoại ngữ",
    };

    return (
        <div className="space-y-6">
            <div className="mb-4 flex gap-4">
                <button
                    type="button"
                    onClick={() => setSelectedCategory("technical")}
                    className={`rounded-md px-4 py-2 ${
                        selectedCategory === "technical"
                            ? "bg-[#193cb8] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Kỹ năng chuyên môn
                </button>
                <button
                    type="button"
                    onClick={() => setSelectedCategory("soft")}
                    className={`rounded-md px-4 py-2 ${
                        selectedCategory === "soft"
                            ? "bg-[#193cb8] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Kỹ năng mềm
                </button>
                <button
                    type="button"
                    onClick={() => setSelectedCategory("language")}
                    className={`rounded-md px-4 py-2 ${
                        selectedCategory === "language"
                            ? "bg-[#193cb8] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Ngoại ngữ
                </button>
            </div>

            {Object.entries(categoryLabels).map(([category, label]) => (
                <div key={category} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">{label}</label>
                    <div className="mb-2 flex flex-wrap gap-2">
                        {skills[category].map((skill, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center rounded-full bg-[#dbeafe] px-3 py-1 text-sm font-medium text-[#1c398e]"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => removeSkill(category, index)}
                                    className="ml-2 text-[#193cb8] hover:text-[#1c398e]"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    {selectedCategory === category && (
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder={`Nhập ${label.toLowerCase()} và nhấn Enter hoặc dấu phẩy để thêm`}
                            className="0 w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-[#155dfc] focus:outline-none"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

Skills.propTypes = {
    skills: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Skills;
