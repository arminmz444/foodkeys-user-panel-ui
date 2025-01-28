// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
    id: number;
    title: string;
    message: string;
    userId: number;
    isRead: boolean;
}

// Initial state
const initialState: Notification[] = [];

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification[]>) => {
            const notifications = action.payload;
            notifications.forEach(notification => {state.push(notification)})
        },
        readNotification: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.map(notification => id === notification.id && {...notification, isRead: true} || notification)
        },
    },
});

export const { addNotification, readNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
