import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { type User } from '@/types';
import { resetUsersState } from './usersSlice';
import { resetChatState } from './chatSlice';
import { getAuth } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore'; // Import deleteDoc
import { getSdks } from '@/firebase';
import { type RootState } from '../store';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


interface SessionState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: SessionState = {
  user: null,
  isLoggedIn: false,
};

export const logoutAndLeave = createAsyncThunk<void, void, { state: RootState }>(
    'session/logoutAndLeave',
    async (_, { dispatch, getState }) => {
        const { session } = getState();
        const auth = getAuth();
        const userId = session.user?.id; // Capture the user ID before any state changes

        // Perform cleanup first
        if (userId) {
            const { firestore } = getSdks(auth.app);
            const onlineUserDocRef = doc(firestore, 'online_users', userId);
            
            // Use a direct, awaited delete with proper error handling
            try {
                await deleteDoc(onlineUserDocRef);
            } catch (error) {
                const permissionError = new FirestorePermissionError({
                    path: onlineUserDocRef.path,
                    operation: 'delete',
                });
                errorEmitter.emit('permission-error', permissionError);
                console.error("Failed to delete online user presence:", permissionError);
            }
        }

        // Sign out from Firebase
        if (auth.currentUser) {
            await auth.signOut();
        }

        // Reset all relevant redux states
        dispatch(logout()); // This is now synchronous
        dispatch(resetChatState());
        dispatch(resetUsersState());
    }
);


const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    // The thunk now handles the full logic, so we just ensure state is clean.
    builder.addCase(logoutAndLeave.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
    });
  }
});

export const { login, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
