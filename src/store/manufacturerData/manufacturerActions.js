import ManufacturerTypes from "./manufacturerTypes";

export const upCount = () => {
    return {
        type: ManufacturerTypes.UpCount,
    };
};

export const downCount = () => {
    return {
        type: ManufacturerTypes.DownCount,
    };
};
