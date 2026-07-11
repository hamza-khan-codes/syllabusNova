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
import BasicInfo from "@/components/CreateTest/BasicInfo";
import TestSetting from "@/components/CreateTest/TestSetting";
import TestStructure from "@/components/CreateTest/TestStructure";
import AddQuestion from "@/components/CreateTest/AddQuestion";
import TestPublish from "@/components/CreateTest/TestPublish";
import AddNewQuestion from "@/components/CreateTest/AddNewQuestion";

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

          <Route path={ROUTES.CREATETEST} element={<CreateTest />}>
            <Route index element={<BasicInfo />} />
            <Route path={ROUTES.TESTSETTING} element={<TestSetting/>}/>
            <Route path={ROUTES.TESTSTRUCTURE} element={<TestStructure/>}/>
            <Route path={ROUTES.TESTPUBLISH} element={<TestPublish/>}/>
            <Route path={ROUTES.ADDQUESTION} element={<AddNewQuestion/>}/>
          </Route>

        </Route>

        {/* Not found - Universal router */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
