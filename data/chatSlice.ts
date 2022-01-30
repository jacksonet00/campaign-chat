import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "../types/Chat";

export interface ChatHistoryState {
  chats: Chat[];
}

const initialState: ChatHistoryState = {
  chats: [],
};

export const chatSlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats = [action.payload, ...state.chats];
    },
    clearHistory: (state) => {
      state.chats = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addChat, clearHistory } = chatSlice.actions;

export default chatSlice.reducer;
