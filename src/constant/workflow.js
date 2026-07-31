import { ROUTES } from "./routes";

export const WORKFLOW_CREATETEST_STEPS = {
  steps: [
    {
      step: "info",
      path: ROUTES.TESTINFO
    },
    {
      step: "structure",
      path: ROUTES.TESTSTRUCTURE
    },
    {
      step: "settings",
      path: ROUTES.TESTSETTING
    },
    {
      step: "Questions",
      path: ROUTES.ADDQUESTION
    },
    {
      step: "publish",
      path: ROUTES.TESTPUBLISH
    },
  ],
};

// {
//   steps:["info",
//   "structure",
//   "settings",
//   "Questions",
//     "publish"],
//   paths:[]
// }
