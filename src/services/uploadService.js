import axiosClient from "../api/axiosClient";
import { FILES_API } from "../api/constants";

export const uploadImage = async (file, folderName) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folderName);

    return axiosClient.post(FILES_API.UPLOAD_IMAGE, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const uploadCV = async (file, folderName) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folderName);

    return axiosClient.post(FILES_API.UPLOAD_RAW, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
