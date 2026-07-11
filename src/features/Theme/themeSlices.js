import getSystemTheme from "@/utils/getSystemTheme";
import { createSlice } from "@reduxjs/toolkit";
import themeReducers from "./themeReducers";

const initialState = {
  mode: localStorage.getItem("theme") || getSystemTheme()
};

const themeSlices = createSlice({
  name: "theme",
  initialState,
  reducers:themeReducers
  },
);




export const { setTheme, toggleTheme } = themeSlices.actions

export default  themeSlices.reducer
