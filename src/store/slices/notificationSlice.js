import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: { notifications: null },
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        resetNotifications: (state) => {
            state.notifications = null;
        },
    },
});

// Export actions
export const { setNotifications, resetNotifications } = notificationSlice.actions;

// Export selectors
export const selectNotifications = (state) => state.notification.notifications;

// Export the reducer
export default notificationSlice.reducer;
