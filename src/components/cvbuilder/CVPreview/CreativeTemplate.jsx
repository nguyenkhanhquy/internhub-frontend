// @ts-nocheck

import { useRef } from "react";
import PropTypes from "prop-types";

import html2pdf from "html2pdf.js";

const CreativeTemplate = ({ cvData }) => {
    const { personalInfo, education, experience, skills, projects } = cvData;
    const cvRef = useRef(null);

    const exportToPDF = () => {
        const element = cvRef.current;
        const opt = {
            filename: `${personalInfo.fullName || "CV"}_Creative.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
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
            });
    };

    return (
        <div className="relative flex flex-col items-center">
            <div
                ref={cvRef}
                className="mx-auto w-full max-w-4xl overflow-hidden bg-white shadow-lg print:p-0 print:shadow-none"
            >
                <div className="flex h-full min-h-[1122px] flex-col md:flex-row">
                    {/* Sidebar */}
                    <div
                        className="flex h-full min-h-[1122px] flex-col p-6 md:w-1/3"
                        style={{ backgroundColor: "#312e81", color: "#fff" }}
                    >
                        <div className="mb-8 text-center">
                            <h1 className="mb-1 text-2xl font-bold">{personalInfo.fullName || "Họ và tên"}</h1>
                            <h2 className="text-lg" style={{ color: "#e2e8f0" }}>
                                {personalInfo.position || "Vị trí ứng tuyển"}
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3
                                    className="mb-3 pb-1 text-lg font-semibold"
                                    style={{ borderBottom: "1px solid #4c1d95" }}
                                >
                                    Liên hệ
                                </h3>
                                <ul className="space-y-2">
                                    {personalInfo.email && (
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="mr-2 h-5 w-5 flex-shrink-0"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                style={{
                                                    display: "inline-block",
                                                    verticalAlign: "top",
                                                    marginTop: "2px",
                                                }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span className="text-sm break-all" style={{ display: "inline-block" }}>
                                                {personalInfo.email}
                                            </span>
                                        </li>
                                    )}
                                    {personalInfo.phone && (
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="mr-2 h-5 w-5 flex-shrink-0"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                style={{
                                                    display: "inline-block",
                                                    verticalAlign: "top",
                                                    marginTop: "2px",
                                                }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                            <span className="text-sm" style={{ display: "inline-block" }}>
                                                {personalInfo.phone}
                                            </span>
                                        </li>
                                    )}
                                    {personalInfo.location && (
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="mr-2 h-5 w-5 flex-shrink-0"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                style={{
                                                    display: "inline-block",
                                                    verticalAlign: "top",
                                                    marginTop: "2px",
                                                }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            <span className="text-sm" style={{ display: "inline-block" }}>
                                                {personalInfo.location}
                                            </span>
                                        </li>
                                    )}
                                    {personalInfo.linkedin && (
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="mr-2 h-5 w-5 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                style={{
                                                    display: "inline-block",
                                                    verticalAlign: "top",
                                                    marginTop: "2px",
                                                }}
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                            <a
                                                href={personalInfo.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm hover:underline"
                                                style={{ display: "inline-block", color: "#fff" }}
                                            >
                                                LinkedIn
                                            </a>
                                        </li>
                                    )}
                                    {personalInfo.github && (
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="mr-2 h-5 w-5 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                style={{
                                                    display: "inline-block",
                                                    verticalAlign: "top",
                                                    marginTop: "2px",
                                                }}
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            <a
                                                href={personalInfo.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm hover:underline"
                                                style={{ display: "inline-block", color: "#fff" }}
                                            >
                                                GitHub
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {/* Kỹ năng */}
                            <div>
                                <h3
                                    className="mb-3 pb-1 text-lg font-semibold"
                                    style={{ borderBottom: "1px solid #4c1d95" }}
                                >
                                    Kỹ năng
                                </h3>

                                {skills.technical.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="mb-2 text-sm font-medium" style={{ color: "#e2e8f0" }}>
                                            Kỹ năng chuyên môn
                                        </h4>
                                        <div className="space-y-1 text-sm text-white">
                                            {skills.technical.map((skill, index) => (
                                                <div key={index}>{skill}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {skills.soft.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="mb-2 text-sm font-medium" style={{ color: "#e2e8f0" }}>
                                            Kỹ năng mềm
                                        </h4>
                                        <div className="space-y-1 text-sm text-white">
                                            {skills.soft.map((skill, index) => (
                                                <div key={index}>{skill}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {skills.language.length > 0 && (
                                    <div>
                                        <h4 className="mb-2 text-sm font-medium" style={{ color: "#e2e8f0" }}>
                                            Ngoại ngữ
                                        </h4>
                                        <div className="space-y-1 text-sm text-white">
                                            {skills.language.map((skill, index) => (
                                                <div key={index}>{skill}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-6 md:w-2/3">
                        {/* Tóm tắt */}
                        {personalInfo.summary && (
                            <div className="mb-6">
                                <h2 className="mb-3 flex items-center text-xl font-bold" style={{ color: "#312e81" }}>
                                    Tóm tắt
                                </h2>
                                <p className="leading-relaxed" style={{ color: "#374151" }}>
                                    {personalInfo.summary}
                                </p>
                            </div>
                        )}

                        {/* Kinh nghiệm */}
                        {experience.length > 0 && (
                            <div className="mb-6">
                                <h2 className="mb-3 flex items-center text-xl font-bold" style={{ color: "#312e81" }}>
                                    Kinh nghiệm làm việc
                                </h2>

                                <div className="space-y-4">
                                    {experience.map((exp, index) => (
                                        <div
                                            key={index}
                                            className="relative border-l-2 pb-4 pl-6"
                                            style={{ borderColor: "#e2e8f0" }}
                                        >
                                            <div
                                                className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full"
                                                style={{ backgroundColor: "#6b21a8" }}
                                            ></div>
                                            <div className="mb-1">
                                                <h3 className="text-lg font-semibold" style={{ color: "#312e81" }}>
                                                    {exp.position || "Vị trí"}
                                                </h3>
                                                <p className="font-medium" style={{ color: "#6b7280" }}>
                                                    {exp.company || "Công ty"}
                                                </p>
                                                <p className="text-sm italic" style={{ color: "#6b7280" }}>
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
                            </div>
                        )}

                        {/* Học vấn */}
                        {education.length > 0 && (
                            <div className="mb-6">
                                <h2 className="mb-3 flex items-center text-xl font-bold" style={{ color: "#312e81" }}>
                                    Học vấn
                                </h2>

                                <div className="space-y-4">
                                    {education.map((edu, index) => (
                                        <div
                                            key={index}
                                            className="relative border-l-2 pb-4 pl-6"
                                            style={{ borderColor: "#e2e8f0" }}
                                        >
                                            <div
                                                className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full"
                                                style={{ backgroundColor: "#6b21a8" }}
                                            ></div>
                                            <div className="mb-1">
                                                <h3 className="text-lg font-semibold" style={{ color: "#312e81" }}>
                                                    {edu.school || "Tên trường"}
                                                </h3>
                                                <p className="font-medium" style={{ color: "#6b7280" }}>
                                                    {edu.degree || "Bằng cấp"}
                                                </p>
                                                <p className="text-sm italic" style={{ color: "#6b7280" }}>
                                                    {edu.startDate ? edu.startDate.replace(/-/g, "/") : ""} -{" "}
                                                    {edu.endDate ? edu.endDate.replace(/-/g, "/") : "Hiện tại"}
                                                </p>
                                            </div>
                                            {edu.description && <p style={{ color: "#374151" }}>{edu.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Dự án */}
                        {projects.length > 0 && (
                            <div>
                                <h2 className="mb-3 flex items-center text-xl font-bold" style={{ color: "#312e81" }}>
                                    Dự án
                                </h2>

                                <div className="space-y-4">
                                    {projects.map((project, index) => (
                                        <div
                                            key={index}
                                            className="rounded-lg p-4"
                                            style={{ backgroundColor: "#f8fafc" }}
                                        >
                                            <h3 className="mb-2 text-lg font-semibold" style={{ color: "#312e81" }}>
                                                {project.url ? (
                                                    <a
                                                        href={project.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ color: "#6b21a8" }}
                                                        className="hover:underline"
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
                                                        <span className="font-semibold">Công nghệ:</span>{" "}
                                                        {project.technologies}
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
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button
                onClick={exportToPDF}
                className="mt-8 flex items-center rounded-lg px-8 py-3 text-lg font-semibold text-white shadow-md"
                style={{ backgroundColor: "#312e81", transition: "background-color 0.2s" }}
                aria-label="Xuất PDF"
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1e1b4b")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#312e81")}
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

CreativeTemplate.propTypes = {
    cvData: PropTypes.object.isRequired,
};

export default CreativeTemplate;
