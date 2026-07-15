import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/features/Theme/themeSlices"
import authReducers  from "@/features/Auth/authSlices";
import createTestReducers from "@/features/CreateTest/createTestSlices";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducers,
        createTest:createTestReducers
    }
})