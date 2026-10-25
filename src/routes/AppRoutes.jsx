import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { ROUTES } from "../constant/routes";
import NotFound from "../pages/NotFound";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Users/Dashboard";
import Verification from "@/pages/Verification";
import RegisPage from "@/pages/RegisPage";
import Log from "@/pages/Log";
import ForgotPasswoard from "@/pages/ForgotPasswoard";
import CreateTest from "@/pages/Users/CreateTest";

import AddQuestion from "@/components/CreateTest/AddQuestion";
import TestPublish from "@/components/CreateTest/TestPublish";
import AddNewQuestion from "@/components/CreateTest/AddNewQuestion";
import AddedQuestionList from "@/components/CreateTest/AddedQuestionList";
import ExploreQuiz from "@/pages/Users/ExploreQuiz";
import ExploreHome from "@/components/Explore Test/ExploreHome";
import ExploreCardInfo from "@/components/Explore Test/ExploreCardInfo";
import IndualQluizInterface from "@/components/IndualQuiz/IndualQluizInterface";
import IndualResult from "@/components/IndualQuiz/IndualResult";
import MyTests from "@/pages/Users/MyTests";
import MyQuestions from "@/pages/Users/MyQuestions";
import SettingsPage from "@/pages/Users/SettingsPage";
import AttemptedTests from "@/pages/Users/AttemptedTests";
import CreateTestHome from "@/components/CreateTest/CreateTestHome";
import CreateTestInfo from "@/components/CreateTest/CreateTestInfo";
import CreateTestStructure from "@/components/CreateTest/CreateTestStructure";
import CreateTestSetting from "@/components/CreateTest/CreateTestSetting";
import IndualReview from "@/components/IndualQuiz/IndualReview";

import CreateTestProvider from "@/app/Providers/CreateTestProvider";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* index Route */}
        <Route index element={<Landing />} />

        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path={ROUTES.LOGIN} element={<Log />} />

          <Route path={ROUTES.FORGOTPASSWORD} element={<ForgotPasswoard />} />
          <Route path={ROUTES.REGISTER} element={<RegisPage />} />
          <Route path={ROUTES.VERIFICATION} element={<Verification />} />
        </Route>

        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

          <Route path={ROUTES.MYTESTS} element={<MyTests />} />
          <Route path={ROUTES.MYQUESTIONS} element={<MyQuestions />} />
          <Route path={ROUTES.ATTEMPTEDTESTS} element={<AttemptedTests />} />
          <Route path={ROUTES.SETTINGSPAGE} element={<SettingsPage />} />

          <Route element={<CreateTestProvider />}>
            <Route path={ROUTES.CREATETEST} element={<CreateTest />}>
              <Route index element={<CreateTestHome />} />

              <Route path={":testId/" + ROUTES.TESTINFO} element={<CreateTestInfo />} />
              <Route path={":testId/" + ROUTES.TESTSTRUCTURE} element={<CreateTestStructure />} />
              <Route path={":testId/" + ROUTES.TESTSETTING} element={<CreateTestSetting />} />
              <Route path={":testId/" + ROUTES.ADDQUESTION} element={<AddQuestion />} />
              <Route path={":testId/" + ROUTES.ADDNEWQUESTION} element={<AddNewQuestion />} />
              <Route path={":testId/" + ROUTES.ADDNEWQUESTIONLIST} element={<AddedQuestionList />} />
              <Route path={":testId/" + ROUTES.TESTPUBLISH} element={<TestPublish />} />
            </Route>

          </Route>


          <Route path={ROUTES.EXPLOREQUIZ} element={<ExploreQuiz />}>
            <Route index element={<ExploreHome />} />
            <Route
              path={ROUTES.EXPLORECARDINFO + "/:quizCardId"}
              element={<ExploreCardInfo />}
            />
          </Route>

          <Route
            path={ROUTES.QUIZINTERFACE + "/:quizId"}
            element={<IndualQluizInterface />}
          />

          <Route path={ROUTES.RESULT + "/:quizId"} element={<IndualResult />} />
          <Route path={ROUTES.REVIEWQUESTIONS + "/:quizId/:reviewQuizId"} element={<IndualReview />} />
        </Route>

        {/* Not found - Universal router */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
