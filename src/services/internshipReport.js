import axiosClient from "../api/axiosClient";
import { INTERNSHIP_REPORTS_API } from "../api/constants";

export const getAllInternshipReportsByStudent = async () => {
    return axiosClient.get(INTERNSHIP_REPORTS_API.GET_ALL_BY_STUDENT);
};
