import { combineReducers } from "@reduxjs/toolkit";

import counterReducer from "./slices/counterSlice";
import profileReducer from "./slices/profileSlice";
import accountReducer from "./slices/accountSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
    profile: profileReducer,
    account: accountReducer,
});

export default rootReducer;
