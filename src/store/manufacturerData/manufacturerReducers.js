import ManufacturerTypes from "./manufacturerTypes";

const initialData = {
    count: 0,
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

        default:
            return state;
    }
};

export default ManufaturerReducer;
