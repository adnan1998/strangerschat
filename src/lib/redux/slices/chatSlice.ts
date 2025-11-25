import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  activeChatRoomId: string;
  unreadCounts: {
    [chatRoomId: string]: number;
  };
}

const initialState: ChatState = {
  activeChatRoomId: 'global',
  unreadCounts: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChatRoom(state, action: PayloadAction<string>) {
      state.activeChatRoomId = action.payload;
      // When switching to a new chat, immediately mark its messages as read
      state.unreadCounts[action.payload] = 0;
    },
    incrementUnread(state, action: PayloadAction<string>) {
      const chatRoomId = action.payload;
      // Only increment if the chat is not currently active
      if (state.activeChatRoomId !== chatRoomId) {
        if (!state.unreadCounts[chatRoomId]) {
          state.unreadCounts[chatRoomId] = 0;
        }
        state.unreadCounts[chatRoomId]++;
      }
    },
    clearUnread(state, action: PayloadAction<string>) {
      state.unreadCounts[action.payload] = 0;
    },
    resetChatState: () => initialState,
  },
});

export const { setActiveChatRoom, incrementUnread, clearUnread, resetChatState } = chatSlice.actions;
export default chatSlice.reducer;
