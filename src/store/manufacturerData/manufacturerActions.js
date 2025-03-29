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

export const setProfileRedux = (profile) => {
    return {
        type: ManufacturerTypes.SetProfileRedux,
        data: profile,
    };
};

export const setAccountDetailsRedux = (accountDetails) => {
    return {
        type: ManufacturerTypes.SetAccountDetailsRedux,
        data: accountDetails,
    };
};
