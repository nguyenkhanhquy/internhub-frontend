import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: { count: 0 },
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        reset: (state) => {
            state.count = 0;
        },
    },
});

// Export actions
export const { increment, decrement, reset } = counterSlice.actions;

// Export selectors
export const selectCounter = (state) => state.counter.count;

// Export the reducer
export default counterSlice.reducer;
