import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./slices/counterSlice";
import profileReducer from "./slices/profileSlice";
import accountReducer from "./slices/accountSlice";
import notificationReducer from "./slices/notificationSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        profile: profileReducer,
        account: accountReducer,
        notification: notificationReducer,
    },
});

export default store;
