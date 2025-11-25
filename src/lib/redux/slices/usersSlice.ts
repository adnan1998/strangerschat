import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User, type Gender } from '@/types';

interface UsersState {
  users: User[];
  filter: Gender | 'All';
}

const initialState: UsersState = {
  users: [],
  filter: 'All',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setFilter(state, action: PayloadAction<Gender | 'All'>) {
      state.filter = action.payload;
    },
    resetUsersState: () => initialState,
  },
});

export const { setUsers, setFilter, resetUsersState } = usersSlice.actions;
export default usersSlice.reducer;
