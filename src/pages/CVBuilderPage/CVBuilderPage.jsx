"use client";

import { useState } from "react";
import MainLayout from "@layouts/MainLayout/MainLayout";
import PageNavigation from "@components/layouts/PageNavigation/PageNavigation";
import PersonalInfo from "@components/cvbuilder/CVForm/PersonalInfo";
import Education from "@components/cvbuilder/CVForm/Education";
import Experience from "@components/cvbuilder/CVForm/Experience";
import Skills from "@components/cvbuilder/CVForm/Skills";
import Projects from "@components/cvbuilder/CVForm/Projects";
import CVTemplate from "@components/cvbuilder/CVPreview/CVTemplate";

const CVBuilderPage = () => {
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

    const [activeTab, setActiveTab] = useState("personal");

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

    const tabs = [
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
            default:
                return <PersonalInfo personalInfo={cvData.personalInfo} onChange={handlePersonalInfoChange} />;
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
                            <CVTemplate cvData={cvData} />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CVBuilderPage;
