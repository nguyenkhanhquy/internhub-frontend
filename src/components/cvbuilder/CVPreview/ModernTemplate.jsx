// @ts-nocheck

import { useRef } from "react";
import PropTypes from "prop-types";

const ModernTemplate = ({ cvData, forwardedRef }) => {
    const { personalInfo, education, experience, skills, projects } = cvData;
    const innerRef = useRef(null);
    const cvRef = forwardedRef ? forwardedRef : innerRef;

    return (
        <div className="relative flex flex-col items-center">
            <div ref={cvRef} className="mx-auto w-full max-w-4xl bg-white shadow-lg print:p-0 print:shadow-none">
                {/* Header */}
                <div className="p-8" style={{ backgroundColor: "#193cb8", color: "#fff" }}>
                    <h1 className="mb-2 text-3xl font-bold">{personalInfo.fullName || "Họ và tên"}</h1>
                    <h2 className="mb-4 text-xl">{personalInfo.position || "Vị trí ứng tuyển"}</h2>

                    <div className="flex flex-wrap gap-4 text-sm">
                        {personalInfo.email && (
                            <div className="flex items-center">
                                <span>{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div className="flex items-center">
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div className="flex items-center">
                                <span>{personalInfo.location}</span>
                            </div>
                        )}
                        {personalInfo.linkedin && (
                            <div className="flex items-center">
                                <a
                                    href={personalInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                    style={{ color: "#fff" }}
                                >
                                    LinkedIn
                                </a>
                            </div>
                        )}
                        {personalInfo.github && (
                            <div className="flex items-center">
                                <a
                                    href={personalInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                    style={{ color: "#fff" }}
                                >
                                    GitHub
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8">
                    {/* Tóm tắt */}
                    {personalInfo.summary && (
                        <div className="mb-8">
                            <h2
                                className="mb-4 pb-2 text-xl font-bold"
                                style={{ borderBottom: "2px solid #193cb8", color: "#193cb8" }}
                            >
                                Tóm tắt
                            </h2>
                            <p className="leading-relaxed" style={{ color: "#374151" }}>
                                {personalInfo.summary}
                            </p>
                        </div>
                    )}

                    {/* Kinh nghiệm */}
                    {experience.length > 0 && (
                        <div className="mb-8">
                            <h2
                                className="mb-4 pb-2 text-xl font-bold"
                                style={{ borderBottom: "2px solid #193cb8", color: "#193cb8" }}
                            >
                                Kinh nghiệm làm việc
                            </h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mb-6">
                                    <div className="mb-2 flex flex-col md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold" style={{ color: "#1f2937" }}>
                                                {exp.position || "Vị trí"}
                                            </h3>
                                            <p className="font-medium" style={{ color: "#6b7280" }}>
                                                {exp.company || "Công ty"}
                                            </p>
                                        </div>
                                        <p className="mt-1 text-sm italic md:mt-0" style={{ color: "#6b7280" }}>
                                            {exp.startDate ? exp.startDate.replace(/-/g, "/") : ""} -{" "}
                                            {exp.endDate ? exp.endDate.replace(/-/g, "/") : "Hiện tại"}
                                        </p>
                                    </div>
                                    <p className="mb-2" style={{ color: "#374151" }}>
                                        {exp.description}
                                    </p>
                                    {exp.technologies && (
                                        <p className="text-sm" style={{ color: "#6b7280" }}>
                                            <span className="font-semibold">Công nghệ:</span> {exp.technologies}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Học vấn */}
                    {education.length > 0 && (
                        <div className="mb-8">
                            <h2
                                className="mb-4 pb-2 text-xl font-bold"
                                style={{ borderBottom: "2px solid #193cb8", color: "#193cb8" }}
                            >
                                Học vấn
                            </h2>
                            {education.map((edu, index) => (
                                <div key={index} className="mb-6">
                                    <div className="mb-2 flex flex-col md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold" style={{ color: "#1f2937" }}>
                                                {edu.school || "Tên trường"}
                                            </h3>
                                            <p className="font-medium" style={{ color: "#6b7280" }}>
                                                {edu.degree || "Bằng cấp"}
                                            </p>
                                        </div>
                                        <p className="mt-1 text-sm italic md:mt-0" style={{ color: "#6b7280" }}>
                                            {edu.startDate ? edu.startDate.replace(/-/g, "/") : ""} -{" "}
                                            {edu.endDate ? edu.endDate.replace(/-/g, "/") : "Hiện tại"}
                                        </p>
                                    </div>
                                    {edu.description && <p style={{ color: "#374151" }}>{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Dự án */}
                    {projects.length > 0 && (
                        <div className="mb-8">
                            <h2
                                className="mb-4 pb-2 text-xl font-bold"
                                style={{ borderBottom: "2px solid #193cb8", color: "#193cb8" }}
                            >
                                Dự án
                            </h2>
                            {projects.map((project, index) => (
                                <div key={index} className="mb-6">
                                    <h3 className="mb-2 text-lg font-semibold" style={{ color: "#1f2937" }}>
                                        {project.url ? (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: "#193cb8" }}
                                            >
                                                {project.name || "Tên dự án"}
                                            </a>
                                        ) : (
                                            project.name || "Tên dự án"
                                        )}
                                    </h3>
                                    <p className="mb-2" style={{ color: "#374151" }}>
                                        {project.description}
                                    </p>
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        {project.technologies && (
                                            <p className="text-sm" style={{ color: "#6b7280" }}>
                                                <span className="font-semibold">Công nghệ:</span> {project.technologies}
                                            </p>
                                        )}
                                        {project.achievements && (
                                            <p className="text-sm" style={{ color: "#6b7280" }}>
                                                <span className="font-semibold">Thành tích:</span>{" "}
                                                {project.achievements}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Kỹ năng */}
                    {(skills.technical.length > 0 || skills.soft.length > 0 || skills.language.length > 0) && (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {skills.technical.length > 0 && (
                                <div>
                                    <h2
                                        className="mb-3 pb-2 text-lg font-bold"
                                        style={{ borderBottom: "2px solid #193cb8", color: "#193cb8" }}
                                    >
                                        Kỹ năng chuyên môn
                                    </h2>
                                    <div className="space-y-1" style={{ color: "#374151" }}>
                                        {skills.technical.map((skill, index) => (
                                            <div key={index}>{skill}</div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {skills.soft.length > 0 && (
                                <div>
                                    <h2
                                        className="mb-3 pb-2 text-lg font-bold"
                                        style={{ borderBottom: "2px solid #193cb8", color: "#193cb8" }}
                                    >
                                        Kỹ năng mềm
                                    </h2>
                                    <div className="space-y-1" style={{ color: "#374151" }}>
                                        {skills.soft.map((skill, index) => (
                                            <div key={index}>{skill}</div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {skills.language.length > 0 && (
                                <div>
                                    <h2
                                        className="mb-3 pb-2 text-lg font-bold"
                                        style={{ borderBottom: "2px solid #193cb8", color: "#193cb8" }}
                                    >
                                        Ngoại ngữ
                                    </h2>
                                    <div className="space-y-1" style={{ color: "#374151" }}>
                                        {skills.language.map((skill, index) => (
                                            <div key={index}>{skill}</div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

ModernTemplate.propTypes = {
    cvData: PropTypes.object.isRequired,
    forwardedRef: PropTypes.object,
};

export default ModernTemplate;
