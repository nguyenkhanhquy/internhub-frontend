"use client";

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
            <div className="flex gap-4 mb-4">
                <button
                    type="button"
                    onClick={() => setSelectedCategory("technical")}
                    className={`px-4 py-2 rounded-md ${
                        selectedCategory === "technical"
                            ? "bg-teal-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Kỹ năng chuyên môn
                </button>
                <button
                    type="button"
                    onClick={() => setSelectedCategory("soft")}
                    className={`px-4 py-2 rounded-md ${
                        selectedCategory === "soft"
                            ? "bg-teal-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Kỹ năng mềm
                </button>
                <button
                    type="button"
                    onClick={() => setSelectedCategory("language")}
                    className={`px-4 py-2 rounded-md ${
                        selectedCategory === "language"
                            ? "bg-teal-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Ngoại ngữ
                </button>
            </div>

            {Object.entries(categoryLabels).map(([category, label]) => (
                <div key={category} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">{label}</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {skills[category].map((skill, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => removeSkill(category, index)}
                                    className="ml-2 text-teal-600 hover:text-teal-800"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Skills;
