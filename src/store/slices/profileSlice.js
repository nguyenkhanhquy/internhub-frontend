import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: { profile: null },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        resetProfile: (state) => {
            state.profile = null;
        },
    },
});

// Export actions
export const { setProfile, resetProfile } = profileSlice.actions;

// Export selectors
export const selectProfile = (state) => state.profile.profile;

// Export the reducer
export default profileSlice.reducer;
