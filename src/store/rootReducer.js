import { combineReducers } from "@reduxjs/toolkit";
import manufacturerData from "./manufacturerData/manufacturerReducers";

const rootReducer = combineReducers({
    manufacturerData,
});

export default rootReducer;
