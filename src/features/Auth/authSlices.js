import { createSlice } from "@reduxjs/toolkit";
import authInitialState from "./authInitialState";
import { authReducers } from "./authReducers";

const authSlices = createSlice({
    name: "auth",
    initialState: authInitialState,
    reducers: authReducers
})


export const {authStart,authFailure,authLogout,authReset,authStateAndSuccess}= authSlices.actions
export default authSlices.reducer