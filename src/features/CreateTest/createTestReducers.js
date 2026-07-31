import { current } from "@reduxjs/toolkit";
import createTestInitialState from "./createTestInitialState";

const createTestReducers = {
  // Info
  updateInfo: (state, action) => {
    Object.assign(state.info, action.payload);
  },

  // Structure
  updateStructure: (state, action) => {
    Object.assign(state.structure, action.payload);
  },

  // Settings
  updateSettings: (state, action) => {
    Object.assign(state.settings, action.payload);
  },

  // Publish
  updatePublish: (state, action) => {
    Object.assign(state.publish, action.payload);
  },

  // Creator
  updateCreator: (state, action) => {
    Object.assign(state.creator, action.payload);
  },

  // Questions
  setQuestions: (state, action) => {
    state.questions = action.payload;
  },

  addQuestion: (state, action) => {
    state.questions.push(action.payload);
  },

  updateQuestion: (state, action) => {
    const QuestionIdx = current(state.questions).findIndex((question) => {
      return question.questionId === action.payload.questionId;
    });
    if (QuestionIdx === -1)
      return new Error(
        "Please enter correct question :: updateQuestion :: createTestReducer",
      );
    console.log(current(state.questions[QuestionIdx]));
    state.questions[QuestionIdx] = action.payload;
  },

  editQuestion: (state, action) => {
    state.edit = action.payload;
  },
  clearEditQuestion: (state) => {
    state.edit = [];
  },

  deleteQuestion: (state, action) => {
    state.questions = state.questions.filter(
      (q) => q.questionId !== action.payload,
    );
  },

  clearQuestions: (state) => {
    state.questions = [];
  },

  // Reset
  resetCreateTest: () => createTestInitialState,

  // Update
  updateCreateTest: (state, action) => action.payload,

  // Loading
  createTestStart: (state) => {
    state.loading = true;
    state.error = null;
  },

  createTestSuccess: (state) => {
    state.loading = false;
    state.error = null;
  },

  createTestFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // WorkFlow
  // ========

  setCurrentStep: (state, action) => {
    const step = action.payload;
    const { workflow } = state;

    // Validate step
    if (!workflow.stepOrder.some((s) => s.step === step)) {
      state.error = "Please enter a valid workflow step. (setCurrentStep)";
      return;
    }

    // Clear any previous workflow error
    state.error = null;

    // Store previous step
    workflow.previousStep = workflow.currentStep;

    // Update current step
    workflow.currentStep = step;

    // Mark as visited
    if (!workflow.visited.includes(step)) {
      workflow.visited.push(step);
    }

    // Calculate next step
    const currentIndex = workflow.stepOrder.findIndex((s) => {
      return s.step === step;
    });

    console.log("current", currentIndex);

    workflow.nextStep =
      currentIndex < workflow.stepOrder.length - 1
        ? workflow.stepOrder[currentIndex + 1].step
        : null;
  },
  completeStep: (state, action) => {
    const step = action.payload;
    const { workflow } = state;

    // Validate step
    if (!workflow.stepOrder.some((s) => s.step === step)) {
      state.error = "Please enter a valid workflow step. (setCurrentStep)";
      return;
    }

    // Clear any previous workflow error
    state.error = null;

    if (!workflow.completed.includes(step)) {
      workflow.completed.push(step);
    }
  },
  changeStepPath: (state, action) => {
    const { searchStep, changePath } = action.payload ?? {};
    state.error = null;
    if (!searchStep || !changePath) {
      state.error = "Please provide both 'searchStep' and 'changePath'.";
      return;
    }
    if (typeof searchStep !== "string" || typeof changePath !== "string") {
      state.error = "'searchStep' and 'changePath' must both be strings.";
      return;
    }
    const searchedIdx = state.workflow.stepOrder.findIndex(
      (s) => s.step === searchStep,
    );
    if (searchedIdx === -1) {
      state.error = `'${searchStep}' is not a valid workflow step.`;
      return;
    }
    state.workflow.stepOrder[searchedIdx] = {
      step: searchStep,
      path: changePath,
    };
  },
  resetWorkflow: (state) => {
    state.workflow = {
      currentStep: createTestInitialState.workflow.currentStep,
      visited: [...createTestInitialState.workflow.visited],
      completed: [...createTestInitialState.workflow.completed],
      previousStep: createTestInitialState.workflow.previousStep,
      nextStep: createTestInitialState.workflow.nextStep,
      stepOrder: [...createTestInitialState.workflow.stepOrder],
    };

    state.error = null;
  },
};

export default createTestReducers;
