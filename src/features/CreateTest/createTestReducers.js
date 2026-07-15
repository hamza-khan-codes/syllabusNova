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
    const { id, updates } = action.payload;

    const question = state.questions.find((q) => q.id === id);

    if (question) {
      Object.assign(question, updates);
    }
  },

  deleteQuestion: (state, action) => {
    state.questions = state.questions.filter(
      (q) => q.id !== action.payload
    );
  },

  clearQuestions: (state) => {
    state.questions = [];
  },

  // Reset
  resetCreateTest: () => createTestInitialState,

  // Update 
  updateCreateTest:(state,action)=> action.payload,

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
};

export default createTestReducers;