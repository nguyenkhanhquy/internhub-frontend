import axiosClient from "@api/axiosClient";
import { INTERNSHIP_REPORTS_API } from "@api/constants";

export const createInternshipReport = async (data) => {
    return axiosClient.post(INTERNSHIP_REPORTS_API.CREATE, {
        companyName: data.companyName,
        teacherName: data.teacherName,
        instructorName: data.instructorName,
        instructorEmail: data.instructorEmail,
        startDate: data.startDate,
        endDate: data.endDate,
        reportFile: data.reportFile,
        evaluationFile: data.evaluationFile,
        isSystemCompany: data.isSystemCompany,
    });
};

export const getAllInternshipReportsByStudent = async () => {
    return axiosClient.get(INTERNSHIP_REPORTS_API.GET_ALL_BY_STUDENT);
};

export const submitInternshipReport = async (data) => {
    return axiosClient.post(INTERNSHIP_REPORTS_API.SUBMIT, {
        courseCode: data.courseCode,
        companyName: data.companyName,
        teacherName: data.teacherName,
        instructorName: data.instructorName,
        instructorEmail: data.instructorEmail,
        startDate: data.startDate,
        endDate: data.endDate,
        reportFile: data.reportFile,
        evaluationFile: data.evaluationFile,
        isSystemCompany: data.isSystemCompany,
    });
};
