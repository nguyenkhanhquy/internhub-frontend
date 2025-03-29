import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as reduxUseDispatch, useSelector as reduxUseSelector } from "react-redux";

import rootReducer from "./rootReducer";

const store = configureStore({ reducer: rootReducer });

export const useDispatch = () => reduxUseDispatch();
export const useSelector = reduxUseSelector;

export default store;
