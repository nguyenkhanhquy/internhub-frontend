import axiosClient from "@api/axiosClient";
import { ACADEMIC_API } from "@api/constants";

export const getAllYearAndSemester = async () => {
    return axiosClient.get(ACADEMIC_API.GET_ALL_YEAR_AND_SEMESTER);
};
