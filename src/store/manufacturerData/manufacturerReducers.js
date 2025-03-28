import ManufacturerTypes from "./manufacturerTypes";

const initialData = {
    count: 0,
    profile: null,
    accountDetails: null,
};

const ManufaturerReducer = (state = initialData, actions) => {
    const { data } = actions;
    switch (actions.type) {
        case ManufacturerTypes.UpCount:
            return {
                ...state,
                count: state.count + 1,
            };
        case ManufacturerTypes.DownCount:
            return {
                ...state,
                count: state.count - 1,
            };
        case ManufacturerTypes.SetProfileRedux:
            return {
                ...state,
                profile: data,
            };
        case ManufacturerTypes.SetAccountDetailsRedux:
            return {
                ...state,
                accountDetails: data,
            };

        default:
            return state;
    }
};

export default ManufaturerReducer;
