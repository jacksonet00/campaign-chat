import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface APIKeyState {
  apiKey: string | null;
}

const initialState: APIKeyState = {
  apiKey: null,
};

export const apiKeySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.apiKey = action.payload;
    },
    clear: (state) => {
      state.apiKey = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set, clear } = apiKeySlice.actions;

export default apiKeySlice.reducer;
