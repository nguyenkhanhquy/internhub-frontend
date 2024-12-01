import axiosClient from "../api/axiosClient";
import { COMPANIES_API } from "../api/constants";

export const getAllApprovedCompanies = async (page, size) => {
    return axiosClient.get(COMPANIES_API.GET_ALL_APPROVED, {
        params: {
            page: page,
            size: size,
        },
    });
};

export const getCompanyById = async (id) => {
    return axiosClient.get(COMPANIES_API.GET_BY_ID + id);
};
