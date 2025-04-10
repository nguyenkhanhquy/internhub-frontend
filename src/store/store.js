import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./slices/counterSlice";
import profileReducer from "./slices/profileSlice";
import accountReducer from "./slices/accountSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        profile: profileReducer,
        account: accountReducer,
    },
});

export default store;
