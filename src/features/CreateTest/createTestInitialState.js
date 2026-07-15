 const createTestInitialState = {
  info: {
    title: "",
    description: "",
    category: "",
    cover: "",
  },

  structure: {
    duration: 0,
    isSectionWise: false,
    totalQuestions: 0,
    totalMarks: 0,
    passingPercentage: 0,
    negativeMarking: false,
    negativeMarks: 0,
    sections: [],
  },

  settings: {
    shuffleQuestions: false,
    shuffleOptions: false,
    allowReview: true,
    calculatorAllowed: false,
  },

  publish: {
    status: "draft",
    visibility: "private",
    approvalStatus: "pending",
    approvedBy: null,
    approvedAt: null,
  },

  creator: {
    uid: "",
    name: "",
  },

  questions: [],

  loading: false,
  error: null,
};
export default createTestInitialState;