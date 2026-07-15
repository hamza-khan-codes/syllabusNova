import { createSlice } from "@reduxjs/toolkit";
import createTestInitialState from "./createTestInitialState";
import createTestReducers from "./createTestReducers";

const createTestSlice = createSlice({
    name: "createTest",
    initialState: createTestInitialState,
    reducers: createTestReducers
})

export const {
    updateInfo,
    updateStructure,
    updateSettings,
    updatePublish,
    updateCreator,
    setQuestions,
    addQuestion,
    deleteQuestion,
    resetCreateTest,
    createTestStart,
    createTestSuccess,
    createTestFailure,
    updateCreateTest
} = createTestSlice.actions

export default createTestSlice.reducer