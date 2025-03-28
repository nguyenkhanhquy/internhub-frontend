// Remove the explicit RootState import since we don't need type annotations in JS
// import { RootState } from '../store';

export const selectManufacturerCount = (state) => state.manufacturerData.count;
