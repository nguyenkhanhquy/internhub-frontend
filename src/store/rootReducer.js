import { combineReducers } from "@reduxjs/toolkit";
import manufacturerData from "./manufacturerData/manufacturerReducer";

const rootReducer = combineReducers({
    manufacturerData,
});

export default rootReducer;
