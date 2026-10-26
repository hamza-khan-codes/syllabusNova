import baseUrl from "./baseRoute";


export const ROUTES = {
  HOME: baseUrl,

  LOGIN: "/login",
  REGISTER: "/registration",
  VERIFICATION: "/verification",
  FORGOTPASSWORD: "/forgotpasswordk",

  DASHBOARD: "/dashboard",
  CREATETEST: "/createtest",
  TESTINFO: "test-info",
  TESTSETTING: "test-setting",
  TESTSTRUCTURE: "test-structure",
  TESTPUBLISH: "test-publish",
  ADDQUESTION: "add-question",
  ADDNEWQUESTION: "add-new-question",
  ADDNEWQUESTIONLIST: "added-question-list",

  EXPLOREQUIZ: "/explore",
  EXPLORECARDINFO: "card-info",

  MYTESTS: "/my-test",

  MYQUESTIONS: "/my-questions",

  SETTINGSPAGE: "/settings",

  ATTEMPTEDTESTS: "/attempted-tests",

  QUIZINTERFACE: "/quiz",

  CATEGORY: "/category",
  PROFILE: "/profile",

  RESULT: "/results",
  REVIEWQUESTIONS: "/review",

  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
};

Object.entries(ROUTES).forEach(([key, value]) => {
  if(value.startsWith("/") && value !== baseUrl) ROUTES[key] = `${baseUrl.replace(/\/$/, "")}${value}`;
});
