import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';
import usersReducer from './slices/usersSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    users: usersReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
