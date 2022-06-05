import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../types";

const initialState: Theme = {
  dark: true,
};

export const themeSlice = createSlice({
  name: "toggleTheme",
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<string>) => {
      state.dark = !state.dark;
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
