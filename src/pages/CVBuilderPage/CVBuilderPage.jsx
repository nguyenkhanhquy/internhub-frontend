// @ts-nocheck

import { useState, useRef } from "react";
import MainLayout from "@layouts/MainLayout/MainLayout";
import PageNavigation from "@components/layouts/PageNavigation/PageNavigation";
import PersonalInfo from "@components/cvbuilder/CVForm/PersonalInfo";
import Education from "@components/cvbuilder/CVForm/Education";
import Experience from "@components/cvbuilder/CVForm/Experience";
import Skills from "@components/cvbuilder/CVForm/Skills";
import Projects from "@components/cvbuilder/CVForm/Projects";
import TemplateSelector from "@components/cvbuilder/CVPreview/TemplateSelector";
import CVTemplate from "@components/cvbuilder/CVPreview/CVTemplate";
import ModernTemplate from "@components/cvbuilder/CVPreview/ModernTemplate";
import CreativeTemplate from "@components/cvbuilder/CVPreview/CreativeTemplate";
import html2pdf from "html2pdf.js";

import { toast } from "react-toastify";
import useAuth from "@hooks/useAuth";

import { uploadCV } from "@services/uploadService";
import { createCV } from "@services/cvService";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CVBuilderPage = () => {
    const { user } = useAuth();
    const [cvData, setCvData] = useState({
        personalInfo: {
            fullName: "",
            position: "",
            email: "",
            phone: "",
            location: "",
            summary: "",
            linkedin: "",
            github: "",
        },
        education: [],
        experience: [],
        skills: {
            technical: [],
            soft: [],
            language: [],
        },
        projects: [],
    });

    const [activeTab, setActiveTab] = useState("template");
    const [selectedTemplate, setSelectedTemplate] = useState("classic");
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [cvTitle, setCvTitle] = useState("");
    const [titleError, setTitleError] = useState("");

    const cvRef = useRef();

    const handlePersonalInfoChange = (newPersonalInfo) => {
        setCvData({ ...cvData, personalInfo: newPersonalInfo });
    };

    const handleEducationChange = (newEducation) => {
        setCvData({ ...cvData, education: newEducation });
    };

    const handleExperienceChange = (newExperience) => {
        setCvData({ ...cvData, experience: newExperience });
    };

    const handleSkillsChange = (newSkills) => {
        setCvData({ ...cvData, skills: newSkills });
    };

    const handleProjectsChange = (newProjects) => {
        setCvData({ ...cvData, projects: newProjects });
    };

    const addEducation = () => {
        setCvData({
            ...cvData,
            education: [...cvData.education, { school: "", degree: "", startDate: "", endDate: "", description: "" }],
        });
    };

    const addExperience = () => {
        setCvData({
            ...cvData,
            experience: [
                ...cvData.experience,
                {
                    company: "",
                    position: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                    technologies: "",
                },
            ],
        });
    };

    const addProject = () => {
        setCvData({
            ...cvData,
            projects: [
                ...cvData.projects,
                {
                    name: "",
                    url: "",
                    description: "",
                    technologies: "",
                    achievements: "",
                },
            ],
        });
    };

    const deleteEducation = (index) => {
        const newEducation = cvData.education.filter((_, i) => i !== index);
        setCvData({ ...cvData, education: newEducation });
    };

    const deleteExperience = (index) => {
        const newExperience = cvData.experience.filter((_, i) => i !== index);
        setCvData({ ...cvData, experience: newExperience });
    };

    const deleteProject = (index) => {
        const newProjects = cvData.projects.filter((_, i) => i !== index);
        setCvData({ ...cvData, projects: newProjects });
    };

    const handleExportPDF = () => {
        const element = cvRef.current;
        if (!element) return;
        // Lấy tên file theo template
        let filename = "CV.pdf";
        if (selectedTemplate === "classic") {
            filename = `${cvData.personalInfo.fullName || "CV"}.pdf`;
        } else if (selectedTemplate === "modern") {
            filename = `${cvData.personalInfo.fullName || "CV"}_Modern.pdf`;
        } else if (selectedTemplate === "creative") {
            filename = `${cvData.personalInfo.fullName || "CV"}_Creative.pdf`;
        }
        const opt = {
            filename,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };
        // Thông báo đang xuất PDF
        const notification = document.createElement("div");
        notification.className = "fixed top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-md shadow-lg z-50";
        notification.textContent = "Đang xuất PDF...";
        document.body.appendChild(notification);
        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
                notification.textContent = "Xuất PDF thành công!";
                notification.className =
                    "fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50";
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 3000);
            })
            .catch(() => {
                notification.textContent = "Lỗi khi xuất PDF!";
                notification.className =
                    "fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg z-50";
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 3000);
            });
    };

    const handleSaveCV = () => {
        // Mở modal để nhập tên file
        if (cvData.personalInfo.fullName && cvData.personalInfo.position) {
            setCvTitle(cvData.personalInfo.fullName + " - " + cvData.personalInfo.position);
        } else {
            setCvTitle("CV");
        }
        setShowSaveModal(true);
    };

    const handleSaveCVConfirm = async () => {
        // Kiểm tra tên CV không được để trống
        if (!cvTitle.trim()) {
            setTitleError("Vui lòng nhập tên CV");
            return;
        }

        // Đóng modal
        setShowSaveModal(false);

        // Hiển thị thông báo đang xử lý
        const notification = document.createElement("div");
        notification.className = "fixed top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-md shadow-lg z-50";
        notification.textContent = "Đang lưu CV...";
        document.body.appendChild(notification);

        try {
            // Tạo file PDF từ template hiện tại
            const element = cvRef.current;
            if (!element) {
                throw new Error("Không thể tạo CV, vui lòng thử lại!");
            }

            let filename = `${cvTitle || "CV"}.pdf`;

            const opt = {
                filename,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            // Chuyển template thành blob
            const pdfBlob = await html2pdf().set(opt).from(element).output("blob");

            // Tạo file từ blob
            const file = new File([pdfBlob], filename, { type: "application/pdf" });

            // Tạo đường dẫn tệp với timestamp
            const timestamp = Date.now();
            const filePath = `student/${user.id}/cv/${timestamp}`;

            // Tải lên CV
            const dataUpload = await uploadCV(file, filePath);
            if (!dataUpload.success) {
                throw new Error(dataUpload.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            // Lưu thông tin CV vào CSDL
            const data = await createCV({
                title: cvTitle || "CV",
                filePath: dataUpload.result.secure_url,
            });

            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            // Hiển thị thông báo thành công
            notification.textContent = "Lưu CV thành công!";
            notification.className = "fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50";
            toast.success(data.message);
        } catch (error) {
            // Hiển thị thông báo lỗi
            notification.textContent = "Lỗi khi lưu CV!";
            notification.className = "fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg z-50";
            toast.error(error.message);
        } finally {
            // Xóa thông báo sau 3 giây
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 3000);
        }
    };

    const tabs = [
        { id: "template", label: "Mẫu CV" },
        { id: "personal", label: "Thông tin cá nhân" },
        { id: "education", label: "Học vấn" },
        { id: "experience", label: "Kinh nghiệm" },
        { id: "skills", label: "Kỹ năng" },
        { id: "projects", label: "Dự án" },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "personal":
                return <PersonalInfo personalInfo={cvData.personalInfo} onChange={handlePersonalInfoChange} />;
            case "education":
                return (
                    <Education
                        education={cvData.education}
                        onChange={handleEducationChange}
                        onAdd={addEducation}
                        onDelete={deleteEducation}
                    />
                );
            case "experience":
                return (
                    <Experience
                        experience={cvData.experience}
                        onChange={handleExperienceChange}
                        onAdd={addExperience}
                        onDelete={deleteExperience}
                    />
                );
            case "skills":
                return <Skills skills={cvData.skills} onChange={handleSkillsChange} />;
            case "projects":
                return (
                    <Projects
                        projects={cvData.projects}
                        onChange={handleProjectsChange}
                        onAdd={addProject}
                        onDelete={deleteProject}
                    />
                );
            case "template":
                return <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />;
            default:
                return <PersonalInfo personalInfo={cvData.personalInfo} onChange={handlePersonalInfoChange} />;
        }
    };

    const renderSelectedTemplate = () => {
        switch (selectedTemplate) {
            case "classic":
                return <CVTemplate cvData={cvData} forwardedRef={cvRef} />;
            case "modern":
                return <ModernTemplate cvData={cvData} forwardedRef={cvRef} />;
            case "creative":
                return <CreativeTemplate cvData={cvData} forwardedRef={cvRef} />;
            default:
                return <CVTemplate cvData={cvData} forwardedRef={cvRef} />;
        }
    };

    return (
        <MainLayout title="Tạo CV">
            <PageNavigation pageName="Tạo CV" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div>
                    <div className="flex h-screen w-full flex-col gap-0 overflow-hidden lg:flex-row">
                        {/* Bên trái: Form nhập */}
                        <div className="h-screen overflow-auto p-10 lg:w-[40%]">
                            <div className="mb-8 overflow-x-auto border-b border-gray-200">
                                <div className="flex space-x-1">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`px-5 py-4 text-base font-medium whitespace-nowrap transition-colors ${
                                                activeTab === tab.id
                                                    ? "border-b-2 border-blue-800 text-blue-800"
                                                    : "text-gray-600 hover:text-blue-800"
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {renderTabContent()}
                        </div>

                        {/* Bên phải: Hiển thị CV */}
                        <div className="h-screen overflow-auto bg-gray-50 p-10 lg:sticky lg:top-0 lg:w-[60%]">
                            <div className="mb-4 flex justify-end space-x-2">
                                <button
                                    onClick={handleExportPDF}
                                    className="flex items-center gap-2 rounded bg-blue-800 px-4 py-2 font-semibold text-white hover:bg-blue-900"
                                >
                                    <PictureAsPdfIcon fontSize="small" />
                                    Xuất PDF
                                </button>
                                <button
                                    onClick={handleSaveCV}
                                    className="flex items-center gap-2 rounded bg-blue-800 px-4 py-2 font-semibold text-white hover:bg-blue-900"
                                >
                                    <SaveIcon fontSize="small" />
                                    Lưu CV
                                </button>
                                <button
                                    onClick={() => window.history.back()}
                                    className="flex items-center gap-2 rounded border border-blue-800 bg-gray-100 px-4 py-2 font-semibold text-blue-900 hover:bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                >
                                    <ArrowBackIcon fontSize="small" />
                                    Quay lại
                                </button>
                            </div>
                            <div ref={cvRef}>{renderSelectedTemplate()}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal lưu CV */}
            {showSaveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <h2 className="mb-4 text-xl font-bold text-gray-800">Lưu CV</h2>
                        <div className="mb-4">
                            <label htmlFor="cvTitle" className="mb-2 block font-medium text-gray-700">
                                Nhập tên CV
                            </label>
                            <input
                                type="text"
                                id="cvTitle"
                                value={cvTitle}
                                onChange={(e) => {
                                    setCvTitle(e.target.value);
                                    setTitleError("");
                                }}
                                className={`w-full rounded-lg border ${
                                    titleError ? "border-red-500" : "border-gray-300"
                                } px-4 py-2 focus:border-blue-500 focus:outline-none`}
                                placeholder="Tên CV"
                            />
                            {titleError && <p className="mt-1 text-sm text-red-500">{titleError}</p>}
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowSaveModal(false)}
                                className="w-1/3 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSaveCVConfirm}
                                className="w-2/3 rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
                            >
                                Lưu CV
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default CVBuilderPage;
