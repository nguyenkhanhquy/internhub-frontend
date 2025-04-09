import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: { accountDetails: null },
    reducers: {
        setAccountDetails: (state, action) => {
            state.accountDetails = action.payload;
        },
        resetAccountDetails: (state) => {
            state.accountDetails = null;
        },
    },
});

// Export actions
export const { setAccountDetails, resetAccountDetails } = accountSlice.actions;

// Export selectors
export const selectAccountDetails = (state) => state.account.accountDetails;

// Export the reducer
export default accountSlice.reducer;
