import { TEST_STATUS } from "@/constant/createTest/roleStatus";
import { WORKFLOW_CREATETEST_STEPS } from "@/constant/workflow";




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
    status: TEST_STATUS.DRAFT,
    visibility: "private",
    approvalStatus: TEST_STATUS.PENDING,
    approvedBy: null,
    approvedAt: null,
    rejectionReason:null
  },

  creator: {
    uid:  null,
    name:  null,
  },

   questions: [],
   edit: [],
  
  workflow: {
    currentStep: WORKFLOW_CREATETEST_STEPS.steps[0].step,
    visited: [WORKFLOW_CREATETEST_STEPS.steps[0].step],
    completed: [],
    previousStep: null,
    nextStep: null,
    stepOrder:WORKFLOW_CREATETEST_STEPS.steps
  },

  loading: false,
  error: null,
};
export default createTestInitialState;