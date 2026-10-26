import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constant/routes";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "@/pages/LoadingPage";
import { useEffect } from "react";
import { authStart } from "@/features/Auth/authSlices";

export default function ProtectedRoute() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  console.log("USER", user)



  if (loading) {
    return (
      <LoadingPage/>
    );
  }
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  if (!user.emailVerified) {

    return <Navigate to={ROUTES.VERIFICATION} replace />;
  }

  return <Outlet />;
}
