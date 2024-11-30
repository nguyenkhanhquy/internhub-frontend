export const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("vi-VN", options);
};

export const convertDate = (date) => {
    return new Date(date.setDate(date.getDate() + 1)).toISOString().split("T")[0];
};
