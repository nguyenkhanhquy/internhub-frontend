// @ts-nocheck

import { useRef } from "react";
import PropTypes from "prop-types";

import html2pdf from "html2pdf.js";

const CVTemplate = ({ cvData }) => {
    const { personalInfo, education, experience, skills, projects } = cvData;
    const cvRef = useRef(null);

    const exportToPDF = () => {
        const element = cvRef.current;
        const opt = {
            filename: `${personalInfo.fullName || "CV"}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
            },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        // Thông báo đang xuất PDF
        const notification = document.createElement("div");
        notification.className = "fixed top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-md shadow-lg z-50";
        notification.textContent = "Đang xuất PDF...";
        document.body.appendChild(notification);

        // Xuất PDF
        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
                // Thay đổi thông báo khi hoàn tất
                notification.textContent = "Xuất PDF thành công!";
                notification.className =
                    "fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50";

                // Xóa thông báo sau 3 giây
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 3000);
            })
            .catch((error) => {
                console.error("Lỗi khi xuất PDF:", error);
                notification.textContent = "Lỗi khi xuất PDF!";
                notification.className =
                    "fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg z-50";
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 3000);
            });
    };

    return (
        <div className="relative flex flex-col items-center">
            <div ref={cvRef} className="mx-auto w-full max-w-4xl bg-white p-10 shadow-lg print:p-2 print:shadow-none">
                <div className="pb-2 text-center">
                    <h1 className="text-3xl font-bold text-[#1f2937]">
                        {personalInfo.fullName || "Họ và tên"}
                        {personalInfo.position && (
                            <span className="ml-2 text-3xl font-bold text-[#1f2937]">- {personalInfo.position}</span>
                        )}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 text-sm text-[#1f2937]">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.email &&
                            (personalInfo.phone ||
                                personalInfo.location ||
                                personalInfo.linkedin ||
                                personalInfo.github) && <span>|</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.phone &&
                            (personalInfo.location || personalInfo.linkedin || personalInfo.github) && <span>|</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                        {personalInfo.location && (personalInfo.linkedin || personalInfo.github) && <span>|</span>}
                        {personalInfo.linkedin && (
                            <span>
                                <a
                                    href={personalInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#1f2937] hover:text-[#111827]"
                                >
                                    LinkedIn
                                </a>
                            </span>
                        )}
                        {personalInfo.linkedin && personalInfo.github && <span>|</span>}
                        {personalInfo.github && (
                            <span>
                                <a
                                    href={personalInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#1f2937] hover:text-[#111827]"
                                >
                                    GitHub
                                </a>
                            </span>
                        )}
                    </div>
                </div>

                {/* Tóm tắt */}
                {personalInfo.summary && (
                    <div className="mb-6">
                        <h2 className="mb-1 pb-1 text-lg font-bold text-[#1f2937]">TÓM TẮT</h2>
                        <hr className="mb-1 border-1 border-[#111827]" />
                        <p className="text-sm leading-relaxed text-[#1f2937]">{personalInfo.summary}</p>
                    </div>
                )}

                {/* Học vấn */}
                {education.length > 0 && (
                    <div className="mb-6">
                        <h2 className="mb-1 pb-1 text-lg font-bold text-[#1f2937]">HỌC VẤN</h2>
                        <hr className="mb-1 border-1 border-[#111827]" />
                        {education.map((edu, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="mb-0 text-base font-medium text-[#1f2937]">
                                            {edu.school || "Tên trường"}
                                        </h3>
                                        <p className="mb-0 text-sm text-[#1f2937]">{edu.degree || "Bằng cấp"}</p>
                                    </div>
                                    <p className="mb-0 text-sm text-[#1f2937]">
                                        {edu.startDate ? edu.startDate.replace(/-/g, "/") : ""} -{" "}
                                        {edu.endDate ? edu.endDate.replace(/-/g, "/") : "Hiện tại"}
                                    </p>
                                </div>
                                {edu.description && (
                                    <p className="mt-1 text-sm leading-relaxed text-[#1f2937]">{edu.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Kinh nghiệm */}
                {experience.length > 0 && (
                    <div className="mb-6">
                        <h2 className="mb-1 pb-1 text-lg font-bold text-[#1f2937]">KINH NGHIỆM</h2>
                        <hr className="mb-1 border-1 border-[#111827]" />
                        {experience.map((exp, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="mb-0 text-base font-medium text-[#1f2937]">
                                            {exp.position || "Vị trí"}
                                        </h3>
                                        <p className="mb-0 text-sm text-[#1f2937]">{exp.company || "Công ty"}</p>
                                    </div>
                                    <p className="mb-0 text-sm text-[#1f2937]">
                                        {exp.startDate ? exp.startDate.replace(/-/g, "/") : ""} -{" "}
                                        {exp.endDate ? exp.endDate.replace(/-/g, "/") : "Hiện tại"}
                                    </p>
                                </div>
                                <p className="mt-1 text-sm leading-relaxed text-[#1f2937]">{exp.description}</p>
                                {exp.technologies && (
                                    <p className="mt-1 text-sm text-[#1f2937]">
                                        <span className="font-medium">Công nghệ:</span> {exp.technologies}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Dự án */}
                {projects.length > 0 && (
                    <div className="mb-6">
                        <h2 className="mb-1 pb-1 text-lg font-bold text-[#1f2937]">DỰ ÁN</h2>
                        <hr className="mb-1 border-1 border-[#111827]" />
                        {projects.map((project, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="mb-0 text-base font-medium text-[#1f2937]">
                                    {project.url ? (
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#1f2937] hover:text-[#111827]"
                                        >
                                            {project.name || "Tên dự án"}
                                        </a>
                                    ) : (
                                        project.name || "Tên dự án"
                                    )}
                                </h3>
                                <p className="mt-1 text-sm leading-relaxed text-[#1f2937]">{project.description}</p>
                                {project.technologies && (
                                    <p className="mt-1 text-sm text-[#1f2937]">
                                        <span className="font-medium">Công nghệ:</span> {project.technologies}
                                    </p>
                                )}
                                {project.achievements && (
                                    <p className="mt-1 text-sm text-[#1f2937]">
                                        <span className="font-medium">Thành tích:</span> {project.achievements}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Kỹ năng */}
                {(skills.technical.length > 0 || skills.soft.length > 0 || skills.language.length > 0) && (
                    <div className="mb-6">
                        <h2 className="mb-1 pb-1 text-lg font-bold text-[#1f2937]">KỸ NĂNG</h2>
                        <hr className="mb-1 border-1 border-[#111827]" />
                        {skills.technical.length > 0 && (
                            <div className="mb-4">
                                <h3 className="mb-2 text-base font-medium text-[#1f2937]">KỸ NĂNG CHUYÊN MÔN</h3>
                                <div className="ml-6 space-y-1 pl-2">
                                    {skills.technical.map((skill, index) => (
                                        <div key={index} className="text-sm break-words text-[#1f2937]">
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {skills.soft.length > 0 && (
                            <div className="mb-4">
                                <h3 className="mb-2 text-base font-medium text-[#1f2937]">KỸ NĂNG MỀM</h3>
                                <div className="ml-6 space-y-1 pl-2">
                                    {skills.soft.map((skill, index) => (
                                        <div key={index} className="text-sm break-words text-[#1f2937]">
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {skills.language.length > 0 && (
                            <div className="mb-4">
                                <h3 className="mb-2 text-base font-medium text-[#1f2937]">NGOẠI NGỮ</h3>
                                <div className="ml-6 space-y-1 pl-2">
                                    {skills.language.map((skill, index) => (
                                        <div key={index} className="text-sm break-words text-[#1f2937]">
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <button
                onClick={exportToPDF}
                className="mt-8 flex items-center rounded-lg bg-[#193cb8] px-8 py-3 text-lg font-semibold text-white shadow-md hover:bg-[#1c398e]"
                aria-label="Xuất PDF"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                Xuất PDF
            </button>
        </div>
    );
};

CVTemplate.propTypes = {
    cvData: PropTypes.object.isRequired,
};

export default CVTemplate;
